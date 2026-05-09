import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage bucket name for uploads
export const STORAGE_BUCKET = 'portfolio-uploads';

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param path - Optional path within the bucket (e.g., 'projects/', 'blog/')
 * @returns The public URL of the uploaded file
 */
export async function uploadImage(file: File, path: string = ''): Promise<string> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${path}${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Upload file
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Delete an image from Supabase Storage
 * @param url - The public URL of the file to delete
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    // Extract the path from the URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split(`/object/public/${STORAGE_BUCKET}/`);
    if (pathParts.length < 2) {
      throw new Error('Invalid storage URL');
    }
    const filePath = pathParts[1];

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

/**
 * Initialize storage bucket if it doesn't exist
 * This should be called once on app initialization
 */
export async function initializeStorage(): Promise<void> {
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.error('Error listing buckets:', listError);
      return;
    }

    const bucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKET);

    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket(STORAGE_BUCKET, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml']
      });

      if (createError) {
        console.error('Error creating bucket:', createError);
      } else {
        console.log('Storage bucket created successfully');
      }
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
}
