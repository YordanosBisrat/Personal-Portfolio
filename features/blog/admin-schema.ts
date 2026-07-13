import { z } from "zod";

export const postFormSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  excerpt: z.string().min(10, "Excerpt is too short"),
  content: z.string().min(20, "Content is too short"),
  tags: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["draft", "published"]),
});

export type PostFormValues = z.infer<typeof postFormSchema>;

export interface ActionState {
  error: Record<string, string[]> | null;
}

export const MAX_COVER_SIZE = 4 * 1024 * 1024; // 4MB
export const ACCEPTED_COVER_TYPES = ["image/jpeg", "image/png", "image/webp"];