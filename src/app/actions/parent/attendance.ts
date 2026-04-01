"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function getParentAttendanceData() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "parent") {
            return { success: false, error: "Authentication required as parent" };
        }

        const parent = await prisma.parent.findUnique({
            where: { userId: currentUser.id },
            include: { student: true }
        });

        if (!parent) return { success: false, error: "Parent profile not found" };

        const attendanceLog = await prisma.attendance.findMany({
            where: { studentId: parent.studentId },
            orderBy: { date: 'desc' },
            take: 30
        });

        return {
            success: true,
            data: {
                attendanceLog: attendanceLog.map(a => ({
                    date: a.date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                    day: a.date.toLocaleDateString('en-GB', { weekday: 'long' }),
                    status: a.status.charAt(0) + a.status.slice(1).toLowerCase(),
                    statusColor: a.status === 'PRESENT' ? 'emerald' : a.status === 'ABSENT' ? 'red' : 'orange'
                }))
            }
        };
    } catch (error) {
        console.error("Error fetching parent attendance:", error);
        return { success: false, error: "Failed to load attendance data" };
    }
}
