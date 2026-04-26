// =====================================================================
// src/app/lib/cms-store.ts
// CRUD layer over Supabase. Designed so the existing AdminDashboard
// can swap `localStorage.getItem(...)` for `loadHome()` and
// `localStorage.setItem(...)` for `saveHome(data)` with minimal diff.
//
// All read functions fall back to localStorage cache, then to seed data
// from the data files. This means the public site stays usable even
// when Supabase is down or the user is offline.
// =====================================================================

import { supabase, isSupabaseConfigured } from "./supabase";
import type {
  Project,
  ProjectMeta,
  BlogPost,
  BlogMeta,
  HomeContent,
  AboutContent,
  ContactContent,
} from "../types/cms";

// ---------- Singleton content (Home / About / Contact) ----------

const SINGLETON_CACHE_KEYS = {
  home: "cmsHomeData",
  about: "cmsAboutData",
  contact: "cmsContactData",
} as const;

async function loadSingleton<T>(
  table: "home_content" | "about_content" | "contact_content",
  cacheKey: string,
  fallback: T | null
): Promise<T | null> {
  // Try localStorage cache first for instant render
  let cached: T | null = null;
  try {
    const raw = localStorage.getItem(cacheKey);
    if (raw) cached = JSON.parse(raw) as T;
  } catch {
    /* ignore */
  }

  if (!isSupabaseConfigured) return cached ?? fallback;

  const { data, error } = await supabase
    .from(table)
    .select("data")
    .eq("id", "singleton")
    .maybeSingle();

  if (error) {
    // eslint-disable-next-line no-console
    console.warn(`[cms] load ${table} failed:`, error.message);
    return cached ?? fallback;
  }

  if (data?.data) {
    // Refresh cache so next page load is instant
    try {
      localStorage.setItem(cacheKey, JSON.stringify(data.data));
    } catch {
      /* ignore */
    }
    return data.data as T;
  }

  return cached ?? fallback;
}

async function saveSingleton<T>(
  table: "home_content" | "about_content" | "contact_content",
  cacheKey: string,
  data: T
): Promise<void> {
  // Always write to cache first — UI feels instant
  try {
    localStorage.setItem(cacheKey, JSON.stringify(data));
  } catch {
    /* ignore */
  }

  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured. Connect Supabase in Figma Make Settings, then sign in again."
    );
  }

  const { error } = await supabase
    .from(table)
    .upsert({ id: "singleton", data }, { onConflict: "id" });

  if (error) {
    throw new Error(`Failed to save ${table}: ${error.message}`);
  }
}

export const loadHome    = (fallback: HomeContent | null = null)  => loadSingleton<HomeContent>("home_content",    SINGLETON_CACHE_KEYS.home,    fallback);
export const saveHome    = (data: HomeContent)    => saveSingleton<HomeContent>("home_content",    SINGLETON_CACHE_KEYS.home,    data);
export const loadAbout   = (fallback: AboutContent | null = null) => loadSingleton<AboutContent>("about_content",   SINGLETON_CACHE_KEYS.about,   fallback);
export const saveAbout   = (data: AboutContent)   => saveSingleton<AboutContent>("about_content",   SINGLETON_CACHE_KEYS.about,   data);
export const loadContact = (fallback: ContactContent | null = null) => loadSingleton<ContactContent>("contact_content", SINGLETON_CACHE_KEYS.contact, fallback);
export const saveContact = (data: ContactContent) => saveSingleton<ContactContent>("contact_content", SINGLETON_CACHE_KEYS.contact, data);

// ---------- Projects ----------

const PROJECTS_CACHE_KEY = "cmsProjectsCache";

export interface ProjectRecord extends Project {
  meta: ProjectMeta;
}

function rowToProjectRecord(row: any): ProjectRecord {
  // Top-level columns are denormalised; full Project lives in `data`
  return {
    ...(row.data as Project),
    id: row.id,           // canonical
    title: row.title,     // canonical
    category: row.category,
    sector: row.sector,
    meta: {
      status: row.status,
      is_featured: row.is_featured,
      show_on_home: row.show_on_home,
      display_order: row.display_order,
      created_at: row.created_at,
      updated_at: row.updated_at,
    },
  };
}

