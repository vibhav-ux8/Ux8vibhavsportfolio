import type { CMSStore } from '../lib/cms';

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
  content?: ContentBlock[];
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'heading' | 'image' | 'audio' | 'video';
  content: string;
  metadata?: {
    level?: number;
    caption?: string;
    alt?: string;
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
  blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getAllBlogCategories(): string[] {
  const categories = new Set<string>();
  blogPosts.forEach(post => categories.add(post.category));
  const order = ["LEA & Defence", "DPI & Governance", "IKS & Culture", "Healthcare", "Services", "e-commerce"];
  return Array.from(categories).sort((a, b) => {
    const ia = order.indexOf(a), ib = order.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

// Get merged blog posts (original + CMS store edits + new CMS posts)
export function getMergedBlogPosts(cmsStore: CMSStore = {}): BlogPost[] {
  try {
    const cmsPosts: BlogPost[] = cmsStore['cmsBlogPosts'] ?? [];
    const deletedSet = new Set<string>(cmsStore['cmsDeletedBlogPosts'] ?? []);

    if (!cmsPosts.length) {
      return blogPosts.filter(post => !deletedSet.has(post.slug));
    }

    const mergedOriginals = blogPosts
      .filter(post => !deletedSet.has(post.slug))
      .map(originalPost => {
        const cmsPost = cmsPosts.find(p => p.slug === originalPost.slug);
        return cmsPost || originalPost;
      });

    const originalSlugs = new Set(blogPosts.map(p => p.slug));
    const newCMSPosts = cmsPosts.filter(
      cmsPost => !originalSlugs.has(cmsPost.slug) && !deletedSet.has(cmsPost.slug)
    );

    return [...mergedOriginals, ...newCMSPosts].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error("Error merging blog posts:", error);
    return blogPosts;
  }
}

export function getBlogBySlug(slug: string, cmsStore: CMSStore = {}): BlogPost | undefined {
  return getMergedBlogPosts(cmsStore).find(post => post.slug === slug);
}

export function getBlogById(id: string, cmsStore: CMSStore = {}): BlogPost | undefined {
  return getMergedBlogPosts(cmsStore).find(post => post.id === id);
}
