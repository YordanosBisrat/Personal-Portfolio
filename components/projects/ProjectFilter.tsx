"use client";

import type { ProjectCategory } from "@/types/content";

const filters: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
  { key: "systems", label: "Systems" },
  { key: "graphics", label: "Graphics" },
];

export function ProjectFilter({ active, onChange }: { active: ProjectCategory | "all"; onChange: (val: ProjectCategory | "all") => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button key={f.key} onClick={() => onChange(f.key)} className="focus-ring rounded-full px-4 py-1.5 text-sm transition-colors" style={active === f.key ? { backgroundColor: "var(--color-accent)", color: "#151311" } : { border: "1px solid var(--color-border-glass)", color: "var(--color-text-secondary)" }}>
          {f.label}
        </button>
      ))}
    </div>
  );
}