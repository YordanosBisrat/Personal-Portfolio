"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";

export function MagneticButton({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setOffset({
      x: (e.clientX - rect.left - rect.width / 2) * 0.25,
      y: (e.clientY - rect.top - rect.height / 2) * 0.25,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className={className}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, transition: "transform 0.15s ease-out" }}
    >
      {children}
    </div>
  );
}