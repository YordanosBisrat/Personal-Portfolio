import { z } from "zod";

export const profileFormSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  title: z.string().min(2, "Title is required"),
  bio: z.string().min(10, "Bio is too short"),
  location: z.string().min(1, "Location is required"),
  email: z.string().email("Enter a valid email"),
  yearsLearning: z.coerce.number().int().min(0),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export interface ActionState {
  error: Record<string, string[]> | null;
}

export const MAX_AVATAR_SIZE = 3 * 1024 * 1024; // 3MB
export const ACCEPTED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_RESUME_TYPES = ["application/pdf"];