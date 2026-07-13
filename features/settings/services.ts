import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

type SettingRow = Database["public"]["Tables"]["settings"]["Row"];

export interface Setting {
  key: string;
  value: string;
  description: string | null;
  updatedAt: string;
}

export async function getAllSettingsAdmin(): Promise<Setting[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("settings").select("*").order("key", { ascending: true });

  if (error) throw new Error(`Failed to load settings: ${error.message}`);
  return (data ?? []).map(mapSettingRow);
}

export async function getSettingByKeyAdmin(key: string): Promise<Setting | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("settings").select("*").eq("key", key).maybeSingle();

  if (error) throw new Error(`Failed to load setting: ${error.message}`);
  return data ? mapSettingRow(data) : null;
}

// Public-facing helper for future consumers (e.g. a maintenance banner) —
// returns null rather than throwing if the key doesn't exist, since a
// missing setting should degrade gracefully, not break the page.
export async function getSettingValue(key: string): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("value").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

function mapSettingRow(row: SettingRow): Setting {
  return {
    key: row.key,
    value: row.value,
    description: row.description,
    updatedAt: row.updated_at,
  };
}