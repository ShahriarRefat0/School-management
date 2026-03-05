"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getStudyMaterials(schoolId?: string) {
    try {
        const whereClause = schoolId ? { schoolId } : {};
        const materials = await prisma.studyMaterial.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, data: materials };
    } catch (error) {
        console.error("Error fetching study materials:", error);
        return { success: false, error: "Failed to fetch study materials" };
    }
}

export async function createStudyMaterial(formData: {
    title: string;
    type: string;
    subject: string;
    class: string;
    description?: string;
    attachmentUrl: string;
    size?: string;
    schoolId: string;
    teacherId: string;
}) {
    try {
        const targetSchoolId = formData.schoolId || "default-school-id";
        const material = await prisma.studyMaterial.create({
            data: {
                ...formData,
                schoolId: targetSchoolId
            }
        });
        revalidatePath("/dashboard/teacher/study-materials");
        return { success: true, data: material };
    } catch (error) {
        console.error("Error creating study material:", error);
        return { success: false, error: "Failed to create study material" };
    }
}

export async function updateStudyMaterial(id: string, formData: {
    title: string;
    type: string;
    subject: string;
    class: string;
    description?: string;
    attachmentUrl: string;
    size?: string;
}) {
    try {
        const material = await prisma.studyMaterial.update({
            where: { id },
            data: formData
        });
        revalidatePath("/dashboard/teacher/study-materials");
        return { success: true, data: material };
    } catch (error) {
        console.error("Error updating study material:", error);
        return { success: false, error: "Failed to update study material" };
    }
}

export async function deleteStudyMaterial(id: string) {
    try {
        await prisma.studyMaterial.delete({
            where: { id }
        });
        revalidatePath("/dashboard/teacher/study-materials");
        return { success: true };
    } catch (error) {
        console.error("Error deleting study material:", error);
        return { success: false, error: "Failed to delete study material" };
    }
}
