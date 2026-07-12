-- supabase/migrations/<timestamp>_contact_messages.sql

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

-- Visitors can submit a message, but cannot read, update, or delete any row —
-- including their own. This is intentional: a contact form is write-only from
-- the public's perspective.
create policy "Anyone can submit a contact message"
  on contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- No SELECT/UPDATE/DELETE policy exists yet for anon/authenticated, which
-- means those operations are denied by default under RLS. Admin read access
-- gets added in Phase 6 once the admin auth pattern (is_admin() check) exists —
-- until then, messages are only readable via the Supabase dashboard directly
-- or the service role key, never through the public app.