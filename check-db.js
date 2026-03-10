const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkSchools() {
  try {
    const schoolCount = await prisma.school.count();
    console.log(`School Count: ${schoolCount}`);
    if (schoolCount > 0) {
      const firstSchool = await prisma.school.findFirst();
      console.log('First School:', JSON.stringify(firstSchool, null, 2));
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchools();
