create table if not exists timeline (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  date text not null,
  description text,
  sort_order int not null default 0
);

alter table timeline enable row level security;

grant select on timeline to anon, authenticated;

create policy "Anyone can read timeline"
  on timeline
  for select
  to anon, authenticated
  using (true);

insert into timeline (label, date, sort_order) values
  ('Started Software Engineering', '2023', 1),
  ('HTML & CSS', '2023', 2),
  ('JavaScript', '2023', 3),
  ('Git & Version Control', '2024', 4),
  ('React', '2024', 5),
  ('Next.js', '2025', 6),
  ('Flutter', '2025', 7),
  ('OpenGL', '2025', 8),
  ('AI & Machine Learning', '2026', 9),
  ('Full-Stack Development', '2026', 10);