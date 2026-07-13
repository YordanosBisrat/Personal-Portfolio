import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

type ContactMessageRow = Database["public"]["Tables"]["contact_messages"]["Row"];

export interface AdminContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export async function getAllMessagesAdmin(): Promise<AdminContactMessage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to load messages: ${error.message}`);

  return (data ?? []).map(mapMessageRow);
}

function mapMessageRow(row: ContactMessageRow): AdminContactMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    isRead: row.is_read,
    createdAt: row.created_at,
  };
}