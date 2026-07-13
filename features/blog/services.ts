import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import type { Database } from "@/types/database.types";

type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];
type BlogPostUpdate = Database["public"]["Tables"]["blog_posts"]["Update"];
type BlogPostInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  coverImagePath: string | null;
  tags: string[];
  category: string;
  readingTime: number;
  status: "draft" | "published";
  publishedAt: string | null;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw new Error(`Failed to load posts: ${error.message}`);
  return (data ?? []).map(mapPostRow);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw new Error(`Failed to load post "${slug}": ${error.message}`);
  return data ? mapPostRow(data) : null;
}

export async function getPublishedSlugs(): Promise<string[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase.from("blog_posts").select("slug").eq("status", "published");

  if (error) throw new Error(`Failed to load post slugs: ${error.message}`);
  return (data ?? []).map((row) => row.slug);
}

export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false, nullsFirst: true });

  if (error) throw new Error(`Failed to load posts: ${error.message}`);
  return (data ?? []).map(mapPostRow);
}

export async function getPostByIdAdmin(id: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();

  if (error) throw new Error(`Failed to load post: ${error.message}`);
  return data ? mapPostRow(data) : null;
}

export async function createPost(post: BlogPostInsert) {
  const supabase = await createClient();
  return supabase.from("blog_posts").insert(post).select().single();
}

export async function updatePost(id: string, updates: BlogPostUpdate) {
  const supabase = await createClient();
  return supabase.from("blog_posts").update(updates).eq("id", id);
}

function mapPostRow(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImageUrl: row.cover_image_url,
    coverImagePath: row.cover_image_path,
    tags: row.tags as string[],
    category: row.category,
    readingTime: row.reading_time,
    status: row.status as "draft" | "published",
    publishedAt: row.published_at,
  };
}