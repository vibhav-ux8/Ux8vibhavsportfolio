// =====================================================================
// src/app/pages/ProjectEditor.tsx
// Combined Add + Edit form. Routes:
//   /admin/projects/new         (id param undefined)
//   /admin/projects/:id/edit
// Aligned to the existing Project shape in src/app/data/projects.ts.
// Saves to Supabase via cms-store; uploads images to Supabase Storage.
// =====================================================================

import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  X,
  Upload,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import {
  loadProjectById,
  saveProject,
  deleteProject,
  type ProjectRecord,
} from "../lib/cms-store";
import { uploadImage } from "../lib/storage";
import {
  projects as seedProjects,
  getAllCategories,
  getAllSectors,
} from "../data/projects";
import type { Project, ProjectImage } from "../types/cms";

const EMPTY: ProjectRecord = {
  id: "",
  title: "",
  description: "",
  tags: [],
  category: "DPI & Governance",
  sector: "UI-UX Design",
  thumbnail: "",
  logoOverlay: "",
  year: "",
  role: "",
  context: "",
  research: "",
  designSystem: "",
  prototyping: "",
  outcome: "",
  icon: "Folder",
  images: [],
  meta: {
    status: "draft",
    is_featured: false,
    show_on_home: false,
    display_order: 100,
  },
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProjectEditor() {
  const { id } = useParams<{ id?: string }>();
  const isNew = !id;
  const navigate = useNavigate();

  const [form, setForm] = useState<ProjectRecord>(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadingGalleryIdx, setUploadingGalleryIdx] = useState<number | null>(
    null
  );

  // Load existing project on mount
  useEffect(() => {
    if (isNew) return;
    let active = true;
    (async () => {
      try {
        const rec = await loadProjectById(id!, seedProjects);
        if (!active) return;
        if (!rec) {
          setError(`Project “${id}” not found.`);
          setLoading(false);
          return;
        }
        setForm(rec);
      } catch (e: any) {
        if (!active) return;
        setError(e?.message ?? "Failed to load project.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id, isNew]);

  // Auto-fill id from title for new projects
  useEffect(() => {
    if (isNew && form.title && !form.id) {
      setForm((f) => ({ ...f, id: slugify(f.title) }));
    }
  }, [form.title, form.id, isNew]);

  const updateField = useCallback(<K extends keyof ProjectRecord>(
    key: K,
    value: ProjectRecord[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  }, []);

  const updateMeta = useCallback(<K extends keyof ProjectRecord["meta"]>(
    key: K,
    value: ProjectRecord["meta"][K]
  ) => {
    setForm((f) => ({ ...f, meta: { ...f.meta, [key]: value } }));
  }, []);

  const addTag = () => {
    const t = tagInput.trim();
    if (!t || form.tags.includes(t)) return;
    updateField("tags", [...form.tags, t]);
    setTagInput("");
  };

  const removeTag = (t: string) => {
    updateField("tags", form.tags.filter((x) => x !== t));
  };

  const handleThumbUpload = async (file: File) => {
    setUploadingThumb(true);
    setError(null);
    try {
      const url = await uploadImage("project-images", file, form.id || "untitled");
      updateField("thumbnail", url);
    } catch (e: any) {
      setError(e?.message ?? "Upload failed.");
    } finally {
      setUploadingThumb(false);
    }
  };

  const addGalleryImage = () => {
    updateField("images", [...form.images, { url: "", caption: "" }]);
  };

  const updateGalleryImage = (
    idx: number,
    patch: Partial<ProjectImage>
  ) => {
    const next = [...form.images];
    next[idx] = { ...next[idx], ...patch };
    updateField("images", next);
  };

  const removeGalleryImage = (idx: number) => {
    updateField(
      "images",
      form.images.filter((_, i) => i !== idx)
    );
  };

  const handleGalleryUpload = async (idx: number, file: File) => {
    setUploadingGalleryIdx(idx);
    setError(null);
    try {
      const url = await uploadImage("project-images", file, form.id || "untitled");
      updateGalleryImage(idx, { url });
    } catch (e: any) {
      setError(e?.message ?? "Upload failed.");
    } finally {
      setUploadingGalleryIdx(null);
    }
  };

  const validate = (): string | null => {
    if (!form.id) return "ID is required (auto-generated from title).";
    if (!form.title) return "Title is required.";
    if (!form.description) return "Description is required.";
    if (!form.category) return "Category is required.";
    if (!form.sector) return "Sector is required.";
    return null;
  };

  const handleSave = async (publish?: boolean) => {
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);

    const next: ProjectRecord = {
      ...form,
      meta: {
        ...form.meta,
        status: publish === true ? "published" : publish === false ? "draft" : form.meta.status,
      },
    };

    try {
      await saveProject(next);
      setForm(next);
      setSuccess(
        next.meta.status === "published" ? "Published." : "Draft saved."
      );
      // For new projects, switch the URL to edit mode so subsequent saves update
      if (isNew) {
        navigate(`/admin/projects/${next.id}/edit`, { replace: true });
      }
    } catch (e: any) {
      setError(e?.message ?? "Save failed.");
    } finally {
      setSaving(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleDelete = async () => {
    if (isNew) return;
    if (!confirm(`Delete “${form.title}”? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deleteProject(form.id);
      navigate("/admin/projects");
    } catch (e: any) {
      setError(e?.message ?? "Delete failed.");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Categories from existing data plus a sensible defaults set
  const categories = Array.from(
    new Set([
      "LEA & Defence",
      "DPI & Governance",
      "IKS & Culture",
      "Healthcare",
      "Services",
      "e-commerce",
      ...getAllCategories(),
    ])
  );
  const sectors = Array.from(
    new Set([
      "UI-UX Design",
      "Product Design",
      "Communication",
      "Game Design",
      "Digital Illustration",
      ...getAllSectors(),
    ])
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/projects"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Projects</span>
            </Link>
            <div className="h-5 w-px bg-border" />
            <div>
              <h1 className="text-lg font-medium text-foreground">
                {isNew ? "New project" : form.title || "Untitled"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isNew ? "Draft" : `${form.meta.status} · /work/${form.id}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isNew && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors disabled:opacity-50"
                title="Delete project"
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            )}
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm disabled:opacity-50"
            >
              Save draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {form.meta.status === "published" ? "Update" : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {error && (
          <div className="flex items-start gap-2 text-sm bg-destructive/5 text-destructive border border-destructive/20 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-start gap-2 text-sm bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 rounded-lg p-3">
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Basics */}
        <Section title="Basics" subtitle="Title, slug, description, taxonomy">
          <Field label="Title">
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="input"
              placeholder="Predict"
            />
          </Field>

          <Field
            label="ID / slug"
            hint="Used in the URL: /work/<id>. Auto-generated from title; override only if needed."
          >
            <input
              type="text"
              value={form.id}
              onChange={(e) => updateField("id", slugify(e.target.value))}
              disabled={!isNew}
              className="input font-mono"
              placeholder="ai-assisted-decision-platform"
            />
          </Field>

          <Field label="Short description">
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={2}
              className="input resize-none"
              placeholder="One-line description shown on cards."
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category (domain)">
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="input"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Sector (discipline)">
              <select
                value={form.sector}
                onChange={(e) => updateField("sector", e.target.value)}
                className="input"
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Year / period" hint="e.g. 2024-2026">
              <input
                type="text"
                value={form.year}
                onChange={(e) => updateField("year", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Role">
              <input
                type="text"
                value={form.role}
                onChange={(e) => updateField("role", e.target.value)}
                className="input"
                placeholder="Principal Product Designer"
              />
            </Field>
          </div>

          <Field label="Tags">
            <div className="flex flex-wrap gap-2 mb-2">
              {form.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-muted rounded-md"
                >
                  {t}
                  <button
                    onClick={() => removeTag(t)}
                    className="hover:text-destructive"
                    aria-label={`Remove ${t}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add a tag and press Enter"
                className="input flex-1"
              />
              <button
                onClick={addTag}
                type="button"
                className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm"
              >
                Add
              </button>
            </div>
          </Field>

          <Field
            label="Lucide icon name"
            hint="e.g. Search, Shield, Users — must match a lucide-react icon."
          >
            <input
              type="text"
              value={form.icon}
              onChange={(e) => updateField("icon", e.target.value)}
              className="input font-mono"
            />
          </Field>
        </Section>

        {/* Imagery */}
        <Section title="Imagery" subtitle="Thumbnail and case-study gallery">
          <Field label="Thumbnail" hint="Shown on Work page cards. ~1200×800.">
            <div className="flex gap-3 items-start">
              <div className="w-32 h-24 bg-muted rounded-lg overflow-hidden border border-border flex items-center justify-center">
                {form.thumbnail ? (
                  <img
                    src={form.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={form.thumbnail}
                  onChange={(e) => updateField("thumbnail", e.target.value)}
                  placeholder="Paste a URL, or upload below"
                  className="input"
                />
                <label className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm cursor-pointer">
                  {uploadingThumb ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {uploadingThumb ? "Uploading…" : "Upload image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleThumbUpload(f);
                    }}
                  />
                </label>
              </div>
            </div>
          </Field>

          <Field label="Logo overlay" hint="Optional logo overlaid on the card.">
            <input
              type="text"
              value={form.logoOverlay ?? ""}
              onChange={(e) => updateField("logoOverlay", e.target.value)}
              className="input"
              placeholder="URL or paste-from-upload"
            />
          </Field>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-foreground">Case-study gallery</label>
              <button
                onClick={addGalleryImage}
                type="button"
                className="inline-flex items-center gap-1 text-sm text-foreground hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                Add image
              </button>
            </div>
            <div className="space-y-3">
              {form.images.map((img, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-start p-3 border border-border rounded-lg"
                >
                  <div className="w-24 h-16 bg-muted rounded overflow-hidden border border-border flex items-center justify-center shrink-0">
                    {img.url ? (
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={img.url}
                      onChange={(e) =>
                        updateGalleryImage(idx, { url: e.target.value })
                      }
                      placeholder="Image URL"
                      className="input text-sm"
                    />
                    <input
                      type="text"
                      value={img.caption}
                      onChange={(e) =>
                        updateGalleryImage(idx, { caption: e.target.value })
                      }
                      placeholder="Caption"
                      className="input text-sm"
                    />
                    <label className="inline-flex items-center gap-2 px-2.5 py-1.5 border border-border rounded text-xs hover:bg-muted transition-colors cursor-pointer">
                      {uploadingGalleryIdx === idx ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Upload className="w-3 h-3" />
                      )}
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleGalleryUpload(idx, f);
                        }}
                      />
                    </label>
                  </div>
                  <button
                    onClick={() => removeGalleryImage(idx)}
                    type="button"
                    className="p-2 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {form.images.length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  No gallery images yet.
                </p>
              )}
            </div>
          </div>
        </Section>

        {/* Case-study sections */}
        <Section
          title="Case study"
          subtitle="Long-form sections shown on the project's detail page"
        >
          <Field label="Context">
            <textarea
              value={form.context}
              onChange={(e) => updateField("context", e.target.value)}
              rows={4}
              className="input resize-y"
            />
          </Field>
          <Field label="Research">
            <textarea
              value={form.research}
              onChange={(e) => updateField("research", e.target.value)}
              rows={4}
              className="input resize-y"
            />
          </Field>
          <Field label="Design system">
            <textarea
              value={form.designSystem}
              onChange={(e) => updateField("designSystem", e.target.value)}
              rows={4}
              className="input resize-y"
            />
          </Field>
          <Field label="Prototyping">
            <textarea
              value={form.prototyping}
              onChange={(e) => updateField("prototyping", e.target.value)}
              rows={4}
              className="input resize-y"
            />
          </Field>
          <Field label="Outcome">
            <textarea
              value={form.outcome}
              onChange={(e) => updateField("outcome", e.target.value)}
              rows={4}
              className="input resize-y"
            />
          </Field>
        </Section>

        {/* Publishing */}
        <Section title="Publishing" subtitle="Visibility, ordering, featuring">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              <select
                value={form.meta.status}
                onChange={(e) =>
                  updateMeta("status", e.target.value as ProjectRecord["meta"]["status"])
                }
                className="input"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </Field>
            <Field label="Display order" hint="Lower numbers appear first.">
              <input
                type="number"
                value={form.meta.display_order}
                onChange={(e) =>
                  updateMeta("display_order", parseInt(e.target.value, 10) || 100)
                }
                className="input"
              />
            </Field>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.meta.is_featured}
                onChange={(e) => updateMeta("is_featured", e.target.checked)}
                className="rounded border-border"
              />
              Featured project
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.meta.show_on_home}
                onChange={(e) => updateMeta("show_on_home", e.target.checked)}
                className="rounded border-border"
              />
              Show on homepage
            </label>
          </div>
        </Section>
      </main>

      {/* Shared input/section styles via Tailwind @layer trick:
          we use Tailwind utility classes so no CSS file is needed.
          The `input` class is defined at the bottom of styles/index.css —
          if it's not, replace `className="input"` with the explicit utilities.
          See PATCHES.md. */}

      <style>{`
        .input {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          font-size: 0.875rem;
          transition: border-color 120ms, box-shadow 120ms;
        }
        .input:focus {
          outline: none;
          border-color: hsl(var(--primary) / 0.5);
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15);
        }
      `}</style>
    </div>
  );
}

// ---------- Sub-components ----------

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6 space-y-4"
    >
      <div className="border-b border-border pb-3 mb-2">
        <h2 className="text-base font-medium text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {children}
    </motion.section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm text-foreground mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}
