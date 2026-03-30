import { prisma } from '../src/lib/prisma';

async function main() {
  const users = await prisma.user.findMany({ where: { role: 'parent' }, include: { parent: { include: { student: true } } } });
  console.log('Parents:', JSON.stringify(users, null, 2));

  if (users.length > 0 && users[0].parent) {
    const parent = users[0].parent;
    console.log('Parent student schoolId:', parent.student?.schoolId);
    
    const results = await prisma.result.findMany({
      where: parent.student?.schoolId ? { schoolId: parent.student.schoolId } : {},
      include: { student: true, subjectRef: true, exam: true }
    });
    console.log('Results count:', results.length);
    if (results.length > 0) {
      console.log('First result:', JSON.stringify(results[0], null, 2));
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
