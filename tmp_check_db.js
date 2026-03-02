const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const students = await prisma.studentAdd.findMany();
        console.log('STUDENTS:', JSON.stringify(students, null, 2));
        const teachers = await prisma.teacherAdd.findMany();
        console.log('TEACHERS:', JSON.stringify(teachers, null, 2));
    } catch (e) {
        console.error('ERROR:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
