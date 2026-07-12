"use client";

import type { Statistic } from "@/types/content";
import { useCountUp } from "@/hooks/use-count-up";

function StatCard({ label, value, suffix }: Statistic) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div ref={ref} className="glass-card p-6 text-center">
      <p className="font-display text-4xl" style={{ color: "var(--color-accent)" }}>
        {animated}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-foreground-secondary">{label}</p>
    </div>
  );
}

export function Stats({ statistics }: { statistics: Statistic[] }) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-5">
        {statistics.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}