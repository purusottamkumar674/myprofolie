"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground({ animated = true }: { animated?: boolean }) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated) return;
    const move = (event: PointerEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.setProperty("--mouse-x", `${event.clientX}px`);
      glowRef.current.style.setProperty("--mouse-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [animated]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#09090d]" />
      <div className="background-grid absolute inset-0 opacity-55" />
      {animated ? <div ref={glowRef} className="pointer-glow absolute inset-0" /> : null}
      {animated ? <><div className="ambient-orb ambient-orb--one" /><div className="ambient-orb ambient-orb--two" /></> : null}
      <div className="noise absolute inset-0 opacity-[0.035]" />
    </div>
  );
}
