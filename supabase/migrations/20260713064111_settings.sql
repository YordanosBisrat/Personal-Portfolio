-- supabase/migrations/<timestamp>_settings.sql

create table if not exists settings (
  key text primary key,
  value text not null default '',
  description text,
  updated_at timestamptz not null default now()
);

alter table settings enable row level security;

grant select on settings to anon, authenticated;
grant insert, update, delete on settings to authenticated;

create policy "Anyone can read settings"
  on settings for select
  to anon, authenticated
  using (true);

create policy "Admin can manage settings"
  on settings for all
  to authenticated
  using (is_admin())
  with check (is_admin());

insert into settings (key, value, description) values
  ('maintenance_mode', 'false', 'When true, a future maintenance banner/redirect can check this flag.'),
  ('site_announcement', '', 'Optional short announcement text, empty means none shown.');