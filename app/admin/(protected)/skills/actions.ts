"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { skillFormSchema, type ActionState } from "@/features/skills/admin-schema";

export async function createSkill(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = skillFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("skills").insert({
    name: parsed.data.name,
    category: parsed.data.category,
    proficiency: parsed.data.proficiency,
    sort_order: parsed.data.sortOrder,
  });

  if (error) return { error: { _form: [error.message] } };

  revalidatePath("/");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function updateSkill(id: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = skillFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("skills")
    .update({
      name: parsed.data.name,
      category: parsed.data.category,
      proficiency: parsed.data.proficiency,
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", id);

  if (error) return { error: { _form: [error.message] } };

  revalidatePath("/");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function deleteSkill(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("skills").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete skill:", error.message);
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin/skills");
}