import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

type NowPageRow = Database["public"]["Tables"]["now_page"]["Row"];
type NowPageUpdate = Database["public"]["Tables"]["now_page"]["Update"];

export interface NowPageContent {
  id: string;
  currentlyLearning: string;
  currentlyBuilding: string;
  currentlyReading: string;
  currentGoals: string[];
  updatedAt: string;
}

export async function getNowPage(): Promise<NowPageContent> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("now_page").select("*").single();

  if (error || !data) {
    throw new Error(`Failed to load now page: ${error?.message ?? "no row found"}`);
  }

  return mapNowPageRow(data);
}

export async function updateNowPage(id: string, updates: NowPageUpdate) {
  const supabase = await createClient();
  return supabase.from("now_page").update(updates).eq("id", id);
}

function mapNowPageRow(row: NowPageRow): NowPageContent {
  return {
    id: row.id,
    currentlyLearning: row.currently_learning,
    currentlyBuilding: row.currently_building,
    currentlyReading: row.currently_reading,
    currentGoals: row.current_goals as string[],
    updatedAt: row.updated_at,
  };
}