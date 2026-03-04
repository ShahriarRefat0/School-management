import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"

export async function getCurrentUser() {

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) return null

  const dbUser = await prisma.user.findFirst({
    where: { authUserId: data.user.id }
  })

  return dbUser
}