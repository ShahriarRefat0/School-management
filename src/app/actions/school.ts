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