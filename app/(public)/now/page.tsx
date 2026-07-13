import { getNowPage } from "@/features/now/services";
import { BookOpen, Hammer, GraduationCap, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm currently learning, building, and reading.",
};

export default async function NowPage() {
  const content = await getNowPage();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-foreground-secondary">Now</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">What I&apos;m up to</h1>
      <p className="mt-2 text-sm text-foreground-secondary">
        Last updated {new Date(content.updatedAt).toLocaleDateString()}
      </p>

      <div className="mt-10 space-y-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" style={{ color: "var(--color-accent)" }} />
            <h2 className="font-display text-lg">Currently Learning</h2>
          </div>
          <p className="mt-3 text-foreground-secondary">{content.currentlyLearning}</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-2">
            <Hammer className="h-5 w-5" style={{ color: "var(--color-accent)" }} />
            <h2 className="font-display text-lg">Currently Building</h2>
          </div>
          <p className="mt-3 text-foreground-secondary">{content.currentlyBuilding}</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" style={{ color: "var(--color-accent)" }} />
            <h2 className="font-display text-lg">Currently Reading</h2>
          </div>
          <p className="mt-3 text-foreground-secondary">{content.currentlyReading}</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" style={{ color: "var(--color-accent)" }} />
            <h2 className="font-display text-lg">Current Goals</h2>
          </div>
          <ul className="mt-3 space-y-1">
            {content.currentGoals.map((goal) => (
              <li key={goal} className="text-foreground-secondary">— {goal}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}