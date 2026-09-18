"use client";

import {
  Activity,
  Award,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronUp,
  CircleUserRound,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  FolderKanban,
  Gauge,
  Globe2,
  GripVertical,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  Link2,
  LoaderCircle,
  LogOut,
  Menu,
  MessageSquareQuote,
  MonitorCog,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Settings2,
  Sparkles,
  Star,
  Trash2,
  Upload,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import type { PortfolioData, SectionSetting, SiteSettings } from "@/lib/types";

type Row = Record<string, any>;
type EditorState = { table: EntityTable; row: Row | null } | null;
type FieldType = "text" | "textarea" | "number" | "url" | "boolean" | "array" | "color" | "select";
type Field = { key: string; label: string; type?: FieldType; required?: boolean; options?: string[]; placeholder?: string };
type EntityTable = "projects" | "skills" | "experience" | "services" | "testimonials" | "certificates" | "achievements" | "social_links";

const entityConfigs: Record<EntityTable, { label: string; singular: string; titleKey: string; subtitleKey?: string; fields: Field[] }> = {
  projects: {
    label: "Projects",
    singular: "Project",
    titleKey: "title",
    subtitleKey: "category",
    fields: [
      { key: "title", label: "Project title", required: true },
      { key: "slug", label: "URL slug", placeholder: "generated-from-title" },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Overview", type: "textarea", required: true },
      { key: "problem", label: "Problem", type: "textarea", required: true },
      { key: "solution", label: "Solution", type: "textarea", required: true },
      { key: "category", label: "Category", required: true },
      { key: "year", label: "Year", type: "number", required: true },
      { key: "technologies", label: "Technologies", type: "array", placeholder: "Next.js, TypeScript, Supabase" },
      { key: "features", label: "Features", type: "array", placeholder: "One feature per line or comma-separated" },
      { key: "live_url", label: "Live URL", type: "url" },
      { key: "github_url", label: "GitHub URL", type: "url" },
      { key: "status", label: "Status", type: "select", options: ["Live", "Private", "In progress", "Case study"] },
      { key: "accent", label: "Card accent", type: "color" },
      { key: "cover_url", label: "Cover image URL", type: "url" },
      { key: "featured", label: "Featured project", type: "boolean" },
      { key: "published", label: "Published", type: "boolean" },
      { key: "display_order", label: "Display order", type: "number" },
    ],
  },
  skills: {
    label: "Skills",
    singular: "Skill",
    titleKey: "name",
    subtitleKey: "category",
    fields: [
      { key: "name", label: "Skill name", required: true },
      { key: "category", label: "Category", required: true },
      { key: "level", label: "Level (0–100)", type: "number", required: true },
      { key: "icon", label: "Icon name" },
      { key: "display_order", label: "Display order", type: "number" },
    ],
  },
  experience: {
    label: "Experience",
    singular: "Experience",
    titleKey: "role",
    subtitleKey: "company",
    fields: [
      { key: "role", label: "Role", required: true },
      { key: "company", label: "Company / project", required: true },
      { key: "period", label: "Period", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "technologies", label: "Technologies", type: "array" },
      { key: "display_order", label: "Display order", type: "number" },
    ],
  },
  services: {
    label: "Services",
    singular: "Service",
    titleKey: "title",
    subtitleKey: "icon",
    fields: [
      { key: "title", label: "Service title", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "icon", label: "Lucide icon name", placeholder: "Code2" },
      { key: "display_order", label: "Display order", type: "number" },
    ],
  },
  testimonials: {
    label: "Testimonials",
    singular: "Testimonial",
    titleKey: "client_name",
    subtitleKey: "company",
    fields: [
      { key: "client_name", label: "Client name", required: true },
      { key: "company", label: "Company" },
      { key: "review", label: "Review", type: "textarea", required: true },
      { key: "rating", label: "Rating (1–5)", type: "number" },
      { key: "avatar_url", label: "Avatar URL", type: "url" },
      { key: "published", label: "Published", type: "boolean" },
      { key: "display_order", label: "Display order", type: "number" },
    ],
  },
  certificates: {
    label: "Certificates",
    singular: "Certificate",
    titleKey: "title",
    subtitleKey: "issuer",
    fields: [
      { key: "title", label: "Certificate title", required: true },
      { key: "issuer", label: "Issuer", required: true },
      { key: "year", label: "Year", type: "number" },
      { key: "image_url", label: "Certificate image URL", type: "url" },
      { key: "credential_url", label: "Credential URL", type: "url" },
      { key: "published", label: "Published", type: "boolean" },
      { key: "display_order", label: "Display order", type: "number" },
    ],
  },
  achievements: {
    label: "Achievements",
    singular: "Achievement",
    titleKey: "label",
    subtitleKey: "value",
    fields: [
      { key: "label", label: "Metric label", required: true },
      { key: "value", label: "Value", type: "number", required: true },
      { key: "suffix", label: "Suffix", placeholder: "+ or %" },
      { key: "display_order", label: "Display order", type: "number" },
    ],
  },
  social_links: {
    label: "Social Links",
    singular: "Social link",
    titleKey: "platform",
    subtitleKey: "url",
    fields: [
      { key: "platform", label: "Platform", required: true },
      { key: "url", label: "URL", type: "url", required: true },
      { key: "published", label: "Published", type: "boolean" },
      { key: "display_order", label: "Display order", type: "number" },
    ],
  },
};

const navigation = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "skills", label: "Skills", icon: Gauge },
  { key: "experience", label: "Experience", icon: BriefcaseBusiness },
  { key: "services", label: "Services", icon: Wrench },
  { key: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { key: "certificates", label: "Certificates", icon: Award },
  { key: "achievements", label: "Achievements", icon: BarChart3 },
  { key: "social_links", label: "Social links", icon: Link2 },
  { key: "sections", label: "Section manager", icon: MonitorCog },
  { key: "media", label: "Media library", icon: ImageIcon },
  { key: "inbox", label: "Contact inbox", icon: Inbox },
  { key: "settings", label: "Site, SEO & theme", icon: Settings2 },
];

