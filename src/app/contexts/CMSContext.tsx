import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { CMS_KEYS, CMSKey, CMSStore, cmsBatchGet, cmsSet, cmsDel } from '../lib/cms';

interface CMSContextValue {
  store: CMSStore;
  loading: boolean;
  setStore: (key: CMSKey, value: any) => Promise<void>;
  removeStore: (key: CMSKey) => Promise<void>;
}

const CMSContext = createContext<CMSContextValue | null>(null);

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used within CMSProvider');
  return ctx;
}

// Run a one-time migration: any key that Supabase doesn't have yet but localStorage does
// gets written to Supabase and cleared from localStorage.
async function migrateFromLocalStorage(supabaseData: Record<string, any>): Promise<Record<string, any>> {
  const migrated: Record<string, any> = {};
  const promises: Promise<void>[] = [];

  for (const key of CMS_KEYS) {
    if (supabaseData[key] != null) continue; // Supabase already has it
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      migrated[key] = parsed;
      promises.push(cmsSet(key, parsed).then(() => localStorage.removeItem(key)));
    } catch {
      // plain string (non-JSON keys like page titles)
      migrated[key] = raw;
      promises.push(cmsSet(key, raw).then(() => localStorage.removeItem(key)));
    }
  }

  await Promise.all(promises);
  return migrated;
}

export function CMSProvider({ children }: { children: ReactNode }) {
  const [store, setStoreState] = useState<CMSStore>({});
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        const supabaseData = await cmsBatchGet(CMS_KEYS);
        if (cancelled) return;

        // Migrate any local-only data to Supabase
        const migrated = await migrateFromLocalStorage(supabaseData);
        if (cancelled) return;

        setStoreState({ ...supabaseData, ...migrated } as CMSStore);
      } catch (err) {
        console.error('CMSContext boot error:', err);
        // Fall back to localStorage if Supabase is unreachable
        const fallback: CMSStore = {};
        for (const key of CMS_KEYS) {
          const raw = localStorage.getItem(key);
          if (!raw) continue;
          try { (fallback as any)[key] = JSON.parse(raw); }
          catch { (fallback as any)[key] = raw; }
        }
        if (!cancelled) setStoreState(fallback);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    boot();
    return () => { cancelled = true; };
  }, []);

  const setStore = useCallback(async (key: CMSKey, value: any) => {
    // Optimistic update
    setStoreState(prev => ({ ...prev, [key]: value }));
    try {
      await cmsSet(key, value);
      setSaveError(null);
    } catch (err: any) {
      setSaveError(err.message ?? 'Failed to save');
    }
  }, []);

  const removeStore = useCallback(async (key: CMSKey) => {
    setStoreState(prev => { const next = { ...prev }; delete next[key]; return next; });
    try {
      await cmsDel(key);
      setSaveError(null);
    } catch (err: any) {
      setSaveError(err.message ?? 'Failed to delete');
    }
  }, []);

  return (
    <CMSContext.Provider value={{ store, loading, setStore, removeStore }}>
      {children}
      {saveError && (
        <div
          style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}
          className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 text-sm"
        >
          <span>Save failed: {saveError}</span>
          <button
            onClick={() => setSaveError(null)}
            className="ml-2 font-bold hover:opacity-70"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}
    </CMSContext.Provider>
  );
}
