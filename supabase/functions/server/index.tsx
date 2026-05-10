import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-79e7cc1a/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize storage bucket
app.post("/make-server-79e7cc1a/init-storage", async (c) => {
  try {
    const bucketName = 'portfolio-uploads';

    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.error('Error listing buckets:', listError);
      return c.json({ error: 'Failed to list buckets', details: listError }, 500);
    }

    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);

    let bucketCreated = false;

    if (!bucketExists) {
      // Create the bucket
      const { data, error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml']
      });

      if (createError) {
        console.error('Error creating bucket:', createError);
        return c.json({ error: 'Failed to create bucket', details: createError }, 500);
      }
      bucketCreated = true;
    }

    // Create RLS policies to allow all operations (for public portfolio)
    // We'll use raw SQL to create policies
    try {
      // Policy to allow anyone to upload (INSERT)
      await supabase.rpc('exec_sql', {
        sql: `
          CREATE POLICY IF NOT EXISTS "Allow public uploads"
          ON storage.objects FOR INSERT
          TO public
          WITH CHECK (bucket_id = '${bucketName}');
        `
      }).catch(() => {
        // If rpc doesn't exist, policies might need to be created via dashboard
        console.log('Note: RLS policies may need manual setup via Supabase Dashboard');
      });

      // Policy to allow anyone to read (SELECT)
      await supabase.rpc('exec_sql', {
        sql: `
          CREATE POLICY IF NOT EXISTS "Allow public reads"
          ON storage.objects FOR SELECT
          TO public
          USING (bucket_id = '${bucketName}');
        `
      }).catch(() => {});

      // Policy to allow anyone to update (UPDATE)
      await supabase.rpc('exec_sql', {
        sql: `
          CREATE POLICY IF NOT EXISTS "Allow public updates"
          ON storage.objects FOR UPDATE
          TO public
          USING (bucket_id = '${bucketName}');
        `
      }).catch(() => {});

      // Policy to allow anyone to delete (DELETE)
      await supabase.rpc('exec_sql', {
        sql: `
          CREATE POLICY IF NOT EXISTS "Allow public deletes"
          ON storage.objects FOR DELETE
          TO public
          USING (bucket_id = '${bucketName}');
        `
      }).catch(() => {});

    } catch (policyError) {
      console.log('Policy creation skipped or failed:', policyError);
    }

    return c.json({
      message: bucketCreated
        ? 'Storage bucket created successfully. Please set up RLS policies via Supabase Dashboard if uploads still fail.'
        : 'Bucket exists. Please ensure RLS policies are configured via Supabase Dashboard.',
      bucket: bucketName,
      note: 'If uploads fail with RLS error, disable RLS or create policies manually in Supabase Dashboard > Storage > Policies'
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return c.json({ error: 'Unexpected error occurred', details: error.message }, 500);
  }
});

// Upload image endpoint (bypasses RLS using service role)
app.post("/make-server-79e7cc1a/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const path = formData.get('path') as string || '';

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${path}${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    // Upload using service role (bypasses RLS)
    const { data, error } = await supabase.storage
      .from('portfolio-uploads')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return c.json({ error: 'Upload failed', details: error.message }, 500);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-uploads')
      .getPublicUrl(data.path);

    return c.json({ url: publicUrl, path: data.path });
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: 'Upload failed', details: error.message }, 500);
  }
});

// Delete image endpoint
app.delete("/make-server-79e7cc1a/upload", async (c) => {
  try {
    const { url } = await c.req.json();

    if (!url) {
      return c.json({ error: 'No URL provided' }, 400);
    }

    // Extract path from URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/object/public/portfolio-uploads/');
    if (pathParts.length < 2) {
      return c.json({ error: 'Invalid URL' }, 400);
    }
    const filePath = pathParts[1];

    // Delete using service role (bypasses RLS)
    const { error } = await supabase.storage
      .from('portfolio-uploads')
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return c.json({ error: 'Delete failed', details: error.message }, 500);
    }

    return c.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return c.json({ error: 'Delete failed', details: error.message }, 500);
  }
});

Deno.serve(app.fetch);