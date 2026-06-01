"use server"

import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    redirect("/login?error=missing")
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect("/login?error=invalid")
  }

  redirect("/dashboard")
}

export async function signUp(formData: FormData) {
  const fullName = String(formData.get("full_name") ?? "").trim()
  const companyName = String(formData.get("company_name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!fullName || !email || !password) {
    redirect("/signup?error=missing")
  }

  if (password.length < 8) {
    redirect("/signup?error=password")
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        company_name: companyName || null,
      },
    },
  })

  if (error) {
    redirect("/signup?error=invalid")
  }

  redirect("/login?notice=created")
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
