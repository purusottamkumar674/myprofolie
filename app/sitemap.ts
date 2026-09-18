import type { MetadataRoute } from "next";
import { getPortfolioData } from "@/lib/data/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const data = await getPortfolioData();
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...data.projects
      .filter((project) => project.published)
      .map((project) => ({
        url: baseUrl + "/projects/" + project.slug,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: project.featured ? 0.8 : 0.65,
      })),
  ];
}
