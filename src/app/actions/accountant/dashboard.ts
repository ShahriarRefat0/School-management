"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function getAccountantDashboardStats() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "accountant" || !user.schoolId) {
       return { success: false, error: "Unauthorized" };
    }

    const schoolId = user.schoolId;
    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const startOfYesterday = new Date(new Date(startOfToday).setDate(startOfToday.getDate() - 1));
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // 1. Today's Total Collection
    const todayCollection = await prisma.payment.aggregate({
      where: {
        schoolId,
        status: "SUCCESS",
        createdAt: { gte: startOfToday }
      },
      _sum: { amount: true }
    });

    const yesterdayCollection = await prisma.payment.aggregate({
      where: {
        schoolId,
        status: "SUCCESS",
        createdAt: { gte: startOfYesterday, lt: startOfToday }
      },
      _sum: { amount: true }
    });

    // 2. Monthly Collection
    const monthlyCollection = await prisma.payment.aggregate({
      where: {
        schoolId,
        status: "SUCCESS",
        createdAt: { gte: startOfThisMonth }
      },
      _sum: { amount: true }
    });

    const lastMonthCollection = await prisma.payment.aggregate({
      where: {
        schoolId,
        status: "SUCCESS",
        createdAt: { gte: startOfLastMonth, lt: startOfThisMonth }
      },
      _sum: { amount: true }
    });

    // 3. Total Salaries Paid (Expenses with category 'Salary')
    const totalSalaryPaid = await prisma.expense.aggregate({
      where: {
        schoolId,
        category: "Salary",
        status: "Paid",
        createdAt: { gte: startOfThisMonth }
      },
      _sum: { amount: true }
    });

    // 4. Total Expenses (This month)
    const monthlyExpenses = await prisma.expense.aggregate({
      where: {
        schoolId,
        createdAt: { gte: startOfThisMonth }
      },
      _sum: { amount: true }
    });

    const lastMonthExpenses = await prisma.expense.aggregate({
      where: {
        schoolId,
        createdAt: { gte: startOfLastMonth, lt: startOfThisMonth }
      },
      _sum: { amount: true }
    });

    // 5. Due Fees (PENDING status)
    const dueFeesCount = await prisma.payment.count({
      where: {
        schoolId,
        status: "PENDING"
      }
    });

    const dueFeesAmount = await prisma.payment.aggregate({
      where: {
        schoolId,
        status: "PENDING"
      },
      _sum: { amount: true }
    });

    // Calculations
    const todayValue = todayCollection._sum.amount || 0;
    const yesterdayValue = yesterdayCollection._sum.amount || 0;
    const monthlyValue = monthlyCollection._sum.amount || 0;
    const lastMonthValue = lastMonthCollection._sum.amount || 0;

    const todayChange = yesterdayValue > 0 ? ((todayValue - yesterdayValue) / yesterdayValue) * 100 : 0;
    const monthlyChange = lastMonthValue > 0 ? ((monthlyValue - lastMonthValue) / lastMonthValue) * 100 : 0;

    // 6. Net Balance (Collection - Expenses)
    const totalCollectionAllTime = await prisma.payment.aggregate({
        where: { schoolId, status: "SUCCESS" },
        _sum: { amount: true }
    });
    const totalExpensesAllTime = await prisma.expense.aggregate({
        where: { schoolId },
        _sum: { amount: true }
    });

    const netBalance = (totalCollectionAllTime._sum.amount || 0) - (totalExpensesAllTime._sum.amount || 0);

    // 7. Student and Teacher Counts
    const totalStudents = await prisma.student.count({ where: { schoolId } });
    const totalTeachers = await prisma.teacher.count({ where: { schoolId } });

    return {
      success: true,
      data: {
        today: {
          value: todayValue,
          change: todayChange.toFixed(1) + "%",
          changeType: todayChange >= 0 ? "up" : "down"
        },
        monthly: {
          value: monthlyValue,
          change: monthlyChange.toFixed(1) + "%",
          changeType: monthlyChange >= 0 ? "up" : "down"
        },
        salary: {
          value: totalSalaryPaid._sum.amount || 0
        },
        expenses: {
          value: monthlyExpenses._sum.amount || 0,
          change: (lastMonthExpenses._sum.amount ? (((monthlyExpenses._sum.amount || 0) - (lastMonthExpenses._sum.amount)) / lastMonthExpenses._sum.amount * 100).toFixed(1) : "0") + "%",
          changeType: (monthlyExpenses._sum.amount || 0) <= (lastMonthExpenses._sum.amount || 0) ? "down" : "up"
        },
        dues: {
          value: dueFeesAmount._sum.amount || 0,
          count: dueFeesCount
        },
        netBalance,
        totalStudents,
        totalTeachers
      }
    };
  } catch (error: any) {
    console.error("Dashboard Stats Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getRecentAccountantTransactions() {
    try {
        const user = await getCurrentUser();
        if (!user || !user.schoolId) return { success: false, error: "Unauthorized" };

        const schoolId = user.schoolId;

        // Fetch latest payments
        const payments = await prisma.payment.findMany({
            where: { schoolId },
            orderBy: { createdAt: "desc" },
            take: 10,
            include: { student: true }
        });

        // Fetch latest expenses
        const expenses = await prisma.expense.findMany({
            where: { schoolId },
            orderBy: { transactionAt: "desc" },
            take: 10
        });

        // Combine and sort
        const transactions = [
            ...payments.map(p => ({
                id: p.id,
                date: p.createdAt,
                name: p.customerName || `${p.student?.firstName} ${p.student?.lastName}`,
                type: p.feeCategory || "Fee",
                amount: `+ Tk ${p.amount}`,
                status: p.status,
                statusColor: p.status === "SUCCESS" ? "emerald" : p.status === "PENDING" ? "orange" : "red",
                iconType: "payment"
            })),
            ...expenses.map(e => ({
                id: e.id,
                date: e.transactionAt,
                name: e.title,
                type: e.category,
                amount: `- Tk ${e.amount}`,
                status: e.status,
                statusColor: e.status === "Paid" ? "blue" : "orange",
                iconType: "expense"
            }))
        ]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

        return { success: true, data: transactions };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
