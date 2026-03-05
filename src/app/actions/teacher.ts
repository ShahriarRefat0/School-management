"use server"

import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"
// import { email, success } from "zod"

export async function addTeacher(formData: any) {
    console.log("📥 Receiving teacher request:", formData.teacherId);
    
  const currentUser = await getCurrentUser()
console.log("🥲CURRENT USER:", currentUser)
  if (!currentUser) {
    console.log("user nai", currentUser)
    return { success: false, error: "Unauthorized , token nai" }
  }

  try {
    const schoolId = currentUser.schoolId

    const result = await prisma.$transaction(async (tx) => {

      const birthDate = new Date(formData.dateOfBirth)
      if (isNaN(birthDate.getTime())) {
        throw new Error("Invalid date format")
      }

      // 1️⃣ Create User first
      const user = await tx.user.create({
        data: {
          authUserId: crypto.randomUUID(), // temporary until supabase part added
          name: formData.firstName,
          email: formData.email,
          role: "teacher",
          schoolId: schoolId,
        },
      })

      // 2️⃣ Create Teacher and connect user
      const newTeacher = await tx.teacher.create({
        data: {
          teacherId: formData.teacherId,
        //   firstName: formData.firstName,
        //   lastName: formData.lastName,
        //   email: formData.email,
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
          user: {
  connect: {
    id: user.id
  }
}
        },
      })

      return newTeacher
    })

    return { success: true, data: result }

  } catch (error: any) {

    if (error.code === "P2002") {
      return { success: false, error: "Email or Teacher ID already exists!" }
    }

    return { success: false, error: error.message }
  }
}


export async function getTeachers() {
    try {
        if (!prisma.teacher) return { success: false, error: "Database error." };
        const teachers = await prisma.teacher.findMany({
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
        const updated = await prisma.teacher.update({
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
        await prisma.teacher.delete({
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
        let teacher = await prisma.teacher.findUnique({
            where: { teacherId: id }
        });

        // If not found, try finding by UUID
        if (!teacher) {
            teacher = await prisma.teacher.findUnique({
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