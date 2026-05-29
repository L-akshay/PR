import { redirect } from "next/navigation"
import { CalendarDays, CheckCircle2 } from "lucide-react"

import DashboardShell from "@/app/dashboard/Shell"
import SupabaseSetupNotice from "@/components/portal/SupabaseSetupNotice"
import { hasSupabaseEnv } from "@/lib/supabase/config"
import { createClient } from "@/lib/supabase/server"
import type { Profile, Project, ProjectUpdate } from "@/lib/supabase/types"

type ProjectWithUpdates = Project & {
  project_updates: ProjectUpdate[]
}

export default async function ClientDashboardPage() {
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

  const { data: projects } = await supabase
    .from("projects")
    .select(
      "id,name,slug,client_name,status,summary,start_date,due_date,budget,project_updates(id,project_id,title,body,status,published_at)"
    )
    .order("created_at", { ascending: false })
    .returns<ProjectWithUpdates[]>()

  return (
    <DashboardShell
      profile={profile}
      eyebrow="Client"
      title="Your project workspace"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {(projects ?? []).map((project) => (
          <article
            key={project.id}
            className="flex min-h-[24rem] flex-col rounded-[28px] border border-[#C9A84C]/15 bg-[#161616] p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-ui text-[10px] uppercase tracking-[0.26em] text-[#C9A84C]">
                  {project.client_name || "NovaPR Project"}
                </p>
                <h2 className="mt-4 font-serif text-3xl font-light leading-[1.05] text-[#F5F0E8]">
                  {project.name}
                </h2>
              </div>
              <span className="rounded-full border border-[#C9A84C]/20 px-3 py-1 font-ui text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]">
                {project.status}
              </span>
            </div>

            {project.summary ? (
              <p className="mt-5 font-ui text-sm leading-relaxed text-[#888880]">
                {project.summary}
              </p>
            ) : null}

            <div className="mt-6 grid gap-3 text-sm text-[#888880]">
              {project.start_date ? (
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-[#C9A84C]" />
                  Started {project.start_date}
                </div>
              ) : null}
              {project.due_date ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#C9A84C]" />
                  Target {project.due_date}
                </div>
              ) : null}
            </div>

            <div className="mt-8 border-t border-[#2A2A2A] pt-6">
              <h3 className="font-ui text-[11px] uppercase tracking-[0.26em] text-[#C9A84C]">
                Updates
              </h3>
              <div className="mt-4 space-y-4">
                {project.project_updates?.map((update) => (
                  <div
                    key={update.id}
                    className="rounded-[18px] border border-[#2A2A2A] bg-[#111111] p-4"
                  >
                    <p className="font-serif text-xl font-light text-[#F5F0E8]">
                      {update.title}
                    </p>
                    {update.body ? (
                      <p className="mt-2 font-ui text-sm leading-relaxed text-[#888880]">
                        {update.body}
                      </p>
                    ) : null}
                  </div>
                ))}

                {!project.project_updates?.length ? (
                  <p className="font-ui text-sm text-[#888880]">
                    No published updates yet.
                  </p>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      {!projects?.length ? (
        <div className="rounded-[28px] border border-[#C9A84C]/15 bg-[#161616] p-8">
          <h2 className="font-serif text-3xl font-light text-[#F5F0E8]">
            No assigned projects yet.
          </h2>
          <p className="mt-3 font-ui text-sm leading-relaxed text-[#888880]">
            Once the NovaPR team assigns a project to your account, it will
            appear here with status and updates.
          </p>
        </div>
      ) : null}
    </DashboardShell>
  )
}
