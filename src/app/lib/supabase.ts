// =====================================================================
// src/app/lib/supabase.ts
// Single shared Supabase client. URL and anon key come from env vars.
//
// In Figma Make: the Supabase integration auto-injects these as
//   VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// at build time. Verify in Settings → Integrations → Supabase.
//
// Locally / for self-hosted: create a `.env.local` at repo root with:
//   VITE_SUPABASE_URL=https://<your-project>.supabase.co
//   VITE_SUPABASE_ANON_KEY=eyJhbGc...
// =====================================================================

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  (import.meta as any).env?.VITE_SUPABASE_URL ||
  (typeof process !== "undefined" ? (process as any).env?.VITE_SUPABASE_URL : "") ||
  "";

const SUPABASE_ANON_KEY =
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
  (typeof process !== "undefined" ? (process as any).env?.VITE_SUPABASE_ANON_KEY : "") ||
  "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Don't throw — let the app run with degraded CMS so the public site
  // still renders from seed data. The console warning is enough for dev.
  // eslint-disable-next-line no-console
  console.warn(
    "[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. " +
      "CMS will fall back to local seed data. Connect Supabase in Figma Make Settings, " +
      "or add the keys to .env.local for self-hosted dev."
  );
}

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_ANON_KEY || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  }
);

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
