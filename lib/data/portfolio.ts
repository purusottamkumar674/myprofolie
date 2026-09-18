import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { fallbackData, fallbackProjects } from "@/lib/data/fallback";
import { getServerSupabase } from "@/lib/supabase/server";
import type { PortfolioData, Project, SiteSettings } from "@/lib/types";

type SettingsRow = {
  name?: string | null;
  role?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  availability?: string | null;
  hero_eyebrow?: string | null;
  hero_title?: string | null;
  hero_description?: string | null;
  about?: string | null;
  resume_url?: string | null;
  primary_color?: string | null;
  accent_color?: string | null;
  animations_enabled?: boolean | null;
  seo_title?: string | null;
  seo_description?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  animation_intensity?: string | null;
  page_transition?: string | null;
  hero_animation?: string | null;
  scroll_animation?: string | null;
  background_animation?: boolean | null;
  cursor_effect?: boolean | null;
  particles?: boolean | null;
  smooth_scroll?: boolean | null;
};

function mapSettings(row?: SettingsRow | null): SiteSettings {
  const base = fallbackData.settings;
  if (!row) return base;
  const email = row.email && row.email !== "your-email@example.com" ? row.email : base.email;

  return {
    name: row.name || base.name,
    role: row.role || base.role,
    email,
    phone: row.phone || base.phone,
    location: row.location || base.location,
    availability: row.availability || base.availability,
    heroEyebrow: row.hero_eyebrow || base.heroEyebrow,
    heroTitle: row.hero_title || base.heroTitle,
    heroDescription: row.hero_description || base.heroDescription,
    about: row.about || base.about,
    resumeUrl: row.resume_url || base.resumeUrl,
    primaryColor: row.primary_color || base.primaryColor,
    accentColor: row.accent_color || base.accentColor,
    animationsEnabled: row.animations_enabled ?? base.animationsEnabled,
    seoTitle: row.seo_title || base.seoTitle,
    seoDescription: row.seo_description || base.seoDescription,
    ogTitle: row.og_title || base.ogTitle,
    ogDescription: row.og_description || base.ogDescription,
    ogImage: row.og_image || base.ogImage,
    animationIntensity: row.animation_intensity || base.animationIntensity,
    pageTransition: row.page_transition || base.pageTransition,
    heroAnimation: row.hero_animation || base.heroAnimation,
    scrollAnimation: row.scroll_animation || base.scrollAnimation,
    backgroundAnimation: row.background_animation ?? base.backgroundAnimation,
    cursorEffect: row.cursor_effect ?? base.cursorEffect,
    particles: row.particles ?? base.particles,
    smoothScroll: row.smooth_scroll ?? base.smoothScroll,
  };
}

function rowsOrFallback<T>(data: T[] | null, fallback: T[]) {
  return data && data.length ? data : fallback;
}

function mergeMissingRows<T>(data: T[] | null, fallback: T[], getKey: (item: T) => string) {
  const rows = rowsOrFallback(data, fallback);
  const existingKeys = new Set(rows.map(getKey));
  return [...rows, ...fallback.filter((item) => !existingKeys.has(getKey(item)))];
}

function normalizeSocialLinks(data: import("@/lib/types").SocialLink[] | null) {
  const rows = mergeMissingRows(data, fallbackData.socialLinks, (social) => social.platform);
  return rows.map((social) => {
    if (social.platform === "GitHub") return { ...social, url: "https://github.com/purusottamkumar674" };
    if (social.platform === "Email" && social.url === "mailto:your-email@example.com") {
      return { ...social, url: "mailto:purusottamsingh238@gmail.com" };
    }
    return social;
  });
}

const requestedProjectOrder = [
  "pinnacle-elite-corp",
  "peak-divine",
  "the-aman-life",
  "worldwide-prominent-properties",
  "eco-blossom-creations",
  "apex-edge-gaming",
  "tasty-foods-delights",
  "aa100x-tech",
  "creatormoves365",
  "creator-moves-365-ai",
  "om-physio-world",
  "om-physio-world-india",
  "dr-sarvesh-tiwari",
  "biswas-agro-foods",
  "biswas-manpower",
  "brce",
];

function normalizeProjects(projects: Project[]) {
  const projectBySlug = new Map(projects.map((project) => [project.slug, project]));
  const requested = requestedProjectOrder.map((slug) => {
    const fallback = fallbackProjects.find((project) => project.slug === slug);
    const existing = projectBySlug.get(slug);
    return fallback ? { ...fallback, ...existing, live_url: fallback.live_url, cover_url: fallback.cover_url, title: fallback.title } : existing;
  }).filter((project): project is Project => Boolean(project));
  const requestedSlugs = new Set(requestedProjectOrder);
  const unrelated = projects.filter((project) => !requestedSlugs.has(project.slug));
  return [...requested, ...unrelated].map((project, index) => ({ ...project, display_order: index + 1 }));
}

export async function getPortfolioData(): Promise<PortfolioData> {
  noStore();
  const supabase = await getServerSupabase();
  if (!supabase) return fallbackData;

  try {
    const [
      settingsResult,
      projectsResult,
      skillsResult,
      experienceResult,
      servicesResult,
      testimonialsResult,
      certificatesResult,
      achievementsResult,
      socialResult,
      sectionsResult,
    ] = await Promise.all([
      supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("projects").select("*").eq("published", true).order("display_order"),
      supabase.from("skills").select("*").order("display_order"),
      supabase.from("experience").select("*").order("display_order"),
      supabase.from("services").select("*").order("display_order"),
      supabase.from("testimonials").select("*").eq("published", true).order("display_order"),
      supabase.from("certificates").select("*").eq("published", true).order("display_order"),
      supabase.from("achievements").select("*").order("display_order"),
      supabase.from("social_links").select("*").eq("published", true).order("display_order"),
      supabase.from("sections").select("*").order("display_order"),
    ]);

    return {
      settings: mapSettings(settingsResult.data as SettingsRow | null),
      projects: normalizeProjects(rowsOrFallback(projectsResult.data as Project[] | null, fallbackData.projects)),
      skills: mergeMissingRows(skillsResult.data, fallbackData.skills, (skill) => skill.name),
      experience: rowsOrFallback(experienceResult.data, fallbackData.experience),
      services: mergeMissingRows(servicesResult.data, fallbackData.services, (service) => service.title),
      testimonials: testimonialsResult.data ?? fallbackData.testimonials,
      certificates: certificatesResult.data ?? fallbackData.certificates,
      achievements: rowsOrFallback(achievementsResult.data, fallbackData.achievements),
      socialLinks: normalizeSocialLinks(socialResult.data),
      sections: rowsOrFallback(sectionsResult.data, fallbackData.sections),
    } as PortfolioData;
  } catch {
    return fallbackData;
  }
}

export async function getProjectBySlug(slug: string) {
  noStore();
  const supabase = await getServerSupabase();

  if (supabase) {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (data) return normalizeProjects([data as Project]).find((project) => project.slug === slug) ?? (data as Project);
  }

  return fallbackProjects.find((project) => project.slug === slug) ?? null;
}

export async function isCurrentUserAdmin() {
  const supabase = await getServerSupabase();
  if (!supabase) return { configured: false, user: null, isAdmin: false };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { configured: true, user: null, isAdmin: false };

  const { data } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  return { configured: true, user, isAdmin: Boolean(data) };
}
