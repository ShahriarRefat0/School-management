"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function getParentResultsData() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            console.error("getParentResultsData: Not authenticated");
            return { success: false, error: "Authentication required" };
        }

        let schoolId = currentUser.schoolId;

        // If user is parent but schoolId is not set directly, try to get from student relation
        if (currentUser.role === "parent" && !schoolId) {
            const parent = await prisma.parent.findUnique({
                where: { userId: currentUser.id },
                include: { student: true }
            });
            if (parent?.student?.schoolId) {
                schoolId = parent.student.schoolId;
            }
        }

        const students = await prisma.student.findMany({
            orderBy: [{ currentClass: 'asc' }, { firstName: 'asc' }],
            include: {
                results: {
                    include: { subjectRef: true, exam: true }
                }
            }
        });

        const getGrade = (marks: number) => {
            if (marks >= 80) return "A+";
            if (marks >= 70) return "A";
            if (marks >= 60) return "A-";
            if (marks >= 50) return "B";
            if (marks >= 40) return "C";
            if (marks >= 33) return "D";
            return "F";
        };

        const getPointStr = (marks: number) => {
            if (marks >= 80) return "5.00";
            if (marks >= 70) return "4.00";
            if (marks >= 60) return "3.50";
            if (marks >= 50) return "3.00";
            if (marks >= 40) return "2.50";
            if (marks >= 33) return "2.00";
            return "0.00";
        };

        const getOverallGrade = (avgPoint: number) => {
             if (avgPoint >= 5.0) return "A+";
             if (avgPoint >= 4.0) return "A";
             if (avgPoint >= 3.5) return "A-";
             if (avgPoint >= 3.0) return "B";
             if (avgPoint >= 2.0) return "C";
             if (avgPoint >= 1.0) return "D";
             return "F";
        };

        const finalResults = students.map(student => {
            let totalMarks = 0;
            let totalPoints = 0;
            let subjectCount = 0;
            const subjects: any[] = [];

            student.results.forEach(r => {
                totalMarks += r.marks;
                totalPoints += parseFloat(getPointStr(r.marks));
                subjectCount += 1;
                subjects.push({
                     subject: r.subject || r.subjectRef?.name || "Unknown",
                     marks: r.marks,
                     grade: getGrade(r.marks),
                     point: getPointStr(r.marks)
                });
            });

            const avgPoint = subjectCount > 0 ? totalPoints / subjectCount : 0;
            const overallGrade = subjectCount > 0 ? getOverallGrade(avgPoint) : "N/A";

            return {
                id: student.id,
                studentId: student.registrationNo || 'N/A',
                studentName: `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'Unknown',
                currentClass: student.currentClass || 'N/A',
                gender: student.gender || 'N/A',
                totalMarks,
                totalPoints,
                subjectCount,
                subjects,
                grade: overallGrade
            };
        });

        return {
            success: true,
            data: {
                allResults: finalResults
            }
        };
    } catch (error) {
        console.error("Error fetching parent results:", error);
        return { success: false, error: "Failed to load results data" };
    }
}
