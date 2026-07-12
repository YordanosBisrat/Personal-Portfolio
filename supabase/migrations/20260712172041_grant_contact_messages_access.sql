-- supabase/migrations/<timestamp>_grant_contact_messages_access.sql

-- RLS policies only restrict access on top of privileges a role already has —
-- they cannot grant access on their own. The insert policy from the previous
-- migration was correct, but anon/authenticated never had base table-level
-- INSERT privilege, which is why Postgres returned "permission denied" rather
-- than an RLS policy violation.

grant usage on schema public to anon, authenticated;
grant insert on contact_messages to anon, authenticated;