const defaultSections: SectionSetting[] = [
  "Hero", "About", "Skills", "Experience", "Projects", "Services", "Process", "Achievements", "Code", "Certificates", "Testimonials", "Contact",
].map((label, index) => ({ id: "section-" + index, key: label.toLowerCase(), label, enabled: true, display_order: index + 1 }));

function initialTables(data: PortfolioData): Record<EntityTable, Row[]> {
  return {
    projects: data.projects,
    skills: data.skills,
    experience: data.experience,
    services: data.services,
    testimonials: data.testimonials.map((row) => ({ ...row, published: true })),
    certificates: data.certificates.map((row) => ({ ...row, published: true })),
    achievements: data.achievements,
    social_links: data.socialLinks.map((row) => ({ ...row, published: true })),
  };
}

type SettingsRow = SiteSettings & {
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

function initialSettings(settings: SiteSettings): SettingsRow {
  return {
    ...settings,
    seoTitle: settings.name + " — " + settings.role,
    seoDescription: settings.heroDescription,
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    animationIntensity: "balanced",
    pageTransition: "fade-blur",
    heroAnimation: "cinematic",
    scrollAnimation: "mixed",
    backgroundAnimation: true,
    cursorEffect: true,
    particles: true,
    smoothScroll: true,
  };
}

export function AdminDashboard({ initialData, demo, userEmail }: { initialData: PortfolioData; demo: boolean; userEmail: string }) {
  const router = useRouter();
  const [active, setActive] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [tables, setTables] = useState<Record<EntityTable, Row[]>>(() => initialTables(initialData));
  const [sections, setSections] = useState<SectionSetting[]>(initialData.sections || defaultSections);
  const [settings, setSettings] = useState<SettingsRow>(() => initialSettings(initialData.settings));
  const [media, setMedia] = useState<Row[]>([]);
  const [messages, setMessages] = useState<Row[]>([]);
  const [editor, setEditor] = useState<EditorState>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [draggedProject, setDraggedProject] = useState<string | null>(null);

  const notify = useCallback((text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2800);
  }, []);

  const refreshAll = useCallback(async () => {
    if (demo) return;
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    setBusy(true);
    try {
      const tableNames = Object.keys(entityConfigs) as EntityTable[];
      const results = await Promise.all(
        tableNames.map((table) => supabase.from(table).select("*").order("display_order")),
      );
      setTables((current) => {
        const next = { ...current };
        results.forEach((result, index) => {
          if (!result.error) next[tableNames[index]] = result.data || [];
        });
        return next;
      });

      const [settingsResult, sectionsResult, mediaResult, messagesResult] = await Promise.all([
        supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
        supabase.from("sections").select("*").order("display_order"),
        supabase.from("media").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      ]);
      if (sectionsResult.data) setSections(sectionsResult.data as SectionSetting[]);
      if (mediaResult.data) setMedia(mediaResult.data);
      if (messagesResult.data) setMessages(messagesResult.data);
      if (settingsResult.data) setSettings(mapSettingsFromDatabase(settingsResult.data, initialData.settings));
    } finally {
      setBusy(false);
    }
  }, [demo, initialData.settings]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const saveEntity = async (table: EntityTable, values: Row, existing: Row | null) => {
    const config = entityConfigs[table];
    const payload: Row = {};
    config.fields.forEach((field) => {
      let value = values[field.key];
      if (field.type === "number") value = Number(value || 0);
      if (field.type === "boolean") value = Boolean(value);
      if (field.type === "array") {
        value = String(value || "").split(/[\n,]+/).map((item) => item.trim()).filter(Boolean);
      }
      if ((field.type === "url" || field.type === "text") && value === "") value = null;
      payload[field.key] = value;
    });
    if (!payload.display_order) payload.display_order = (tables[table]?.length || 0) + 1;
    if (table === "projects") {
      payload.slug = slugify(String(payload.slug || payload.title));
      payload.accent = payload.accent || "#8b6dff";
      payload.status = payload.status || "Case study";
    }
    if ((table === "testimonials" || table === "certificates" || table === "social_links") && values.published === undefined) {
      payload.published = true;
    }

    if (demo) {
      const row = { ...payload, id: existing?.id || crypto.randomUUID() };
      setTables((current) => ({
        ...current,
        [table]: existing ? current[table].map((item) => item.id === existing.id ? row : item) : [...current[table], row],
      }));
      notify("Preview updated. Connect Supabase to save changes permanently.");
      setEditor(null);
      return;
    }

    const supabase = getBrowserSupabase();
    if (!supabase) return;
    setBusy(true);
    const query = existing
      ? supabase.from(table).update(payload).eq("id", existing.id)
      : supabase.from(table).insert(payload);
    const { error } = await query;
    setBusy(false);
    if (error) {
      notify(error.message);
      return;
    }
    setEditor(null);
    notify(config.singular + " saved.");
    await refreshAll();
    router.refresh();
  };

  const deleteEntity = async (table: EntityTable, row: Row) => {
    if (!window.confirm("Delete this " + entityConfigs[table].singular.toLowerCase() + "? This cannot be undone.")) return;
    if (demo) {
      setTables((current) => ({ ...current, [table]: current[table].filter((item) => item.id !== row.id) }));
      notify("Removed from local preview.");
      return;
    }
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    const { error } = await supabase.from(table).delete().eq("id", row.id);
    if (error) notify(error.message);
    else {
      notify(entityConfigs[table].singular + " deleted.");
      await refreshAll();
      router.refresh();
    }
  };

  const quickProjectUpdate = async (project: Row, changes: Row) => {
    const updated = { ...project, ...changes };
    setTables((current) => ({ ...current, projects: current.projects.map((item) => item.id === project.id ? updated : item) }));
    if (!demo) {
      const supabase = getBrowserSupabase();
      const { error } = await supabase!.from("projects").update(changes).eq("id", project.id);
      if (error) notify(error.message);
      else router.refresh();
    }
  };

  const duplicateProject = async (project: Row) => {
    const copyRow: Row = {
      ...project,
      id: undefined,
      title: project.title + " (Copy)",
      slug: project.slug + "-copy-" + Date.now().toString().slice(-5),
      published: false,
      featured: false,
      display_order: tables.projects.length + 1,
    };
    if (demo) {
      copyRow.id = crypto.randomUUID();
      setTables((current) => ({ ...current, projects: [...current.projects, copyRow] }));
      notify("Project duplicated in preview.");
    } else {
      const { id: _id, ...payload } = copyRow;
      const { error } = await getBrowserSupabase()!.from("projects").insert(payload);
      if (error) notify(error.message);
      else {
        notify("Project duplicated as unpublished.");
        await refreshAll();
      }
    }
  };

  const dropProject = async (targetId: string) => {
    if (!draggedProject || draggedProject === targetId) return;
    const current = [...tables.projects];
    const from = current.findIndex((item) => item.id === draggedProject);
    const to = current.findIndex((item) => item.id === targetId);
    if (from < 0 || to < 0) return;
    const [moved] = current.splice(from, 1);
    current.splice(to, 0, moved);
    const reordered: Row[] = current.map((item, index) => ({ ...item, display_order: index + 1 }));
    setTables((value) => ({ ...value, projects: reordered }));
    setDraggedProject(null);
    if (!demo) {
      const supabase = getBrowserSupabase()!;
      const results = await Promise.all(reordered.map((item) => supabase.from("projects").update({ display_order: item.display_order }).eq("id", item.id)));
      const failed = results.find((result) => result.error);
      notify(failed?.error?.message || "Project order saved.");
      router.refresh();
    } else notify("Project order updated in preview.");
  };

  const saveSettings = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next = settingsFromForm(form, settings);
    setSettings(next);
    if (demo) {
      notify("Settings updated in preview.");
      return;
    }
    const payload = mapSettingsToDatabase(next);
    const { error } = await getBrowserSupabase()!.from("site_settings").upsert(payload);
    notify(error ? error.message : "Site settings saved.");
    if (!error) router.refresh();
  };

  const updateSection = async (next: SectionSetting[]) => {
    setSections(next);
    if (demo) {
      notify("Section layout updated in preview.");
      return;
    }
    const supabase = getBrowserSupabase()!;
    const results = await Promise.all(next.map((section, index) => supabase.from("sections").update({ enabled: section.enabled, display_order: index + 1 }).eq("id", section.id)));
    const failed = results.find((result) => result.error);
    notify(failed?.error?.message || "Section layout saved.");
    router.refresh();
  };

  const sectionMove = (index: number, direction: number) => {
    const next = [...sections];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    void updateSection(next.map((section, order) => ({ ...section, display_order: order + 1 })));
  };

  const uploadMedia = async (file?: File) => {
    if (!file) return;
    if (demo) {
      setMedia((items) => [{ id: crypto.randomUUID(), name: file.name, url: URL.createObjectURL(file), mime_type: file.type, size_bytes: file.size }, ...items]);
      notify("Media added to local preview.");
      return;
    }
    setBusy(true);
    const supabase = getBrowserSupabase()!;
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
    const path = Date.now() + "-" + safeName;
    const upload = await supabase.storage.from("portfolio-media").upload(path, file, { upsert: false });
    if (upload.error) {
      setBusy(false);
      notify(upload.error.message);
      return;
    }
    const { data: publicData } = supabase.storage.from("portfolio-media").getPublicUrl(path);
    const inserted = await supabase.from("media").insert({ name: file.name, path, url: publicData.publicUrl, mime_type: file.type, size_bytes: file.size });
    setBusy(false);
    notify(inserted.error ? inserted.error.message : "Media uploaded.");
    if (!inserted.error) await refreshAll();
  };

  const deleteMedia = async (item: Row) => {
    if (!window.confirm("Delete this media file?")) return;
    if (demo) {
      setMedia((items) => items.filter((mediaItem) => mediaItem.id !== item.id));
      return;
    }
    const supabase = getBrowserSupabase()!;
    if (item.path) await supabase.storage.from("portfolio-media").remove([item.path]);
    const { error } = await supabase.from("media").delete().eq("id", item.id);
    notify(error ? error.message : "Media deleted.");
    if (!error) await refreshAll();
  };

  const markMessage = async (item: Row, read: boolean) => {
    setMessages((items) => items.map((message) => message.id === item.id ? { ...message, read } : message));
    if (!demo) await getBrowserSupabase()!.from("contact_messages").update({ read }).eq("id", item.id);
  };

  const activeLabel = navigation.find((item) => item.key === active)?.label || "Dashboard";

  return (
    <div className="admin-root min-h-screen bg-[#0a0a0f] text-white">
      <aside className={"admin-sidebar " + (menuOpen ? "admin-sidebar--open" : "")}>
        <div className="flex h-20 items-center justify-between border-b border-white/[0.07] px-5">
          <Link href="/" className="flex items-center gap-3" target="_blank">
            <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] font-black">P<span className="text-teal-300">.</span></span>
            <span><strong className="block text-sm">Portfolio CMS</strong><small className="text-[10px] uppercase tracking-[.16em] text-white/30">Control center</small></span>
          </Link>
          <button className="admin-icon-button lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={18} /></button>
        </div>
        <nav className="admin-nav">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.key} type="button" className={active === item.key ? "admin-nav-item admin-nav-item--active" : "admin-nav-item"} onClick={() => { setActive(item.key); setMenuOpen(false); }}>
                <Icon size={17} /><span>{item.label}</span>
                {item.key === "inbox" && messages.filter((message) => !message.read).length ? <em>{messages.filter((message) => !message.read).length}</em> : null}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-white/[0.07] p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
            <CircleUserRound size={20} className="text-violet-300" />
            <div className="min-w-0"><span className="block truncate text-xs font-medium">{userEmail}</span><small className="text-[10px] text-white/30">{demo ? "Preview mode" : "Administrator"}</small></div>
          </div>
          {demo ? <Link href="/admin/login" className="admin-nav-item w-full"><LogOut size={17} /> Exit preview</Link> : <form action="/admin/logout" method="post"><button className="admin-nav-item w-full" type="submit"><LogOut size={17} /> Sign out</button></form>}
        </div>
      </aside>

      {menuOpen ? <button type="button" className="fixed inset-0 z-30 bg-black/70 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close menu overlay" /> : null}

      <div className="lg:pl-[270px]">
        <header className="admin-topbar">
          <div className="flex items-center gap-3">
            <button type="button" className="admin-icon-button lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={19} /></button>
            <div><p className="text-xs uppercase tracking-[.16em] text-white/28">Admin dashboard</p><h1 className="text-xl font-semibold tracking-tight">{activeLabel}</h1></div>
          </div>
          <div className="flex items-center gap-2">
            {demo ? <span className="admin-demo-badge">Local preview</span> : null}
            <button type="button" onClick={() => void refreshAll()} className="admin-icon-button" aria-label="Refresh data" disabled={busy}><RefreshCw size={17} className={busy ? "animate-spin" : ""} /></button>
            <Link href="/" target="_blank" className="admin-button hidden sm:inline-flex">View website <ExternalLink size={15} /></Link>
          </div>
        </header>

        <main className="admin-content">
          {active === "overview" ? <Overview tables={tables} messages={messages} demo={demo} onNavigate={setActive} /> : null}
          {active === "projects" ? (
            <ProjectManager
              projects={tables.projects}
              onAdd={() => setEditor({ table: "projects", row: null })}
              onEdit={(row) => setEditor({ table: "projects", row })}
              onDelete={(row) => void deleteEntity("projects", row)}
              onDuplicate={(row) => void duplicateProject(row)}
              onQuickUpdate={(row, changes) => void quickProjectUpdate(row, changes)}
              onDragStart={setDraggedProject}
              onDrop={(id) => void dropProject(id)}
            />
          ) : null}
          {active !== "projects" && active in entityConfigs ? (
            <EntityManager
              table={active as EntityTable}
              rows={tables[active as EntityTable]}
              onAdd={() => setEditor({ table: active as EntityTable, row: null })}
              onEdit={(row) => setEditor({ table: active as EntityTable, row })}
              onDelete={(row) => void deleteEntity(active as EntityTable, row)}
            />
          ) : null}
          {active === "sections" ? <SectionsManager sections={sections} onMove={sectionMove} onToggle={(section) => void updateSection(sections.map((item) => item.id === section.id ? { ...item, enabled: !item.enabled } : item))} /> : null}
          {active === "media" ? <MediaManager media={media} busy={busy} onUpload={(file) => void uploadMedia(file)} onDelete={(item) => void deleteMedia(item)} /> : null}
          {active === "inbox" ? <InboxManager messages={messages} onMark={(item, read) => void markMessage(item, read)} /> : null}
          {active === "settings" ? <SettingsManager settings={settings} onSubmit={saveSettings} /> : null}
        </main>
      </div>

      {editor ? <EntityEditor state={editor} busy={busy} onClose={() => setEditor(null)} onSave={saveEntity} rowCount={tables[editor.table].length} /> : null}
      {notice ? <div className="admin-toast"><Check size={16} /> {notice}</div> : null}
    </div>
  );
}

