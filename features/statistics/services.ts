import { createClient } from "@/lib/supabase/server";
import type { Statistic } from "@/types/content";

export async function getStatistics(): Promise<Statistic[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("statistics")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to load statistics: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    label: row.label,
    value: row.value,
    suffix: row.suffix ?? undefined,
  }));
}