"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { timelineFormSchema, type ActionState } from "@/features/timeline/admin-schema";

export async function createTimelineItem(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = timelineFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("timeline").insert({
    label: parsed.data.label,
    date: parsed.data.date,
    description: parsed.data.description || null,
    sort_order: parsed.data.sortOrder,
  });

  if (error) return { error: { _form: [error.message] } };

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/timeline");
  redirect("/admin/timeline");
}

export async function updateTimelineItem(id: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = timelineFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("timeline")
    .update({
      label: parsed.data.label,
      date: parsed.data.date,
      description: parsed.data.description || null,
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", id);

  if (error) return { error: { _form: [error.message] } };

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/timeline");
  redirect("/admin/timeline");
}

export async function deleteTimelineItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("timeline").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete timeline item:", error.message);
    return;
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/timeline");
}