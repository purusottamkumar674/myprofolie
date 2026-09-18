insert into public.site_settings (
  id, name, role, email, phone, location, availability,
  hero_eyebrow, hero_title, hero_description, about,
  resume_url, primary_color, accent_color, animations_enabled,
  seo_title, seo_description
) values (
  1,
  'Purushottam',
  'Full-Stack Web Developer',
  'purusottamsingh238@gmail.com',
  'Add from Admin',
  'India',
  'Available for selected projects',
  'Hello, I build for the web',
  'I create powerful digital experiences.',
  'I design and develop modern websites, admin systems, creator platforms, and full-stack products with Next.js and Supabase.',
  'I am a web developer focused on turning real business workflows into polished digital products. My work combines responsive interface design, secure authentication, structured data, admin tools, and production deployment.',
  '#contact',
  '#8b6dff',
  '#35e7c2',
  true,
  'Purushottam — Full-Stack Web Developer',
  'Modern websites, admin dashboards, creator platforms, and scalable Next.js applications.'
)
on conflict (id) do nothing;

insert into public.sections (key, label, enabled, display_order) values
  ('hero', 'Hero', true, 1),
  ('about', 'About', true, 2),
  ('skills', 'Skills', true, 3),
  ('experience', 'Experience', true, 4),
  ('projects', 'Projects', true, 5),
  ('services', 'Services', true, 6),
  ('process', 'Process', true, 7),
  ('achievements', 'Achievements', true, 8),
  ('code', 'Code Manifest', true, 9),
  ('certificates', 'Certificates', true, 10),
  ('testimonials', 'Testimonials', true, 11),
  ('contact', 'Contact', true, 12)
on conflict (key) do nothing;

insert into public.project_categories (name, slug, display_order) values
  ('Featured', 'featured', 1),
  ('Full Stack', 'full-stack', 2),
  ('Business', 'business', 3),
  ('Healthcare', 'healthcare', 4),
  ('Creator Platform', 'creator-platform', 5),
  ('Admin Dashboard', 'admin-dashboard', 6),
  ('E-Commerce', 'e-commerce', 7),
  ('LMS', 'lms', 8),
  ('SaaS', 'saas', 9),
  ('Community', 'community', 10),
  ('Entertainment', 'entertainment', 11)
on conflict (slug) do nothing;

