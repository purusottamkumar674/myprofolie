import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";

export function ProjectArtwork({ project, large = false }: { project: Project; large?: boolean }) {
  const initials = project.title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <div
      className={`project-artwork ${large ? "project-artwork--large" : ""}`}
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      {project.cover_url ? <img src={project.cover_url} alt={`${project.title} website preview`} className="project-artwork__image" loading="lazy" /> : null}
      <div className="project-artwork__grid" />
      <div className="project-artwork__glow" />
      <div className="project-artwork__topline">
        <span>{String(project.display_order).padStart(2, "0")}</span>
        <span>{project.category}</span>
      </div>
      <div className="project-artwork__mark">{initials}</div>
      <div className="project-artwork__window">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <span className="flex gap-1"><i /><i /><i /></span>
          <span className="text-[7px] uppercase tracking-[0.2em] text-white/25">{project.slug}.app</span>
        </div>
        <div className="grid h-full grid-cols-[.36fr_1fr] gap-2 p-2.5">
          <div className="rounded-md bg-white/[0.045] p-1.5"><span className="block h-1.5 w-3/4 rounded-full bg-white/10" /><span className="mt-2 block h-1.5 w-1/2 rounded-full bg-white/[0.07]" /><span className="mt-2 block h-1.5 w-2/3 rounded-full bg-white/[0.07]" /></div>
          <div className="grid grid-cols-2 gap-2"><span /><span /><span className="col-span-2" /></div>
        </div>
      </div>
      <ArrowUpRight className="project-artwork__arrow" />
    </div>
  );
}
