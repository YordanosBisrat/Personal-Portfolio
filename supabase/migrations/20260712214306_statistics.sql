create table if not exists statistics (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value int not null,
  suffix text,
  sort_order int not null default 0
);

alter table statistics enable row level security;

grant select on statistics to anon, authenticated;

create policy "Anyone can read statistics"
  on statistics
  for select
  to anon, authenticated
  using (true);

insert into statistics (label, value, suffix, sort_order) values
  ('Projects', 8, null, 1),
  ('Technologies', 20, '+', 2),
  ('Languages', 5, null, 3),
  ('Repositories', 24, '+', 4),
  ('Years Learning', 3, '+', 5);