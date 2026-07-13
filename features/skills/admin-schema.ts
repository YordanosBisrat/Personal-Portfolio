import { z } from "zod";

export const skillFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(["frontend", "backend", "languages", "mobile", "database", "ai", "tools"]),
  proficiency: z.coerce.number().int().min(0).max(100),
  sortOrder: z.coerce.number().int().default(0),
});

export type SkillFormValues = z.infer<typeof skillFormSchema>;

export interface ActionState {
  error: Record<string, string[]> | null;
}