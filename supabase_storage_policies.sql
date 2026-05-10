-- Supabase Storage RLS Policies for Portfolio Uploads
-- Run this in Supabase Dashboard > SQL Editor to fix "row-level security policy" errors

-- Allow anyone to upload files to portfolio-uploads bucket
CREATE POLICY "Allow public uploads to portfolio-uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'portfolio-uploads');

-- Allow anyone to read files from portfolio-uploads bucket
CREATE POLICY "Allow public reads from portfolio-uploads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio-uploads');

-- Allow anyone to update files in portfolio-uploads bucket
CREATE POLICY "Allow public updates to portfolio-uploads"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'portfolio-uploads');

-- Allow anyone to delete files from portfolio-uploads bucket
CREATE POLICY "Allow public deletes from portfolio-uploads"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'portfolio-uploads');

-- Verify policies were created
SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%portfolio%';
