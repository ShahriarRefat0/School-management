"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function createAnnouncement(formData: any) {
  try {
    // নিশ্চিত করুন schoolId আসছে
    if (!formData.schoolId) return { success: false, error: "School ID is missing!" };

    const currentUser = await getCurrentUser();
    if (!currentUser) return { success: false, error: "Authentication required" };

    const newNotice = await prisma.announcement.create({
      data: {
        title: formData.title,
        content: formData.content,
        audience: formData.audience,
        targetClass: formData.audience === "students" ? formData.targetClass : null,
        category: formData.category,
        priority: formData.priority,
        schoolId: currentUser.schoolId || formData.schoolId,
        authorId: currentUser.id,
        authorName: currentUser.name,
        status: "published",
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : null,
      },
    });

    // সঠিক পাথ দিন
    revalidatePath("/dashboard/principal/announcements");
    return { success: true, data: newNotice };

  } catch (error: any) {
    console.error("❌ Announcement Error:", error.message);
    return { success: false, error: "Error: " + error.message };
  }
}

export async function getAnnouncements(schoolId: string) {
  if (!schoolId) return { success: false, error: "No School ID provided" };
  try {
    const data = await prisma.announcement.findMany({
      where: { schoolId: schoolId },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to fetch announcements" };
  }
}