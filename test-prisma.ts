
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        const count = await prisma.payment.count()
        console.log('Payment count:', count)
    } catch (error) {
        console.error('Test error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
