// =====================================================================
// src/app/pages/AdminProjects.tsx
// List view for projects. Linked to from AdminDashboard's Work tab.
// Routes: /admin/projects
// =====================================================================

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  Eye,
  EyeOff,
  Star,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  loadProjects,
  deleteProject,
  saveProject,
  type ProjectRecord,
} from "../lib/cms-store";
import { projects as seedProjects } from "../data/projects";

export default function AdminProjects() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const records = await loadProjects(seedProjects);
      setItems(records);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete “${title}”? This cannot be undone.`)) return;
    setPendingId(id);
    try {
      await deleteProject(id);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (e: any) {
      alert(`Delete failed: ${e?.message ?? "unknown error"}`);
    } finally {
      setPendingId(null);
    }
  };

  const handleToggleStatus = async (p: ProjectRecord) => {
    setPendingId(p.id);
    const next: ProjectRecord = {
      ...p,
      meta: {
        ...p.meta,
        status: p.meta.status === "published" ? "draft" : "published",
      },
    };
    try {
      await saveProject(next);
      setItems((prev) => prev.map((x) => (x.id === p.id ? next : x)));
    } catch (e: any) {
      alert(`Save failed: ${e?.message ?? "unknown error"}`);
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Dashboard</span>
            </Link>
            <div className="h-5 w-px bg-border" />
            <div>
              <h1 className="text-lg font-medium text-foreground">Projects</h1>
              <p className="text-xs text-muted-foreground">{items.length} total</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Refresh"
              aria-label="Refresh list"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link
              to="/admin/projects/new"
              className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              New project
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 flex items-start gap-2 text-sm bg-destructive/5 text-destructive border border-destructive/20 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground mb-4">No projects yet.</p>
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add your first project
            </Link>
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left">
                <tr className="text-xs text-muted-foreground tracking-wide">
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-border hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.thumbnail && (
                          <img
                            src={p.thumbnail}
                            alt=""
                            className="w-10 h-10 rounded object-cover bg-muted"
                          />
                        )}
                        <div>
                          <div className="font-medium text-foreground flex items-center gap-2">
                            {p.title}
                            {p.meta.is_featured && (
                              <Star className="w-3.5 h-3.5 fill-foreground text-foreground" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {p.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleStatus(p)}
                        disabled={pendingId === p.id}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs border transition-colors ${
                          p.meta.status === "published"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                        title="Click to toggle"
                      >
                        {p.meta.status === "published" ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        {p.meta.status}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {p.meta.display_order}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() =>
                            navigate(`/admin/projects/${p.id}/edit`)
                          }
                          className="p-2 hover:bg-muted rounded transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          disabled={pendingId === p.id}
                          className="p-2 hover:bg-destructive/10 hover:text-destructive rounded transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {pendingId === p.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-xs text-muted-foreground">
          Tip: drafts are visible only to signed-in users; published projects appear on the public Work page.
        </p>
      </main>
    </div>
  );
}
