import { z } from "zod";

export const nowPageFormSchema = z.object({
  currentlyLearning: z.string().min(1, "Required"),
  currentlyBuilding: z.string().min(1, "Required"),
  currentlyReading: z.string().min(1, "Required"),
  currentGoals: z.string().min(1, "Add at least one goal (one per line)"),
});

export type NowPageFormValues = z.infer<typeof nowPageFormSchema>;

export interface ActionState {
  error: Record<string, string[]> | null;
}