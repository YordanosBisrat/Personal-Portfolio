-- supabase/migrations/<timestamp>_now_page.sql

create table if not exists now_page (
  id uuid primary key default gen_random_uuid(),
  currently_learning text not null default '',
  currently_building text not null default '',
  currently_reading text not null default '',
  current_goals jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

alter table now_page enable row level security;

grant select on now_page to anon, authenticated;
grant update on now_page to authenticated;

create policy "Anyone can read now page"
  on now_page for select
  to anon, authenticated
  using (true);

create policy "Admin can update now page"
  on now_page for update
  to authenticated
  using (is_admin())
  with check (is_admin());

insert into now_page (currently_learning, currently_building, currently_reading, current_goals) values (
  'Deepening my understanding of Supabase, RLS, and full-stack Next.js architecture.',
  'This portfolio platform, and refining AddisReview V2.',
  'Design Patterns and articles on production-grade Next.js patterns.',
  '["Land a full-stack internship", "Contribute to an open-source project", "Get comfortable with system design fundamentals"]'
);