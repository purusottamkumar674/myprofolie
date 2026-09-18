"use client";

import { motion, useInView } from "framer-motion";
import { Check, Copy, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Achievement } from "@/lib/types";

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  return (
    <section id="achievements" className="section-pad relative z-10">
      <div className="page-shell">
        <SectionHeading eyebrow="By the numbers" title="A growing archive of systems and interfaces." align="center" />
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {achievements.map((achievement, index) => (
            <Reveal key={achievement.id} delay={index * 0.05}>
              <div className="achievement-card">
                <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">Metric {String(index + 1).padStart(2, "0")}</span>
                <div className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.06em] text-white">
                  <Counter value={achievement.value} />{achievement.suffix}
                </div>
                <p className="mt-2 text-sm text-white/42">{achievement.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }
    const started = performance.now();
    const duration = 1100;
    let frame = 0;
    const tick = (time: number) => {
      const progress = Math.min((time - started) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return <span ref={ref}>{count}</span>;
}

const lines: Array<[string, React.ReactNode]> = [
  ["01", <><span className="code-purple">const</span> <span className="code-blue">approach</span> = {"{"}</>],
  ["02", <><span className="code-pink">understand</span>: <span className="code-green">&quot;the real workflow&quot;</span>,</>],
  ["03", <><span className="code-pink">design</span>: <span className="code-green">&quot;for clarity and character&quot;</span>,</>],
  ["04", <><span className="code-pink">build</span>: [<span className="code-green">&quot;secure&quot;</span>, <span className="code-green">&quot;fast&quot;</span>, <span className="code-green">&quot;scalable&quot;</span>],</>],
  ["05", <><span className="code-pink">test</span>: <span className="code-green">&quot;every meaningful path&quot;</span>,</>],
  ["06", <><span className="code-pink">ship</span>: <span className="code-green">true</span>,</>],
  ["07", <>{"}"};</>],
];

export function CodeManifest() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText("Understand. Design. Build. Test. Ship.");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };
  return (
    <section className="section-pad relative z-10">
      <div className="page-shell grid items-center gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <SectionHeading eyebrow="How I think" title="Clean code is only useful when it solves the right problem." copy="The best implementation joins product thinking, interaction quality, secure data, and careful delivery." />
        <Reveal>
          <motion.div className="code-manifest" whileHover={{ rotateX: 1.2, rotateY: -1.2 }} transition={{ type: "spring", stiffness: 100, damping: 18 }}>
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2 text-xs text-white/35"><Terminal size={15} className="text-teal-300" /> product-thinking.ts</div>
              <button type="button" onClick={copy} className="mini-action" aria-label="Copy development approach">{copied ? <Check size={15} /> : <Copy size={15} />}</button>
            </div>
            <div className="p-5 font-mono text-xs leading-7 sm:p-8 sm:text-sm sm:leading-8">
              {lines.map(([number, code], index) => (
                <motion.div key={number} className="flex text-white/72" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}>
                  <span className="mr-5 select-none text-white/18">{number}</span>
                  <span className={index > 0 && index < 6 ? "pl-4" : ""}>{code}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
