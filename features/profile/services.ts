import { createClient } from "@/lib/supabase/server";
import type { Profile, SocialLink } from "@/types/content";
import type { Database } from "@/types/database.types";

type ProfileRow = Database["public"]["Tables"]["profile"]["Row"];

export interface AdminProfile {
  id: string;
  fullName: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  yearsLearning: number;
  avatarUrl: string | null;
  avatarPath: string | null;
  resumeUrl: string | null;
  resumePath: string | null;
}

export async function getProfileAdmin(): Promise<AdminProfile> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profile").select("*").single();

  if (error || !data) {
    throw new Error(`Failed to load profile: ${error?.message ?? "no row found"}`);
  }

  return mapAdminProfileRow(data);
}

function mapAdminProfileRow(row: ProfileRow): AdminProfile {
  return {
    id: row.id,
    fullName: row.full_name,
    title: row.title,
    bio: row.bio,
    location: row.location,
    email: row.email,
    yearsLearning: row.years_learning,
    avatarUrl: row.avatar_url,
    avatarPath: row.avatar_path,
    resumeUrl: row.resume_url,
    resumePath: row.resume_path,
  };
}

export async function getProfile(): Promise<Profile> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profile").select("*").single();

  if (error || !data) {
    throw new Error(`Failed to load profile: ${error?.message ?? "no row found"}`);
  }

  return {
    fullName: data.full_name,
    title: data.title,
    bio: data.bio,
    location: data.location,
    email: data.email,
    resumeUrl: data.resume_url ?? "#",
    yearsLearning: data.years_learning,
    avatarUrl: data.avatar_url ?? null,
  };
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to load social links: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    platform: row.platform as SocialLink["platform"],
    url: row.url,
    label: row.label,
  }));
}