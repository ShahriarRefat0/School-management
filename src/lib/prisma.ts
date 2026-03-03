// Prisma client singleton for Next.js - Refreshed with TeacherNotice/StudyMaterial models v3
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const prismaClientSingleton = () => {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
};

declare global {
    var prismaV2: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = global.prismaV2 ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') global.prismaV2 = prisma;
