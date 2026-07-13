-- supabase/migrations/<timestamp>_blog_posts.sql

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image_url text,
  cover_image_path text,
  tags jsonb not null default '[]',
  category text not null default 'general',
  reading_time int not null default 1,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz
);

alter table blog_posts enable row level security;

grant select on blog_posts to anon, authenticated;
grant insert, update, delete on blog_posts to authenticated;

create policy "Anyone can read published posts"
  on blog_posts for select
  to anon, authenticated
  using (status = 'published');

create policy "Admin can read all posts"
  on blog_posts for select
  to authenticated
  using (is_admin());

create policy "Admin can manage posts"
  on blog_posts for all
  to authenticated
  using (is_admin())
  with check (is_admin());

create policy "Admin can upload blog images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images' and is_admin());

create policy "Admin can update blog images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-images' and is_admin());

create policy "Admin can delete blog images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images' and is_admin());