import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-79e7cc1a`;
const headers = {
  'Authorization': `Bearer ${publicAnonKey}`,
  'Content-Type': 'application/json',
};

export const CMS_KEYS = [
  'cmsHomeData',
  'cmsAboutData',
  'cmsAboutProfileImage',
  'contactPageTitle',
  'contactPageDescription',
  'workPageTitle',
  'workPageDescription',
  'blogPageTitle',
  'blogPageDescription',
  'projectOrder',
  'blogOrder',
  'cmsProjectsData',
  'cmsNewProjects',
  'cmsDeletedProjects',
  'cmsBlogPosts',
  'cmsDeletedBlogPosts',
] as const;

export type CMSKey = typeof CMS_KEYS[number];
export type CMSStore = Partial<Record<CMSKey, any>>;

export async function cmsGet(key: string): Promise<any> {
  const res = await fetch(`${BASE}/kv/${encodeURIComponent(key)}`, { headers });
  if (!res.ok) throw new Error(`cmsGet failed: ${res.status}`);
  const { value } = await res.json();
  return value ?? null;
}

export async function cmsSet(key: string, value: any): Promise<void> {
  const res = await fetch(`${BASE}/kv/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ value }),
  });
  if (!res.ok) throw new Error(`cmsSet failed: ${res.status}`);
}

export async function cmsDel(key: string): Promise<void> {
  const res = await fetch(`${BASE}/kv/${encodeURIComponent(key)}`, {
    method: 'DELETE',
    headers,
  });
  if (!res.ok) throw new Error(`cmsDel failed: ${res.status}`);
}

export async function cmsBatchGet(keys: readonly string[]): Promise<Record<string, any>> {
  const res = await fetch(`${BASE}/kv/batch-get`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ keys }),
  });
  if (!res.ok) throw new Error(`cmsBatchGet failed: ${res.status}`);
  const { values } = await res.json();
  return values ?? {};
}