insert into public.projects (
  slug, title, summary, description, problem, solution, category, year,
  technologies, features, live_url, status, featured, published, display_order, accent
) values
  (
    'creatormoves365', 'CreatorMoves365',
    'A creator partnership platform with role-based workspaces, campaign workflows, and global roster management.',
    'Creator discovery, partnership operations, team ownership, and reporting in one focused product.',
    'Creator and campaign information was spread across sheets and shared tools.',
    'Server-scoped workspaces, duplicate protection, status history, and operational alerts created a reliable workflow.',
    'Creator Platform', 2026,
    '["Next.js","TypeScript","Supabase","PostgreSQL","Tailwind CSS"]',
    '["Role-based workspaces","Global duplicate guard","Creator roster","Follow-up automation","Server-side data scoping"]',
    null, 'Private', true, true, 1, '#7c5cff'
  ),
  (
    'pinnacle-elite-corp', 'Pinnacle Elite Corp',
    'A premium multi-company corporate platform with investment journeys and cinematic brand interactions.',
    'A polished corporate presence for ventures, upcoming companies, and investment opportunities.',
    'A growing company portfolio needed clearer discovery and premium positioning.',
    'A responsive dark-and-gold experience with company sliders, investment routes, and staged motion.',
    'Business', 2026,
    '["Next.js","React","TypeScript","Tailwind CSS","Vercel"]',
    '["Company ecosystem","Investment page","Responsive sliders","Premium navigation","Domain deployment"]',
    'https://www.pinnacleelitecorp.com/', 'Live', true, true, 2, '#f4c45e'
  ),
  (
    'om-physio-world', 'Om Physio World',
    'A healthcare website for physiotherapy services, facilities, treatment education, and clinic discovery.',
    'A fast, accessible clinic site for treatments, doctor information, facilities, and directions.',
    'Patients needed a mobile-friendly source for services, therapy information, and clinic details.',
    'Structured treatment pages, gallery tabs, local SEO, and approachable visual design.',
    'Healthcare', 2026,
    '["Next.js","TypeScript","Tailwind CSS","Vercel"]',
    '["Treatment library","Clinic gallery","Doctor profile","Local SEO","Directions integration"]',
    null, 'Case study', true, true, 3, '#39d4b8'
  ),
  (
    'worldwide-prominent-properties', 'Worldwide Prominent Properties',
    'A refined real-estate discovery experience for premium listings, locations, and high-intent enquiries.',
    'A property marketing platform built to make premium listings easy to explore.',
    'Property information needed stronger hierarchy, useful filtering, and a direct route to contact.',
    'Premium cards, location-led browsing, lead capture, and clear property detail flows.',
    'Business', 2026,
    '["Next.js","React","Supabase","Tailwind CSS"]',
    '["Property listings","Location filters","Lead forms","Responsive detail pages","Admin controls"]',
    null, 'Private', true, true, 4, '#64a8ff'
  ),
  (
    'eco-blossom-creations', 'Eco Blossom Creations',
    'A product-forward eco brand website with tactile storytelling, catalog discovery, and conversion-focused flows.',
    'A warm modern storefront for sustainable creations and product enquiries.',
    'The brand needed to feel handmade and eco-conscious without losing modern usability.',
    'Editorial storytelling, responsive catalog cards, and smooth interaction patterns.',
    'E-Commerce', 2026,
    '["Next.js","TypeScript","Tailwind CSS","Framer Motion"]',
    '["Product storytelling","Catalog layout","Enquiry flow","Responsive UI","Motion system"]',
    null, 'Case study', false, true, 5, '#80c866'
  ),
  (
    'the-aman-life', 'The Aman Life',
    'A personal-brand and investment experience with premium storytelling and focused conversion paths.',
    'A personal brand platform for content, ventures, and investment opportunities.',
    'Multiple business directions needed to feel connected without overwhelming visitors.',
    'Strong hierarchy, a dedicated investment journey, premium typography, and motion-led sections.',
    'Business', 2026,
    '["Next.js","React","Tailwind CSS","Framer Motion"]',
    '["Personal brand system","Investment journey","Story sections","Responsive navigation","Conversion CTAs"]',
    null, 'Case study', true, true, 6, '#ff7d5c'
  ),
  (
    'apex-edge-gaming', 'Apex Edge Gaming',
    'A high-energy gaming identity with immersive motion, event presentation, and community content.',
    'A cinematic gaming website balancing visual energy with fast navigation.',
    'Gaming content needed excitement while still working smoothly across common devices.',
    'Layered gradients, lightweight motion, event information, and responsive layouts.',
    'Entertainment', 2026,
    '["Next.js","TypeScript","GSAP","Tailwind CSS"]',
    '["Cinematic hero","Event cards","Community sections","Motion design","Mobile optimization"]',
    null, 'Case study', false, true, 7, '#ff4d8d'
  ),
  (
    'tasty-foods-delights', 'Tasty Foods Delights',
    'A responsive food discovery and ordering interface focused on menu clarity and quick action.',
    'A food brand website for dishes, offers, and ordering options.',
    'Menu-heavy pages can become cluttered and slow on mobile.',
    'Category-led browsing, clear dish cards, and prominent ordering actions.',
    'E-Commerce', 2026,
    '["React","TypeScript","Tailwind CSS","Vercel"]',
    '["Menu categories","Offer highlights","Mobile ordering","Search and filters","Responsive cards"]',
    null, 'Case study', false, true, 8, '#ff9a3d'
  ),
  (
    'joy-spark', 'Joy Spark',
    'A friendly community experience with expressive UI, accessible journeys, and modular content.',
    'A joyful digital presence around community stories and programs.',
    'The site needed personality and warmth without sacrificing accessibility.',
    'A modular visual system and gentle motion made the content inviting and usable.',
    'Community', 2025,
    '["Next.js","React","Tailwind CSS"]',
    '["Program sections","Story cards","Accessible interface","Responsive navigation","Reusable blocks"]',
    null, 'Private', false, true, 9, '#ffd84d'
  ),
  (
    'super-team', 'Super Team',
    'A structured team hub for presenting people, capabilities, work, and operating information.',
    'A flexible team website with profiles, services, and project detail views.',
    'Team information and capabilities were difficult to understand across scattered pages.',
    'A unified design system and structured member, service, and work views.',
    'Business', 2025,
    '["Next.js","TypeScript","Tailwind CSS"]',
    '["Team directory","Capability pages","Project showcase","Reusable cards","Responsive design"]',
    null, 'Private', false, true, 10, '#57d7ff'
  ),
  (
    'peace-care-foundation', 'Peace Care Foundation',
    'A nonprofit platform for programs, impact communication, volunteer interest, and donations.',
    'A calm, trustworthy foundation website built around impact and support actions.',
    'Program information and trust signals needed to work together without clutter.',
    'Clear impact sections, action cards, program detail flows, and accessible layouts.',
    'Community', 2025,
    '["Next.js","React","Tailwind CSS","Vercel"]',
    '["Program pages","Impact metrics","Volunteer flow","Donation journey","Mobile-first layout"]',
    null, 'Case study', false, true, 11, '#58c6a8'
  ),
  (
    'global-influencer-research-platform', 'Global Influencer Research Platform',
    'A country-to-city creator research database organized by geography, platform, verification, and progress.',
    'An operations system for building a comprehensive global female creator database.',
    'Geography, verification, and pending research were difficult to track across sheets.',
    'A normalized hierarchy and progress dashboard organized every layer of the research.',
    'Creator Platform', 2026,
    '["Next.js","Supabase","PostgreSQL","TypeScript"]',
    '["Geographic hierarchy","Platform coverage","Verification workflow","Research metrics","CSV export"]',
    null, 'In progress', true, true, 12, '#b47cff'
  ),
  (
    'influencer-management-platform', 'Influencer Management Platform',
    'A private multi-user workspace for creator records, outreach states, deals, ownership, and operations.',
    'A full-stack internal product for managing creator relationships with private team data.',
    'Shared data created privacy gaps, duplicate records, and missed follow-ups.',
    'Row scoping, admin oversight, duplicate rules, status history, and task assignment.',
    'SaaS', 2026,
    '["Next.js","TypeScript","Supabase","RLS","PostgreSQL"]',
    '["Team data privacy","Admin oversight","Duplicate blocking","Deal tracking","Follow-up tasks"]',
    null, 'Private', true, true, 13, '#6c8cff'
  ),
  (
    'learning-management-system', 'Learning Management System',
    'A role-based platform for courses, enrollments, quizzes, assignments, progress, and certificates.',
    'A production-minded LMS connecting learning content, progress, assessment, and payments.',
    'Course products require reliable access, progress, assessment, and certification rules.',
    'A modular protected system around enrollments, modules, grading, and certificates.',
    'LMS', 2026,
    '["Next.js","Supabase","PostgreSQL","TypeScript","Payments"]',
    '["Course builder","Enrollment access","Quizzes","Assignments","Certificates"]',
    null, 'Private', true, true, 14, '#16c7a1'
  ),
  (
    'admin-superadmin-control-center', 'Admin & Superadmin Control Center',
    'A secure admin system with additive roles, protected operations, MFA-aware access, and metrics.',
    'A reusable architecture for products needing precise privilege boundaries.',
    'Client-only gates and single-role models can expose data or weaken privileged actions.',
    'Additive roles, server authorization, MFA gates, and last-superadmin protection.',
    'Admin Dashboard', 2026,
    '["Next.js","TypeScript","Supabase","RLS","MFA"]',
    '["Additive roles","Server authorization","MFA gate","Audit-safe actions","Business overview"]',
    null, 'Private', false, true, 15, '#ff6767'
  ),
  (
    'multi-role-authentication-suite', 'Multi-role Authentication Suite',
    'A unified authentication flow for Admin, IMTM, and Influencer roles with secure routing.',
    'A consistent sign-in system with stricter administrator access.',
    'Different user types needed distinct onboarding, dashboards, and login methods.',
    'Role-aware auth, server checks, allowed Google onboarding, and protected admin login.',
    'SaaS', 2026,
    '["Next.js","Supabase Auth","OAuth","TypeScript"]',
    '["Role-aware login","Google onboarding","Admin-only credentials","Session routing","Server checks"]',
    null, 'Private', false, true, 16, '#4ca6ff'
  ),
  (
    'country-based-pricing-engine', 'Country-Based Pricing Engine',
    'A localized pricing experience that adjusts currency and plan presentation by country.',
    'A clear localization layer for showing relevant plan pricing.',
    'One currency creates friction for a global audience.',
    'A country selector, validated pricing map, formatting, and route persistence.',
    'SaaS', 2026,
    '["Next.js","TypeScript","Intl API","Supabase"]',
    '["Country selector","Localized currency","Plan mapping","Persistent preference","Responsive navbar"]',
    null, 'Case study', false, true, 17, '#64dd8a'
  ),
  (
    'google-sheets-import-pipeline', 'Google Sheets Import Pipeline',
    'A CSV and Excel import flow that validates, previews, maps, and imports creator records.',
    'A guided migration workflow for existing research sheets.',
    'Manual re-entry is slow while unchecked bulk imports create malformed records.',
    'Column mapping, preview, row validation, duplicate checks, and import reporting.',
    'Admin Dashboard', 2026,
    '["Next.js","TypeScript","CSV","Supabase"]',
    '["CSV/XLSX intake","Column mapping","Row validation","Duplicate checks","Import report"]',
    null, 'Case study', false, true, 18, '#23bd75'
  ),
  (
    'creator-roster-duplicate-guard', 'Creator Roster & Duplicate Guard',
    'A creator directory with privacy-aware duplicate detection across platform URLs and usernames.',
    'A roster workflow that protects quality without exposing another member''s private data.',
    'Team members could add the same creator while private ownership had to remain hidden.',
    'Normalized identifiers and a server-only existence check block conflicts safely.',
    'Creator Platform', 2026,
    '["Supabase","PostgreSQL","RLS","TypeScript"]',
    '["URL normalization","Username matching","Private conflict response","Server enforcement","Roster search"]',
    null, 'Private', false, true, 19, '#a66cff'
  ),
  (
    'follow-up-alerts-task-assignment', 'Follow-up Alerts & Task Assignment',
    'A 15-day inactivity monitor that surfaces unattended relationships and assigns actions.',
    'An operations layer designed to prevent creator outreach and deals from going cold.',
    'Without reminders, open conversations and deals could remain unattended.',
    'Scheduled checks, admin alerts, assignees, status history, and completion tracking.',
    'Admin Dashboard', 2026,
    '["Supabase","Scheduled Jobs","Next.js","PostgreSQL"]',
    '["15-day checks","Admin alert queue","Task assignment","Activity history","Completion states"]',
    null, 'Private', false, true, 20, '#ffb54a'
  ),
  (
    'healthcare-gallery-cms', 'Healthcare Gallery CMS',
    'A categorized clinic media experience for photos, treatments, exercises, awards, and certificates.',
    'A clean media system for visual proof and patient education.',
    'Mixed clinic photos and documents made galleries difficult to use and update.',
    'Tabbed categories, lightbox viewing, optimized media, and admin-managed ordering.',
    'Healthcare', 2026,
    '["Next.js","TypeScript","Supabase Storage","Tailwind CSS"]',
    '["Category tabs","Media lightbox","Admin uploads","Custom ordering","Responsive grid"]',
    null, 'Case study', false, true, 21, '#41c7d8'
  ),
  (
    'course-enrollment-dashboard', 'Course Enrollment Dashboard',
    'A student dashboard for active courses, access expiry, completion, and next actions.',
    'A focused learner workspace that turns enrollment data into a clear course journey.',
    'Students needed immediate clarity about ownership, expiry, and progress.',
    'Protected enrollment queries, progress states, expiry messaging, and continue actions.',
    'LMS', 2026,
    '["Next.js","Supabase","TypeScript","RLS"]',
    '["Protected enrollments","Expiry states","Progress tracking","Continue learning","Responsive dashboard"]',
    null, 'Private', false, true, 22, '#23d0b0'
  ),
  (
    'payments-certificate-portal', 'Payments & Certificate Portal',
    'A course workflow connecting verified payments, access activation, completion, and certificates.',
    'A secure bridge between purchase, enrollment, learning, and proof.',
    'Payment success cannot safely grant access without server verification.',
    'Verified callbacks, idempotent enrollment, completion rules, and certificate records.',
    'LMS', 2026,
    '["Next.js","Supabase","Payment APIs","TypeScript"]',
    '["Payment verification","Enrollment activation","Completion rules","Certificate records","Download flow"]',
    null, 'Private', false, true, 23, '#f0c45a'
  ),
  (
    'dynamic-portfolio-cms', 'Dynamic Portfolio CMS',
    'A fully admin-controlled portfolio with projects, sections, media, theme, SEO, and motion settings.',
    'A cinematic portfolio paired with a practical Supabase-backed content studio.',
    'Static portfolios require code changes for every content update.',
    'Structured tables, secure admin CRUD, media uploads, ordering, and graceful fallback.',
    'Full Stack', 2026,
    '["Next.js","TypeScript","Supabase","Framer Motion","GSAP"]',
    '["Admin CRUD","Theme settings","Section manager","Media uploads","Animated frontend"]',
    null, 'Live', true, true, 24, '#8b6dff'
  )
