"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPlans() {
    try {
        const plans = await prisma.plan.findMany({
            orderBy: { createdAt: 'asc' },
        });
        return { success: true, data: plans };
    } catch (error: any) {
        console.error("❌ Prisma Error:", error.message);
        return { success: false, error: "Failed to fetch plans" };
    }
}

export async function getPlan(id: string) {
    try {
        const plan = await prisma.plan.findUnique({
            where: { id },
        });
        if (!plan) return { success: false, error: "Plan not found" };
        return { success: true, data: plan };
    } catch (error: any) {
        console.error("❌ Prisma Error:", error.message);
        return { success: false, error: "Failed to fetch plan" };
    }
}

export async function createPlan(formData: any) {
    try {
        const newPlan = await prisma.plan.create({
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration,
                icon: formData.icon,
                color: formData.color,
                students: formData.students,
                teachers: formData.teachers,
                storage: formData.storage,
                modules: formData.modules || [],
            },
        });

        revalidatePath("/dashboard/super-admin/plans");
        return { success: true, data: newPlan };
    } catch (error: any) {
        console.error("❌ Prisma Error:", error.message);
        return { success: false, error: "Failed to create plan" };
    }
}

export async function updatePlan(id: string, formData: any) {
    try {
        const updatedPlan = await prisma.plan.update({
            where: { id },
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration,
                icon: formData.icon,
                color: formData.color,
                students: formData.students,
                teachers: formData.teachers,
                storage: formData.storage,
                modules: formData.modules,
            },
        });

        revalidatePath("/dashboard/super-admin/plans");
        return { success: true, data: updatedPlan };
    } catch (error: any) {
        console.error("❌ Prisma Error:", error.message);
        return { success: false, error: "Failed to update plan" };
    }
}

export async function deletePlan(id: string) {
    try {
        await prisma.plan.delete({
            where: { id },
        });

        revalidatePath("/dashboard/super-admin/plans");
        return { success: true, message: "Plan deleted successfully" };
    } catch (error: any) {
        console.error("❌ Prisma Error:", error.message);
        return { success: false, error: "Failed to delete plan" };
    }
}
