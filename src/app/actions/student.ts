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
        if (!prisma.student) {
            console.error("❌ Prisma student model is UNDEFINED!");
            return { success: false, error: "Database error: Student model missing." };
        }

        // Date parsing with validation
        const birthDate = new Date(formData.dateOfBirth);
        if (isNaN(birthDate.getTime())) {
            return { success: false, error: "জন্ম তারিখ ভুল ফরম্যাটে আছে!" };
        }

        let createdStudent: any;

        await prisma.$transaction(async (tx) => {
            let schoolId = "default-school-id";
            const firstSchool = await tx.school.findFirst();
            if (firstSchool) {
                schoolId = firstSchool.id;
            }

            const authUserId = `auth-${formData.registrationNo}-${Date.now()}`;
            const safeEmail = formData.email?.trim() || `student_${formData.registrationNo}@school.local`;

            // Ensure email uniqueness before user creation
            const existingUserWithEmail = await tx.user.findUnique({
                where: { email: safeEmail }
            });

            const finalEmail = existingUserWithEmail ? `student_${formData.registrationNo}_${Date.now()}@school.local` : safeEmail;

            // 1. Create the user
            const newUser = await tx.user.create({
                data: {
                    authUserId: authUserId,
                    name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Unknown Student',
                    email: finalEmail,
                    schoolId: schoolId,
                    role: 'student',
                    status: 'active'
                }
            });

            // 2. Create the student linked to user
            createdStudent = await tx.student.create({
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
                    userId: newUser.id
                },
            });
        });

        console.log("✅ Student successfully created:", createdStudent?.id);
        return { success: true, data: createdStudent };

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
        if (!prisma.student) return { success: false, error: "Database error." };
        const students = await prisma.student.findMany({
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

        let student = await prisma.student.findFirst({
            where: { registrationNo: id }
        });

        if (!student && id.length > 20) {
            student = await prisma.student.findUnique({
                where: { id }
            });
        }

        if (!student) {
            return { success: false, error: "Student not found." };
        }

        const updated = await prisma.student.update({
            where: { id: student.id },
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
        let student = await prisma.student.findFirst({
            where: { registrationNo: id }
        });

        if (!student && id.length > 20) {
            student = await prisma.student.findUnique({
                where: { id }
            });
        }

        if (!student) {
            return { success: false, error: "Student not found." };
        }

        await prisma.student.delete({
            where: { id: student.id }
        });

        if (student.userId) {
            await prisma.user.delete({
                where: { id: student.userId }
            });
        }

        return { success: true };
    } catch (error: any) {
        console.error("❌ Delete Student Error:", error.message);
        return { success: false, error: "মুছে ফেলতে সমস্যা হয়েছে।" };
    }
}

export async function getStudent(id: string) {
    console.log("🔍 Fetching student with ID:", id);
    try {
        // Try finding by registration No first
        let student = await prisma.student.findFirst({
            where: { registrationNo: id }
        });

        // If not found, try finding by UUID
        if (!student && id.length > 20) {
            student = await prisma.student.findUnique({
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

export async function addMultipleStudents(studentsData: any[]) {
    console.log(`📥 Receiving bulk student request: ${studentsData.length} records`);

    try {
        if (!prisma.student || !prisma.user) {
            return { success: false, error: "Database error: Models missing." };
        }

        // Find existing registration numbers to avoid duplicates
        const registrationNos = studentsData.map(s => s.registrationNo).filter(Boolean);
        const existingStudents = await prisma.student.findMany({
            where: {
                registrationNo: {
                    in: registrationNos
                }
            },
            select: { registrationNo: true }
        });

        const existingRegNos = existingStudents.map(s => s.registrationNo);
        const newStudentsData = studentsData.filter(s => !existingRegNos.includes(s.registrationNo));

        if (newStudentsData.length === 0) {
            return {
                success: false,
                error: "All provided registration numbers already exist in the database.",
                skipped: studentsData.length
            };
        }

        let createdCount = 0;

        await prisma.$transaction(async (tx) => {
            let schoolId = "default-school-id";
            const firstSchool = await tx.school.findFirst();
            if (firstSchool) {
                schoolId = firstSchool.id;
            }

            for (const data of newStudentsData) {
                const birthDate = data.dateOfBirth ? new Date(data.dateOfBirth) : new Date();
                const validBirthDate = isNaN(birthDate.getTime()) ? new Date() : birthDate;

                const authUserId = `auth-${data.registrationNo}-${Date.now()}`;
                const safeEmail = data.email?.trim() || `student_${data.registrationNo}@school.local`;

                // Ensure email uniqueness before user creation
                const existingUserWithEmail = await tx.user.findUnique({
                    where: { email: safeEmail }
                });

                const finalEmail = existingUserWithEmail ? `student_${data.registrationNo}_${Date.now()}@school.local` : safeEmail;

                const newUser = await tx.user.create({
                    data: {
                        authUserId: authUserId,
                        name: `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Unknown Student',
                        email: finalEmail,
                        schoolId: schoolId,
                        role: 'student',
                        status: 'active'
                    }
                });

                await tx.student.create({
                    data: {
                        registrationNo: data.registrationNo,
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        dateOfBirth: validBirthDate,
                        gender: data.gender || 'Unknown',
                        bloodGroup: data.bloodGroup?.trim() || null,
                        religion: data.religion?.trim() || null,
                        currentClass: data.currentClass || '',
                        section: data.section || '',
                        rollNo: Number(data.rollNo) || 0,
                        session: data.session || '',
                        fatherName: data.fatherName || '',
                        motherName: data.motherName || '',
                        guardianPhone: data.guardianPhone || '',
                        emergencyContact: data.emergencyContact?.trim() || null,
                        email: data.email?.trim() || null,
                        presentAddress: data.presentAddress || '',
                        permanentAddress: data.permanentAddress?.trim() || null,
                        userId: newUser.id
                    }
                });
                createdCount++;
            }
        });

        console.log(`✅ Successfully bulk added ${createdCount} students`);

        return {
            success: true,
            count: createdCount,
            skipped: studentsData.length - createdCount
        };

    } catch (error: any) {
        console.error("❌ Bulk Student Create Error:", error);
        if (error.code === 'P2002') {
            return { success: false, error: "A unique constraint failed during import (such as duplicate Email or Registration No within the file)." };
        }
        return { success: false, error: `সার্ভার এরর: ${error.message || "Database error occurred"}` };
    }
}
