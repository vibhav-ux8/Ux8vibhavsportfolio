# Content Management System (CMS) Guide

## Overview

A simple admin panel has been integrated into your portfolio website to manage projects and blog content.

## Accessing the Admin Panel

### Login Page
- **URL**: `/admin/login` or click "Admin Login" at the bottom of any page
- **Demo Credentials**:
  - Email: `admin@ux8.in`
  - Password: `admin123`

### Admin Dashboard
- After logging in, you'll be redirected to `/admin/dashboard`
- The dashboard has two tabs: **Projects** and **Blog Posts**

## Managing Content

### Projects
Projects are stored in: `src/app/data/projects.ts`

To add, edit, or remove projects:
1. Open the `projects.ts` file
2. Modify the `projects` array
3. Each project object contains:
   - `id`: Unique identifier
   - `title`: Project name
   - `description`: Brief description
   - `tags`: Array of tags
   - `category`: Project category
   - `sector`: Industry sector
   - `thumbnail`: Image URL
   - `logoOverlay`: Logo image (optional)
   - `year`: Year or date range
   - `role`: Your role in the project
   - `context`, `research`, `designSystem`, `prototyping`, `outcome`: Detailed sections
   - `images`: Array of images with captions

### Blog Posts
Blog posts are stored in: `src/app/data/blogPosts.ts`

To add, edit, or remove blog posts:
1. Open the `blogPosts.ts` file
2. Modify the `blogPosts` array
3. Each blog post object contains:
   - `slug`: URL-friendly identifier
   - `title`: Post title
   - `excerpt`: Brief summary
   - `content`: Full article content
   - `author`: Author information
   - `date`: Publication date
   - `readTime`: Estimated reading time
   - `category`: Post category
   - `tags`: Array of tags
   - `image`: Featured image URL

## Security Notes

⚠️ **Important**: The current authentication system is basic and suitable for demonstration purposes only.

For production use, you should:
1. Implement proper backend authentication (JWT, OAuth, etc.)
2. Store credentials securely (use environment variables)
3. Add role-based access control
4. Implement HTTPS
5. Add session management
6. Consider using a headless CMS like Sanity, Contentful, or Strapi

## Future Enhancements

Potential improvements to the CMS:
- Rich text editor for blog posts
- Image upload functionality
- Drag-and-drop project ordering
- Preview before publishing
- Version control/revision history
- Multi-user support with different permission levels
- Integration with external CMS platforms

## Logging Out

Click the "Logout" button in the top-right corner of the admin dashboard to sign out.
