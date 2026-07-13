"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { settingFormSchema, type ActionState } from "@/features/settings/admin-schema";

export async function createSetting(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = settingFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("settings").insert({
    key: parsed.data.key,
    value: parsed.data.value,
    description: parsed.data.description || null,
  });

  if (error) {
    // Postgres unique-violation code — the key already exists, since it's
    // the table's primary key rather than a generated id.
    if (error.code === "23505") {
      return { error: { key: ["A setting with this key already exists."] } };
    }
    return { error: { _form: [error.message] } };
  }

  revalidatePath("/admin/settings");
  redirect("/admin/settings");
}

export async function updateSetting(key: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  const value = formData.get("value") as string;
  const description = formData.get("description") as string;

  const supabase = await createClient();
  const { error } = await supabase
    .from("settings")
    .update({ value, description: description || null, updated_at: new Date().toISOString() })
    .eq("key", key);

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath("/admin/settings");
  redirect("/admin/settings");
}

export async function deleteSetting(key: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("settings").delete().eq("key", key);

  if (error) {
    console.error("Failed to delete setting:", error.message);
    return;
  }

  revalidatePath("/admin/settings");
}