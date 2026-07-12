create table if not exists social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  label text not null,
  sort_order int not null default 0
);

alter table social_links enable row level security;

grant select on social_links to anon, authenticated;

create policy "Anyone can read social links"
  on social_links
  for select
  to anon, authenticated
  using (true);

insert into social_links (platform, url, label, sort_order) values
  ('github', 'https://github.com/YordanosBisrat', 'GitHub', 1),
  ('linkedin', 'https://linkedin.com/in/yordanos-bisrat-911788334', 'LinkedIn', 2),
  ('leetcode', 'https://leetcode.com/YordanosB/', 'LeetCode', 3);