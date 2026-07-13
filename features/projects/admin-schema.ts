import { z } from "zod";

export const projectFormSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  title: z.string().min(2, "Title is required"),
  category: z.enum(["web", "mobile", "systems", "graphics"]),
  summary: z.string().min(10, "Summary is too short"),
  problem: z.string().min(10, "Problem is too short"),
  solution: z.string().min(10, "Solution is too short"),
  features: z.string().min(1, "Add at least one feature (one per line)"),
  challenges: z.string().min(10, "Challenges is too short"),
  lessons: z.string().min(10, "Lessons is too short"),
  techStack: z.string().min(1, "Add at least one technology (one per line)"),
  githubUrl: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  demoUrl: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  isFeatured: z.boolean().default(false),
  status: z.enum(["draft", "published"]),
  sortOrder: z.coerce.number().int().default(0),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

export interface ActionState {
  error: Record<string, string[]> | null;
}