import Link from "next/link"
import { FolderKanban, LogOut } from "lucide-react"

import { signOut } from "@/app/login/actions"
import { Button } from "@/components/ui/button"
import type { Profile } from "@/lib/supabase/types"

export default function DashboardShell({
  profile,
  title,
  eyebrow,
  children,
}: {
  profile: Profile | null
  title: string
  eyebrow: string
  children: React.ReactNode
}) {
  return (
    <section className="px-5 py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-[#C9A84C]/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-ui text-[11px] uppercase tracking-[0.34em] text-[#C9A84C]">
              {eyebrow}
            </p>
            <h1 className="mt-5 font-serif text-[clamp(38px,5vw,72px)] font-light leading-[0.98] text-[#F5F0E8]">
              {title}
            </h1>
            <p className="mt-4 font-ui text-sm text-[#888880]">
              Signed in as {profile?.email ?? "authenticated user"}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#C9A84C]/20 px-5 font-ui text-[11px] uppercase tracking-[0.22em] text-[#C9A84C]"
            >
              <FolderKanban className="size-4" />
              Dashboard
            </Link>
            <form action={signOut}>
              <Button
                type="submit"
                variant="outline"
                className="min-h-11 rounded-full border-[#2A2A2A] bg-[#111111] px-5 font-ui text-[11px] uppercase tracking-[0.22em] text-[#F5F0E8]"
              >
                <LogOut className="size-4" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
