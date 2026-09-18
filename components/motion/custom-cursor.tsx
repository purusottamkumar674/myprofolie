"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor({ enabled = true }: { enabled?: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;

    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor || "");
    };

    const render = () => {
      cx += (x - cx) * 0.16;
      cy += (y - cy) * 0.16;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", move, { passive: true });
    frame = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={cursorRef} className={`cursor-ring ${label ? "cursor-ring--active" : ""}`}>
        <span>{label}</span>
      </div>
    </>
  );
}
