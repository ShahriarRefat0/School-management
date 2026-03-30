'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/getCurrentUser';

export async function getCommunicationData() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'parent') {
      return { success: false, error: 'Authentication required as parent' };
    }

    const parent = await prisma.parent.findUnique({
      where: { userId: currentUser.id },
      include: { student: true },
    });

    if (!parent) return { success: false, error: 'Parent profile not found' };

    const schoolId = parent.student.schoolId;

    // Get teachers of the linked student
    const section = await prisma.section.findFirst({
      where: { students: { some: { id: parent.studentId } } },
      include: { class: true },
    });

    // Fetch teachers who teach subjects to this class
    const teachers = await prisma.teacher.findMany({
      where: {
        schoolId: schoolId,
        subjects: {
          some: {
            subject: {
              classId: section?.classId || '',
            },
          },
        },
      },
      include: {
        user: { select: { name: true, email: true } },
        subjects: { include: { subject: { select: { name: true } } } },
      },
    });

    return {
      success: true,
      data: {
        teachers: teachers.map((t) => ({
          id: t.id,
          name: t.user.name,
          role: t.subjects[0]?.subject.name || 'Teacher',
          email: t.user.email,
          initials: t.user.name
            .split(' ')
            .map((n) => n[0])
            .join(''),
        })),
      },
    };
  } catch (error) {
    console.error('Error fetching communication data:', error);
    return { success: false, error: 'Failed to load teachers' };
  }
}

export async function sendMessage(teacherId: string, message: string) {
  // In a real app, this would create a Chat/Message record or send an email.
  // The current schema doesn't have a direct Messaging model, but we can verify authentication.
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { success: false, error: 'Unauthorized' };

    console.log(
      `Sending message from ${currentUser.email} to teacher ${teacherId}: ${message}`,
    );

    // Simulate database delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to send message' };
  }
}
