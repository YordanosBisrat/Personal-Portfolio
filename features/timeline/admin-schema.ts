import { z } from "zod";

export const timelineFormSchema = z.object({
  label: z.string().min(1, "Label is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().optional(),
  sortOrder: z.coerce.number().int().default(0),
});

export type TimelineFormValues = z.infer<typeof timelineFormSchema>;

export interface ActionState {
  error: Record<string, string[]> | null;
}