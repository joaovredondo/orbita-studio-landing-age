-- ============================================================
-- Órbita Studio — Schema inicial
-- ============================================================

-- ── Profiles (extends auth.users) ──────────────────────────
create table if not exists profiles (
  id           uuid references auth.users on delete cascade primary key,
  role         text not null default 'client'
                 check (role in ('admin', 'client')),
  name         text,
  phone        text,
  city         text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ── Projects ───────────────────────────────────────────────
create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid references profiles(id) on delete cascade not null,
  name        text not null,
  type        text not null,
  description text,
  status      text not null default 'Aguardando'
                check (status in ('Aguardando','Em Desenvolvimento','Revisão','Finalizado')),
  progress    int  not null default 0 check (progress >= 0 and progress <= 100),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Budgets ────────────────────────────────────────────────
create table if not exists budgets (
  id           uuid primary key default gen_random_uuid(),
  client_id    uuid references profiles(id) on delete cascade not null,
  service      text not null,
  description  text not null,
  budget_range text not null,
  deadline     text,
  reference_url text,
  contact_pref text default 'email',
  status       text not null default 'Em análise'
                 check (status in ('Em análise','Aprovado','Recusado')),
  created_at   timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table profiles enable row level security;
alter table projects  enable row level security;
alter table budgets   enable row level security;

-- Helper function: is current user admin?
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Profiles policies
create policy "profiles_own"       on profiles for all     using (auth.uid() = id);
create policy "profiles_admin_all" on profiles for select  using (is_admin());

-- Projects policies
create policy "projects_own_client" on projects for select using (auth.uid() = client_id);
create policy "projects_admin_all"  on projects for all    using (is_admin());

-- Budgets policies
create policy "budgets_own_client"   on budgets for select using (auth.uid() = client_id);
create policy "budgets_client_insert"on budgets for insert with check (auth.uid() = client_id);
create policy "budgets_admin_all"    on budgets for all    using (is_admin());

-- ============================================================
-- Trigger: auto-create profile on signup
-- ============================================================
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role, name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'client'),
    new.raw_user_meta_data->>'name'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- updated_at auto-update
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on profiles
  for each row execute procedure set_updated_at();

create trigger projects_updated_at before update on projects
  for each row execute procedure set_updated_at();
