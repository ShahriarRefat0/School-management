"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * --- ইউজার ম্যানেজমেন্ট সেকশন ---
 */

// ১. শুধুমাত্র SUPER_ADMIN ইউজারদের লিস্ট নিয়ে আসা
export async function getSuperAdminUsers() {
  try {
    const users = await prisma.user.findMany({
      where: { role: 'super_admin' },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: users };
  } catch (error) {
    return { success: false, error: "Failed to fetch users" };
  }
}

// ২. নতুন SUPER_ADMIN তৈরি করা
export async function createSuperAdmin(userData: { name: string; email: string; password?: string }) {
  let authUserId: string | null = null;
  try {
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: userData.email,
      password: userData.password || "Super@Admin123",
      email_confirm: true,
      user_metadata: { role: 'super_admin', name: userData.name }
    });

    if (authError) throw new Error(authError.message);
    authUserId = authData.user.id;

    const firstSchool = await prisma.school.findFirst();
    // schoolId is now optional, so we don't throw error if no school exists

    const newUser = await prisma.user.create({
      data: {
        authUserId: authUserId!,
        name: userData.name,
        email: userData.email,
        role: 'super_admin', 
        schoolId: firstSchool?.id || null, 
        status: "active",
      }
    });

    revalidatePath("/dashboard/super-admin/profile");
    return { success: true, data: newUser };
  } catch (error: any) {
    if (authUserId) await supabaseAdmin.auth.admin.deleteUser(authUserId);
    return { success: false, error: error.message };
  }
}



// ১. সুপার এডমিন ডিলিট করা (Auth + DB)
export async function deleteSuperAdmin(userId: string, authUserId: string) {
  try {
    // ক) সুপাবেস অথেন্টিকেশন থেকে ডিলিট
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(authUserId);
    if (authError) throw new Error(authError.message);

    // খ) প্রিজমা ডাটাবেস থেকে ডিলিট
    await prisma.user.delete({
      where: { id: userId }
    });

    revalidatePath("/dashboard/super-admin/profile");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}



// ৩. সুপার এডমিন তৈরি (আগের কোড)

// ৪. কনফিগ হ্যান্ডলিং (লোগো সহ)
export async function getSystemConfig() {
    try {
      const config = await prisma.systemConfig.findUnique({ where: { id: "system_config" } });
      return { success: true, data: config };
    } catch (error) {
      return { success: false };
    }
}

export async function updateSystemConfig(data: any) {
    try {
      const config = await prisma.systemConfig.upsert({
        where: { id: "system_config" },
        update: data,
        create: { id: "system_config", ...data }
      });
      revalidatePath("/dashboard/super-admin/profile");
      return { success: true, data: config };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
}





