// =====================================================================
// src/app/pages/BlogEditor.tsx
// Routes:
//   /admin/blog/new
//   /admin/blog/:id/edit
// Adds a `body` field to BlogPost so posts have actual content. Existing
// posts without a body simply render the excerpt on /blog/:slug until
// you fill it in.
// =====================================================================

import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Save,
  Trash2,
  X,
  Upload,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import {
  loadBlogPostBySlug,
  loadBlogPosts,
  saveBlogPost,
  deleteBlogPost,
  type BlogRecord,
} from "../lib/cms-store";
import { uploadImage } from "../lib/storage";
import { blogPosts as seedPosts, getAllBlogCategories } from "../data/blog";

const EMPTY: BlogRecord = {
  id: "",
  title: "",
  excerpt: "",
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  readTime: "5 min read",
  tags: [],
  category: "Services",
  slug: "",
  image: "",
  body: "",
  author: "Vibhav Kamat",
  meta: {
    status: "draft",
    published_at: null,
  },
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogEditor() {
  const { id } = useParams<{ id?: string }>();
  const isNew = !id;
  const navigate = useNavigate();

  const [form, setForm] = useState<BlogRecord>(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Load existing post by id (note: blog uses slug for URLs but id for editing)
  useEffect(() => {
    if (isNew) return;
    let active = true;
    (async () => {
      try {
        const all = await loadBlogPosts(seedPosts);
        const rec = all.find((p) => p.id === id);
        if (!active) return;
        if (!rec) {
          setError(`Post “${id}” not found.`);
          setLoading(false);
          return;
        }
        setForm(rec);
      } catch (e: any) {
        if (active) setError(e?.message ?? "Failed to load post.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id, isNew]);

  // Auto-generate id and slug from title for new posts
  useEffect(() => {
    if (isNew && form.title) {
      const slug = slugify(form.title);
      setForm((f) => ({
        ...f,
        id: f.id || slug,
        slug: f.slug || slug,
      }));
    }
  }, [form.title, isNew, form.id, form.slug]);

  const updateField = useCallback(<K extends keyof BlogRecord>(
    key: K,
    value: BlogRecord[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  }, []);

  const updateMeta = useCallback(<K extends keyof BlogRecord["meta"]>(
    key: K,
    value: BlogRecord["meta"][K]
  ) => {
    setForm((f) => ({ ...f, meta: { ...f.meta, [key]: value } }));
  }, []);

  const addTag = () => {
    const t = tagInput.trim();
    if (!t || form.tags.includes(t)) return;
    updateField("tags", [...form.tags, t]);
    setTagInput("");
  };
  const removeTag = (t: string) =>
    updateField("tags", form.tags.filter((x) => x !== t));

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    setError(null);
    try {
      const url = await uploadImage("blog-images", file, form.slug || "untitled");
      updateField("image", url);
    } catch (e: any) {
      setError(e?.message ?? "Upload failed.");
    } finally {
      setUploadingImage(false);
    }
  };

  const validate = (): string | null => {
    if (!form.id) return "ID is required.";
    if (!form.slug) return "Slug is required.";
    if (!form.title) return "Title is required.";
    if (!form.excerpt) return "Excerpt is required.";
    if (!form.category) return "Category is required.";
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

    const willPublish =
      publish === true ||
      (publish === undefined && form.meta.status === "published");

    const next: BlogRecord = {
      ...form,
      meta: {
        status: willPublish ? "published" : "draft",
        published_at:
          willPublish && !form.meta.published_at
            ? new Date().toISOString()
            : form.meta.published_at ?? null,
      },
    };

    try {
      await saveBlogPost(next);
      setForm(next);
      setSuccess(willPublish ? "Published." : "Draft saved.");
      if (isNew) {
        navigate(`/admin/blog/${next.id}/edit`, { replace: true });
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
      await deleteBlogPost(form.id);
      navigate("/admin/blog");
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

  const categories = Array.from(
    new Set([
      "LEA & Defence",
      "DPI & Governance",
      "IKS & Culture",
      "Healthcare",
      "Services",
      "e-commerce",
      ...getAllBlogCategories(),
    ])
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/blog"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Posts</span>
            </Link>
            <div className="h-5 w-px bg-border" />
            <div>
              <h1 className="text-lg font-medium text-foreground">
                {isNew ? "New post" : form.title || "Untitled"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isNew ? "Draft" : `${form.meta.status} · /blog/${form.slug}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isNew && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors disabled:opacity-50"
                title="Delete post"
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

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
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

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6 space-y-4"
        >
          <Field label="Title">
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="be-input"
              placeholder="Designing AI Interfaces That Build Trust"
            />
          </Field>

          <Field
            label="Slug"
            hint="URL: /blog/<slug>. Auto-generated; override only if needed."
          >
            <input
              type="text"
              value={form.slug}
              onChange={(e) => updateField("slug", slugify(e.target.value))}
              className="be-input font-mono"
            />
          </Field>

          <Field label="Excerpt" hint="Shown on the blog index card.">
            <textarea
              value={form.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              rows={2}
              className="be-input resize-none"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="be-input"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Read time">
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => updateField("readTime", e.target.value)}
                className="be-input"
                placeholder="8 min read"
              />
            </Field>
          </div>

          <Field label="Display date" hint="Free-text. Used on cards and post header.">
            <input
              type="text"
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
              className="be-input"
              placeholder="March 18, 2026"
            />
          </Field>

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
                className="be-input flex-1"
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

          <Field label="Featured image">
            <div className="flex gap-3 items-start">
              <div className="w-32 h-24 bg-muted rounded-lg overflow-hidden border border-border flex items-center justify-center">
                {form.image ? (
                  <img src={form.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => updateField("image", e.target.value)}
                  placeholder="Paste a URL, or upload below"
                  className="be-input"
                />
                <label className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm cursor-pointer">
                  {uploadingImage ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {uploadingImage ? "Uploading…" : "Upload image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleImageUpload(f);
                    }}
                  />
                </label>
              </div>
            </div>
          </Field>

          <Field
            label="Body"
            hint="Markdown supported by your BlogPost.tsx renderer (if implemented). Otherwise plain text with line breaks."
          >
            <textarea
              value={form.body ?? ""}
              onChange={(e) => updateField("body", e.target.value)}
              rows={20}
              className="be-input resize-y font-mono text-sm"
              placeholder="# Heading&#10;&#10;Write your post here…"
            />
          </Field>
        </motion.section>
      </main>

      <style>{`
        .be-input {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          font-size: 0.875rem;
          transition: border-color 120ms, box-shadow 120ms;
        }
        .be-input:focus {
          outline: none;
          border-color: hsl(var(--primary) / 0.5);
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15);
        }
      `}</style>
    </div>
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
