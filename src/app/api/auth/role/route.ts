import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const cookie = cookieStore.get(name);
            return cookie?.value;
          },
        },
      },
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ role: null }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { authUserId: user.id },
      select: { role: true },
    });

    return NextResponse.json({ role: dbUser?.role ?? null });
  } catch (err) {
    console.error('Failed to fetch auth role', err);
    return NextResponse.json({ role: null }, { status: 500 });
  }
}
