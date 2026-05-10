export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  slug: string;
  image: string;
  content?: ContentBlock[]; // Advanced content blocks
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'heading' | 'image' | 'audio' | 'video';
  content: string;
  metadata?: {
    level?: number; // For headings (h2, h3, h4)
    caption?: string; // For images/audio/video
    alt?: string; // For images
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Designing AI Interfaces That Build Trust",
    excerpt: "Exploring principles of transparency, explainability, and ethical design when creating user experiences for AI-powered platforms in regulated industries.",
    date: "March 18, 2026",
    readTime: "8 min read",
    tags: ["AI/ML", "Product Strategy"],
    category: "Services",
    slug: "designing-ai-interfaces-trust",
    image: "https://images.unsplash.com/photo-1758626052247-79003b45f802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "2",
    title: "Scaling Design Systems Across Enterprise Organizations",
    excerpt: "Lessons learned from building and maintaining a design system that serves 200+ team members across 15 product teams—focusing on governance, adoption, and measuring impact.",
    date: "January 22, 2026",
    readTime: "12 min read",
    tags: ["Leadership", "Process"],
    category: "DPI & Governance",
    slug: "scaling-design-systems-enterprise",
    image: "https://images.unsplash.com/photo-1562601555-513820e5d0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "3",
    title: "Accessibility as a Strategic Advantage",
    excerpt: "Why WCAG compliance is just the starting point. How inclusive design practices improve experiences for all users while expanding market reach and reducing legal risk.",
    date: "January 10, 2026",
    readTime: "6 min read",
    tags: ["Accessibility", "Product Strategy"],
    category: "Services",
    slug: "accessibility-strategic-advantage",
    image: "https://images.unsplash.com/photo-1611926653670-e18689373857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  }
];

export function getAllBlogTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getAllBlogCategories(): string[] {
  const categories = new Set<string>();
  blogPosts.forEach(post => {
    categories.add(post.category);
  });
  // Use same custom sort order as Work page domains
  const order = [
    "LEA & Defence",
    "DPI & Governance",
    "IKS & Culture",
    "Healthcare",
    "Services",
    "e-commerce"
  ];
  const sortedCategories = Array.from(categories).sort((a, b) => {
    const indexA = order.indexOf(a);
    const indexB = order.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
  return sortedCategories;
}

// Function to get merged blog posts (original + CMS edits + new CMS posts)
export function getMergedBlogPosts(): BlogPost[] {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return blogPosts;
    }

    const savedPosts = localStorage.getItem("cmsBlogPosts");
    const deletedSlugs = localStorage.getItem("cmsDeletedBlogPosts");
    const deletedSet = deletedSlugs ? new Set(JSON.parse(deletedSlugs)) : new Set();

    if (!savedPosts) {
      // Filter out deleted posts
      return blogPosts.filter(post => !deletedSet.has(post.slug));
    }

    const cmsPosts: BlogPost[] = JSON.parse(savedPosts);

    // Start with original posts (updated with CMS edits) and filter out deleted posts
    const mergedOriginals = blogPosts
      .filter(post => !deletedSet.has(post.slug))
      .map(originalPost => {
        const cmsPost = cmsPosts.find(p => p.slug === originalPost.slug);
        return cmsPost || originalPost;
      });

    // Find new CMS-only posts (posts that don't exist in original blogPosts)
    const originalSlugs = new Set(blogPosts.map(p => p.slug));
    const newCMSPosts = cmsPosts.filter(
      cmsPost => !originalSlugs.has(cmsPost.slug) && !deletedSet.has(cmsPost.slug)
    );

    // Combine and sort by date (newest first)
    const allPosts = [...mergedOriginals, ...newCMSPosts];
    return allPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Error loading CMS blog posts:", error);
    return blogPosts;
  }
}

// Function to get a single blog post by slug (with CMS edits applied)
export function getBlogBySlug(slug: string): BlogPost | undefined {
  const mergedPosts = getMergedBlogPosts();
  return mergedPosts.find(post => post.slug === slug);
}

// Function to get a single blog post by id (with CMS edits applied)
export function getBlogById(id: string): BlogPost | undefined {
  const mergedPosts = getMergedBlogPosts();
  return mergedPosts.find(post => post.id === id);
}
