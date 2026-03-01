"use server"

import { prisma } from "@/lib/prisma"

export async function addStudent(formData: {
    registrationNo: string
    firstName: string
    lastName: string
    dateOfBirth: string
    gender: string
    bloodGroup?: string
    religion?: string
    currentClass: string
    section: string
    rollNo: number
    session: string
    fatherName: string
    motherName: string
    guardianPhone: string
    emergencyContact?: string
    email?: string
    presentAddress: string
    permanentAddress?: string
}) {
    console.log("📥 Receiving student request:", formData.registrationNo);

    try {
        if (!prisma.studentAdd) {
            console.error("❌ Prisma studentAdd model is UNDEFINED!");
            return { success: false, error: "Database error: Student model missing." };
        }

        // Date parsing with validation
        const birthDate = new Date(formData.dateOfBirth);
        if (isNaN(birthDate.getTime())) {
            return { success: false, error: "জন্ম তারিখ ভুল ফরম্যাটে আছে!" };
        }

        const newStudent = await prisma.studentAdd.create({
            data: {
                registrationNo: formData.registrationNo,
                firstName: formData.firstName,
                lastName: formData.lastName,
                dateOfBirth: birthDate,
                gender: formData.gender,
                bloodGroup: formData.bloodGroup?.trim() || null,
                religion: formData.religion?.trim() || null,
                currentClass: formData.currentClass,
                section: formData.section,
                rollNo: Number(formData.rollNo),
                session: formData.session,
                fatherName: formData.fatherName,
                motherName: formData.motherName,
                guardianPhone: formData.guardianPhone,
                emergencyContact: formData.emergencyContact?.trim() || null,
                email: formData.email?.trim() || null,
                presentAddress: formData.presentAddress,
                permanentAddress: formData.permanentAddress?.trim() || null,
            },
        })

        console.log("✅ Student successfully created:", newStudent.id)
        return { success: true, data: newStudent }

    } catch (error: any) {
        console.error("❌ Student Create Database Error:", error);

        if (error.code === 'P2002') {
            const fields = error.meta?.target || [];
            if (fields.includes('registrationNo')) {
                return { success: false, error: "এই Registration No টি আগেই ব্যবহার করা হয়েছে!" };
            }
            if (fields.includes('email')) {
                return { success: false, error: "এই Email টি আগেই ব্যবহার করা হয়েছে!" };
            }
            return { success: false, error: "এই তথ্যটি আগে থেকেই ডাটাবেসে আছে!" };
        }

        return { success: false, error: `সার্ভার এরর: ${error.message || "Database error occurred"}` }
    }
}

export async function getStudents() {
    try {
        if (!prisma.studentAdd) return { success: false, error: "Database error." };
        const students = await prisma.studentAdd.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return { success: true, data: students }
    } catch (error: any) {
        console.error("❌ Get Students Error:", error.message)
        return { success: false, error: "ছাত্র-ছাত্রীদের তথ্য লোড করতে সমস্যা হয়েছে।" }
    }
}

export async function updateStudent(id: string, formData: any) {
    try {
        const birthDate = formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined;

        const updated = await prisma.studentAdd.update({
            where: { registrationNo: id },
            data: {
                ...formData,
                rollNo: formData.rollNo ? Number(formData.rollNo) : undefined,
                dateOfBirth: birthDate,
            }
        });
        return { success: true, data: updated };
    } catch (error: any) {
        console.error("❌ Update Student Error:", error.message);
        return { success: false, error: "তথ্য আপডেট করতে সমস্যা হয়েছে।" };
    }
}

export async function deleteStudent(id: string) {
    try {
        await prisma.studentAdd.delete({
            where: { registrationNo: id }
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: "মুছে ফেলতে সমস্যা হয়েছে।" };
    }
}

export async function getStudent(id: string) {
    console.log("🔍 Fetching student with ID:", id);
    try {
        // Try finding by registration No first
        let student = await prisma.studentAdd.findUnique({
            where: { registrationNo: id }
        });

        // If not found, try finding by UUID
        if (!student) {
            student = await prisma.studentAdd.findUnique({
                where: { id: id }
            });
        }

        if (!student) {
            return { success: false, error: "Student record not found in database." };
        }

        return { success: true, data: student };
    } catch (error: any) {
        console.error("❌ getStudent Error:", error.message);
        return { success: false, error: "Database communication failed." };
    }
}
