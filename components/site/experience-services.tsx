"use client";

import {
  Boxes,
  Cable,
  Code2,
  Database,
  Gauge,
  Layers3,
  LayoutDashboard,
  MonitorSmartphone,
  PanelsTopLeft,
  Rocket,
  ShieldCheck,
  TrendingUp,
  WandSparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { Experience, Service } from "@/lib/types";

const iconMap = {
  Layers3,
  Code2,
  PanelsTopLeft,
  LayoutDashboard,
  Database,
  ShieldCheck,
  MonitorSmartphone,
  WandSparkles,
  Rocket,
  Boxes,
  Cable,
  Gauge,
  TrendingUp,
};

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="section-pad relative z-10">
      <div className="page-shell grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow="Experience" title="Work shaped by shipping, learning, and improving." copy="A concise view of the roles and product areas behind the project archive." />
        </div>
        <div className="relative">
          <span className="absolute bottom-0 left-[11px] top-4 w-px bg-gradient-to-b from-violet-400 via-white/10 to-transparent" />
          {experience.map((item, index) => (
            <Reveal key={item.id} className="relative pb-12 pl-12 last:pb-0" delay={index * 0.05}>
              <motion.span
                className="absolute left-0 top-2 grid size-6 place-items-center rounded-full border border-violet-300/30 bg-[#101018]"
                whileInView={{ boxShadow: "0 0 26px rgba(139,109,255,.55)" }}
                viewport={{ once: true }}
              >
                <span className="size-1.5 rounded-full bg-violet-300" />
              </motion.span>
              <div className="experience-card">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.18em] text-teal-300/75">{item.company}</p>
                    <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{item.role}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] text-white/38">{item.period}</span>
                </div>
                <p className="mt-5 text-sm leading-7 text-white/47 sm:text-base">{item.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{item.technologies.map((tech) => <span className="tech-pill" key={tech}>{tech}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" className="section-pad relative z-10">
      <div className="page-shell">
        <SectionHeading eyebrow="Services" title="From a blank page to a dependable product." copy="Focused development services that can work independently or as one complete delivery path." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Code2;
            return (
              <Reveal key={service.id} delay={(index % 4) * 0.045}>
                <motion.article className="service-card" whileHover={{ y: -7 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} data-cursor="EXPLORE">
                  <div className="mb-10 flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-violet-400/20 bg-violet-400/[0.08] text-violet-300"><Icon size={20} /></span>
                    <span className="font-mono text-[10px] text-white/20">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/42">{service.description}</p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const process = [
  ["Understand", "Clarify the goal, audience, content, constraints, and success criteria."],
  ["Plan", "Shape the architecture, data, user journeys, and delivery sequence."],
  ["Design", "Create a visual system and interaction direction around the real product."],
  ["Develop", "Build reusable UI, secure workflows, integrations, and content controls."],
  ["Test", "Check responsive behavior, permissions, edge states, performance, and build quality."],
  ["Launch", "Deploy, connect the domain, verify production, and hand over clear setup notes."],
];

export function ProcessSection() {
  return (
    <section className="section-pad relative z-10 overflow-hidden">
      <div className="page-shell">
        <SectionHeading eyebrow="Process" title="A clear path from idea to launch." align="center" />
        <div className="relative mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {process.map(([title, description], index) => (
            <Reveal key={title} delay={(index % 3) * 0.06}>
              <article className="process-card">
                <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/43">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
