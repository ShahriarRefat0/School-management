"use server"

import { prisma } from "@/lib/prisma"; // আপনার প্রিজমা ক্লায়েন্ট পাথ নিশ্চিত করুন
import { createUser } from "./user"

export async function createSchool(formData: any) {
  try {

    const result = await prisma.$transaction(async (tx) => {

      // 1️⃣ Create School
      const newSchool = await tx.school.create({
        data: {
          schoolName: formData.schoolName,
          slug: formData.slug,
          schoolEmail: formData.schoolEmail,
          phone: formData.phone || null,
          address: formData.address || null,
          plan: formData.plan,
          duration: formData.duration,
          schoolCategory: formData.schoolCategory,
          expectedStudents: formData.expectedStudents
            ? Number(formData.expectedStudents)
            : null,
          registrationId: formData.registrationId,
          facebookUrl: formData.facebookUrl || null,
          websiteUrl: formData.websiteUrl || null,
          language: formData.language,
        },
      });

      // 2️⃣ Create Admin User
      await tx.user.create({
        data: {
          authUserId: formData.adminId,
          name: formData.adminName,
          email: formData.adminEmail,
          role: "admin",
          schoolId: newSchool.id,
        },
      });

      return newSchool;
    });

    return { success: true, data: result };

  } catch (error: any) {
    console.error("❌ Prisma Error:", error.message);

    if (error.code === "P2002") {
      return {
        success: false,
        error: "School with this Email or Slug already exists!",
      };
    }

    return {
      success: false,
      error: "Database error occurred.",
    };
  }
}




//it will show all data 

// ১. সব স্কুল ডাটা আনার জন্য (শুধু স্কুলের তথ্য)
export async function getAllSchools() {
  try {
    const schools = await prisma.school.findMany({
      select: {
        id: true,
        schoolName: true,
        schoolEmail: true,
        schoolCategory: true,
        slug: true,
        registrationId: true,
        // admin info গুলো বাদ দেওয়া হয়েছে আপনার চাহিদা মতো
      },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: schools };
  } catch (error) {
    return { success: false, error: "Failed to fetch schools" };
  }
}

// ১. আইডি দিয়ে স্কুল খুঁজে বের করা
export async function getSchoolById(id: string) {
  try {
    const school = await prisma.school.findUnique({
      where: { id }
    });
    return { success: true, data: school };
  } catch (error) {
    return { success: false, error: "School not found" };
  }
}

// ২. স্কুল আপডেট করা
export async function updateSchool(id: string, formData: any) {
  try {
    const updated = await prisma.school.update({
      where: { id },
      data: {
        ...formData,
        expectedStudents: formData.expectedStudents ? Number(formData.expectedStudents) : null,
      }
    });
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: "Update failed" };
  }
}




//------------------------eta hocce je all users-----------------------------//


// action/school.ts ফাইলে এটি যোগ করুন

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
  include: {
    school: {
      select: {
        schoolName: true,
      },
    },
  },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { success: true, data: users };
  } catch (error: any) {
    console.error("❌ Prisma User Fetch Error:", error.message);
    return { success: false, error: "ইউজার ডাটা আনতে সমস্যা হয়েছে।" };
  }
}




