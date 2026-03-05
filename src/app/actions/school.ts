"use server"

import { prisma } from "@/lib/prisma"; 
import { revalidatePath } from "next/cache"; // এটি খুবই জরুরি ডাটা সাথে সাথে দেখানোর জন্য

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
          plan: formData.plan || "basic",
          duration: formData.duration || "12",
          schoolCategory: formData.schoolCategory,
          expectedStudents: formData.expectedStudents
            ? Number(formData.expectedStudents)
            : null,
          registrationId: formData.registrationId,
          facebookUrl: formData.facebookUrl || null,
          websiteUrl: formData.websiteUrl || null,
          language: formData.language || "english",
        },
      });

      // 2️⃣ Create Admin User
      await tx.user.create({
        data: {
          authUserId: supabaseUser.data.user?.id, // Supabase থেকে আসা ID
          name: formData.adminName,
          email: formData.adminEmail,
          role: "admin",
          schoolId: newSchool.id,
          status: "active"
        },
      });

      return newSchool;
    });

    // যাতে ইউজার নতুন ডাটা দেখতে পায়
    revalidatePath("/schools"); 
    revalidatePath("/"); 

    return { success: true, data: result };

  } catch (error: any) {
    console.error("❌ Prisma Error:", error);

    // ইউনিক কনস্ট্রেইন্ট এরর চেক (ইমেইল বা স্ল্যাগ মিলে গেলে)
    if (error.code === "P2002") {
      const field = error.meta?.target?.[0] || "field";
      return {
        success: false,
        error: `This ${field} is already in use. Please use a unique one.`,
      };
    }

    return {
      success: false,
      error: error.message || "Database error occurred.",
    };
  }
}

// ১. সব স্কুল ডাটা আনার জন্য
export async function getAllSchools() {
  try {
    const schools = await prisma.school.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: schools };
  } catch (error) {
    return { success: false, error: "Failed to fetch schools" };
  }
}

// ২. সব ইউজার ডাটা আনার জন্য (স্কুলের নাম সহ)
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
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: users };
  } catch (error: any) {
    return { success: false, error: "ইউজার ডাটা আনতে সমস্যা হয়েছে।" };
  }
}
// ১. স্কুল আপডেট করার ফাংশন
export async function updateSchool(id: string, formData: any) {
  try {
    const updated = await prisma.school.update({
      where: { id },
      data: {
        schoolName: formData.schoolName,
        slug: formData.slug,
        schoolEmail: formData.schoolEmail,
        phone: formData.phone || null,
        address: formData.address || null,
        plan: formData.plan,
        duration: formData.duration,
        schoolCategory: formData.schoolCategory,
        expectedStudents: formData.expectedStudents ? Number(formData.expectedStudents) : null,
        registrationId: formData.registrationId,
        facebookUrl: formData.facebookUrl || null,
        websiteUrl: formData.websiteUrl || null,
        language: formData.language,
      },
    });

    revalidatePath("/schools"); // যেখানে লিস্ট দেখান সেই পাথ
    revalidatePath(`/schools/${id}`); // স্পেসিফিক পেজ থাকলে
    
    return { success: true, data: updated };
  } catch (error: any) {
    console.error("❌ Update Error:", error.message);
    return { success: false, error: "Update failed: " + error.message };
  }
}

// এই ফাংশনটি আপনার action/school.ts এ যোগ করুন
export async function getSchoolById(id: string) {
  try {
    const school = await prisma.school.findUnique({
      where: { id }
    });
    if (!school) return { success: false, error: "School not found" };
    return { success: true, data: school };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ২. স্কুল ডিলিট করার ফাংশন (ফিক্সড)
export async function deleteSchool(id: string) {
  try {
    // transaction ব্যবহার করছি যাতে ইউজার এবং স্কুল দুটাই ডিলিট হয়
    await prisma.$transaction(async (tx) => {
      
      // ১. প্রথমে এই স্কুলের সাথে যুক্ত সব ইউজার ডিলিট করতে হবে
      await tx.user.deleteMany({
        where: { schoolId: id },
      });

      // ২. এবার স্কুল ডিলিট হবে
      await tx.school.delete({
        where: { id },
      });
    });

    // আপনার লিস্ট পেজের পাথটি রিভ্যালিডেট করুন
    revalidatePath("/dashboard/super-admin/schools"); 
    
    return { success: true, message: "School and its users deleted successfully" };
  } catch (error: any) {
    console.error("❌ Delete Error:", error.message);
    return { 
      success: false, 
      error: "এই স্কুলের অধীনে ডাটা (User/Student) থাকায় ডিলিট করা যাচ্ছে না।" 
    };
  }
}