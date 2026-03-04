import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { prisma } from "@/lib/prisma"

export async function getCurrentUser() {

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )

  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error || !user) return null

  const dbUser = await prisma.user.findUnique({
    where: {
      authUserId: user.id
    }
  })

  return dbUser
}