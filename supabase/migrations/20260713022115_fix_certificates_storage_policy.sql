-- supabase/migrations/<timestamp>_fix_certificates_storage_policy.sql

drop policy if exists "Public can view certificate files" on storage.objects;

-- Public bucket already permits direct file access by URL. This policy is
-- intentionally NOT granted here — removing it prevents anyone from calling
-- list() to enumerate every file in the bucket, while direct-URL access
-- (what the app actually needs) keeps working via the bucket's public flag.