const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    try {
        const s = await prisma.studentAdd.findFirst();
        console.log('STUDENT:', s);
        const t = await prisma.teacherAdd.findFirst();
        console.log('TEACHER:', t);
    } catch (e) {
        console.error('ERROR:', e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
