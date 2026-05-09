# Image Upload with Supabase Storage

This guide explains how to use the drag-and-drop image upload system integrated with Supabase Storage.

## Overview

Images are now uploaded directly to Supabase Storage instead of using URLs. The system provides:
- Drag-and-drop interface
- File validation (type and size)
- Upload progress indication
- Image preview
- Easy removal

## Setup

The Supabase storage bucket (`portfolio-uploads`) is automatically initialized when the app loads.

## Using the ImageUpload Component

### Basic Usage

```tsx
import { ImageUpload } from '../components/ImageUpload';
import { useState } from 'react';

function MyForm() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageUpload
      value={imageUrl}
      onChange={setImageUrl}
      label="Project Thumbnail"
      path="projects/"
    />
  );
}
```

### Props

- `value`: Current image URL (string)
- `onChange`: Callback when image is uploaded `(url: string) => void`
- `onRemove`: Optional callback when image is removed
- `path`: Storage path prefix (e.g., 'projects/', 'blog/')
- `label`: Label text for the upload area
- `className`: Additional CSS classes

### Complete Example for AddProject Form

```tsx
import { useState } from 'react';
import { ImageUpload } from '../components/ImageUpload';

export default function AddProject() {
  // Replace File states with URL strings
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '', // Now stores URL instead of File
    logoOverlay: '',
    // ... other fields
  });

  // Replace the old file upload handlers with simple setters
  const handleThumbnailChange = (url: string) => {
    setFormData(prev => ({ ...prev, thumbnail: url }));
  };

  const handleLogoChange = (url: string) => {
    setFormData(prev => ({ ...prev, logoOverlay: url }));
  };

  const handleThumbnailRemove = () => {
    setFormData(prev => ({ ...prev, thumbnail: '' }));
  };

  return (
    <form>
      {/* Project Thumbnail */}
      <ImageUpload
        value={formData.thumbnail}
        onChange={handleThumbnailChange}
        onRemove={handleThumbnailRemove}
        path="projects/thumbnails/"
        label="Project Thumbnail"
      />

      {/* Logo Overlay */}
      <ImageUpload
        value={formData.logoOverlay}
        onChange={handleLogoChange}
        path="projects/logos/"
        label="Logo Overlay"
      />

      {/* ... rest of form ... */}
    </form>
  );
}
```

### For Gallery/Multiple Images

```tsx
import { useState } from 'react';
import { ImageUpload } from '../components/ImageUpload';

function GalleryUpload() {
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

  const handleAddImage = (url: string) => {
    setGalleryUrls(prev => [...prev, url]);
  };

  const handleRemoveImage = (index: number) => {
    setGalleryUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Gallery Images</h3>
      
      {/* Existing Images */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {galleryUrls.map((url, index) => (
          <div key={index} className="relative group">
            <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-32 object-cover rounded" />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Add New Image */}
      <ImageUpload
        value=""
        onChange={handleAddImage}
        path="projects/gallery/"
        label="Add Gallery Image"
      />
    </div>
  );
}
```

## Storage Paths

Use these path prefixes to organize uploads:

- `projects/thumbnails/` - Project thumbnail images
- `projects/logos/` - Project logo overlays
- `projects/gallery/` - Project gallery images
- `blog/featured/` - Blog post featured images
- `blog/content/` - Blog post content images
- `profile/` - User profile images

## File Constraints

- Maximum file size: 10MB
- Allowed formats: PNG, JPEG, JPG, GIF, WebP, SVG
- Files are automatically renamed with unique identifiers

## Direct API Usage

If you need more control, you can use the upload functions directly:

```tsx
import { uploadImage, deleteImage } from '../lib/supabase';

async function handleCustomUpload(file: File) {
  try {
    const url = await uploadImage(file, 'custom/path/');
    console.log('Uploaded:', url);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}

async function handleDelete(url: string) {
  try {
    await deleteImage(url);
    console.log('Deleted successfully');
  } catch (error) {
    console.error('Delete failed:', error);
  }
}
```

## Migration from URL Fields

To migrate existing forms from URL input to drag-and-drop:

1. **Replace state**: Change from `File | null` to `string` (URL)
2. **Replace input**: Replace `<input type="text" />` with `<ImageUpload />`
3. **Update handlers**: Use `onChange={(url) => ...}` instead of file handlers
4. **Save data**: Store the URL string directly in your data structure

### Before (URL Input)
```tsx
<input
  type="text"
  placeholder="Enter image URL"
  value={formData.thumbnail}
  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
/>
```

### After (Drag & Drop Upload)
```tsx
<ImageUpload
  value={formData.thumbnail}
  onChange={(url) => setFormData({ ...formData, thumbnail: url })}
  path="projects/"
  label="Thumbnail"
/>
```

## Error Handling

The component handles errors automatically and displays them to the user. Common errors:

- File too large (>10MB)
- Invalid file type
- Upload network errors
- Storage permission errors

## Testing

To test the upload system:

1. Make sure you're logged in as admin
2. Go to Add Project or New Blog Post page
3. Use the ImageUpload component
4. Drag an image or click to browse
5. Wait for upload to complete
6. Image URL is automatically saved and can be used in your content

## Supabase Storage Dashboard

To view uploaded files:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to Storage
4. Open the `portfolio-uploads` bucket
5. Browse uploaded files by folder

## Notes

- Images are stored in a public bucket for easy access
- Uploads are permanent unless manually deleted
- Each file gets a unique name to prevent conflicts
- URLs are stable and can be stored in your database/localStorage
