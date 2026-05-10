# Fix: Row-Level Security Policy Error

If you're getting this error when uploading images:
```
StorageApiError: new row violates row-level security policy
```

This means Supabase's Row Level Security (RLS) is blocking uploads. Follow these steps to fix it:

---

## Quick Fix: Disable RLS (Recommended for Portfolio/Demo)

### Steps:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Navigate to Storage**
   - Click **Storage** in the left sidebar
   - Click on **Policies** tab

3. **Disable RLS for Storage**
   - You'll see policies for `storage.objects`
   - Click the toggle to **disable RLS** for the storage.objects table
   
   **OR**

4. **Create Permissive Policies**
   - Click **New Policy**
   - Choose **"For full customization"**
   - Create these 4 policies:

### Policy 1: Allow Public Uploads (INSERT)
```sql
Policy Name: Allow public uploads
Allowed operation: INSERT
Target roles: public
Policy definition: 
  WITH CHECK (bucket_id = 'portfolio-uploads')
```

### Policy 2: Allow Public Reads (SELECT)
```sql
Policy Name: Allow public reads  
Allowed operation: SELECT
Target roles: public
USING expression:
  bucket_id = 'portfolio-uploads'
```

### Policy 3: Allow Public Updates (UPDATE)
```sql
Policy Name: Allow public updates
Allowed operation: UPDATE
Target roles: public
USING expression:
  bucket_id = 'portfolio-uploads'
```

### Policy 4: Allow Public Deletes (DELETE)
```sql
Policy Name: Allow public deletes
Allowed operation: DELETE
Target roles: public  
USING expression:
  bucket_id = 'portfolio-uploads'
```

---

## Alternative: SQL Editor Method

1. Go to **SQL Editor** in Supabase Dashboard
2. Run this SQL:

```sql
-- Allow anyone to upload files
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'portfolio-uploads');

-- Allow anyone to read files
CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio-uploads');

-- Allow anyone to update files
CREATE POLICY "Allow public updates"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'portfolio-uploads');

-- Allow anyone to delete files
CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'portfolio-uploads');
```

3. Click **Run** to execute

---

## Verification

After setting up policies:

1. Go back to your app
2. Try uploading an image
3. It should work without RLS errors!

---

## Security Note

**For Production**: The policies above allow anyone to upload/delete files. For a production app, you should:

1. Restrict uploads to authenticated users only
2. Add file size/type validation
3. Add user-specific policies (users can only delete their own uploads)

**For Portfolio/Demo**: The current setup is fine since only you have access to the admin panel.

---

## Troubleshooting

### Still getting RLS error?
- Make sure you're in the correct project
- Verify the bucket name is exactly `portfolio-uploads`
- Check that policies are enabled (toggle should be ON)
- Try disabling RLS entirely as a test

### Can't find Policies tab?
- Go to: Dashboard > Storage > Click the bucket name > Policies

### Policies not working?
- Delete all policies and try disabling RLS instead
- This is simpler for a portfolio site where only admins upload

### Need help?
- Check Supabase docs: https://supabase.com/docs/guides/storage/security/access-control
