import { BlogPost } from "../data/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAdminView } from "../contexts/AdminViewContext";
import { AdminActionMenu } from "./AdminActionMenu";

interface BlogCardProps {
  post: BlogPost;
  onUpdate?: () => void;
}

export function BlogCard({ post, onUpdate }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isAdminView } = useAdminView();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/dashboard/edit-blog/${post.slug}`);
  };

  const handleDuplicate = () => {
    const newPost = {
      ...post,
      slug: `${post.slug}-copy-${Date.now()}`,
      title: `${post.title} (Copy)`
    };

    const savedPosts = localStorage.getItem("cmsBlogPosts");
    const postsList = savedPosts ? JSON.parse(savedPosts) : [];
    postsList.push(newPost);
    localStorage.setItem("cmsBlogPosts", JSON.stringify(postsList));

    if (onUpdate) onUpdate();
    alert(`"${post.title}" duplicated successfully!`);
  };

  const handleMoveTo = () => {
    const categories = ['Design Leadership', 'Product Strategy', 'AI & Ethics', 'Systems Design', 'Case Studies', 'Process & Methods', 'Career Growth', 'Other'];
    const currentCategory = post.category;
    const otherCategories = categories.filter(c => c !== currentCategory);

    const choice = prompt(
      `Move "${post.title}" to:\n\nCurrent: ${currentCategory}\n\nEnter new category:\n${otherCategories.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\nOr type a custom category:`
    );

    if (choice) {
      const selectedCategory = isNaN(Number(choice))
        ? choice
        : otherCategories[Number(choice) - 1];

      if (selectedCategory) {
        const savedPosts = localStorage.getItem("cmsBlogData");
        const blogData = savedPosts ? JSON.parse(savedPosts) : {};

        blogData[post.slug] = {
          ...blogData[post.slug],
          category: selectedCategory
        };

        localStorage.setItem("cmsBlogData", JSON.stringify(blogData));
        if (onUpdate) onUpdate();
        alert(`"${post.title}" moved to "${selectedCategory}"!`);
      }
    }
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${post.title}"?\n\nThis action cannot be undone.`)) {
      const deletedSlugs = localStorage.getItem("cmsDeletedBlogPosts");
      const deletedSet = deletedSlugs ? new Set(JSON.parse(deletedSlugs)) : new Set();
      deletedSet.add(post.slug);
      localStorage.setItem("cmsDeletedBlogPosts", JSON.stringify([...deletedSet]));

      const savedPosts = localStorage.getItem("cmsBlogPosts");
      if (savedPosts) {
        let posts = JSON.parse(savedPosts);
        posts = posts.filter((p: any) => p.slug !== post.slug);
        localStorage.setItem("cmsBlogPosts", JSON.stringify(posts));
      }

      if (onUpdate) onUpdate();
    }
  };

  // Assign pastel colors to tags based on tag name for consistency
  const getTagColorData = (tag: string) => {
    const colors: { [key: string]: { bg: string; text: string } } = {
      "AI/ML": { bg: "#dbeafe", text: "#1d4ed8" },
      "Ethics": { bg: "#f3e8ff", text: "#7e22ce" },
      "Product Strategy": { bg: "#fce7f3", text: "#be185d" },
      "Design Systems": { bg: "#ccfbf1", text: "#0f766e" },
      "Leadership": { bg: "#e0e7ff", text: "#4338ca" },
      "Process": { bg: "#fef3c7", text: "#b45309" },
      "Research": { bg: "#d1fae5", text: "#047857" },
      "Government": { bg: "#f1f5f9", text: "#475569" },
      "Career": { bg: "#ede9fe", text: "#6d28d9" },
      "Collaboration": { bg: "#cffafe", text: "#0e7490" },
      "Data Visualization": { bg: "#fed7aa", text: "#c2410c" },
      "Enterprise": { bg: "#f3f4f6", text: "#4b5563" },
      "Best Practices": { bg: "#d1fae5", text: "#15803d" },
      "Healthcare": { bg: "#fee2e2", text: "#b91c1c" },
      "Innovation": { bg: "#fae8ff", text: "#a21caf" },
      "Service Design": { bg: "#ecfccb", text: "#4d7c0f" },
      "Metrics": { bg: "#e0f2fe", text: "#0369a1" },
      "Mobile": { bg: "#ffe4e6", text: "#be123c" },
      "Accessibility": { bg: "#d1fae5", text: "#047857" },
      "Design Ops": { bg: "#f3e8ff", text: "#7e22ce" },
      "Voice UI": { bg: "#e0e7ff", text: "#4338ca" },
      "Prototyping": { bg: "#fce7f3", text: "#be185d" },
      "Communication": { bg: "#cffafe", text: "#0e7490" },
      "Internationalization": { bg: "#ccfbf1", text: "#0f766e" },
      "Information Architecture": { bg: "#dbeafe", text: "#1d4ed8" },
      "Digital Transformation": { bg: "#ede9fe", text: "#6d28d9" },
      "Strategy": { bg: "#fef3c7", text: "#b45309" },
      "UX Design": { bg: "#d1fae5", text: "#15803d" },
      "Motion Design": { bg: "#fae8ff", text: "#a21caf" },
      "Portfolio": { bg: "#fed7aa", text: "#c2410c" },
      "Conversion": { bg: "#ecfccb", text: "#4d7c0f" },
      "Security": { bg: "#fee2e2", text: "#b91c1c" },
      "Privacy": { bg: "#f1f5f9", text: "#475569" },
    };
    return colors[tag] || { bg: "#f3f4f6", text: "#4b5563" };
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5 }}
      className="group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block h-full"
      >
        <div className="h-[580px] flex flex-col bg-muted/30 rounded-2xl border-2 border-border hover:border-foreground transition-all duration-500 overflow-hidden relative">
          {/* Admin Action Menu */}
          {isAdminView && (
            <AdminActionMenu
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onMoveTo={handleMoveTo}
              onDelete={handleDelete}
              itemType="blog"
            />
          )}

          {/* Image */}
          <div className="aspect-[16/9] flex-shrink-0 overflow-hidden bg-muted">
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6 }}
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col flex-grow overflow-hidden">
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-[13px] text-muted-foreground mb-5 flex-shrink-0 tracking-[-0.01em]">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-[22px] font-medium mb-4 group-hover:text-foreground transition-colors duration-500 flex-shrink-0 line-clamp-2 leading-[1.3] tracking-[-0.015em]" style={{ fontFeatureSettings: "'ss01' on" }}>
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-muted-foreground text-[15px] leading-[1.6] mb-6 flex-grow line-clamp-3 tracking-[-0.011em]">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5 flex-shrink-0">
              {post.tags.slice(0, 3).map((tag) => {
                const colorData = getTagColorData(tag);
                return (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[12px] rounded-full font-medium tracking-[-0.01em] transition-all duration-500"
                    style={{
                      backgroundColor: isHovered ? colorData.bg : 'hsl(var(--muted))',
                      color: isHovered ? colorData.text : 'hsl(var(--muted-foreground))',
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>

            {/* Read More Link */}
            <div className="flex items-center gap-2.5 text-[15px] font-semibold text-muted-foreground group-hover:text-foreground flex-shrink-0 tracking-[-0.01em] transition-colors duration-500">
              <span>Read article</span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                className="group-hover:translate-x-2 transition-transform duration-500"
              >
                <ArrowRight size={17} strokeWidth={2.5} />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}