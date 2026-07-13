"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { projectFormSchema, type ActionState } from "@/features/projects/admin-schema";

function parseLines(value: string): string[] {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

function parseForm(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  return projectFormSchema.safeParse({
    ...raw,
    isFeatured: raw.isFeatured === "on",
    sortOrder: raw.sortOrder || "0",
  });
}

export async function createProject(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("projects").insert({
    slug: parsed.data.slug,
    title: parsed.data.title,
    category: parsed.data.category,
    summary: parsed.data.summary,
    problem: parsed.data.problem,
    solution: parsed.data.solution,
    features: parseLines(parsed.data.features),
    challenges: parsed.data.challenges,
    lessons: parsed.data.lessons,
    tech_stack: parseLines(parsed.data.techStack),
    github_url: parsed.data.githubUrl || null,
    demo_url: parsed.data.demoUrl || null,
    is_featured: parsed.data.isFeatured,
    status: parsed.data.status,
    sort_order: parsed.data.sortOrder,
  });

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${parsed.data.slug}`);
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({
      slug: parsed.data.slug,
      title: parsed.data.title,
      category: parsed.data.category,
      summary: parsed.data.summary,
      problem: parsed.data.problem,
      solution: parsed.data.solution,
      features: parseLines(parsed.data.features),
      challenges: parsed.data.challenges,
      lessons: parsed.data.lessons,
      tech_stack: parseLines(parsed.data.techStack),
      github_url: parsed.data.githubUrl || null,
      demo_url: parsed.data.demoUrl || null,
      is_featured: parsed.data.isFeatured,
      status: parsed.data.status,
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", id);

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${parsed.data.slug}`);
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string, slug: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete project:", error.message);
    return;
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin/projects");
}