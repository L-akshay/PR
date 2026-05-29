import { redirect } from "next/navigation"

import SupabaseSetupNotice from "@/components/portal/SupabaseSetupNotice"
import { hasSupabaseEnv } from "@/lib/supabase/config"
import { createClient } from "@/lib/supabase/server"
import type { Profile } from "@/lib/supabase/types"

export default async function DashboardPage() {
  if (!hasSupabaseEnv()) {
    return <SupabaseSetupNotice />
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id,email,full_name,company_name,role")
    .eq("id", user.id)
    .single<Profile>()

  if (profile?.role === "admin") {
    redirect("/dashboard/admin")
  }

  redirect("/dashboard/client")
}
