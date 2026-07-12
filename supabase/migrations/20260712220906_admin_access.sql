-- supabase/migrations/<timestamp>_admin_access.sql

-- Single source of truth for "is this session the site owner." Checked
-- against email rather than a hardcoded UUID so it survives a password reset
-- or account recreation without needing a migration to update it.
create or replace function is_admin()
returns boolean
language sql
stable
as $$
  select auth.jwt() ->> 'email' = 'bisratyordanos777@gmail.com';
$$;

-- profile: admin can update (single row, never inserted/deleted via the app)
grant update on profile to authenticated;
create policy "Admin can update profile"
  on profile for update
  to authenticated
  using (is_admin())
  with check (is_admin());

-- social_links
grant insert, update, delete on social_links to authenticated;
create policy "Admin can manage social links"
  on social_links for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- skills
grant insert, update, delete on skills to authenticated;
create policy "Admin can manage skills"
  on skills for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- timeline
grant insert, update, delete on timeline to authenticated;
create policy "Admin can manage timeline"
  on timeline for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- statistics
grant insert, update, delete on statistics to authenticated;
create policy "Admin can manage statistics"
  on statistics for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- projects
grant insert, update, delete on projects to authenticated;
create policy "Admin can manage projects"
  on projects for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- contact_messages: admin needs to read, mark as read, and delete —
-- capabilities that were deliberately absent until now (see the original
-- contact_messages migration's comment about this).
grant select, update, delete on contact_messages to authenticated;
create policy "Admin can read contact messages"
  on contact_messages for select
  to authenticated
  using (is_admin());
create policy "Admin can update contact messages"
  on contact_messages for update
  to authenticated
  using (is_admin())
  with check (is_admin());
create policy "Admin can delete contact messages"
  on contact_messages for delete
  to authenticated
  using (is_admin());