function projectRecordToRow(p: ProjectRecord) {
  // Strip meta from the JSON we store in `data`
  const { meta, ...projectFields } = p;
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    sector: p.sector,
    status: meta.status,
    is_featured: meta.is_featured,
    show_on_home: meta.show_on_home,
    display_order: meta.display_order,
    data: projectFields as Project,
  };
}

/**
 * Load all projects (sorted by display_order, then title).
 * Falls back to seed data if Supabase isn't reachable.
 */
export async function loadProjects(seed: Project[] = []): Promise<ProjectRecord[]> {
  if (!isSupabaseConfigured) {
    return seed.map(seedToRecord);
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    // eslint-disable-next-line no-console
    console.warn("[cms] loadProjects failed, using seed:", error.message);
    return seed.map(seedToRecord);
  }

  if (!data || data.length === 0) {
    // Empty table — first run, return seed
    return seed.map(seedToRecord);
  }

  const records = data.map(rowToProjectRecord);
  try {
    localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify(records));
  } catch {
    /* ignore */
  }
  return records;
}

export async function loadProjectById(
  id: string,
  seed: Project[] = []
): Promise<ProjectRecord | null> {
  if (!isSupabaseConfigured) {
    const s = seed.find((p) => p.id === id);
    return s ? seedToRecord(s) : null;
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    const s = seed.find((p) => p.id === id);
    return s ? seedToRecord(s) : null;
  }

  return rowToProjectRecord(data);
}

export async function saveProject(p: ProjectRecord): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.");
  }
  const row = projectRecordToRow(p);
  const { error } = await supabase
    .from("projects")
    .upsert(row, { onConflict: "id" });
  if (error) throw new Error(`Save project failed: ${error.message}`);
}

export async function deleteProject(id: string): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(`Delete project failed: ${error.message}`);
}

function seedToRecord(p: Project): ProjectRecord {
  return {
    ...p,
    meta: {
      status: "published",
      is_featured: false,
      show_on_home: false,
      display_order: 100,
    },
  };
}

// ---------- Blog Posts ----------

const BLOG_CACHE_KEY = "cmsBlogCache";

export interface BlogRecord extends BlogPost {
  meta: BlogMeta;
}

function rowToBlogRecord(row: any): BlogRecord {
  return {
    ...(row.data as BlogPost),
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    meta: {
      status: row.status,
      published_at: row.published_at,
      created_at: row.created_at,
      updated_at: row.updated_at,
    },
  };
}

function blogRecordToRow(b: BlogRecord) {
  const { meta, ...postFields } = b;
  return {
    id: b.id,
    slug: b.slug,
    title: b.title,
    category: b.category,
    status: meta.status,
    published_at: meta.published_at ?? null,
    data: postFields as BlogPost,
  };
}

export async function loadBlogPosts(seed: BlogPost[] = []): Promise<BlogRecord[]> {
  if (!isSupabaseConfigured) return seed.map(seedToBlogRecord);

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    // eslint-disable-next-line no-console
    console.warn("[cms] loadBlogPosts failed, using seed:", error.message);
    return seed.map(seedToBlogRecord);
  }

  if (!data || data.length === 0) return seed.map(seedToBlogRecord);

  const records = data.map(rowToBlogRecord);
  try {
    localStorage.setItem(BLOG_CACHE_KEY, JSON.stringify(records));
  } catch {
    /* ignore */
  }
  return records;
}

export async function loadBlogPostBySlug(
  slug: string,
  seed: BlogPost[] = []
): Promise<BlogRecord | null> {
  if (!isSupabaseConfigured) {
    const s = seed.find((p) => p.slug === slug);
    return s ? seedToBlogRecord(s) : null;
  }
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    const s = seed.find((p) => p.slug === slug);
    return s ? seedToBlogRecord(s) : null;
  }
  return rowToBlogRecord(data);
}

export async function saveBlogPost(b: BlogRecord): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured.");
  const row = blogRecordToRow(b);
  const { error } = await supabase
    .from("blog_posts")
    .upsert(row, { onConflict: "id" });
  if (error) throw new Error(`Save blog post failed: ${error.message}`);
}

export async function deleteBlogPost(id: string): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(`Delete blog post failed: ${error.message}`);
}

function seedToBlogRecord(b: BlogPost): BlogRecord {
  return {
    ...b,
    meta: {
      status: "published",
      published_at: null,
    },
  };
}
