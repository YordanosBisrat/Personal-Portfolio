import { z } from "zod";

export const settingFormSchema = z.object({
  key: z.string().min(1, "Key is required").regex(/^[a-z0-9_]+$/, "Lowercase letters, numbers, and underscores only"),
  value: z.string(),
  description: z.string().optional(),
});

export type SettingFormValues = z.infer<typeof settingFormSchema>;

export interface ActionState {
  error: Record<string, string[]> | null;
}