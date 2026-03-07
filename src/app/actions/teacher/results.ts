"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function getClasses() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return { success: false, error: "Authentication required" };

        const classes = await prisma.class.findMany({
            where: { schoolId: currentUser.schoolId },
            orderBy: { name: 'asc' }
        });
        return { success: true, data: classes };
    } catch (error) {
        console.error("Error fetching classes:", error);
        return { success: false, error: "Failed to fetch classes" };
    }
}

export async function getStudentsByClass(classId: string) {
    try {
        const students = await prisma.student.findMany({
            where: { section: { classId } },
            orderBy: { rollNo: 'asc' }
        });
        return { success: true, data: students };
    } catch (error) {
        console.error("Error fetching students by class:", error);
        return { success: false, error: "Failed to fetch students" };
    }
}

export async function saveResults(resultsData: {
    studentId: string;
    marks: number;
    subject: string;
    examType: string;
    classId: string;
}[]) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return { success: false, error: "Authentication required" };

        const teacher = await prisma.teacher.findUnique({
            where: { userId: currentUser.id }
        });

        if (!teacher) return { success: false, error: "Teacher profile not found" };

        for (const res of resultsData) {
            const existing = await prisma.result.findFirst({
                where: {
                    studentId: res.studentId,
                    subject: res.subject,
                    examType: res.examType
                }
            });

            if (existing) {
                await prisma.result.update({
                    where: { id: existing.id },
                    data: { marks: res.marks, teacherId: teacher.id }
                });
            } else {
                await prisma.result.create({
                    data: {
                        studentId: res.studentId,
                        marks: res.marks,
                        subject: res.subject,
                        examType: res.examType,
                        classId: res.classId,
                        schoolId: currentUser.schoolId,
                        teacherId: teacher.id
                    }
                });
            }
        }

        revalidatePath("/dashboard/teacher/results");
        return { success: true };
    } catch (error) {
        console.error("Error saving results:", error);
        return { success: false, error: "Failed to save results" };
    }
}

export async function getResults(classId: string, subject: string, examType: string) {
    try {
        const results = await prisma.result.findMany({
            where: { classId, subject, examType }
        });
        return { success: true, data: results };
    } catch (error) {
        console.error("Error fetching results:", error);
        return { success: false, error: "Failed to fetch results" };
    }
}
