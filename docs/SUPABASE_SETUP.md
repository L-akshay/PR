# Supabase Setup

This app already has the Supabase code and SQL migration. You only need to create a Supabase project, run the SQL, add keys, and create users.

## 1. Create the project

1. Go to https://supabase.com/dashboard and create a new project.
2. Open the project dashboard.
3. Go to **Connect** or **Project Settings -> API**.
4. Copy the project URL.
5. Copy the publishable key. If your dashboard only shows legacy keys, copy the anon public key.

Add these to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

If you use the legacy anon key instead:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Never add the service role key to `NEXT_PUBLIC_` variables.

## 2. Create the database tables

In Supabase Dashboard, open **SQL Editor**, paste the contents of:

```text
supabase/migrations/001_minimal_project_backend.sql
```

Run it once. It creates:

- `profiles`
- `projects`
- `project_members`
- `project_updates`
- RLS policies for admin/client access
- an auth trigger that creates a profile when a user is created

## 3. Create users

Open **Authentication -> Users** and add users manually.

For a client user, no extra setup is needed. The trigger creates their profile with role `client`.

For an admin user, create the user first, then run this in **SQL Editor**:

```sql
update public.profiles
set role = 'admin'
where email = 'admin@example.com';
```

Replace `admin@example.com` with your admin email.

## 4. Recommended Auth settings

For a simple internal portal:

- Keep Email/Password enabled.
- If you want users to sign in immediately after you create them, disable email confirmation in **Authentication -> Providers -> Email**.
- If you keep email confirmation enabled, users must confirm their email before password login works.

## 5. Run locally

Restart the dev server after editing `.env.local`:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000/login
```

## 6. Access flow

1. `/login` signs in with Supabase Auth.
2. `/dashboard` reads the user's `profiles.role`.
3. Admins go to `/dashboard/admin`.
4. Clients go to `/dashboard/client`.
5. RLS ensures clients only see projects where they are listed in `project_members`.

## 7. Assign a client to a project

Log in as an admin, create a project, and select a client from the dropdown. That creates a `project_members` row for the client.

If you create a project before assigning a client, add the relationship manually:

```sql
insert into public.project_members (project_id, user_id, role)
values ('project-uuid', 'client-user-uuid', 'client');
```
