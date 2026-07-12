import { createClient } from "@/lib/supabase/server";
import type { Profile, SocialLink } from "@/types/content";

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