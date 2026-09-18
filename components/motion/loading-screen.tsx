"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete, enabled = true }: { onComplete: () => void; enabled?: boolean }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = sessionStorage.getItem("portfolio-intro-seen");
    if (!enabled || reduced || alreadySeen) {
      setVisible(false);
      setProgress(100);
      onComplete();
      return;
    }

    const started = performance.now();
    const duration = 1450;
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(Math.round(eased * 100));
      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("portfolio-intro-seen", "1");
        window.setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 250);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enabled, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-[#07070a]"
          exit={{ y: "-105%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-live="polite"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(139,109,255,.18),transparent_42%)]" />
          <div className="relative w-[min(82vw,640px)]">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.32em] text-white/45">Initializing portfolio</p>
                <p className="font-display text-2xl font-semibold text-white sm:text-4xl">Building digital experiences</p>
              </div>
              <span className="font-mono text-4xl font-light tabular-nums text-violet-300 sm:text-7xl">{progress}</span>
            </div>
            <div className="h-px overflow-hidden bg-white/10">
              <motion.div className="h-full origin-left bg-gradient-to-r from-violet-500 to-teal-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
