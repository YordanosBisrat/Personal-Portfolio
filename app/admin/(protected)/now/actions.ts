"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateNowPage } from "@/features/now/services";
import { nowPageFormSchema, type ActionState } from "@/features/now/admin-schema";

function parseLines(value: string): string[] {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

export async function saveNowPage(id: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = nowPageFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const { error } = await updateNowPage(id, {
    currently_learning: parsed.data.currentlyLearning,
    currently_building: parsed.data.currentlyBuilding,
    currently_reading: parsed.data.currentlyReading,
    current_goals: parseLines(parsed.data.currentGoals),
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath("/now");
  revalidatePath("/admin/now");
  redirect("/admin/now");
}