import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage bucket name for uploads
export const STORAGE_BUCKET = 'portfolio-uploads';

/**
 * Upload an image to Supabase Storage via server endpoint (bypasses RLS)
 * @param file - The file to upload
 * @param path - Optional path within the bucket (e.g., 'projects/', 'blog/')
 * @returns The public URL of the uploaded file
 */
export async function uploadImage(file: File, path: string = ''): Promise<string> {
  try {
    // Upload via server endpoint to bypass RLS
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    const supabaseUrl = `https://${projectId}.supabase.co`;
    const response = await fetch(`${supabaseUrl}/functions/v1/make-server-79e7cc1a/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: formData
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Upload error:', result);

      // Provide helpful error messages
      if (result.error?.includes('not found') || result.error?.includes('Bucket')) {
        throw new Error('Storage bucket not initialized. Please click "Initialize Storage" button in Admin Dashboard.');
      }

      throw new Error(result.error || result.details || 'Upload failed');
    }

    return result.url;
  } catch (error: any) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Delete an image from Supabase Storage via server endpoint (bypasses RLS)
 * @param url - The public URL of the file to delete
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    const supabaseUrl = `https://${projectId}.supabase.co`;
    const response = await fetch(`${supabaseUrl}/functions/v1/make-server-79e7cc1a/upload`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Delete error:', result);
      throw new Error(result.error || result.details || 'Delete failed');
    }
  } catch (error: any) {
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
    const supabaseUrl = `https://${projectId}.supabase.co`;
    const response = await fetch(`${supabaseUrl}/functions/v1/make-server-79e7cc1a/init-storage`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Storage initialization:', result.message);
    } else {
      console.error('Storage initialization failed:', result.error, result.details);
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
}