function Overview({ tables, messages, demo, onNavigate }: { tables: Record<EntityTable, Row[]>; messages: Row[]; demo: boolean; onNavigate: (key: string) => void }) {
  const stats = [
    { label: "Projects", value: tables.projects.length, icon: FolderKanban, target: "projects" },
    { label: "Published", value: tables.projects.filter((project) => project.published).length, icon: Globe2, target: "projects" },
    { label: "Skills", value: tables.skills.length, icon: Gauge, target: "skills" },
    { label: "Unread messages", value: messages.filter((message) => !message.read).length, icon: Inbox, target: "inbox" },
  ];
  return (
    <div className="space-y-7">
      <div className="admin-welcome">
        <div><span className="admin-eyebrow">Website control center</span><h2>Everything important, in one place.</h2><p>Manage public content, project visibility, sections, media, contact messages, theme, animation, and SEO without editing source code.</p></div>
        <div className="hidden rounded-3xl border border-white/10 bg-black/15 p-5 md:block"><Activity size={30} className="text-teal-300" /><p className="mt-5 text-sm font-medium">{demo ? "Safe local preview" : "Live backend connected"}</p><span className="mt-1 block text-xs text-white/35">{demo ? "Changes reset when the page reloads." : "Updates are protected by RLS."}</span></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => <button key={stat.label} type="button" onClick={() => onNavigate(stat.target)} className="admin-stat-card"><span className="admin-stat-icon"><stat.icon size={19} /></span><strong>{stat.value}</strong><small>{stat.label}</small></button>)}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <div className="admin-panel">
          <div className="admin-panel-header"><div><h3>Recent projects</h3><p>Your latest portfolio records.</p></div><button className="admin-button" onClick={() => onNavigate("projects")}>Manage all</button></div>
          <div className="divide-y divide-white/[0.06]">
            {tables.projects.slice(0, 6).map((project) => <div className="flex items-center gap-3 py-3.5" key={project.id}><span className="size-2 rounded-full" style={{ background: project.accent || "#8b6dff" }} /><div className="min-w-0"><strong className="block truncate text-sm">{project.title}</strong><small className="text-white/30">{project.category}</small></div><span className="ml-auto text-xs text-white/30">{project.year}</span></div>)}
          </div>
        </div>
        <div className="admin-panel">
          <div className="admin-panel-header"><div><h3>Quick actions</h3><p>Common content tasks.</p></div></div>
          <div className="grid gap-2">
            <button className="admin-quick-action" onClick={() => onNavigate("projects")}><Plus size={17} /> Add or edit a project</button>
            <button className="admin-quick-action" onClick={() => onNavigate("media")}><Upload size={17} /> Upload media</button>
            <button className="admin-quick-action" onClick={() => onNavigate("sections")}><MonitorCog size={17} /> Reorder sections</button>
            <button className="admin-quick-action" onClick={() => onNavigate("settings")}><Sparkles size={17} /> Change theme and SEO</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectManager(props: {
  projects: Row[];
  onAdd: () => void;
  onEdit: (row: Row) => void;
  onDelete: (row: Row) => void;
  onDuplicate: (row: Row) => void;
  onQuickUpdate: (row: Row, changes: Row) => void;
  onDragStart: (id: string) => void;
  onDrop: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = props.projects.filter((project) => (project.title + " " + project.category).toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="admin-panel">
      <div className="admin-panel-header gap-4">
        <div><h2>Projects</h2><p>Add, edit, duplicate, publish, feature, or drag records into a new order.</p></div>
        <button className="admin-primary-button" onClick={props.onAdd}><Plus size={16} /> Add project</button>
      </div>
      <div className="mb-4"><input className="admin-input max-w-sm" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects..." /></div>
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead><tr><th className="w-10"></th><th>Project</th><th>Category</th><th>Status</th><th>Visibility</th><th className="text-right">Actions</th></tr></thead>
          <tbody>
            {filtered.map((project) => (
              <tr key={project.id} draggable onDragStart={() => props.onDragStart(project.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => props.onDrop(project.id)}>
                <td><GripVertical size={17} className="text-white/20" /></td>
                <td><div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 text-xs font-bold" style={{ background: String(project.accent || "#8b6dff") + "18", color: project.accent || "#8b6dff" }}>{String(project.title).slice(0, 2).toUpperCase()}</span><div><strong>{project.title}</strong><small>/{project.slug}</small></div></div></td>
                <td><span className="admin-tag">{project.category}</span></td>
                <td><span className="text-xs text-white/45">{project.status}</span></td>
                <td><button type="button" className={project.published ? "admin-toggle admin-toggle--on" : "admin-toggle"} onClick={() => props.onQuickUpdate(project, { published: !project.published })} aria-label="Toggle publish"><span /></button></td>
                <td><div className="flex justify-end gap-1">
                  <button className={project.featured ? "admin-icon-button text-amber-300" : "admin-icon-button"} onClick={() => props.onQuickUpdate(project, { featured: !project.featured })} title="Toggle featured"><Star size={15} fill={project.featured ? "currentColor" : "none"} /></button>
                  <button className="admin-icon-button" onClick={() => props.onDuplicate(project)} title="Duplicate"><Copy size={15} /></button>
                  <button className="admin-icon-button" onClick={() => props.onEdit(project)} title="Edit"><Pencil size={15} /></button>
                  <button className="admin-icon-button admin-icon-button--danger" onClick={() => props.onDelete(project)} title="Delete"><Trash2 size={15} /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length ? <AdminEmpty label="No matching projects." /> : null}
      </div>
    </div>
  );
}

function EntityManager({ table, rows, onAdd, onEdit, onDelete }: { table: EntityTable; rows: Row[]; onAdd: () => void; onEdit: (row: Row) => void; onDelete: (row: Row) => void }) {
  const config = entityConfigs[table];
  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div><h2>{config.label}</h2><p>Manage the content displayed in this portfolio section.</p></div>
        <button className="admin-primary-button" onClick={onAdd}><Plus size={16} /> Add {config.singular.toLowerCase()}</button>
      </div>
      <div className="grid gap-3">
        {rows.map((row, index) => (
          <div className="admin-list-row" key={row.id}>
            <span className="font-mono text-xs text-white/20">{String(index + 1).padStart(2, "0")}</span>
            <div className="min-w-0 flex-1"><strong className="block truncate text-sm">{String(row[config.titleKey] ?? "Untitled")}</strong>{config.subtitleKey ? <small className="mt-1 block truncate text-xs text-white/32">{String(row[config.subtitleKey] ?? "")}</small> : null}</div>
            {typeof row.published === "boolean" ? <span className={row.published ? "admin-tag admin-tag--success" : "admin-tag"}>{row.published ? "Published" : "Hidden"}</span> : null}
            <button className="admin-icon-button" onClick={() => onEdit(row)} aria-label="Edit"><Pencil size={15} /></button>
            <button className="admin-icon-button admin-icon-button--danger" onClick={() => onDelete(row)} aria-label="Delete"><Trash2 size={15} /></button>
          </div>
        ))}
        {!rows.length ? <AdminEmpty label={"No " + config.label.toLowerCase() + " yet."} /> : null}
      </div>
    </div>
  );
}

function SectionsManager({ sections, onMove, onToggle }: { sections: SectionSetting[]; onMove: (index: number, direction: number) => void; onToggle: (section: SectionSetting) => void }) {
  return (
    <div className="admin-panel">
      <div className="admin-panel-header"><div><h2>Section manager</h2><p>Show, hide, and reorder the homepage. Changes appear on the public site.</p></div></div>
      <div className="grid gap-3">
        {sections.map((section, index) => (
          <div className="admin-list-row" key={section.id}>
            <GripVertical size={18} className="text-white/18" />
            <span className="grid size-9 place-items-center rounded-xl bg-white/[0.04] font-mono text-xs text-white/28">{String(index + 1).padStart(2, "0")}</span>
            <div className="flex-1"><strong className="text-sm">{section.label}</strong><small className="ml-3 text-white/25">#{section.key}</small></div>
            <button type="button" className={section.enabled ? "admin-toggle admin-toggle--on" : "admin-toggle"} onClick={() => onToggle(section)} aria-label="Toggle section"><span /></button>
            <button className="admin-icon-button" disabled={index === 0} onClick={() => onMove(index, -1)} aria-label="Move up"><ChevronUp size={16} /></button>
            <button className="admin-icon-button" disabled={index === sections.length - 1} onClick={() => onMove(index, 1)} aria-label="Move down"><ChevronDown size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MediaManager({ media, busy, onUpload, onDelete }: { media: Row[]; busy: boolean; onUpload: (file?: File) => void; onDelete: (item: Row) => void }) {
  return (
    <div className="space-y-5">
      <div className="admin-upload">
        <Upload size={28} className="text-violet-300" />
        <div><h2>Upload media</h2><p>Images, documents, certificates, and resume files are stored in Supabase Storage.</p></div>
        <label className="admin-primary-button cursor-pointer">{busy ? <LoaderCircle size={16} className="animate-spin" /> : <Plus size={16} />} Choose file<input className="hidden" type="file" onChange={(event) => onUpload(event.target.files?.[0])} accept="image/*,.pdf" /></label>
      </div>
      <div className="admin-panel">
        <div className="admin-panel-header"><div><h3>Media library</h3><p>{media.length} uploaded files</p></div></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {media.map((item) => (
            <div className="admin-media-card" key={item.id}>
              <div className="admin-media-preview">{String(item.mime_type || "").startsWith("image/") ? <img src={item.url} alt={item.name || "Uploaded media"} /> : <FileText size={42} className="text-violet-300" />}</div>
              <div className="flex items-center gap-2 p-3"><div className="min-w-0 flex-1"><strong className="block truncate text-xs">{item.name}</strong><small className="text-[10px] text-white/30">{item.size_bytes ? Math.round(item.size_bytes / 1024) + " KB" : "File"}</small></div><button className="admin-icon-button admin-icon-button--danger" onClick={() => onDelete(item)}><Trash2 size={14} /></button></div>
            </div>
          ))}
        </div>
        {!media.length ? <AdminEmpty label="No uploaded media yet." /> : null}
      </div>
    </div>
  );
}

function InboxManager({ messages, onMark }: { messages: Row[]; onMark: (item: Row, read: boolean) => void }) {
  return (
    <div className="admin-panel">
      <div className="admin-panel-header"><div><h2>Contact inbox</h2><p>Messages submitted through the public contact form.</p></div></div>
      <div className="grid gap-3">
        {messages.map((item) => (
          <article className={"admin-message " + (!item.read ? "admin-message--unread" : "")} key={item.id}>
            <div className="flex flex-wrap items-start justify-between gap-3"><div><h3>{item.name}</h3><a href={"mailto:" + item.email}>{item.email}</a>{item.company ? <span> · {item.company}</span> : null}</div><div className="flex items-center gap-2"><span className="text-[10px] text-white/25">{item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}</span><button className="admin-icon-button" onClick={() => onMark(item, !item.read)} title={item.read ? "Mark unread" : "Mark read"}>{item.read ? <EyeOff size={15} /> : <Eye size={15} />}</button></div></div>
            <div className="mt-3 flex flex-wrap gap-2">{item.project_type ? <span className="admin-tag">{item.project_type}</span> : null}{item.budget ? <span className="admin-tag">{item.budget}</span> : null}{item.phone ? <span className="admin-tag">{item.phone}</span> : null}</div>
            <p className="mt-4 text-sm leading-7 text-white/52">{item.message}</p>
          </article>
        ))}
        {!messages.length ? <AdminEmpty label="No contact messages yet." /> : null}
      </div>
    </div>
  );
}

function SettingsManager({ settings, onSubmit }: { settings: SettingsRow; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <form onSubmit={onSubmit} key={JSON.stringify(settings)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><span className="admin-eyebrow">Global configuration</span><h2 className="mt-2 text-2xl font-semibold">Site, SEO, theme & motion</h2><p className="mt-2 text-sm text-white/38">Safe settings that update the portfolio without changing code.</p></div>
        <button className="admin-primary-button" type="submit"><Save size={16} /> Save all settings</button>
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <SettingsCard title="Identity & contact">
          <AdminField name="name" label="Display name" defaultValue={settings.name} />
          <AdminField name="role" label="Professional role" defaultValue={settings.role} />
          <AdminField name="email" label="Public email" type="email" defaultValue={settings.email} />
          <AdminField name="phone" label="Phone / WhatsApp" defaultValue={settings.phone} />
          <AdminField name="location" label="Location" defaultValue={settings.location} />
          <AdminField name="availability" label="Availability text" defaultValue={settings.availability} />
          <AdminField name="resumeUrl" label="Resume URL" defaultValue={settings.resumeUrl} />
        </SettingsCard>
        <SettingsCard title="Hero & about">
          <AdminField name="heroEyebrow" label="Hero eyebrow" defaultValue={settings.heroEyebrow} />
          <AdminField name="heroTitle" label="Hero title" defaultValue={settings.heroTitle} />
          <AdminField name="heroDescription" label="Hero description" defaultValue={settings.heroDescription} textarea />
          <AdminField name="about" label="About text" defaultValue={settings.about} textarea />
        </SettingsCard>
        <SettingsCard title="SEO & sharing">
          <AdminField name="seoTitle" label="Website title" defaultValue={settings.seoTitle} />
          <AdminField name="seoDescription" label="Meta description" defaultValue={settings.seoDescription} textarea />
          <AdminField name="ogTitle" label="Social title" defaultValue={settings.ogTitle} />
          <AdminField name="ogDescription" label="Social description" defaultValue={settings.ogDescription} textarea />
          <AdminField name="ogImage" label="Social preview image URL" defaultValue={settings.ogImage} />
        </SettingsCard>
        <SettingsCard title="Theme & animation">
          <div className="grid grid-cols-2 gap-3"><AdminField name="primaryColor" label="Primary color" type="color" defaultValue={settings.primaryColor} /><AdminField name="accentColor" label="Accent color" type="color" defaultValue={settings.accentColor} /></div>
          <AdminSelect name="animationIntensity" label="Animation intensity" defaultValue={settings.animationIntensity} options={["subtle", "balanced", "cinematic"]} />
          <AdminSelect name="pageTransition" label="Page transition" defaultValue={settings.pageTransition} options={["fade-blur", "slide", "scale", "none"]} />
          <AdminSelect name="scrollAnimation" label="Scroll animation" defaultValue={settings.scrollAnimation} options={["mixed", "fade-up", "scale", "none"]} />
          <div className="grid gap-2 sm:grid-cols-2">
            <AdminCheck name="animationsEnabled" label="Animations enabled" defaultChecked={settings.animationsEnabled} />
            <AdminCheck name="backgroundAnimation" label="Animated background" defaultChecked={settings.backgroundAnimation} />
            <AdminCheck name="cursorEffect" label="Custom cursor" defaultChecked={settings.cursorEffect} />
            <AdminCheck name="particles" label="Ambient particles" defaultChecked={settings.particles} />
            <AdminCheck name="smoothScroll" label="Smooth scroll" defaultChecked={settings.smoothScroll} />
          </div>
        </SettingsCard>
      </div>
    </form>
  );
}

function SettingsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="admin-panel"><div className="mb-5 border-b border-white/[0.06] pb-4"><h3>{title}</h3></div><div className="grid gap-4">{children}</div></section>;
}

function EntityEditor({ state, busy, onClose, onSave, rowCount }: { state: NonNullable<EditorState>; busy: boolean; onClose: () => void; onSave: (table: EntityTable, values: Row, existing: Row | null) => Promise<void>; rowCount: number }) {
  const config = entityConfigs[state.table];
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values: Row = {};
    config.fields.forEach((field) => {
      if (field.type === "boolean") values[field.key] = form.get(field.key) === "on";
      else values[field.key] = form.get(field.key) ?? "";
    });
    void onSave(state.table, values, state.row);
  };
  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="admin-modal" role="dialog" aria-modal="true" aria-label={"Edit " + config.singular}>
        <div className="admin-modal-header"><div><span className="admin-eyebrow">{state.row ? "Edit record" : "New record"}</span><h2>{state.row ? String(state.row[config.titleKey]) : "Add " + config.singular.toLowerCase()}</h2></div><button className="admin-icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button></div>
        <form onSubmit={submit}>
          <div className="admin-modal-body grid gap-4 sm:grid-cols-2">
            {config.fields.map((field) => <EditorField key={field.key} field={field} row={state.row} defaultOrder={rowCount + 1} />)}
          </div>
          <div className="admin-modal-footer"><button type="button" className="admin-button" onClick={onClose}>Cancel</button><button type="submit" className="admin-primary-button" disabled={busy}>{busy ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />} Save {config.singular.toLowerCase()}</button></div>
        </form>
      </div>
    </div>
  );
}

function EditorField({ field, row, defaultOrder }: { field: Field; row: Row | null; defaultOrder: number }) {
  const value = row?.[field.key] ?? (field.key === "display_order" ? defaultOrder : field.type === "color" ? "#8b6dff" : field.key === "year" ? new Date().getFullYear() : field.key === "rating" ? 5 : field.key === "level" ? 80 : "");
  if (field.type === "boolean") {
    const checked = row ? Boolean(row[field.key]) : field.key === "published";
    return <label className="admin-check"><input type="checkbox" name={field.key} defaultChecked={checked} /><span><Check size={13} /></span>{field.label}</label>;
  }
  if (field.type === "textarea" || field.type === "array") {
    return <label className="admin-form-field sm:col-span-2"><span>{field.label}</span><textarea name={field.key} defaultValue={Array.isArray(value) ? value.join("\n") : String(value ?? "")} rows={field.type === "array" ? 3 : 4} required={field.required} placeholder={field.placeholder} /></label>;
  }
  if (field.type === "select") {
    return <label className="admin-form-field"><span>{field.label}</span><select name={field.key} defaultValue={String(value || field.options?.[0] || "")}>{field.options?.map((option) => <option key={option}>{option}</option>)}</select></label>;
  }
  return <label className="admin-form-field"><span>{field.label}</span><input name={field.key} type={field.type === "url" ? "url" : field.type === "number" ? "number" : field.type === "color" ? "color" : "text"} defaultValue={String(value ?? "")} required={field.required} placeholder={field.placeholder} min={field.key === "level" ? 0 : undefined} max={field.key === "level" ? 100 : field.key === "rating" ? 5 : undefined} /></label>;
}

function AdminField({ name, label, defaultValue, type = "text", textarea }: { name: string; label: string; defaultValue: string; type?: string; textarea?: boolean }) {
  return <label className="admin-form-field"><span>{label}</span>{textarea ? <textarea name={name} defaultValue={defaultValue} rows={4} /> : <input name={name} type={type} defaultValue={defaultValue} />}</label>;
}

function AdminSelect({ name, label, defaultValue, options }: { name: string; label: string; defaultValue: string; options: string[] }) {
  return <label className="admin-form-field"><span>{label}</span><select name={name} defaultValue={defaultValue}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function AdminCheck({ name, label, defaultChecked }: { name: string; label: string; defaultChecked: boolean }) {
  return <label className="admin-check"><input type="checkbox" name={name} defaultChecked={defaultChecked} /><span><Check size={13} /></span>{label}</label>;
}

function AdminEmpty({ label }: { label: string }) {
  return <div className="grid min-h-40 place-items-center rounded-2xl border border-dashed border-white/10 text-sm text-white/30">{label}</div>;
}

function settingsFromForm(form: FormData, current: SettingsRow): SettingsRow {
  const text = (name: string) => String(form.get(name) || "");
  return {
    ...current,
    name: text("name"),
    role: text("role"),
    email: text("email"),
    phone: text("phone"),
    location: text("location"),
    availability: text("availability"),
    resumeUrl: text("resumeUrl"),
    heroEyebrow: text("heroEyebrow"),
    heroTitle: text("heroTitle"),
    heroDescription: text("heroDescription"),
    about: text("about"),
    seoTitle: text("seoTitle"),
    seoDescription: text("seoDescription"),
    ogTitle: text("ogTitle"),
    ogDescription: text("ogDescription"),
    ogImage: text("ogImage"),
    primaryColor: text("primaryColor"),
    accentColor: text("accentColor"),
    animationIntensity: text("animationIntensity"),
    pageTransition: text("pageTransition"),
    scrollAnimation: text("scrollAnimation"),
    animationsEnabled: form.get("animationsEnabled") === "on",
    backgroundAnimation: form.get("backgroundAnimation") === "on",
    cursorEffect: form.get("cursorEffect") === "on",
    particles: form.get("particles") === "on",
    smoothScroll: form.get("smoothScroll") === "on",
  };
}

function mapSettingsToDatabase(settings: SettingsRow) {
  return {
    id: 1,
    name: settings.name,
    role: settings.role,
    email: settings.email,
    phone: settings.phone,
    location: settings.location,
    availability: settings.availability,
    hero_eyebrow: settings.heroEyebrow,
    hero_title: settings.heroTitle,
    hero_description: settings.heroDescription,
    about: settings.about,
    resume_url: settings.resumeUrl,
    primary_color: settings.primaryColor,
    accent_color: settings.accentColor,
    animations_enabled: settings.animationsEnabled,
    seo_title: settings.seoTitle,
    seo_description: settings.seoDescription,
    og_title: settings.ogTitle,
    og_description: settings.ogDescription,
    og_image: settings.ogImage,
    animation_intensity: settings.animationIntensity,
    page_transition: settings.pageTransition,
    hero_animation: settings.heroAnimation,
    scroll_animation: settings.scrollAnimation,
    background_animation: settings.backgroundAnimation,
    cursor_effect: settings.cursorEffect,
    particles: settings.particles,
    smooth_scroll: settings.smoothScroll,
    updated_at: new Date().toISOString(),
  };
}

function mapSettingsFromDatabase(row: Row, fallback: SiteSettings): SettingsRow {
  return {
    name: row.name || fallback.name,
    role: row.role || fallback.role,
    email: row.email || fallback.email,
    phone: row.phone || fallback.phone,
    location: row.location || fallback.location,
    availability: row.availability || fallback.availability,
    heroEyebrow: row.hero_eyebrow || fallback.heroEyebrow,
    heroTitle: row.hero_title || fallback.heroTitle,
    heroDescription: row.hero_description || fallback.heroDescription,
    about: row.about || fallback.about,
    resumeUrl: row.resume_url || fallback.resumeUrl,
    primaryColor: row.primary_color || fallback.primaryColor,
    accentColor: row.accent_color || fallback.accentColor,
    animationsEnabled: row.animations_enabled ?? true,
    seoTitle: row.seo_title || "",
    seoDescription: row.seo_description || "",
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || "",
    animationIntensity: row.animation_intensity || "balanced",
    pageTransition: row.page_transition || "fade-blur",
    heroAnimation: row.hero_animation || "cinematic",
    scrollAnimation: row.scroll_animation || "mixed",
    backgroundAnimation: row.background_animation ?? true,
    cursorEffect: row.cursor_effect ?? true,
    particles: row.particles ?? true,
    smoothScroll: row.smooth_scroll ?? true,
  };
}
