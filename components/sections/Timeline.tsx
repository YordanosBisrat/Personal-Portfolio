import { timeline } from "@/lib/mock-data";

export function Timeline() {
  return (
    <section id="timeline" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-widest text-foreground-secondary">Learning Journey</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">How I got here</h2>

        <div className="relative mt-12 border-l pl-8" style={{ borderColor: "var(--color-border-glass)" }}>
          {timeline.map((item) => (
            <div key={item.id} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
              <p className="text-xs text-foreground-secondary">{item.date}</p>
              <p className="mt-1 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}