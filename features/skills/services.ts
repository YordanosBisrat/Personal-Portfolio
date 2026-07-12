import { createClient } from "@/lib/supabase/server";
import type { Skill } from "@/types/content";

export async function getSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to load skills: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    category: row.category as Skill["category"],
    proficiency: row.proficiency,
  }));
}