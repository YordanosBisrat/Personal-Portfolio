import { SiGithub } from "@icons-pack/react-simple-icons";

export function GithubActivity() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-widest text-foreground-secondary">GitHub Activity</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">Recent contributions</h2>

        <div className="glass-card mt-8 flex flex-col items-center justify-center gap-3 p-12 text-center">
          <SiGithub className="h-8 w-8 text-foreground-secondary" />
          <p className="text-sm text-foreground-secondary">
            Live contribution graph connects once the GitHub API is wired up in Phase 5.
          </p>
          <a href="https://github.com/YordanosBisrat" target="_blank" rel="noreferrer" className="focus-ring text-sm underline" style={{ color: "var(--color-accent)" }}>
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}