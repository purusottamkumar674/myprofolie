"use client";

import { motion } from "framer-motion";
import { Braces, Code2, Database, Globe2, MapPin, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { SiteSettings, Skill } from "@/lib/types";

const orbitTech = ["Next", "React", "TS", "Supabase", "Tailwind", "Git", "Vercel"];

export function AboutSection({ settings }: { settings: SiteSettings }) {
  return (
    <section id="about" className="section-pad relative z-10">
      <div className="page-shell">
        <SectionHeading eyebrow="About me" title="I connect sharp interfaces with solid systems." />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[.88fr_1.12fr]">
          <Reveal className="relative min-h-[450px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 sm:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(139,109,255,.2),transparent_35%),radial-gradient(circle_at_80%_78%,rgba(53,231,194,.13),transparent_30%)]" />
            <div className="background-grid absolute inset-0 opacity-35" />
            <div className="relative flex h-full min-h-[380px] flex-col">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/35">
                <span>Developer profile</span>
                <Braces size={18} className="text-violet-300" />
              </div>
              <div className="my-auto py-12">
                <motion.div
                  whileHover={{ rotate: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 180, damping: 15 }}
                  className="relative mx-auto grid aspect-square w-[min(68vw,250px)] place-items-center rounded-[3rem] border border-white/10 bg-[#101018] shadow-2xl"
                  data-cursor="EXPLORE"
                >
                  <div className="absolute -inset-3 -z-10 rounded-[3.5rem] border border-violet-400/15" />
                  <div className="absolute inset-0 overflow-hidden rounded-[3rem]">
                    <span className="absolute -left-6 top-10 size-28 rounded-full bg-violet-500/20 blur-2xl" />
                    <span className="absolute -right-6 bottom-5 size-28 rounded-full bg-teal-300/15 blur-2xl" />
                  </div>
                  <span className="font-display text-8xl font-black tracking-[-0.09em] text-white">P<span className="text-teal-300">.</span></span>
                  <span className="absolute -right-4 top-7 rounded-2xl border border-white/10 bg-[#171721]/90 p-3 text-violet-300 shadow-xl"><Code2 size={20} /></span>
                  <span className="absolute -bottom-4 left-8 rounded-2xl border border-white/10 bg-[#171721]/90 p-3 text-teal-300 shadow-xl"><Database size={20} /></span>
                </motion.div>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm">
                <span className="text-white/45">Currently</span>
                <span className="flex items-center gap-2 font-medium text-white"><span className="size-2 rounded-full bg-teal-300" />Building useful products</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 sm:p-10" delay={0.08}>
            <p className="max-w-3xl text-2xl font-medium leading-[1.45] tracking-[-0.025em] text-white sm:text-3xl lg:text-[2.15rem]">
              {settings.about}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/48">
              I care about the complete path: how a visitor understands a page, how a team manages content, how permissions protect data, and how the final product behaves in production.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <InfoCard icon={<MapPin size={18} />} label="Location" value={settings.location} />
              <InfoCard icon={<Globe2 size={18} />} label="Focus" value="Modern full-stack web products" />
              <InfoCard icon={<Code2 size={18} />} label="Core stack" value="Next.js · TypeScript · Supabase" />
              <InfoCard icon={<Sparkles size={18} />} label="Availability" value={settings.availability} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-black/15 p-4 transition hover:border-violet-400/30 hover:bg-violet-400/[0.04]">
      <div className="mb-5 flex items-center justify-between text-violet-300">{icon}<span className="text-[10px] uppercase tracking-[0.18em] text-white/25">{label}</span></div>
      <p className="text-sm font-medium leading-6 text-white/78">{value}</p>
    </div>
  );
}

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const groups = Array.from(new Set(skills.map((skill) => skill.category)));
  return (
    <section id="skills" className="section-pad relative z-10 overflow-hidden">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Capabilities"
          title="Technology is useful when the experience feels simple."
          copy="A practical toolkit for designing, building, protecting, and shipping complete web products."
        />

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {groups.map((group, groupIndex) => (
              <Reveal key={group} className="skill-group" delay={groupIndex * 0.06}>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{group}</h3>
                  <span className="font-mono text-xs text-white/28">0{groupIndex + 1}</span>
                </div>
                <div className="space-y-5">
                  {skills.filter((skill) => skill.category === group).map((skill) => (
                    <div key={skill.id} className="group">
                      <div className="mb-2 flex justify-between gap-3 text-sm">
                        <span className="font-medium text-white/72 transition group-hover:text-white">{skill.name}</span>
                        <span className="font-mono text-xs text-white/28">{skill.level}%</span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-teal-300"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="tech-orbit" delay={0.12}>
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(139,109,255,.12),transparent_58%)]" />
            <div className="tech-orbit__ring tech-orbit__ring--one" />
            <div className="tech-orbit__ring tech-orbit__ring--two" />
            <div className="tech-orbit__center">
              <Code2 size={30} />
              <span>BUILD</span>
            </div>
            {orbitTech.map((item, index) => {
              const angle = (index / orbitTech.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 38;
              return (
                <motion.span
                  key={item}
                  className="tech-orbit__item"
                  style={{ left: `${50 + Math.cos(angle) * radius}%`, top: `${50 + Math.sin(angle) * radius}%` }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.7, delay: index * 0.28, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.15, zIndex: 5 }}
                >
                  {item}
                </motion.span>
              );
            })}
            <p className="absolute bottom-7 left-1/2 w-full -translate-x-1/2 px-4 text-center text-xs uppercase tracking-[0.18em] text-white/26">An evolving full-stack toolkit</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