on conflict (slug) do nothing;

insert into public.skills (name, category, level, display_order) values
  ('Next.js', 'Frontend', 94, 1),
  ('React', 'Frontend', 93, 2),
  ('TypeScript', 'Frontend', 91, 3),
  ('JavaScript', 'Frontend', 93, 4),
  ('Tailwind CSS', 'Frontend', 95, 5),
  ('Responsive UI', 'Frontend', 96, 6),
  ('Supabase', 'Backend', 91, 7),
  ('PostgreSQL', 'Backend', 86, 8),
  ('Authentication', 'Backend', 90, 9),
  ('Row Level Security', 'Backend', 86, 10),
  ('REST APIs', 'Backend', 88, 11),
  ('Git & GitHub', 'Tools', 89, 12),
  ('Vercel', 'Tools', 92, 13),
  ('Lovable', 'Tools', 92, 14),
  ('SEO', 'Quality', 84, 15),
  ('Performance', 'Quality', 87, 16);

insert into public.experience (role, company, period, description, technologies, display_order) values
  ('Full-Stack Web Developer', 'Independent Product Development', '2025 — Present', 'Building production-focused websites, dashboards, creator platforms, healthcare experiences, and admin systems.', '["Next.js","TypeScript","Supabase","PostgreSQL","Vercel"]', 1),
  ('Creator Platform Developer', 'CreatorMoves365', '2026', 'Designed privacy-aware creator operations, multi-role authentication, duplicate prevention, and admin oversight.', '["Next.js","Supabase","RLS","TypeScript"]', 2),
  ('Frontend & Interaction Developer', 'Business and Brand Websites', '2025 — 2026', 'Created responsive, motion-rich interfaces for corporate, healthcare, real-estate, food, gaming, and nonprofit projects.', '["React","Tailwind CSS","Framer Motion","GSAP"]', 3),
  ('Admin Systems Developer', 'Operations Platforms', '2025 — 2026', 'Implemented secure dashboards, permissions, imports, task assignment, alerts, reporting, and content management.', '["Next.js","Supabase","PostgreSQL","Authentication"]', 4);

