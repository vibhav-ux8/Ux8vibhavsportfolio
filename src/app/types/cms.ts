// =====================================================================
// src/app/types/cms.ts
// Shared CMS type definitions. Imported by data files, lib helpers,
// and admin pages. Mirrors the Supabase schema in 001_initial.sql.
// =====================================================================

// ---------- Project (matches existing src/app/data/projects.ts) ----------

export interface ProjectImage {
  url: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  sector: string;
  thumbnail: string;
  logo?: string;
  logoOverlay?: string;
  year: string;
  role: string;
  context: string;
  research: string;
  designSystem: string;
  prototyping: string;
  outcome: string;
  icon: string;
  images: ProjectImage[];
}

// Admin-only metadata layered on top of a Project. Stored in dedicated
// columns of the `projects` table (the rest goes into `data` JSONB).
export interface ProjectMeta {
  status: "draft" | "published" | "archived";
  is_featured: boolean;
  show_on_home: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

// ---------- Blog Post (matches existing src/app/data/blog.ts) ----------

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  slug: string;
  image: string;
  // Optional body — added now so blog posts can have content.
  // Existing data files don't have this; old posts will simply have body === undefined.
  body?: string;
  author?: string;
}

export interface BlogMeta {
  status: "draft" | "published" | "archived";
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

// ---------- Singleton content types (Home / About / Contact) ----------
// These mirror the localStorage structures already in AdminDashboard.tsx.
// Kept as `any`-style records on purpose — the dashboard treats them as
// freeform JSON. Tightening this can come later.

export type HomeContent = {
  hero: {
    logo: string;
    heading1: string;
    heading2: string;
    subtitle: string;
    button1: string;
    button2: string;
  };
  approach: {
    heading: string;
    description: string;
  };
  stats: Array<{
    value: string;
    label: string;
    icon1: string;
    icon2: string;
  }>;
  process: {
    heading: string;
    description: string;
    steps: Array<{
      number: string;
      title: string;
      desc: string;
    }>;
  };
  organizations: {
    heading: string;
    description: string;
    items: Array<{
      name: string;
      icon: string;
      desc: string;
      tag: string;
    }>;
  };
  about: {
    heading: string;
    intro: string;
    specialization: string;
    approach: string;
    linkText: string;
    email: string;
    linkedin: string;
  };
  contact: {
    heading: string;
    description: string;
    buttonText: string;
    successMessage: string;
  };
};

export type AboutContent = {
  hero: {
    name: string;
    image: string;
    lead: string;
    journey: string;
    location: string;
    education: string;
    focus: string;
  };
  biography: {
    background1: string;
    background2: string;
    practice1: string;
    practice2: string;
  };
  philosophy: {
    pullQuote: string;
    evolution: string;
  };
  approach: {
    intro: string;
    principles: Array<{ number: string; title: string; desc: string }>;
  };
  methodology: {
    intro: string;
    steps: Array<{ icon: string; title: string; desc: string }>;
    philosophy: string;
  };
  skills: string[];
  tools: string[];
  experience: Array<{
    period: string;
    title: string;
    location: string;
    desc: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    note: string;
  }>;
  currentFocus: {
    title: string;
    description: string;
  };
};

export type ContactContent = {
  email: string;
  phone?: string;
  location?: string;
  heading: string;
  subtitle: string;
  formEnabled: boolean;
  fields: {
    name: boolean;
    email: boolean;
    subject: boolean;
    message: boolean;
    phone: boolean;
  };
  successMessage: string;
  showSocialLinks: boolean;
  emailService?: string;
};
