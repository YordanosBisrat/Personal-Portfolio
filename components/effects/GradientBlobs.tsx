export function GradientBlobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px] animate-blob-float-slow"
        style={{ backgroundColor: "var(--color-accent)" }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px] animate-blob-float-slower"
        style={{ backgroundColor: "var(--color-accent-hover)" }}
      />
    </div>
  );
}