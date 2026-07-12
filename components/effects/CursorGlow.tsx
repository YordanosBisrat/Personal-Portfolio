"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip entirely on touch devices — cursor effects have no meaning there
    // and the listener would just waste cycles.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let x = 0, y = 0;
    let frame: number;

    const handleMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const render = () => {
      glow.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handleMove);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full opacity-[0.07] blur-[100px]"
      style={{ backgroundColor: "var(--color-accent)" }}
    />
  );
}