"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function getParentDashboardData() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "parent") {
            return { success: false, error: "Authentication required as parent" };
        }

        const parent = await (prisma as any).parent.findUnique({
            where: { userId: currentUser.id },
            include: {
                student: {
                    include: {
                        school: {
                            select: { schoolName: true }
                        },
                        section: {
                            include: {
                                class: true
                            }
                        }
                    }
                }
            }
        });

        if (!parent) {
            return { success: false, error: "Parent profile not found" };
        }

        const student = parent.student;
        const studentId = student.id;
        const schoolId = student.schoolId;

        // 1. Fetch Attendance Stats
        const attendance = await prisma.attendance.findMany({
            where: { studentId: studentId },
            select: { status: true }
        });

        const totalDays = attendance.length;
        const presentCount = attendance.filter(a => a.status === 'PRESENT').length;
        const lateCount = attendance.filter(a => a.status === 'LATE').length;
        
        const attendancePercentage = totalDays > 0 
            ? ((presentCount + (lateCount * 0.5)) / totalDays * 100).toFixed(0)
            : "0";

        // 2. Fetch Academic Stats (CGPA)
        const results = await prisma.result.findMany({
            where: { studentId: studentId },
            select: { marks: true }
        });

        const getGradePoint = (marks: number) => {
            if (marks >= 80) return 4.0;
            if (marks >= 70) return 3.5;
            if (marks >= 60) return 3.0;
            if (marks >= 50) return 2.5;
            if (marks >= 40) return 2.0;
            if (marks >= 33) return 1.0;
            return 0.0;
        };

        const totalPoints = results.reduce((acc, res) => acc + getGradePoint(res.marks), 0);
        const cgpa = results.length > 0 ? (totalPoints / results.length).toFixed(2) : "0.00";

        // 3. Fee Details
        const [assignedFees, successfulPayments] = await Promise.all([
            prisma.fee.findMany({
                where: { 
                    schoolId: schoolId,
                    OR: [
                        { classId: student.section?.classId },
                        { classId: null }
                    ]
                }
            }),
            prisma.payment.findMany({
                where: { 
                    studentId: studentId,
                    status: "SUCCESS"
                }
            })
        ]);

        const totalFeeAmount = assignedFees.reduce((acc, f) => acc + f.amount, 0);
        const paidAmount = successfulPayments.reduce((acc, p) => acc + p.amount, 0);
        const pendingAmount = Math.max(0, totalFeeAmount - paidAmount);

        // 4. Recent Activities
        const [announcements, recentResults, recentFeedback] = await Promise.all([
            prisma.announcement.findMany({
                where: {
                    schoolId: schoolId,
                    status: "published",
                    OR: [
                        { audience: "all" },
                        { audience: "parents" }
                    ]
                },
                orderBy: { createdAt: 'desc' },
                take: 3
            }),
            prisma.result.findMany({
                where: { studentId: studentId },
                orderBy: { createdAt: 'desc' },
                take: 3
            }),
            (prisma as any).feedback.findMany({
                where: { studentId: studentId },
                orderBy: { createdAt: 'desc' },
                take: 3,
                include: {
                    teacher: { include: { user: { select: { name: true } } } }
                }
            })
        ]);

        const activities = [
            ...announcements.map((a: any) => ({
                id: `ann-${a.id}`,
                title: a.title,
                time: a.createdAt,
                status: "Notice",
                type: "notice"
            })),
            ...recentResults.map((r: any) => ({
                id: `res-${r.id}`,
                title: `${r.subject} Result Published`,
                time: r.createdAt,
                status: `Score: ${r.marks}`,
                type: "result"
            })),
            ...recentFeedback.map((f: any) => ({
                id: `fb-${f.id}`,
                title: `Feedback from ${f.teacher.user.name}`,
                time: f.createdAt,
                status: f.comment?.substring(0, 20) + "...",
                type: "feedback"
            }))
        ].sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

        return {
            success: true,
            data: {
                parentName: parent.name || "Parent",
                studentName: `${student.firstName} ${student.lastName}`,
                studentId: student.registrationNo,
                studentId_real: student.id,
                schoolId: student.schoolId,
                stats: {
                    attendance: `${attendancePercentage}%`,
                    cgpa: cgpa,
                    pendingFees: pendingAmount.toLocaleString(),
                    presents: presentCount,
                    absents: totalDays - presentCount
                },
                activities,
                feedback: recentFeedback.map((f: any) => ({
                    id: f.id,
                    teacher: f.teacher.user.name,
                    comment: f.comment,
                    date: f.createdAt.toLocaleDateString(),
                    academic: f.academic,
                    behavior: f.behavior,
                    participation: f.participation
                })),
                gpaData: [
                    { exam: 'Term 1', gpa: 4.2 },
                    { exam: 'Term 2', gpa: 4.5 },
                    { exam: 'Term 3', gpa: 4.4 },
                    { exam: 'Current', gpa: parseFloat(cgpa) }
                ]
            }
        };

    } catch (error) {
        console.error("Error fetching parent dashboard data:", error);
        return { success: false, error: "Failed to load dashboard data" };
    }
}
