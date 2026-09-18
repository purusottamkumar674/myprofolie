"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github, Layers3 } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ProjectArtwork } from "@/components/site/project-artwork";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/lib/types";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((project) => project.category)))], [projects]);
  const filtered = active === "All" ? projects : projects.filter((project) => project.category === active);
  const visible = showAll || active !== "All" ? filtered : filtered.slice(0, 16);
  const featured = projects.filter((project) => project.featured).slice(0, 8);

  const moveRail = (direction: number) => {
    railRef.current?.scrollBy({ left: direction * Math.min(window.innerWidth * 0.75, 760), behavior: "smooth" });
  };

  return (
    <section id="projects" className="section-pad relative z-10 overflow-hidden">
      <div className="page-shell">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects built around real workflows."
            copy="From public brand experiences to private operations platforms, each project is shaped around a clear job to be done."
          />
          <Reveal className="hidden items-center gap-2 md:flex">
            <button type="button" className="rail-button" onClick={() => moveRail(-1)} aria-label="Previous featured projects"><ArrowLeft size={18} /></button>
            <button type="button" className="rail-button" onClick={() => moveRail(1)} aria-label="Next featured projects"><ArrowRight size={18} /></button>
          </Reveal>
        </div>

        <Reveal className="-mx-5 mt-12 sm:-mx-8 lg:-mx-12" delay={0.08}>
          <div ref={railRef} className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12">
            {featured.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group w-[86vw] max-w-[740px] shrink-0 snap-center"
                data-cursor="VIEW"
              >
                <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-2 transition duration-500 group-hover:-translate-y-1 group-hover:border-white/20">
                  <ProjectArtwork project={project} large />
                  <div className="grid gap-5 px-4 pb-5 pt-5 sm:grid-cols-[1fr_auto] sm:items-end sm:px-6 sm:pb-6">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">Featured {String(index + 1).padStart(2, "0")} · {project.year}</p>
                      <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{project.title}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-white/48 sm:text-base">{project.summary}</p>
                    </div>
                    <span className="grid size-12 place-items-center rounded-full border border-white/10 text-white transition group-hover:rotate-45 group-hover:border-teal-300/50 group-hover:bg-teal-300 group-hover:text-black">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14" delay={0.12}>
          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActive(category);
                  setShowAll(category !== "All");
                }}
                className={`filter-chip ${active === category ? "filter-chip--active" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.97 }}
                transition={{ duration: 0.42, delay: Math.min(index * 0.035, 0.25) }}
                className="project-card group"
              >
                <Link href={`/projects/${project.slug}`} className="block" data-cursor="VIEW">
                  <ProjectArtwork project={project} />
                  <div className="p-5 sm:p-6">
                    <div className="mb-3 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.16em] text-white/35">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="flex items-start justify-between gap-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {project.title}
                      <ArrowUpRight className="mt-1 shrink-0 text-white/30 transition duration-300 group-hover:rotate-45 group-hover:text-teal-300" size={19} />
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/45">{project.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((item) => <span className="tech-pill" key={item}>{item}</span>)}
                    </div>
                  </div>
                </Link>
                <div className="flex items-center gap-3 border-t border-white/[0.07] px-5 py-4 sm:px-6">
                  <span className={`status-badge status-badge--${project.status.toLowerCase().replaceAll(" ", "-")}`}>{project.status}</span>
                  <span className="ml-auto flex gap-2">
                    {project.github_url ? <Link href={project.github_url} target="_blank" className="mini-action" aria-label={`${project.title} GitHub`}><Github size={15} /></Link> : null}
                    {project.live_url ? <Link href={project.live_url} target="_blank" rel="noopener noreferrer" className="mini-action" aria-label={`Visit ${project.title}`} data-cursor="VISIT"><ExternalLink size={15} /></Link> : null}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {active === "All" && projects.length > 16 ? (
          <Reveal className="mt-9 flex justify-center">
            <button type="button" onClick={() => setShowAll((value) => !value)} className="secondary-button" data-cursor="OPEN">
              <Layers3 size={17} /> {showAll ? "Show selected projects" : `Show all ${projects.length} projects`}
            </button>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
