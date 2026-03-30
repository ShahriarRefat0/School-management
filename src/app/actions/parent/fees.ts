'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/getCurrentUser';

export async function getParentFeesData() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'parent') {
      return { success: false, error: 'Authentication required as parent' };
    }

    const parent = await prisma.parent.findUnique({
      where: { userId: currentUser.id },
      include: { student: true },
    });

    if (!parent) return { success: false, error: 'Parent profile not found' };

    const student = parent.student;

    const [assignedFees, payments] = await Promise.all([
      prisma.fee.findMany({
        where: {
          schoolId: student.schoolId,
          OR: [
            { classId: student.currentClass }, // Assuming class name match or ID
            { classId: null },
          ],
        },
      }),
      prisma.payment.findMany({
        where: { studentId: student.id },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const totalDue =
      assignedFees.reduce((acc, f) => acc + f.amount, 0) -
      payments
        .filter((p) => p.status === 'SUCCESS')
        .reduce((acc, p) => acc + p.amount, 0);

    return {
      success: true,
      data: {
        totalDue: Math.max(0, totalDue).toLocaleString(),
        paymentHistory: payments.map((p) => ({
          month: p.createdAt.toLocaleDateString('en-GB', { month: 'long' }),
          desc: p.feeCategory || 'School Fee',
          amount: `৳ ${p.amount.toLocaleString()}`,
          status: p.status === 'SUCCESS' ? 'Paid' : 'Pending',
          statusColor: p.status === 'SUCCESS' ? 'emerald' : 'amber',
        })),
      },
    };
  } catch (error) {
    console.error('Error fetching parent fees:', error);
    return { success: false, error: 'Failed to load fees data' };
  }
}
