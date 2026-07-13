import { createClient } from "@/lib/supabase/server";
import type { TimelineItem } from "@/types/content";
import type { Database } from "@/types/database.types";

type TimelineRow = Database["public"]["Tables"]["timeline"]["Row"];

export interface AdminTimelineItem {
  id: string;
  label: string;
  date: string;
  description: string | null;
  sortOrder: number;
}

export async function getAllTimelineAdmin(): Promise<AdminTimelineItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("timeline").select("*").order("sort_order", { ascending: true });

  if (error) throw new Error(`Failed to load timeline: ${error.message}`);

  return (data ?? []).map(mapAdminTimelineRow);
}

export async function getTimelineItemByIdAdmin(id: string): Promise<AdminTimelineItem | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("timeline").select("*").eq("id", id).maybeSingle();

  if (error) throw new Error(`Failed to load timeline item: ${error.message}`);

  return data ? mapAdminTimelineRow(data) : null;
}

function mapAdminTimelineRow(row: TimelineRow): AdminTimelineItem {
  return {
    id: row.id,
    label: row.label,
    date: row.date,
    description: row.description,
    sortOrder: row.sort_order,
  };
}

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