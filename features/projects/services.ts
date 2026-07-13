import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types/content";
import { createStaticClient } from "@/lib/supabase/static";
import type { AdminProject } from "@/features/projects/types";
import type { Database } from "@/types/database.types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to load projects: ${error.message}`);
  }

  return (data ?? []).map(mapProjectRow);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load project "${slug}": ${error.message}`);
  }

  return data ? mapProjectRow(data) : null;
}

function mapProjectRow(row: {
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  features: unknown;
  challenges: string;
  lessons: string;
  tech_stack: unknown;
  github_url: string | null;
  demo_url: string | null;
  is_featured: boolean;
}): Project {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category as Project["category"],
    summary: row.summary,
    problem: row.problem,
    solution: row.solution,
    features: row.features as string[],
    challenges: row.challenges,
    lessons: row.lessons,
    techStack: row.tech_stack as string[],
    githubUrl: row.github_url ?? undefined,
    demoUrl: row.demo_url ?? undefined,
    isFeatured: row.is_featured,
  };
}

export async function getProjectSlugs(): Promise<string[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("projects")
    .select("slug")
    .eq("status", "published");

  if (error) {
    throw new Error(`Failed to load project slugs: ${error.message}`);
  }

  return (data ?? []).map((row) => row.slug);
}

export async function getAllProjectsAdmin(): Promise<AdminProject[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to load projects: ${error.message}`);
  }

  return (data ?? []).map(mapAdminProjectRow);
}

export async function getProjectByIdAdmin(id: string): Promise<AdminProject | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();

  if (error) {
    throw new Error(`Failed to load project: ${error.message}`);
  }

  return data ? mapAdminProjectRow(data) : null;
}

function mapAdminProjectRow(row: ProjectRow): AdminProject {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    summary: row.summary,
    problem: row.problem,
    solution: row.solution,
    features: row.features as string[],
    challenges: row.challenges,
    lessons: row.lessons,
    techStack: row.tech_stack as string[],
    githubUrl: row.github_url,
    demoUrl: row.demo_url,
    isFeatured: row.is_featured,
    status: row.status as "draft" | "published",
    sortOrder: row.sort_order,
  };
}