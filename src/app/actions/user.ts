"use server"

import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"

export async function createUser(data: {
  authUserId: string
  name: string
  email: string
  role: Role
  schoolId: string
}) {
  try {
    return await prisma.user.create({
      data
    })
  } catch (error: any) {
    console.error("❌ Create User Error:", error.message)

    if (error.code === "P2002") {
      throw new Error("User with this email or auth ID already exists.")
    }

    throw new Error("Failed to create user.")
  }
}