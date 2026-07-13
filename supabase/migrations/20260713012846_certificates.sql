-- supabase/migrations/<timestamp>_certificates.sql

create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  issue_date date not null,
  credential_url text,
  file_path text not null,
  file_url text not null,
  sort_order int not null default 0
);

alter table certificates enable row level security;

grant select on certificates to anon, authenticated;
grant insert, update, delete on certificates to authenticated;

create policy "Anyone can read certificates"
  on certificates for select
  to anon, authenticated
  using (true);

create policy "Admin can manage certificates"
  on certificates for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- Storage: the "certificates" bucket was created in Phase 2 but has never had
-- policies attached — without these, uploads will fail with the same
-- "permission denied" class of error we hit on contact_messages earlier,
-- since RLS on storage.objects blocks writes by default regardless of a
-- bucket's public/private flag.
create policy "Public can view certificate files"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'certificates');

create policy "Admin can upload certificate files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'certificates' and is_admin());

create policy "Admin can update certificate files"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'certificates' and is_admin());

create policy "Admin can delete certificate files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'certificates' and is_admin());