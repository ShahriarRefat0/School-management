"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTeacherNotice(formData: {
    title: string;
    content: string;
    audience: string;
    targetClass?: string | null;
    category: string;
    priority: string;
    schoolId: string | null;
    authorId?: string | null;
    authorName?: string | null;
}) {
    try {
        // Temporary: Using a dummy ID if missing for testing purposes
        const targetSchoolId = formData.schoolId || "default-school-id";

        const newNotice = await prisma.teacherNotice.create({
            data: {
                title: formData.title,
                content: formData.content,
                audience: formData.audience,
                targetClass: formData.audience === "students" ? formData.targetClass : null,
                category: formData.category,
                priority: formData.priority,
                schoolId: targetSchoolId,
                authorId: formData.authorId,
                authorName: formData.authorName,
                status: "published",
            },
        });

        revalidatePath("/dashboard/teacher/notices");
        return { success: true, data: newNotice };

    } catch (error: any) {
        console.error("❌ createTeacherNotice Error:", error.message);
        return { success: false, error: "Error: " + error.message };
    }
}

export async function getTeacherNotices(schoolId?: string) {
    try {
        const whereClause = schoolId ? { schoolId } : {};
        const notices = await prisma.teacherNotice.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
        });

        return { success: true, data: notices };
    } catch (error: any) {
        console.error("❌ getTeacherNotices Error:", error.message);
        return { success: false, error: "Error: " + error.message };
    }
}
