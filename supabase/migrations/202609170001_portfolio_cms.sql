create extension if not exists pgcrypto;

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  name text not null default 'Purushottam',
  role text not null default 'Full-Stack Web Developer',
  email text not null default 'your-email@example.com',
  phone text not null default 'Add from Admin',
  location text not null default 'India',
  availability text not null default 'Available for selected projects',
  hero_eyebrow text not null default 'Hello, I build for the web',
  hero_title text not null default 'I create powerful digital experiences.',
  hero_description text not null default '',
  about text not null default '',
  resume_url text not null default '#contact',
  primary_color text not null default '#8b6dff',
  accent_color text not null default '#35e7c2',
  animations_enabled boolean not null default true,
  seo_title text not null default '',
  seo_description text not null default '',
  og_title text not null default '',
  og_description text not null default '',
  og_image text not null default '',
  animation_intensity text not null default 'balanced',
  page_transition text not null default 'fade-blur',
  hero_animation text not null default 'cinematic',
  scroll_animation text not null default 'mixed',
  background_animation boolean not null default true,
  cursor_effect boolean not null default true,
  particles boolean not null default true,
  smooth_scroll boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.project_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  description text not null default '',
  problem text not null default '',
  solution text not null default '',
  category text not null default 'Others',
  year integer not null default extract(year from now())::integer,
  technologies jsonb not null default '[]'::jsonb check (jsonb_typeof(technologies) = 'array'),
  features jsonb not null default '[]'::jsonb check (jsonb_typeof(features) = 'array'),
  live_url text,
  github_url text,
  status text not null default 'Case study' check (status in ('Live', 'Private', 'In progress', 'Case study')),
  featured boolean not null default false,
  published boolean not null default true,
  display_order integer not null default 0,
  accent text not null default '#8b6dff',
  cover_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_public_order_idx on public.projects (published, display_order);
create index if not exists projects_category_idx on public.projects (category);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  alt_text text not null default '',
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Other',
  level integer not null default 80 check (level between 0 and 100),
  icon text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,
  description text not null default '',
  technologies jsonb not null default '[]'::jsonb check (jsonb_typeof(technologies) = 'array'),
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  qualification text not null,
  institution text not null,
  period text not null,
  description text not null default '',
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  icon text not null default 'Code2',
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value integer not null default 0,
  suffix text not null default '',
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  company text not null default '',
  review text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  avatar_url text,
  published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  year integer not null default extract(year from now())::integer,
  image_url text,
  credential_url text,
  published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.navigation_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.sections (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  enabled boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  path text not null unique,
  url text not null,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 180),
  phone text,
  company text,
  project_type text,
  budget text,
  message text not null check (char_length(message) between 10 and 5000),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists settings_set_updated_at on public.site_settings;
create trigger settings_set_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.admins enable row level security;
alter table public.site_settings enable row level security;
alter table public.project_categories enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.skills enable row level security;
alter table public.experience enable row level security;
alter table public.education enable row level security;
alter table public.services enable row level security;
alter table public.achievements enable row level security;
alter table public.testimonials enable row level security;
alter table public.certificates enable row level security;
alter table public.social_links enable row level security;
alter table public.navigation_items enable row level security;
alter table public.sections enable row level security;
alter table public.media enable row level security;
alter table public.contact_messages enable row level security;

create policy "admins can read their membership" on public.admins
for select to authenticated using (user_id = auth.uid());

create policy "public can read site settings" on public.site_settings
for select to anon, authenticated using (true);
create policy "admins can update site settings" on public.site_settings
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public can read project categories" on public.project_categories
for select to anon, authenticated using (true);
create policy "admins manage project categories" on public.project_categories
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public can read published projects" on public.projects
for select to anon, authenticated using (published or public.is_admin());
create policy "admins manage projects" on public.projects
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public can read images of published projects" on public.project_images
for select to anon, authenticated using (
  exists (select 1 from public.projects p where p.id = project_id and (p.published or public.is_admin()))
);
create policy "admins manage project images" on public.project_images
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public can read skills" on public.skills for select to anon, authenticated using (true);
create policy "admins manage skills" on public.skills for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "public can read experience" on public.experience for select to anon, authenticated using (true);
create policy "admins manage experience" on public.experience for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "public can read education" on public.education for select to anon, authenticated using (true);
create policy "admins manage education" on public.education for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "public can read services" on public.services for select to anon, authenticated using (true);
create policy "admins manage services" on public.services for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "public can read achievements" on public.achievements for select to anon, authenticated using (true);
create policy "admins manage achievements" on public.achievements for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public can read published testimonials" on public.testimonials
for select to anon, authenticated using (published or public.is_admin());
create policy "admins manage testimonials" on public.testimonials
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public can read published certificates" on public.certificates
for select to anon, authenticated using (published or public.is_admin());
create policy "admins manage certificates" on public.certificates
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public can read published social links" on public.social_links
for select to anon, authenticated using (published or public.is_admin());
create policy "admins manage social links" on public.social_links
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public can read published navigation" on public.navigation_items
for select to anon, authenticated using (published or public.is_admin());
create policy "admins manage navigation" on public.navigation_items
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public can read sections" on public.sections
for select to anon, authenticated using (true);
create policy "admins manage sections" on public.sections
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public can read media" on public.media
for select to anon, authenticated using (true);
create policy "admins manage media" on public.media
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "anyone can submit a contact message" on public.contact_messages
for insert to anon, authenticated with check (
  char_length(name) between 2 and 100
  and char_length(email) between 5 and 180
  and char_length(message) between 10 and 5000
);
create policy "admins can read messages" on public.contact_messages
for select to authenticated using (public.is_admin());
create policy "admins can update messages" on public.contact_messages
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins can delete messages" on public.contact_messages
for delete to authenticated using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do update set public = true;

create policy "public can read portfolio media" on storage.objects
for select to anon, authenticated using (bucket_id = 'portfolio-media');
create policy "admins upload portfolio media" on storage.objects
for insert to authenticated with check (bucket_id = 'portfolio-media' and public.is_admin());
create policy "admins update portfolio media" on storage.objects
for update to authenticated using (bucket_id = 'portfolio-media' and public.is_admin())
with check (bucket_id = 'portfolio-media' and public.is_admin());
create policy "admins delete portfolio media" on storage.objects
for delete to authenticated using (bucket_id = 'portfolio-media' and public.is_admin());
