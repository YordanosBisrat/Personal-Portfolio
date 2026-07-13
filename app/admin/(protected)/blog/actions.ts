"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadToBucket, removeFromBucket } from "@/lib/supabase/storage";
import { calculateReadingTime } from "@/lib/blog-utils";
import { createPost, updatePost } from "@/features/blog/services";
import {
  postFormSchema,
  type ActionState,
  MAX_COVER_SIZE,
  ACCEPTED_COVER_TYPES,
} from "@/features/blog/admin-schema";

function parseTags(value: string | undefined): string[] {
  if (!value) return [];
  return value.split(",").map((t) => t.trim()).filter(Boolean);
}

export async function createBlogPost(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = postFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createClient();
  let coverImageUrl: string | null = null;
  let coverImagePath: string | null = null;

  const coverFile = formData.get("coverImage") as File | null;
  if (coverFile && coverFile.size > 0) {
    const result = await uploadToBucket(supabase, "blog-images", coverFile, ACCEPTED_COVER_TYPES, MAX_COVER_SIZE);
    if ("error" in result) {
      return { error: { coverImage: [result.error] } };
    }
    coverImageUrl = result.url;
    coverImagePath = result.path;
  }

  const { error } = await createPost({
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    category: parsed.data.category,
    tags: parseTags(parsed.data.tags),
    status: parsed.data.status,
    reading_time: calculateReadingTime(parsed.data.content),
    cover_image_url: coverImageUrl,
    cover_image_path: coverImagePath,
    published_at: parsed.data.status === "published" ? new Date().toISOString() : null,
  });

  if (error) {
    if (coverImagePath) await removeFromBucket(supabase, "blog-images", coverImagePath);
    return { error: { _form: [error.message] } };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = postFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createClient();

  const updates: Record<string, unknown> = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    category: parsed.data.category,
    tags: parseTags(parsed.data.tags),
    status: parsed.data.status,
    reading_time: calculateReadingTime(parsed.data.content),
  };

  // Only stamp published_at the first time a post transitions into
  // "published" — re-saving an already-published post shouldn't reset its
  // original publish date, which would otherwise reorder it in the list.
  const wasPublished = formData.get("wasPublished") === "true";
  if (parsed.data.status === "published" && !wasPublished) {
    updates.published_at = new Date().toISOString();
  }

  const coverFile = formData.get("coverImage") as File | null;
  if (coverFile && coverFile.size > 0) {
    const result = await uploadToBucket(supabase, "blog-images", coverFile, ACCEPTED_COVER_TYPES, MAX_COVER_SIZE);
    if ("error" in result) {
      return { error: { coverImage: [result.error] } };
    }
    const existingPath = formData.get("existingCoverPath") as string;
    if (existingPath) await removeFromBucket(supabase, "blog-images", existingPath);
    updates.cover_image_url = result.url;
    updates.cover_image_path = result.path;
  }

  const { error } = await updatePost(id, updates);

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string, coverImagePath: string | null) {
  const supabase = await createClient();

  if (coverImagePath) await removeFromBucket(supabase, "blog-images", coverImagePath);
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete post:", error.message);
    return;
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}