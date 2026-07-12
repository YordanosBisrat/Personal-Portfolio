import { createClient } from "@/lib/supabase/server";
import type { TimelineItem } from "@/types/content";

export async function getTimeline(): Promise<TimelineItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("timeline")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to load timeline: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    label: row.label,
    date: row.date,
    description: row.description ?? undefined,
  }));
}