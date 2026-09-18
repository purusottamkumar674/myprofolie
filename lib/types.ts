export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  category: string;
  year: number;
  technologies: string[];
  features: string[];
  live_url?: string | null;
  github_url?: string | null;
  status: "Live" | "Private" | "In progress" | "Case study";
  featured: boolean;
  published: boolean;
  display_order: number;
  accent: string;
  cover_url?: string | null;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string | null;
  display_order: number;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  display_order: number;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
};

export type Testimonial = {
  id: string;
  client_name: string;
  company: string;
  review: string;
  rating: number;
  avatar_url?: string | null;
  display_order: number;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: number;
  image_url?: string | null;
  credential_url?: string | null;
  display_order: number;
};

export type Achievement = {
  id: string;
  label: string;
  value: number;
  suffix: string;
  display_order: number;
};

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  display_order: number;
};

export type SectionSetting = {
  id: string;
  key: string;
  label: string;
  enabled: boolean;
  display_order: number;
};

export type SiteSettings = {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  about: string;
  resumeUrl: string;
  primaryColor: string;
  accentColor: string;
  animationsEnabled: boolean;
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  animationIntensity: string;
  pageTransition: string;
  heroAnimation: string;
  scrollAnimation: string;
  backgroundAnimation: boolean;
  cursorEffect: boolean;
  particles: boolean;
  smoothScroll: boolean;
};

export type PortfolioData = {
  settings: SiteSettings;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  services: Service[];
  testimonials: Testimonial[];
  certificates: Certificate[];
  achievements: Achievement[];
  socialLinks: SocialLink[];
  sections: SectionSetting[];
};
