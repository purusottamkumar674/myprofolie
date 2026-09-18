"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { LoadingScreen } from "@/components/motion/loading-screen";
import type { SiteSettings } from "@/lib/types";

export function MotionProvider({ children, settings }: { children: React.ReactNode; settings: SiteSettings }) {
  const [ready, setReady] = useState(false);
  const complete = useCallback(() => setReady(true), []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || touch || !settings.animationsEnabled || !settings.smoothScroll) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [settings.animationsEnabled, settings.smoothScroll]);

  return (
    <MotionConfig reducedMotion={settings.animationsEnabled ? "user" : "always"}>
      <LoadingScreen onComplete={complete} enabled={settings.animationsEnabled} />
      <CustomCursor enabled={settings.cursorEffect && settings.animationsEnabled} />
      <div className={ready ? "site-ready" : "site-waiting"}>{children}</div>
    </MotionConfig>
  );
}
