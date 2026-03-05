import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getSchoolUsers(schoolId: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        schoolId: schoolId, // নির্দিষ্ট স্কুলের ইউজারদের ফিল্টার করবে
      },
      include: {
        // ইউজারের সাথে স্কুলের তথ্যও আসবে
        school: {
          select: {
            schoolName: true,
            slug: true,
          },
        },
        // যদি ইউজারটি Student হয়, তবে তার ডাটা আসবে
        student: true, 
        // যদি ইউজারটি Teacher হয়, তবে তার ডাটা আসবে
        teacher: true, 
      },
      orderBy: {
        createdAt: "desc", // নতুন ইউজার আগে দেখাবে
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}