import { AboutSection, SkillsSection } from "@/components/site/about-skills";
import { AchievementsSection, CodeManifest } from "@/components/site/achievements-code";
import { AnimatedBackground } from "@/components/motion/animated-background";
import { ContactSection, Footer } from "@/components/site/contact-footer";
import { ExperienceSection, ProcessSection, ServicesSection } from "@/components/site/experience-services";
import { Hero, TechMarquee } from "@/components/site/hero";
import { Navbar } from "@/components/site/navbar";
import { ProjectsSection } from "@/components/site/projects-section";
import { CertificatesSection, TestimonialsSection } from "@/components/site/proof-sections";
import { getPortfolioData } from "@/lib/data/portfolio";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getPortfolioData();
  const socialTitle = settings.ogTitle || settings.seoTitle;
  const socialDescription = settings.ogDescription || settings.seoDescription;
  return {
    title: settings.seoTitle,
    description: settings.seoDescription,
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      images: settings.ogImage ? [settings.ogImage] : [],
    },
    twitter: {
      card: settings.ogImage ? "summary_large_image" : "summary",
      title: socialTitle,
      description: socialDescription,
      images: settings.ogImage ? [settings.ogImage] : [],
    },
  };
}

export default async function HomePage() {
  const data = await getPortfolioData();
  const style = {
    "--primary": data.settings.primaryColor,
    "--accent": data.settings.accentColor,
  } as React.CSSProperties;

  const sectionMap: Record<string, React.ReactNode> = {
    hero: <><Hero settings={data.settings} projectCount={data.projects.length} /><TechMarquee /></>,
    about: <AboutSection settings={data.settings} />,
    skills: <SkillsSection skills={data.skills} />,
    experience: <ExperienceSection experience={data.experience} />,
    projects: <ProjectsSection projects={data.projects} />,
    services: <ServicesSection services={data.services} />,
    process: <ProcessSection />,
    achievements: <AchievementsSection achievements={data.achievements} />,
    code: <CodeManifest />,
    certificates: <CertificatesSection certificates={data.certificates} />,
    testimonials: <TestimonialsSection testimonials={data.testimonials} />,
    contact: <ContactSection settings={data.settings} socials={data.socialLinks} />,
  };

  return (
    <div style={style} className={"min-h-screen bg-[#09090d] text-white " + (!data.settings.animationsEnabled ? "animations-off" : "")}>
      <AnimatedBackground animated={data.settings.backgroundAnimation} />
      <Navbar settings={data.settings} socials={data.socialLinks} />
      <main className="relative z-10">
        {data.sections
          .filter((section) => section.enabled)
          .sort((a, b) => a.display_order - b.display_order)
          .map((section) => <div key={section.id}>{sectionMap[section.key] ?? null}</div>)}
      </main>
      <Footer settings={data.settings} socials={data.socialLinks} />
    </div>
  );
}
