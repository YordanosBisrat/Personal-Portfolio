-- supabase/migrations/<timestamp>_profile_storage.sql

alter table profile add column if not exists avatar_path text;
alter table profile add column if not exists resume_path text;

-- Both "resume" and "profile-images" buckets were created in Phase 2 as
-- public, so no SELECT policy is needed here — per the certificates lesson,
-- a public bucket serves files by direct URL without any storage.objects
-- SELECT grant. Only admin write access needs a policy.
create policy "Admin can upload resume"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'resume' and is_admin());

create policy "Admin can update resume"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'resume' and is_admin());

create policy "Admin can delete resume"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'resume' and is_admin());

create policy "Admin can upload profile images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'profile-images' and is_admin());

create policy "Admin can update profile images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'profile-images' and is_admin());

create policy "Admin can delete profile images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'profile-images' and is_admin());