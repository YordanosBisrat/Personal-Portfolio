import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="focus-ring glass-card group block p-6 transition-transform hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-foreground-secondary">{project.category}</p>
          <h3 className="mt-2 font-display text-xl">{project.title}</h3>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-foreground-secondary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>

      <p className="mt-3 text-sm text-foreground-secondary">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.slice(0, 4).map((tech) => (
          <span key={tech} className="rounded-full border px-2.5 py-1 text-xs text-foreground-secondary" style={{ borderColor: "var(--color-border-glass)" }}>
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}