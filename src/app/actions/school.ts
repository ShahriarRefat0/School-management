"use server"

import { prisma } from "@/lib/prisma"; // আপনার প্রিজমা ক্লায়েন্ট পাথ নিশ্চিত করুন

export async function createSchool(formData: any) {
  try {
    const newSchool = await prisma.school.create({
      data: {
        schoolName: formData.schoolName,
        slug: formData.slug,
        schoolEmail: formData.schoolEmail,
        phone: formData.phone,
        address: formData.address,
        plan: formData.plan,
        duration: formData.duration,
        schoolCategory: formData.schoolCategory,
        // String কে Number এ কনভার্ট করা হচ্ছে কারণ Prisma-তে Int আছে
        expectedStudents: formData.expectedStudents ? Number(formData.expectedStudents) : null, 
        registrationId: formData.registrationId,
        facebookUrl: formData.facebookUrl,
        websiteUrl: formData.websiteUrl,
        language: formData.language,
        adminName: formData.adminName,
        adminEmail: formData.adminEmail,
        adminPassword: formData.adminPassword,
      },
    });

    console.log("✅ Database record created:", newSchool.id);
    return { success: true, data: newSchool };

  } catch (error: any) {
    console.error("❌ Prisma Error:", error.message);
    
    // ডুপ্লিকেট ডাটার এরর হ্যান্ডেল করা (Email বা Slug মিলে গেলে)
    if (error.code === 'P2002') {
      return { success: false, error: "School with this Email or Slug already exists!" };
    }
    
    return { success: false, error: "Database error occurred. Please try again." };
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
    const users = await prisma.school.findMany({
      select: {
        id: true,
        adminName: true,      // Owner Identity (Name)
        adminEmail: true,     // Owner Identity (Email)
        schoolName: true,     // Institution
        createdAt: true,      // Joined Date
        // যদি আপনার স্কিমাতে 'status' না থাকে, তবে আমরা ডিফল্ট 'Active' ধরে নেব
        // আপনি স্কিমাতে status String @default("active") যোগ করে নিতে পারেন
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




