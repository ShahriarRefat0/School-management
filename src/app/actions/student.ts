"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { supabaseAdmin } from "@/lib/supabase/admin"

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
    password?: string
}) {
    console.log("📥 Receiving student request:", formData.registrationNo);

    const currentUser = await getCurrentUser()
    console.log("🛠️ [addStudent] Current User status:", !!currentUser, "Role:", currentUser?.role)

    if (!currentUser || (currentUser.role as string) !== 'admin') {
        return { success: false, error: "Unauthorized: Principal access required." }
    }

    let authUserId: string | null = null;
    try {
        if (!prisma.student) {
            console.error("❌ Prisma student model is UNDEFINED!");
            return { success: false, error: "Database error: Student model missing." };
        }

        // 🛡️ CRITICAL KEY CHECK
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
            return { success: false, error: "Server Configuration Error: Admin key is missing." };
        }

        // Date parsing with validation
        const birthDate = new Date(formData.dateOfBirth);
        if (isNaN(birthDate.getTime())) {
            return { success: false, error: "জন্ম তারিখ ভুল ফরম্যাটে আছে!" };
        }

        // Sanitize registration number for safe email (no spaces/special chars)
        const sanitizedReg = formData.registrationNo.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const safeEmail = formData.email?.trim() || `st.${sanitizedReg}@school.site`;

        // 1. Create Student Auth Account via Admin Client
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: safeEmail,
            password: formData.password || "Student@1234",
            email_confirm: true,
            user_metadata: { role: 'student' }
        });

        if (authError) {
            console.error("❌ Student Auth Creation Error:", authError.message);
            if (authError.message.includes("already registered")) {
                return { success: false, error: "এই ইমেইলটি আগে থেকেই নিবন্ধিত আছে।" };
            }
            return { success: false, error: "Auth Error: " + authError.message };
        }

        authUserId = authData.user.id;
        let createdStudent: any;

        await prisma.$transaction(async (tx: any) => {
            const schoolId = currentUser.schoolId; // Always use principal's school
            if (!schoolId) throw new Error("Unauthorized: School ID not found for this user.");

            // 2. Update or create the user record
            const newUser = await tx.user.upsert({
                where: { authUserId: authUserId as string },
                update: {
                    name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Unknown Student',
                    email: safeEmail,
                    schoolId: schoolId,
                    role: 'student',
                    status: 'active'
                },
                create: {
                    authUserId: authUserId as string,
                    name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Unknown Student',
                    email: safeEmail,
                    schoolId: schoolId,
                    role: 'student',
                    status: 'active'
                }
            });

            // 3. Create the student linked to user
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
                    sectionName: formData.section,
                    rollNo: Number(formData.rollNo),
                    session: formData.session,
                    fatherName: formData.fatherName,
                    motherName: formData.motherName,
                    guardianPhone: formData.guardianPhone,
                    emergencyContact: formData.emergencyContact?.trim() || null,
                    email: safeEmail,
                    presentAddress: formData.presentAddress,
                    permanentAddress: formData.permanentAddress?.trim() || null,
                    schoolId: schoolId,
                    userId: newUser.id
                },
            });
        });

        console.log("✅ Student successfully created:", createdStudent?.id);
        return { success: true, data: createdStudent };

    } catch (error: any) {
        console.error("❌ Student Create Database Error:", error);

        // Rollback Auth User if Prisma fails
        if (authUserId) {
            await supabaseAdmin.auth.admin.deleteUser(authUserId).catch(err =>
                console.error("Failed to rollback auth account:", err)
            );
        }

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
    const currentUser = await getCurrentUser()
    if (!currentUser || (currentUser.role as string) !== 'admin') {
        return { success: false, error: "Unauthorized: Principal access required." }
    }
    try {
        if (!prisma.student) return { success: false, error: "Database error." };
        const students = await prisma.student.findMany({
            where: { schoolId: currentUser.schoolId },
            orderBy: { createdAt: 'desc' }
        })
        return { success: true, data: students }
    } catch (error: any) {
        console.error("âŒ Get Students Error:", error.message)
        return { success: false, error: "à¦›à¦¾à¦¤à§à¦°-à¦›à¦¾à¦¤à§à¦°à§€à¦¦à§‡à¦° à¦¤à¦¥à§à¦¯ à¦²à§‹à¦¡ à¦•à¦°à¦¤à§‡ à¦¸à¦®à¦¸à§à¦¯à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡à¥¤" }
    }
}

export async function updateStudent(id: string, formData: any) {
    const currentUser = await getCurrentUser()
    if (!currentUser || (currentUser.role as string) !== 'admin') {
        return { success: false, error: "Unauthorized: Principal access required." }
    }
    try {
        const birthDate = formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined;

        let student = await prisma.student.findFirst({
            where: { registrationNo: id, schoolId: currentUser.schoolId }
        });

        if (!student && id.length > 20) {
            student = await prisma.student.findFirst({
                where: { id, schoolId: currentUser.schoolId }
            });
        }

        if (!student) {
            return { success: false, error: "Student not found." };
        }

        const updated = await prisma.student.update({
            where: { id: student.id },
            data: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender,
                bloodGroup: formData.bloodGroup || null,
                religion: formData.religion || null,
                currentClass: formData.currentClass,
                sectionName: formData.section, // Map frontend 'section' to DB 'sectionName'
                rollNo: formData.rollNo ? Number(formData.rollNo) : undefined,
                session: formData.session,
                fatherName: formData.fatherName,
                motherName: formData.motherName,
                guardianPhone: formData.guardianPhone,
                emergencyContact: formData.emergencyContact || null,
                email: formData.email,
                presentAddress: formData.presentAddress,
                permanentAddress: formData.permanentAddress || null,
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
    const currentUser = await getCurrentUser()
    if (!currentUser || (currentUser.role as string) !== 'admin') {
        return { success: false, error: "Unauthorized: Principal access required." }
    }
    try {
        let student = await prisma.student.findFirst({
            where: { registrationNo: id, schoolId: currentUser.schoolId }
        });

        if (!student && id.length > 20) {
            student = await prisma.student.findFirst({
                where: { id, schoolId: currentUser.schoolId }
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
    const currentUser = await getCurrentUser()
    if (!currentUser || (currentUser.role as string) !== 'admin') {
        return { success: false, error: "Unauthorized: Principal access required." }
    }
    try {
        // Try finding by registration No first (scoped to school)
        let student = await prisma.student.findFirst({
            where: { registrationNo: id, schoolId: currentUser.schoolId }
        });

        // If not found, try finding by UUID (scoped to school)
        if (!student && id.length > 20) {
            student = await prisma.student.findFirst({
                where: { id: id, schoolId: currentUser.schoolId }
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
            const currentUser = await getCurrentUser();
            const schoolId = currentUser?.schoolId;

            if (!schoolId) {
                return { success: false, error: "System Error: Authorized school ID not found." };
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
                        sectionName: data.section || '',
                        rollNo: Number(data.rollNo) || 0,
                        session: data.session || '',
                        fatherName: data.fatherName || '',
                        motherName: data.motherName || '',
                        guardianPhone: data.guardianPhone || '',
                        emergencyContact: data.emergencyContact?.trim() || null,
                        email: data.email?.trim() || null,
                        presentAddress: data.presentAddress || '',
                        permanentAddress: data.permanentAddress?.trim() || null,
                        schoolId: schoolId,
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
