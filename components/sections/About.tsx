import type { Profile } from "@/types/content";
import { GraduationCap, Target } from "lucide-react";

export function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-widest text-foreground-secondary">About</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">
          Building things end to end, not just the parts that show.
        </h2>

        <p className="mt-6 leading-relaxed text-foreground-secondary">
          {profile.bio} I care about the layer underneath the interface as much as the
          interface itself — clean data models, sensible auth boundaries, and code a
          future teammate can actually follow.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="glass-card p-6">
            <GraduationCap className="h-5 w-5" style={{ color: "var(--color-accent)" }} />
            <p className="mt-3 font-medium">Addis Ababa University</p>
            <p className="text-sm text-foreground-secondary">B.Sc. Software Engineering — SITE | CTBE</p>
          </div>
          <div className="glass-card p-6">
            <Target className="h-5 w-5" style={{ color: "var(--color-accent)" }} />
            <p className="mt-3 font-medium">Currently aiming for</p>
            <p className="text-sm text-foreground-secondary">
              A full-stack internship where I can ship real, used features.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}