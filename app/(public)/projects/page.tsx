import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { getProjects } from "@/features/projects/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Featured projects across web, mobile, systems, and graphics.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-foreground-secondary">Projects</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">Things I&apos;ve built</h1>
      <ProjectsGrid projects={projects} />
    </div>
  );
}