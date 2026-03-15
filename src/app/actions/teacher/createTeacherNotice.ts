"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/getCurrentUser";

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
        const currentUser = await getCurrentUser();
        const schoolId = currentUser?.schoolId || formData.schoolId;

        if (!schoolId || !currentUser) {
            return { success: false, error: "Authentication Error: Could not determine valid session or school." };
        }

        const newNotice = await prisma.teacherNotice.create({
            data: {
                title: formData.title,
                content: formData.content,
                audience: formData.audience,
                targetClass: formData.targetClass || null,
                category: formData.category,
                priority: formData.priority,
                schoolId: schoolId,
                authorId: currentUser.id, // Securely from session
                authorName: currentUser.name, // Securely from session
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

export async function updateTeacherNotice(id: string, formData: {
    title: string;
    content: string;
    audience: string;
    targetClass?: string | null;
    category: string;
    priority: string;
}) {
    try {
        const updatedNotice = await prisma.teacherNotice.update({
            where: { id },
            data: {
                title: formData.title,
                content: formData.content,
                audience: formData.audience,
                targetClass: formData.targetClass || null,
                category: formData.category,
                priority: formData.priority,
            },
        });

        revalidatePath("/dashboard/teacher/notices");
        return { success: true, data: updatedNotice };
    } catch (error: any) {
        console.error("❌ updateTeacherNotice Error:", error.message);
        return { success: false, error: "Error: " + error.message };
    }
}

export async function getSchoolAnnouncements(schoolId?: string) {
    try {
        let finalSchoolId = schoolId;
        if (!finalSchoolId) {
            const currentUser = await getCurrentUser();
            finalSchoolId = currentUser?.schoolId || "";
        }

        if (!finalSchoolId) return { success: false, error: "School ID not found" };

        const announcements = await prisma.announcement.findMany({
            where: { schoolId: finalSchoolId },
            orderBy: { createdAt: 'desc' },
        });

        return { success: true, data: announcements.map(a => ({ ...a, type: 'admin' })) };
    } catch (error: any) {
        console.error("❌ getSchoolAnnouncements Error:", error.message);
        return { success: false, error: "Error: " + error.message };
    }
}

export async function deleteTeacherNotice(id: string) {
    try {
        await prisma.teacherNotice.delete({
            where: { id },
        });

        revalidatePath("/dashboard/teacher/notices");
        return { success: true };
    } catch (error: any) {
        console.error("❌ deleteTeacherNotice Error:", error.message);
        return { success: false, error: "Error: " + error.message };
    }
}

export async function getTeacherNotices(schoolId?: string) {
    try {
        let finalSchoolId = schoolId;
        if (!finalSchoolId) {
            const currentUser = await getCurrentUser();
            finalSchoolId = currentUser?.schoolId || "";
        }

        const whereClause = finalSchoolId ? { schoolId: finalSchoolId } : {};
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
