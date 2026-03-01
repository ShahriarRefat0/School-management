const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

console.log('PRISMA KEYS:', Object.keys(prisma).filter(k => !k.startsWith('_')));
prisma.$disconnect();
