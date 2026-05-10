# Supabase Storage Setup

If you're getting a "bucket not found" error when uploading images, follow these steps:

## Method 1: Automatic Initialization (Recommended)

The app attempts to initialize the storage bucket automatically when it loads. To trigger this:

1. **Refresh the page** - The bucket should be created automatically
2. **Check the browser console** - Look for "Storage initialization: ..." message
3. **Try uploading again** after the page loads completely

## Method 2: Manual Trigger via Console

If automatic initialization fails, you can manually trigger it from the browser console:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Run this command:

```javascript
fetch('https://ffvvdshrkojwcbyuuqlq.supabase.co/functions/v1/make-server-79e7cc1a/init-storage', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdnZkc2hya29qd2NieXV1cWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMDUxMTUsImV4cCI6MjA5Mjc4MTExNX0.HcM096tBdfEXk2KZFL-Tj7Ju75EvmZXfN444oXFr57U'
  }
}).then(r => r.json()).then(console.log)
```

4. You should see a success message
5. Try uploading again

## Method 3: Create Bucket via Supabase Dashboard

If both methods above fail, create the bucket manually:

1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **Create a new bucket**
5. Enter these settings:
   - **Name**: `portfolio-uploads`
   - **Public bucket**: ✅ Yes (checked)
   - **File size limit**: 10 MB
   - **Allowed MIME types**: 
     - image/png
     - image/jpeg
     - image/jpg
     - image/gif
     - image/webp
     - image/svg+xml
6. Click **Create bucket**
7. Go back to your app and try uploading

## Verification

To verify the bucket was created successfully:

1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **Storage**
4. You should see `portfolio-uploads` in the bucket list

## Troubleshooting

### Error: "Bucket not found"
- The storage bucket hasn't been created yet
- Try Method 1 or Method 2 above

### Error: "new row violates row-level security policy" ⚠️
This is the most common error! It means RLS is blocking uploads.

**Quick Fix:**
1. Go to Supabase Dashboard > Storage > Policies
2. Click "New Policy" > "For full customization"
3. Copy and paste the SQL from `supabase_storage_policies.sql` in the SQL Editor
4. Click "Run"

**OR simply disable RLS:**
1. Go to Supabase Dashboard > Storage > Configuration
2. Find the `storage.objects` table
3. Toggle RLS to **OFF**

See `FIX_UPLOAD_RLS_ERROR.md` for detailed step-by-step instructions.

### Error: "Permission denied"
- The bucket exists but might not be public
- Use Method 3 to ensure "Public bucket" is enabled

### Error: "File too large"
- Maximum file size is 10MB
- Compress your image before uploading

### Error: "Invalid file type"
- Only image files are allowed (PNG, JPEG, JPG, GIF, WebP, SVG)
- Convert your file to a supported format

## Technical Details

**Bucket Name**: `portfolio-uploads`
**Bucket Type**: Public
**Max File Size**: 10 MB (10,485,760 bytes)
**Allowed Types**: PNG, JPEG, JPG, GIF, WebP, SVG

**Storage Organization**:
- `projects/thumbnails/` - Project thumbnail images
- `projects/logos/` - Project logo overlays  
- `projects/gallery/` - Project gallery images
- `projects/content/` - Project section images
- `blog/featured/` - Blog featured images
- `blog/content/` - Blog content images
