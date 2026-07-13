import { createClient } from "@/lib/supabase/server";
import type { Skill } from "@/types/content";
import type { Database } from "@/types/database.types";

type SkillRow = Database["public"]["Tables"]["skills"]["Row"];

export interface AdminSkill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  sortOrder: number;
}

export async function getAllSkillsAdmin(): Promise<AdminSkill[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("skills").select("*").order("sort_order", { ascending: true });

  if (error) throw new Error(`Failed to load skills: ${error.message}`);

  return (data ?? []).map(mapAdminSkillRow);
}

export async function getSkillByIdAdmin(id: string): Promise<AdminSkill | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("skills").select("*").eq("id", id).maybeSingle();

  if (error) throw new Error(`Failed to load skill: ${error.message}`);

  return data ? mapAdminSkillRow(data) : null;
}

function mapAdminSkillRow(row: SkillRow): AdminSkill {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    proficiency: row.proficiency,
    sortOrder: row.sort_order,
  };
}

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