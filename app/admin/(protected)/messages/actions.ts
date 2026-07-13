"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function markMessageRead(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);

  if (error) {
    console.error("Failed to mark message read:", error.message);
    return;
  }

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete message:", error.message);
    return;
  }

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}