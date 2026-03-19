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
  },
  {
    id: "4",
    title: "Research Methods for Government Digital Services",
    excerpt: "Adapting user research practices for public-sector constraints—navigating privacy regulations, diverse populations, and limited resources while maintaining research rigor.",
    date: "December 15, 2025",
    readTime: "10 min read",
    tags: ["Research", "Process"],
    category: "DPI & Governance",
    slug: "research-methods-government",
    image: "https://images.unsplash.com/photo-1565688461878-f329a0226094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "5",
    title: "From Designer to Design Leader: Lessons in Cross-Functional Collaboration",
    excerpt: "Transitioning from individual contributor to leading design across product, engineering, and executive teams. Strategies for building influence and driving alignment.",
    date: "November 28, 2025",
    readTime: "9 min read",
    tags: ["Leadership", "Collaboration"],
    category: "Services",
    slug: "designer-to-design-leader",
    image: "https://images.unsplash.com/photo-1758518727707-b023e285b709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "6",
    title: "Designing Data Visualizations for Complex Enterprise Systems",
    excerpt: "Best practices for presenting complex analytics and operational data in ways that drive insight and action—balancing density with clarity.",
    date: "November 5, 2025",
    readTime: "7 min read",
    tags: ["Enterprise", "Best Practices"],
    category: "LEA & Defence",
    slug: "data-visualizations-enterprise",
    image: "https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "7",
    title: "The Future of Design in Healthcare Technology",
    excerpt: "How human-centered design is transforming patient experiences and clinical workflows in digital health platforms, telemedicine, and medical decision support systems.",
    date: "October 20, 2025",
    readTime: "11 min read",
    tags: ["Product Strategy", "Innovation"],
    category: "Healthcare",
    slug: "future-design-healthcare-technology",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "8",
    title: "Building Empathy Through Service Design",
    excerpt: "Moving beyond user interfaces to design entire service experiences—mapping touchpoints, orchestrating journeys, and creating systemic change in complex organizations.",
    date: "October 2, 2025",
    readTime: "8 min read",
    tags: ["Process", "Best Practices"],
    category: "Services",
    slug: "building-empathy-service-design",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "9",
    title: "Measuring Design Impact: Beyond Vanity Metrics",
    excerpt: "Establishing meaningful KPIs for design work—from task success rates and satisfaction scores to business outcomes and organizational maturity indicators.",
    date: "September 18, 2025",
    readTime: "10 min read",
    tags: ["Product Strategy", "Leadership"],
    category: "DPI & Governance",
    slug: "measuring-design-impact-metrics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "10",
    title: "Ethical Considerations in AI Product Design",
    excerpt: "Addressing bias, fairness, and accountability when designing products powered by machine learning—from data collection to algorithm transparency.",
    date: "September 5, 2025",
    readTime: "9 min read",
    tags: ["AI/ML", "Product Strategy"],
    category: "DPI & Governance",
    slug: "ethical-considerations-ai-design",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "11",
    title: "Mobile-First Design for Low-Bandwidth Environments",
    excerpt: "Designing digital experiences that work seamlessly in areas with poor connectivity—optimization strategies, progressive enhancement, and offline-first architecture.",
    date: "August 22, 2025",
    readTime: "7 min read",
    tags: ["Accessibility", "Best Practices"],
    category: "Services",
    slug: "mobile-first-low-bandwidth",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "12",
    title: "Design Operations: Scaling Creative Teams",
    excerpt: "Building the infrastructure that enables design teams to operate efficiently at scale—tools, processes, documentation, and team rituals that matter.",
    date: "August 8, 2025",
    readTime: "12 min read",
    tags: ["Leadership", "Process"],
    category: "Services",
    slug: "design-operations-scaling-teams",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "13",
    title: "Voice and Conversational UI Design Principles",
    excerpt: "Adapting interaction design for voice assistants and conversational interfaces—managing context, handling errors, and creating natural dialogue flows.",
    date: "July 25, 2025",
    readTime: "8 min read",
    tags: ["Innovation", "Best Practices"],
    category: "Services",
    slug: "voice-conversational-ui-principles",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "14",
    title: "Prototyping for Executive Buy-In",
    excerpt: "Creating compelling prototypes that communicate design vision to stakeholders—balancing fidelity, storytelling, and business context to secure resources and alignment.",
    date: "July 10, 2025",
    readTime: "6 min read",
    tags: ["Leadership"],
    category: "Services",
    slug: "prototyping-executive-buy-in",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "15",
    title: "Cross-Cultural Design: Beyond Localization",
    excerpt: "Designing products for global audiences requires more than translation—understanding cultural context, values, and interaction patterns across diverse markets.",
    date: "June 28, 2025",
    readTime: "9 min read",
    tags: ["Research", "Product Strategy"],
    category: "IKS & Culture",
    slug: "cross-cultural-design-localization",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "16",
    title: "Information Architecture for Complex Applications",
    excerpt: "Structuring large-scale applications with thousands of features—navigation patterns, mental models, and wayfinding strategies that scale with product complexity.",
    date: "June 15, 2025",
    readTime: "10 min read",
    tags: ["Enterprise", "Best Practices"],
    category: "LEA & Defence",
    slug: "information-architecture-complex-apps",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "17",
    title: "Design Critique: Building a Culture of Feedback",
    excerpt: "Establishing effective design critique practices that improve work quality while building team trust—frameworks, facilitation techniques, and common pitfalls.",
    date: "June 2, 2025",
    readTime: "7 min read",
    tags: ["Collaboration", "Process", "Leadership"],
    category: "Services",
    slug: "design-critique-feedback-culture",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "18",
    title: "The Role of Design in Digital Transformation",
    excerpt: "How design leadership drives organizational change beyond product work—shifting mindsets, building capabilities, and creating design-driven cultures.",
    date: "May 20, 2025",
    readTime: "11 min read",
    tags: ["Leadership"],
    category: "DPI & Governance",
    slug: "design-digital-transformation",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "19",
    title: "Designing for Edge Cases and Error States",
    excerpt: "Why the 'unhappy paths' matter more than you think—creating resilient experiences that handle failures gracefully and build user confidence.",
    date: "May 8, 2025",
    readTime: "8 min read",
    tags: ["UX Design", "Best Practices", "Product Strategy"],
    category: "Services",
    slug: "designing-edge-cases-errors",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "20",
    title: "Animation and Motion Design: When and How",
    excerpt: "Using motion purposefully to guide attention, provide feedback, and create delightful moments—without sacrificing performance or accessibility.",
    date: "April 25, 2025",
    readTime: "6 min read",
    tags: ["Best Practices", "Accessibility"],
    category: "Services",
    slug: "animation-motion-design-principles",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "21",
    title: "Building Design Portfolios That Land Interviews",
    excerpt: "What hiring managers actually look for in senior design portfolios—case study structure, storytelling, showing process, and demonstrating impact.",
    date: "April 12, 2025",
    readTime: "9 min read",
    tags: ["Career", "Leadership"],
    category: "Services",
    slug: "building-design-portfolios",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "22",
    title: "Designing Form Experiences That Don't Frustrate",
    excerpt: "Forms are often the most critical—and most frustrating—part of digital experiences. Patterns and principles for reducing abandonment and error rates.",
    date: "March 30, 2025",
    readTime: "10 min read",
    tags: ["UX Design", "Best Practices"],
    category: "Services",
    slug: "designing-form-experiences",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "23",
    title: "Security and Privacy by Design",
    excerpt: "Integrating security and privacy considerations into the design process from day one—balancing user protection with experience simplicity.",
    date: "March 18, 2025",
    readTime: "8 min read",
    tags: ["Best Practices"],
    category: "LEA & Defence",
    slug: "security-privacy-by-design",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "24",
    title: "Working With Product Managers: A Designer's Guide",
    excerpt: "Building effective PM-Design partnerships—aligning on goals, navigating tradeoffs, and creating shared accountability for product outcomes.",
    date: "March 5, 2025",
    readTime: "7 min read",
    tags: ["Collaboration", "Product Strategy", "Leadership"],
    category: "DPI & Governance",
    slug: "working-with-product-managers",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "25",
    title: "The Art of Design Presentations",
    excerpt: "Crafting compelling design presentations for different audiences—stakeholders, executives, engineers—and telling stories that drive decisions.",
    date: "February 20, 2025",
    readTime: "9 min read",
    tags: ["Leadership", "Process"],
    category: "IKS & Culture",
    slug: "art-design-presentations",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
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