import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/motion/motion-provider";
import { getPortfolioData } from "@/lib/data/portfolio";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Purushottam — Full-Stack Web Developer",
    template: "%s | Purushottam",
  },
  description:
    "Full-stack web developer building modern websites, admin dashboards, creator platforms, and scalable Next.js applications.",
  applicationName: "Purushottam Portfolio",
  keywords: [
    "Purushottam",
    "web developer",
    "Next.js developer",
    "full-stack developer",
    "Supabase developer",
    "India",
  ],
  authors: [{ name: "Purushottam" }],
  creator: "Purushottam",
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#09090d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { settings } = await getPortfolioData();
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MotionProvider settings={settings}>{children}</MotionProvider>
      </body>
    </html>
  );
}
