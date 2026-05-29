"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    redirect("/dashboard/client")
  }

  return { supabase, user }
}

export async function createProject(formData: FormData) {
  const { supabase, user } = await requireAdmin()
  const name = String(formData.get("name") ?? "").trim()
  const clientName = String(formData.get("client_name") ?? "").trim()
  const clientUserId = String(formData.get("client_user_id") ?? "").trim()
  const summary = String(formData.get("summary") ?? "").trim()
  const status = String(formData.get("status") ?? "planning").trim()

  if (!name) {
    redirect("/dashboard/admin?error=project-name")
  }

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      name,
      slug: toSlug(name),
      client_name: clientName || null,
      summary: summary || null,
      status,
      created_by: user.id,
    })
    .select("id")
    .single()

  if (error || !project) {
    redirect("/dashboard/admin?error=project-create")
  }

  if (clientUserId) {
    await supabase.from("project_members").insert({
      project_id: project.id,
      user_id: clientUserId,
      role: "client",
    })
  }

  revalidatePath("/dashboard/admin")
  redirect("/dashboard/admin")
}

export async function createProjectUpdate(formData: FormData) {
  const { supabase, user } = await requireAdmin()
  const projectId = String(formData.get("project_id") ?? "").trim()
  const title = String(formData.get("title") ?? "").trim()
  const body = String(formData.get("body") ?? "").trim()
  const status = String(formData.get("status") ?? "published").trim()

  if (!projectId || !title) {
    redirect("/dashboard/admin?error=update-fields")
  }

  const { error } = await supabase.from("project_updates").insert({
    project_id: projectId,
    title,
    body: body || null,
    status,
    created_by: user.id,
    published_at: status === "published" ? new Date().toISOString() : null,
  })

  if (error) {
    redirect("/dashboard/admin?error=update-create")
  }

  revalidatePath("/dashboard/admin")
  redirect("/dashboard/admin")
}
