
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { role: 'parent' },
    include: { parent: true }
  });

  console.log("--- Parent Users Search ---");
  for (const user of users) {
    console.log(`User ID: ${user.id} | Email: ${user.email} | Parent Record: ${user.parent ? "Found" : "NOT FOUND"}`);
  }

  const parents = await prisma.parent.findMany();
  console.log("\n--- All Parent Records ---");
  for (const parent of parents) {
    console.log(`Parent ID: ${parent.id} | Name: ${parent.name} | userId: ${parent.userId}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
