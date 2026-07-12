"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Skill, SkillCategory } from "@/types/content";

const categories: { key: SkillCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "languages", label: "Languages" },
  { key: "mobile", label: "Mobile" },
  { key: "database", label: "Database" },
  { key: "ai", label: "AI / Data" },
  { key: "tools", label: "Tools" },
];

function SkillRing({ percentage }: { percentage: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="shrink-0">
      <circle cx="32" cy="32" r={radius} fill="none" stroke="var(--color-border-glass)" strokeWidth="4" />
      <motion.circle
        cx="32"
        cy="32"
        r={radius}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        transform="rotate(-90 32 32)"
      />
      <text x="32" y="37" textAnchor="middle" className="fill-foreground text-xs font-medium">
        {percentage}%
      </text>
    </svg>
  );
}

export function Skills({ skills }: { skills: Skill[] }) {
  const [active, setActive] = useState<SkillCategory | "all">("all");
  const filtered = active === "all" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-widest text-foreground-secondary">Skills</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">What I build with</h2>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className="focus-ring rounded-full px-4 py-1.5 text-sm transition-colors"
              style={
                active === cat.key
                  ? { backgroundColor: "var(--color-accent)", color: "#151311" }
                  : { border: "1px solid var(--color-border-glass)", color: "var(--color-text-secondary)" }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card flex items-center gap-4 p-5"
            >
              <SkillRing percentage={skill.proficiency} />
              <div>
                <p className="font-medium">{skill.name}</p>
                <p className="text-xs capitalize text-foreground-secondary">{skill.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}