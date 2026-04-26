// =====================================================================
// src/app/lib/storage.ts
// Image upload helpers for Supabase Storage. Used by AddProject,
// EditProject, AddBlogPost, EditBlogPost.
//
// Supports the four buckets created in 001_initial.sql:
//   project-images, blog-images, home-images, about-images
// =====================================================================

import { supabase, isSupabaseConfigured } from "./supabase";

export type StorageBucket =
  | "project-images"
  | "blog-images"
  | "home-images"
  | "about-images";

/**
 * Upload a single file to a Supabase Storage bucket and return its
 * public URL. The filename is prefixed with a timestamp to avoid
 * collisions; original extension is preserved.
 *
 * Throws on failure — wrap calls in try/catch and show a toast.
 */
export async function uploadImage(
  bucket: StorageBucket,
  file: File,
  subdir = ""
): Promise<string> {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured. Cannot upload images.");
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const safeName = file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase()
    .slice(0, 40);
  const filename = `${Date.now()}-${safeName}.${ext}`;
  const path = subdir ? `${subdir}/${filename}` : filename;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "31536000", // 1 year — images are immutable once uploaded
      upsert: false,
      contentType: file.type || undefined,
    });

  if (error) {
    throw new Error(`Upload to ${bucket} failed: ${error.message}`);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Upload many files in parallel; returns the list of URLs in input order.
 */
export async function uploadImages(
  bucket: StorageBucket,
  files: File[],
  subdir = ""
): Promise<string[]> {
  return Promise.all(files.map((f) => uploadImage(bucket, f, subdir)));
}

/**
 * Delete an image by its public URL. Best-effort — swallows errors.
 */
export async function deleteImageByUrl(url: string): Promise<void> {
  if (!isSupabaseConfigured) return;

  try {
    // Extract bucket and path from a Supabase Storage public URL.
    // Format: https://<ref>.supabase.co/storage/v1/object/public/<bucket>/<path>
    const match = url.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
    if (!match) return;
    const [, bucket, path] = match;
    await supabase.storage.from(bucket).remove([path]);
  } catch {
    // ignore — image cleanup is non-critical
  }
}
