import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import type { Metadata } from "next";
import { getProjects, getProjectBySlug } from "@/features/projects/services";
import type { Project } from "@/types/content";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p: Project) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link href="/projects" className="focus-ring inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>

      <p className="mt-8 text-sm uppercase tracking-widest text-foreground-secondary">{project.category}</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">{project.title}</h1>
      <p className="mt-4 text-foreground-secondary">{project.summary}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="focus-ring glass-card inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
            <SiGithub className="h-4 w-4" /> Source
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
            <ExternalLink className="h-4 w-4" /> Live Demo
          </a>
        )}
      </div>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="font-display text-xl">Problem</h2>
          <p className="mt-2 text-foreground-secondary">{project.problem}</p>
        </section>
        <section>
          <h2 className="font-display text-xl">Solution</h2>
          <p className="mt-2 text-foreground-secondary">{project.solution}</p>
        </section>
        <section>
          <h2 className="font-display text-xl">Features</h2>
          <ul className="mt-2 space-y-1">
            {project.features.map((f: string) => (
              <li key={f} className="text-foreground-secondary">— {f}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl">Challenges</h2>
          <p className="mt-2 text-foreground-secondary">{project.challenges}</p>
        </section>
        <section>
          <h2 className="font-display text-xl">Lessons Learned</h2>
          <p className="mt-2 text-foreground-secondary">{project.lessons}</p>
        </section>
        <section>
          <h2 className="font-display text-xl">Tech Stack</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.map((tech: string) => (
              <span key={tech} className="rounded-full border px-3 py-1 text-sm text-foreground-secondary" style={{ borderColor: "var(--color-border-glass)" }}>
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}