import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { prisma } from "@/lib/prisma"

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const cookie = cookieStore.get(name)
            return cookie?.value
          }
        }
      }
    )

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      console.error("🕵️ Auth Error:", error.message)
      return null
    }

    if (!user) {
      console.log("🕵️ No user session found in cookies.")
      return null
    }

    console.log("🕵️ Session user ID found:", user.id, `(${user.email})`)

    const dbUser = await prisma.user.findUnique({
      where: { authUserId: user.id }
    })

    if (!dbUser) {
      console.warn("🔎 [getCurrentUser] No DB record for UUID:", user.id)
    } else {
      console.log(`🔎 [getCurrentUser] Found User: ${dbUser.email} | Role: "${dbUser.role}"`)
    }

    return dbUser
  } catch (error: any) {
    console.error("🕵️ getCurrentUser CRITICAL Error:", error.message)
    if (error.stack) console.error(error.stack)
    return null
  }
}