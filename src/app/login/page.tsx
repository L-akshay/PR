import Link from "next/link"
import { redirect } from "next/navigation"
import { LockKeyhole } from "lucide-react"

import { signIn } from "@/app/login/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SupabaseSetupNotice from "@/components/portal/SupabaseSetupNotice"
import { hasSupabaseEnv } from "@/lib/supabase/config"
import { createClient } from "@/lib/supabase/server"

type LoginPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  if (!hasSupabaseEnv()) {
    return <SupabaseSetupNotice />
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const params = await searchParams

  if (user) {
    redirect("/dashboard")
  }

  const error =
    params.error === "missing"
      ? "Email and password are required."
      : params.error === "invalid"
        ? "Those login details did not work."
        : null

  return (
    <section className="px-5 py-36 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="font-ui text-[11px] uppercase tracking-[0.34em] text-[#C9A84C]">
            Client Portal
          </p>
          <h1 className="mt-6 max-w-3xl font-serif text-[clamp(42px,6vw,86px)] font-light leading-[0.96] text-[#F5F0E8]">
            Project access for clients and admins.
          </h1>
          <p className="mt-6 max-w-xl font-ui text-base leading-[1.9] text-[#888880]">
            Sign in to view project status, updates, and admin management tools.
          </p>
        </div>

        <div className="rounded-[30px] border border-[#C9A84C]/15 bg-[#161616] p-8 shadow-[0_28px_90px_rgba(15,15,15,0.24)] lg:p-10">
          <div className="mb-8 inline-flex size-12 items-center justify-center rounded-full border border-[#C9A84C]/20 bg-[#0F0F0F] text-[#C9A84C]">
            <LockKeyhole className="size-5" />
          </div>

          <form action={signIn} className="space-y-5">
            <div>
              <label className="font-ui text-[11px] uppercase tracking-[0.24em] text-[#C9A84C]">
                Email
              </label>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                className="mt-3 min-h-13 rounded-full border-[#2A2A2A] bg-[#111111] px-5 text-[#F5F0E8]"
              />
            </div>
            <div>
              <label className="font-ui text-[11px] uppercase tracking-[0.24em] text-[#C9A84C]">
                Password
              </label>
              <Input
                name="password"
                type="password"
                autoComplete="current-password"
                className="mt-3 min-h-13 rounded-full border-[#2A2A2A] bg-[#111111] px-5 text-[#F5F0E8]"
              />
            </div>

            {error ? (
              <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 font-ui text-sm text-red-100">
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              className="min-h-13 w-full rounded-full bg-[#C9A84C] font-ui text-[11px] uppercase tracking-[0.26em] text-[#0F0F0F]"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 font-ui text-sm leading-relaxed text-[#888880]">
            Client and admin accounts are created in Supabase Auth. Need access?
            Contact the NovaPR team.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex font-ui text-[11px] uppercase tracking-[0.24em] text-[#C9A84C]"
          >
            Back to site
          </Link>
        </div>
      </div>
    </section>
  )
}
