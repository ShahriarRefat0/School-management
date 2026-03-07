"use server"

import { prisma } from "@/lib/prisma"

export async function getPayments() {
    try {
        const payments = await prisma.payment.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 10 // Get last 10 payments
        })
        return payments
    } catch (error) {
        console.error("Error fetching payments:", error)
        return []
    }
}
