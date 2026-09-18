# Purushottam — Animated Portfolio CMS

A production-ready, heavily animated developer portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lenis, and Supabase.

The public website works immediately with built-in fallback content. Connect Supabase to activate secure admin login, permanent content editing, media uploads, contact messages, theme controls, SEO settings, and homepage section management.

## Included

- Cinematic entry loader
- Context-aware custom desktop cursor
- Smooth scrolling and page transitions
- Mouse-responsive animated background
- Responsive navbar and right-side mobile menu
- Animated hero, code window, stats, marquees, reveals, and magnetic buttons
- About, skills, technology orbit, experience, services, process, achievements, and contact sections
- 26 project records with filters, a featured slider, animated cards, and detail routes
- Optional certificate lightbox and testimonial slider
- Accessible reduced-motion support
- Custom loading, error, and 404 states
- Dynamic metadata, sitemap, robots configuration, and favicon
- Secure Supabase Auth admin area
- Admin CRUD for projects, skills, experience, services, testimonials, certificates, achievements, and social links
- Project publish/feature toggles, duplication, search, and drag ordering
- Homepage section visibility and ordering
- Media library with Supabase Storage
- Contact inbox
- Website identity, hero, about, SEO, theme, and motion settings
- PostgreSQL schema, seed data, Storage bucket, and Row Level Security policies
- Vercel-ready configuration

## Requirements

- Node.js 20 or newer
- pnpm 10+ recommended (npm also works)
- A Supabase project for permanent admin-controlled content

## 1. Run locally

    pnpm install
    pnpm dev

Open:

- Portfolio: http://localhost:3000
- Admin login: http://localhost:3000/admin/login
- Local admin preview: http://localhost:3000/admin?demo=1

The public portfolio does not require Supabase for its first run. The local admin preview is available only during development and does not save changes.

## 2. Connect Supabase

Create a new Supabase project, then open SQL Editor.

Run these files in order:

1. supabase/migrations/202609170001_portfolio_cms.sql
2. supabase/seed.sql

The migration creates all tables, relationships, policies, helper functions, and the public portfolio-media bucket. The seed adds site settings, sections, skills, experience, services, achievements, navigation, and project records.

In Supabase, go to Project Settings → API and copy:

- Project URL
- Anon/public key
- Service role key (only for the one-time local admin creation command)

Copy .env.example to .env.local and fill it:

    NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
    SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
    ADMIN_EMAIL=your-admin@example.com
    ADMIN_PASSWORD=use-a-strong-password-with-12-or-more-characters
    NEXT_PUBLIC_SITE_URL=http://localhost:3000

Never expose SUPABASE_SERVICE_ROLE_KEY in browser code or commit .env.local.

## 3. Create the first admin

After the migration is applied:

    pnpm create-admin

This command safely creates or updates the Supabase Auth user and adds its user ID to the protected admins table.

Then sign in at /admin/login.

The admin panel accepts only authenticated users present in the admins table. Row Level Security re-checks every database write.

## 4. Replace personal placeholders

Open the admin dashboard and update:

- Display name and professional role
- Portfolio email, phone, location, and availability
- Hero and About text
- Resume URL
- GitHub, LinkedIn, WhatsApp, and other social URLs
- Projects and their real live/GitHub links
- Certificates and genuine client testimonials
- SEO title, description, and social sharing content
- Primary/accent colors and safe animation preferences

The included project URLs are intentionally blank unless a real URL was known. No fake links or testimonials are included.

## 5. Deploy to Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add these production environment variables:

    NEXT_PUBLIC_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY
    NEXT_PUBLIC_SITE_URL

Set NEXT_PUBLIC_SITE_URL to the final HTTPS domain.

SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL, and ADMIN_PASSWORD are only needed for the local create-admin script. They are not required by the deployed application and should not be added to Vercel.

4. Deploy.
5. In Supabase Authentication → URL Configuration, set the Site URL to the production domain.

## Useful commands

    pnpm dev
    pnpm typecheck
    pnpm build
    pnpm start
    pnpm create-admin

## Main folders

    app/                       Next.js routes, APIs, admin, and project pages
    components/site/           Public portfolio sections and interactions
    components/admin/          Admin login and complete CMS dashboard
    components/motion/         Loader, cursor, background, smooth scrolling
    components/ui/             Reusable motion and button primitives
    lib/data/                  Built-in content and Supabase loaders
    lib/supabase/              Browser and server Supabase clients
    supabase/migrations/       Database schema, security, storage policies
    supabase/seed.sql          Initial portfolio records
    scripts/create-admin.mjs   Secure first-admin setup

## Security notes

- Public visitors can read published content only.
- Only authenticated users listed in admins can create, update, delete, reorder, or upload.
- Admin checks exist server-side and in Supabase Row Level Security.
- The Supabase service-role key is used only by the local setup script.
- Uploaded files are stored in the dedicated portfolio-media bucket.
- Contact submissions are length-validated in the API and database.

## Before going live

- Replace placeholder email, phone, social links, and resume
- Add only genuine testimonials and certificates
- Verify every live project URL
- Set the final site URL in Vercel and Supabase
- Run pnpm typecheck and pnpm build
- Test the contact form and admin login
- Test mobile navigation and project detail pages

## Build status

The delivered project passes TypeScript validation, the Next.js production build, and static generation for all included project detail routes.
