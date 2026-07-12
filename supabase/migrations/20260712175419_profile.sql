create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  title text not null,
  bio text not null,
  location text not null,
  email text not null,
  avatar_url text,
  resume_url text,
  years_learning int not null default 0,
  updated_at timestamptz not null default now()
);

alter table profile enable row level security;

grant usage on schema public to anon, authenticated;
grant select on profile to anon, authenticated;

create policy "Anyone can read profile"
  on profile
  for select
  to anon, authenticated
  using (true);

-- No insert/update/delete policy — public role has no write access.
-- Admin writes are added in Phase 6 via a dedicated is_admin() policy.

insert into profile (full_name, title, bio, location, email, years_learning)
values (
  'Yordanos Bisrat',
  'Software Engineering Student | Aspiring Full-Stack Developer',
  'Software Engineering student at Addis Ababa University, building full-stack products with Next.js and Supabase — and exploring everything from Flutter to OpenGL along the way.',
  'Addis Ababa, Ethiopia',
  'bisratyordanos777@gmail.com',
  3
);