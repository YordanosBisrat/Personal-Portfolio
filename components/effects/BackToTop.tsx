"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="focus-ring glass-card fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full transition-opacity hover:opacity-80"
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4" style={{ color: "var(--color-accent)" }} />
    </button>
  );
}