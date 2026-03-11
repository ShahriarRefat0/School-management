"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createSchool(formData: any) {
  console.log("📥 Creating new school and principal:", formData.schoolName);

  const currentUser = await getCurrentUser();
  if (!currentUser || (currentUser.role as string) !== 'super_admin') {
    console.error("❌ Unauthorized access attempt by:", currentUser?.email || "Unknown");
    return { success: false, error: "Unauthorized: Super Admin access required." };
  }

  let authUserId: string | null = null;

  try {
    // 🛡️ CRITICAL KEY CHECK
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return { success: false, error: "Server Configuration Error: Admin key is missing." };
    }

    // 1️⃣ Create the Principal in Supabase Auth via Admin Client
    // This avoids client-side 422 errors and prevents session collisions
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: formData.adminEmail,
      password: formData.adminPassword || "School@1234", // Default password
      email_confirm: true,
      user_metadata: { role: 'admin' }
    });

    if (authError) {
      console.error("❌ Supabase Admin Auth Error:", authError.message);
      if (authError.message.includes("already registered")) {
        return { success: false, error: "This admin email is already registered." };
      }
      return { success: false, error: "Auth Error: " + authError.message };
    }

    authUserId = authData.user.id;

    const result = await prisma.$transaction(async (tx: any) => {
      // 2️⃣ Create School
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
          expectedStudents: formData.expectedStudents ? Number(formData.expectedStudents) : null,
          registrationId: formData.registrationId,
          facebookUrl: formData.facebookUrl || null,
          websiteUrl: formData.websiteUrl || null,
          language: formData.language || "english",
        },
      });

      // 3️⃣ Update or Create Admin User record
      await tx.user.upsert({
        where: { authUserId: authUserId as string },
        update: {
          name: formData.adminName,
          email: formData.adminEmail,
          role: "admin",
          schoolId: newSchool.id,
          status: "active"
        },
        create: {
          authUserId: authUserId as string,
          name: formData.adminName,
          email: formData.adminEmail,
          role: "admin",
          schoolId: newSchool.id,
          status: "active"
        },
      });

      return newSchool;
    });

    // Revalidate paths for Super Admin and public views
    revalidatePath("/dashboard/super-admin/schools");
    revalidatePath("/schools");
    revalidatePath("/");

    return { success: true, data: result };

  } catch (error: any) {
    console.error("❌ createSchool CRITICAL ERROR:", error);

    // Rollback Auth User if Prisma fails
    if (authUserId) {
      await supabaseAdmin.auth.admin.deleteUser(authUserId).catch(err =>
        console.error("Failed to rollback auth string:", err)
      );
    }

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
    await prisma.$transaction(async (tx: any) => {

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

// plan chart 
export async function getPlanStats() {
  const plans = await prisma.school.groupBy({
    by: ["plan"],
    _count: {
      plan: true
    }
  })

  return plans
}