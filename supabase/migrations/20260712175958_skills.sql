create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  proficiency int not null check (proficiency >= 0 and proficiency <= 100),
  sort_order int not null default 0
);

alter table skills enable row level security;

grant select on skills to anon, authenticated;

create policy "Anyone can read skills"
  on skills
  for select
  to anon, authenticated
  using (true);

insert into skills (name, category, proficiency, sort_order) values
  ('HTML', 'frontend', 90, 1),
  ('CSS', 'frontend', 85, 2),
  ('JavaScript', 'frontend', 85, 3),
  ('TypeScript', 'frontend', 80, 4),
  ('React', 'frontend', 82, 5),
  ('Next.js', 'frontend', 78, 6),
  ('Tailwind CSS', 'frontend', 85, 7),
  ('Node.js', 'backend', 70, 8),
  ('Express', 'backend', 68, 9),
  ('REST APIs', 'backend', 75, 10),
  ('Python', 'languages', 75, 11),
  ('Java', 'languages', 65, 12),
  ('C++', 'languages', 70, 13),
  ('Dart', 'languages', 70, 14),
  ('Flutter', 'mobile', 72, 15),
  ('PostgreSQL', 'database', 68, 16),
  ('MongoDB', 'database', 60, 17),
  ('Pandas', 'ai', 60, 18),
  ('NumPy', 'ai', 60, 19),
  ('Machine Learning', 'ai', 55, 20),
  ('Git', 'tools', 85, 21),
  ('Figma', 'tools', 65, 22),
  ('Postman', 'tools', 70, 23);