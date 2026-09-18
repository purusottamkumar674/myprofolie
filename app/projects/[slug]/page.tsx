import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, Github, Layers3 } from "lucide-react";
import { AnimatedBackground } from "@/components/motion/animated-background";
import { Footer } from "@/components/site/contact-footer";
import { Navbar } from "@/components/site/navbar";
import { ProjectArtwork } from "@/components/site/project-artwork";
import { Reveal } from "@/components/ui/reveal";
import { fallbackProjects } from "@/lib/data/fallback";
import { getPortfolioData, getProjectBySlug } from "@/lib/data/portfolio";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return fallbackProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, portfolio] = await Promise.all([getProjectBySlug(slug), getPortfolioData()]);
  if (!project) notFound();
  const related = portfolio.projects
    .filter((item) => item.id !== project.id && item.category === project.category)
    .slice(0, 3);

  return (
    <div
      className="min-h-screen bg-[#09090d] text-white"
      style={{ "--primary": portfolio.settings.primaryColor, "--accent": portfolio.settings.accentColor } as React.CSSProperties}
    >
      <AnimatedBackground animated={portfolio.settings.backgroundAnimation} />
      <Navbar settings={portfolio.settings} socials={portfolio.socialLinks} />
      <main className="relative z-10">
        <section className="pb-16 pt-32 sm:pt-40">
          <div className="page-shell">
            <Reveal>
              <Link href="/#projects" className="mb-10 inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white" data-cursor="BACK">
                <ArrowLeft size={16} /> Back to projects
              </Link>
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <div className="mb-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/35">
                    <span>{project.category}</span><span>·</span><span>{project.year}</span><span>·</span>
                    <span className={"status-badge status-badge--" + project.status.toLowerCase().replaceAll(" ", "-")}>{project.status}</span>
                  </div>
                  <h1 className="max-w-5xl font-display text-[clamp(3.7rem,9vw,9.5rem)] font-semibold leading-[.86] tracking-[-0.065em] text-white">{project.title}</h1>
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.live_url ? <Link href={project.live_url} target="_blank" rel="noopener noreferrer" className="primary-button" data-cursor="VISIT">Live website <ExternalLink size={17} /></Link> : null}
                  {project.github_url ? <Link href={project.github_url} target="_blank" className="secondary-button" data-cursor="CODE">GitHub <Github size={17} /></Link> : null}
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-12" delay={0.08}>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-2">
                <ProjectArtwork project={project} large />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-pad pt-10">
          <div className="page-shell grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <Reveal>
              <p className="section-kicker">Project overview</p>
              <p className="text-2xl font-medium leading-[1.5] tracking-[-0.025em] text-white sm:text-3xl">{project.summary}</p>
              <div className="mt-8 flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="tech-pill">{technology}</span>)}</div>
            </Reveal>
            <div className="space-y-5">
              <Reveal className="experience-card">
                <span className="mb-5 grid size-10 place-items-center rounded-xl bg-violet-400/[0.1] text-violet-300"><Layers3 size={19} /></span>
                <h2 className="text-xl font-semibold text-white">The context</h2>
                <p className="mt-3 text-base leading-8 text-white/48">{project.description}</p>
              </Reveal>
              <Reveal className="experience-card" delay={0.05}>
                <h2 className="text-xl font-semibold text-white">The problem</h2>
                <p className="mt-3 text-base leading-8 text-white/48">{project.problem}</p>
              </Reveal>
              <Reveal className="experience-card" delay={0.08}>
                <h2 className="text-xl font-semibold text-white">The solution</h2>
                <p className="mt-3 text-base leading-8 text-white/48">{project.solution}</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-pad border-y border-white/[0.07] bg-white/[0.015]">
          <div className="page-shell">
            <Reveal>
              <p className="section-kicker">Core features</p>
              <h2 className="section-title max-w-4xl">What the product was designed to do.</h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.features.map((feature, index) => (
                <Reveal key={feature} delay={(index % 3) * 0.05}>
                  <div className="service-card flex min-h-0 items-center gap-4">
                    <CheckCircle2 size={19} className="shrink-0 text-teal-300" />
                    <span className="font-medium text-white/78">{feature}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="section-pad">
            <div className="page-shell">
              <Reveal className="flex items-end justify-between gap-6">
                <div><p className="section-kicker">Keep exploring</p><h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Related projects</h2></div>
                <Link href="/#projects" className="secondary-button hidden sm:inline-flex">View all <ArrowUpRight size={17} /></Link>
              </Reveal>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {related.map((item, index) => (
                  <Reveal key={item.id} delay={index * 0.05}>
                    <Link href={"/projects/" + item.slug} className="project-card group block p-2" data-cursor="VIEW">
                      <ProjectArtwork project={item} />
                      <div className="p-4"><p className="text-xs uppercase tracking-[.15em] text-white/30">{item.category}</p><h3 className="mt-2 flex justify-between gap-3 text-lg font-semibold text-white">{item.title}<ArrowUpRight size={18} className="text-white/25 transition group-hover:rotate-45 group-hover:text-teal-300" /></h3></div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer settings={portfolio.settings} socials={portfolio.socialLinks} />
    </div>
  );
}
