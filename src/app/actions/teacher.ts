"use server"

import { prisma } from "@/lib/prisma"

export async function addTeacher(formData: {
    teacherId: string
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    gender: string
    bloodGroup?: string
    religion?: string
    designation: string
    department: string
    qualification: string
    presentAddress: string
    permanentAddress?: string
}) {
    console.log("📥 Receiving teacher request:", formData.teacherId);

    try {
        if (!prisma.teacherAdd) {
            console.error("❌ Prisma teacherAdd model is UNDEFINED!");
            return { success: false, error: "Database error: Teacher model missing." };
        }

        // Date parsing with validation
        const birthDate = new Date(formData.dateOfBirth);
        if (isNaN(birthDate.getTime())) {
            return { success: false, error: "জন্ম তারিখ ভুল ফরম্যাটে আছে!" };
        }

        const newTeacher = await prisma.teacherAdd.create({
            data: {
                teacherId: formData.teacherId,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                dateOfBirth: birthDate,
                gender: formData.gender,
                bloodGroup: formData.bloodGroup?.trim() || null,
                religion: formData.religion?.trim() || null,
                designation: formData.designation,
                department: formData.department,
                qualification: formData.qualification,
                presentAddress: formData.presentAddress,
                permanentAddress: formData.permanentAddress?.trim() || null,
            },
        })

        console.log("✅ Teacher successfully created:", newTeacher.id)
        return { success: true, data: newTeacher }

    } catch (error: any) {
        console.error("❌ Teacher Create Database Error:", error);

        if (error.code === 'P2002') {
            const fields = error.meta?.target || [];
            if (fields.includes('teacherId')) {
                return { success: false, error: "এই Teacher ID টি আগেই ব্যবহার করা হয়েছে!" };
            }
            if (fields.includes('email')) {
                return { success: false, error: "এই Email টি আগেই ব্যবহার করা হয়েছে!" };
            }
            return { success: false, error: "এই তথ্যটি আগে থেকেই ডাটাবেসে আছে!" };
        }

        return { success: false, error: `সার্ভার এরর: ${error.message || "Database error occurred"}` }
    }
}

export async function getTeachers() {
    try {
        if (!prisma.teacherAdd) return { success: false, error: "Database error." };
        const teachers = await prisma.teacherAdd.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return { success: true, data: teachers }
    } catch (error: any) {
        console.error("❌ Get Teachers Error:", error.message)
        return { success: false, error: "শিক্ষকদের তথ্য লোড করতে সমস্যা হয়েছে।" }
    }
}

export async function updateTeacher(id: string, formData: any) {
    try {
        const birthDate = formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined;
        const updated = await prisma.teacherAdd.update({
            where: { teacherId: id },
            data: {
                ...formData,
                dateOfBirth: birthDate,
            }
        });
        return { success: true, data: updated };
    } catch (error: any) {
        console.error("❌ Update Teacher Error:", error.message);
        return { success: false, error: "তথ্য আপডেট করতে সমস্যা হয়েছে।" };
    }
}

export async function deleteTeacher(id: string) {
    try {
        await prisma.teacherAdd.delete({
            where: { teacherId: id }
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: "মুছে ফেলতে সমস্যা হয়েছে।" };
    }
}

export async function getTeacher(id: string) {
    console.log("🔍 Fetching teacher with ID:", id);
    try {
        // Try finding by public teacherId first
        let teacher = await prisma.teacherAdd.findUnique({
            where: { teacherId: id }
        });

        // If not found, try finding by UUID
        if (!teacher) {
            teacher = await prisma.teacherAdd.findUnique({
                where: { id: id }
            });
        }

        if (!teacher) {
            return { success: false, error: "Teacher profile not found in directory." };
        }

        return { success: true, data: teacher };
    } catch (error: any) {
        console.error("❌ getTeacher Error:", error.message);
        return { success: false, error: "Failed to communicate with faculty database." };
    }
}
