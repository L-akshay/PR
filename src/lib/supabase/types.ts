export type UserRole = "admin" | "client"

export type Profile = {
  id: string
  email: string | null
  full_name: string | null
  company_name: string | null
  role: UserRole
}

export type Project = {
  id: string
  name: string
  slug: string
  client_name: string | null
  status: string
  summary: string | null
  start_date: string | null
  due_date: string | null
  budget: number | null
}

export type ProjectUpdate = {
  id: string
  project_id: string
  title: string
  body: string | null
  status: string
  published_at: string | null
}
