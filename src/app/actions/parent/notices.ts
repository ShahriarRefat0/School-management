'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/getCurrentUser';

export async function getParentNoticesData() {
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

    const notices = await prisma.announcement.findMany({
      where: {
        schoolId: schoolId,
        status: 'published',
        OR: [{ audience: 'all' }, { audience: 'parents' }],
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: {
        notices: notices.map((n) => ({
          id: n.id,
          title: n.title,
          date: n.createdAt.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          category: n.category.charAt(0).toUpperCase() + n.category.slice(1),
          desc: n.content,
          isPinned: n.priority === 'urgent' || n.priority === 'high',
          priority: n.priority.charAt(0).toUpperCase() + n.priority.slice(1),
          color:
            n.category === 'exam'
              ? 'blue'
              : n.category === 'holiday'
                ? 'emerald'
                : 'amber',
        })),
      },
    };
  } catch (error) {
    console.error('Error fetching parent notices:', error);
    return { success: false, error: 'Failed to load notices data' };
  }
}