insert into public.services (title, description, icon, display_order) values
  ('Full-Stack Web Development', 'Production-ready applications from interface and database design through secure deployment.', 'Layers3', 1),
  ('Next.js Development', 'Fast, SEO-friendly websites and applications using modern App Router patterns.', 'Code2', 2),
  ('Frontend Development', 'Responsive, accessible interfaces with thoughtful interaction and hierarchy.', 'PanelsTopLeft', 3),
  ('Admin Dashboards', 'Secure content and operations dashboards with practical management workflows.', 'LayoutDashboard', 4),
  ('Supabase Integration', 'Authentication, PostgreSQL, storage, realtime features, and Row Level Security.', 'Database', 5),
  ('Authentication Systems', 'Role-aware sign-in, protected routes, server checks, and safe session handling.', 'ShieldCheck', 6),
  ('Responsive Websites', 'Purpose-built mobile, tablet, laptop, and large-screen experiences.', 'MonitorSmartphone', 7),
  ('Website Redesign', 'Modernized information architecture, visual systems, performance, and conversion paths.', 'WandSparkles', 8),
  ('Landing Pages', 'Focused pages built around a clear audience, message, and action.', 'Rocket', 9),
  ('SaaS Development', 'Scalable foundations with roles, subscriptions, records, and workflows.', 'Boxes', 10),
  ('API Integration', 'Reliable connections to payments, forms, external services, and internal systems.', 'Cable', 11),
  ('Deployment & Optimization', 'Vercel delivery, domain setup, SEO, image performance, and production checks.', 'Gauge', 12);

insert into public.achievements (label, value, suffix, display_order) values
  ('Project records', 24, '+', 1),
  ('Core services', 12, '', 2),
  ('Technology skills', 16, '+', 3),
  ('Responsive layouts', 100, '%', 4);

insert into public.social_links (platform, url, published, display_order) values
  ('GitHub', '#contact', true, 1),
  ('LinkedIn', '#contact', true, 2),
  ('Email', 'mailto:purusottamsingh238@gmail.com', true, 3),
  ('WhatsApp', '#contact', true, 4);

insert into public.navigation_items (label, href, published, display_order) values
  ('Home', '#home', true, 1),
  ('About', '#about', true, 2),
  ('Skills', '#skills', true, 3),
  ('Experience', '#experience', true, 4),
  ('Projects', '#projects', true, 5),
  ('Services', '#services', true, 6),
  ('Contact', '#contact', true, 7);
