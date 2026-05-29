create extension if not exists pgcrypto;

create schema if not exists private;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  company_name text,
  role text not null default 'client' check (role in ('admin', 'client')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  client_name text,
  status text not null default 'planning',
  summary text,
  start_date date,
  due_date date,
  budget numeric(12, 2),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_members (
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'client' check (role in ('client', 'viewer')),
  created_at timestamptz not null default now(),
  primary key (project_id, user_id)
);

create table if not exists public.project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  body text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_by uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function private.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, company_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'company_name',
    coalesce(new.raw_app_meta_data ->> 'role', 'client')
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    company_name = coalesce(public.profiles.company_name, excluded.company_name);

  return new;
end;
$$;

create or replace function private.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function private.touch_updated_at();

drop trigger if exists projects_touch_updated_at on public.projects;
create trigger projects_touch_updated_at
  before update on public.projects
  for each row execute function private.touch_updated_at();

drop trigger if exists project_updates_touch_updated_at on public.project_updates;
create trigger project_updates_touch_updated_at
  before update on public.project_updates
  for each row execute function private.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.project_updates enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles for select
to authenticated
using (id = auth.uid() or private.is_admin());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
on public.profiles for update
to authenticated
using (id = auth.uid() or private.is_admin())
with check (id = auth.uid() or private.is_admin());

drop policy if exists "projects_select_member_or_admin" on public.projects;
create policy "projects_select_member_or_admin"
on public.projects for select
to authenticated
using (
  private.is_admin()
  or exists (
    select 1
    from public.project_members
    where project_members.project_id = projects.id
      and project_members.user_id = auth.uid()
  )
);

drop policy if exists "projects_admin_insert" on public.projects;
create policy "projects_admin_insert"
on public.projects for insert
to authenticated
with check (private.is_admin());

drop policy if exists "projects_admin_update" on public.projects;
create policy "projects_admin_update"
on public.projects for update
to authenticated
using (private.is_admin())
with check (private.is_admin());

drop policy if exists "projects_admin_delete" on public.projects;
create policy "projects_admin_delete"
on public.projects for delete
to authenticated
using (private.is_admin());

drop policy if exists "project_members_select_self_or_admin" on public.project_members;
create policy "project_members_select_self_or_admin"
on public.project_members for select
to authenticated
using (user_id = auth.uid() or private.is_admin());

drop policy if exists "project_members_admin_insert" on public.project_members;
create policy "project_members_admin_insert"
on public.project_members for insert
to authenticated
with check (private.is_admin());

drop policy if exists "project_members_admin_update" on public.project_members;
create policy "project_members_admin_update"
on public.project_members for update
to authenticated
using (private.is_admin())
with check (private.is_admin());

drop policy if exists "project_members_admin_delete" on public.project_members;
create policy "project_members_admin_delete"
on public.project_members for delete
to authenticated
using (private.is_admin());

drop policy if exists "project_updates_select_project_member_or_admin" on public.project_updates;
create policy "project_updates_select_project_member_or_admin"
on public.project_updates for select
to authenticated
using (
  private.is_admin()
  or (
    status = 'published'
    and exists (
      select 1
      from public.project_members
      where project_members.project_id = project_updates.project_id
        and project_members.user_id = auth.uid()
    )
  )
);

drop policy if exists "project_updates_admin_insert" on public.project_updates;
create policy "project_updates_admin_insert"
on public.project_updates for insert
to authenticated
with check (private.is_admin());

drop policy if exists "project_updates_admin_update" on public.project_updates;
create policy "project_updates_admin_update"
on public.project_updates for update
to authenticated
using (private.is_admin())
with check (private.is_admin());

drop policy if exists "project_updates_admin_delete" on public.project_updates;
create policy "project_updates_admin_delete"
on public.project_updates for delete
to authenticated
using (private.is_admin());

create index if not exists project_members_user_id_idx on public.project_members(user_id);
create index if not exists project_updates_project_id_idx on public.project_updates(project_id);

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on
  public.profiles,
  public.projects,
  public.project_members,
  public.project_updates
to authenticated;
