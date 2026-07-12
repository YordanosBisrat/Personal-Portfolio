"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/mock-data";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import type { ProjectCategory } from "@/types/content";

export default function ProjectsPage() {
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-foreground-secondary">Projects</p>
<h1 className="mt-2 font-display text-3xl md:text-4xl">Things I&apos;ve built</h1>

      <div className="mt-8">
        <ProjectFilter active={active} onChange={setActive} />
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <motion.div key={project.slug} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}