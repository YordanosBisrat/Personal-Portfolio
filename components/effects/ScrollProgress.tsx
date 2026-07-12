"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{
        transform: `scaleX(${progress / 100})`,
        backgroundColor: "var(--color-accent)",
        transition: "transform 0.1s linear",
      }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}