"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/getCurrentUser"

export async function getTeacherDashboardData() {
    try {
        const currentUser = await getCurrentUser()
        if (!currentUser) return { success: false, error: "Authentication required" }
        if (!currentUser.schoolId) return { success: false, error: "Your account is not linked to a school." }
        const schoolId = currentUser.schoolId as string;

        const teacher = await prisma.teacher.findUnique({
            where: { userId: currentUser.id },
            include: {
                user: true
            }
        })

        if (!teacher) return { success: false, error: "Teacher profile not found" }

        // 1. Get total students in assigned classes
        // We'll use the names in teacher.assignedClasses to find matching students
        const students = await prisma.student.findMany({
            where: {
                schoolId: schoolId,
                currentClass: { in: teacher.assignedClasses }
            }
        })

        // 2. Get recent notices
        const recentNotices = await prisma.teacherNotice.findMany({
            where: { schoolId: schoolId },
            orderBy: { createdAt: 'desc' },
            take: 5
        })

        // 3. Get full class objects for assigned classes (with repair logic)
        for (const className of teacher.assignedClasses) {
            const cls = await prisma.class.findFirst({
                where: { schoolId, name: className }
            });
            if (!cls) {
                await prisma.class.create({
                    data: { name: className, schoolId }
                });
            }
        }

        const assignedClassesData = await prisma.class.findMany({
            where: {
                schoolId: schoolId,
                name: { in: teacher.assignedClasses }
            },
            orderBy: { name: 'asc' }
        })

        const totalClasses = teacher.assignedClasses.length

        // 4. Get attendance summary (Today)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const todayAttendance = await prisma.attendance.count({
            where: {
                teacherId: teacher.id,
                date: { gte: today }
            }
        })

        return {
            success: true,
            data: {
                profile: {
                    name: teacher.user.name,
                    designation: teacher.designation,
                    department: teacher.department,
                    email: teacher.user.email
                },
                stats: {
                    totalStudents: students.length,
                    totalClasses: totalClasses,
                    todayAttendance: todayAttendance,
                    pendingAssignments: 0 // Assignment model not confirmed yet
                },
                notices: recentNotices,
                assignedClasses: assignedClassesData
            }
        }

    } catch (error: any) {
        console.error("Error fetching teacher dashboard data:", error.message)
        return { success: false, error: "Failed to load dashboard data" }
    }
}
