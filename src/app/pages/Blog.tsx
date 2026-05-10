import { useState, useEffect, useCallback, useRef } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { BlogCard } from "../components/BlogCard";
import { getMergedBlogPosts, getAllBlogCategories } from "../data/blog";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ChevronDown, Plus, Edit2 } from "lucide-react";
import { useAdminView } from "../contexts/AdminViewContext";
import { useCMS } from "../contexts/CMSContext";
import type { CMSKey } from "../lib/cms";
import { useNavigate } from "react-router";
import patternLockIcon from "../../imports/pattern-lock.png";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface DraggableBlogCardProps {
  post: any;
  index: number;
  moveBlogPost: (dragId: string, hoverId: string) => void;
  onUpdate: () => void;
  isAdminView: boolean;
}

const DraggableBlogCard = ({ post, index, moveBlogPost, onUpdate, isAdminView }: DraggableBlogCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "BLOG_CARD",
    item: { id: post.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isAdminView,
  });

  const [{ isOver }, drop] = useDrop({
    accept: "BLOG_CARD",
    hover: (item: { id: string; index: number }) => {
      if (!ref.current) return;
      if (item.id === post.id) return;

      moveBlogPost(item.id, post.id);
      item.index = index;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isAdminView ? 'grab' : 'default',
        transition: 'opacity 0.2s ease',
      }}
      className={`${isOver && isAdminView ? 'ring-2 ring-primary ring-offset-2 rounded-lg transition-all' : ''} ${isDragging ? 'scale-105' : ''}`}
    >
      <BlogCard post={post} onUpdate={onUpdate} />
    </div>
  );
};

const DEFAULT_BLOG_TITLE = "Insights & Thinking";
const DEFAULT_BLOG_DESC = "Thoughts on design leadership, systems thinking, AI ethics, accessibility, and building products that serve the public good.";

export default function Blog() {
  const { isAdminView } = useAdminView();
  const { store, loading, setStore } = useCMS();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set(["2026", "2025"]));
  const [blogPosts, setBlogPosts] = useState(() => getMergedBlogPosts(store));
  const [blogOrder, setBlogOrder] = useState<string[]>(() => store['blogOrder'] ?? []);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [pageTitle, setPageTitle] = useState(store['blogPageTitle'] ?? DEFAULT_BLOG_TITLE);
  const [pageDescription, setPageDescription] = useState(store['blogPageDescription'] ?? DEFAULT_BLOG_DESC);
  const postsPerPage = 15;
  const allCategories = getAllBlogCategories();

  useEffect(() => {
    if (!loading) {
      const mergedPosts = getMergedBlogPosts(store);
      setBlogPosts(mergedPosts);
      setBlogOrder(store['blogOrder'] ?? mergedPosts.map(p => p.id));
      setPageTitle(store['blogPageTitle'] ?? DEFAULT_BLOG_TITLE);
      setPageDescription(store['blogPageDescription'] ?? DEFAULT_BLOG_DESC);
    }
  }, [loading]);

  const handleUpdate = useCallback(() => {
    const mergedPosts = getMergedBlogPosts(store);
    setBlogPosts(mergedPosts);
    setBlogOrder(prevOrder => {
      const currentIds = new Set(prevOrder);
      const newIds = mergedPosts.filter(p => !currentIds.has(p.id)).map(p => p.id);
      return [...prevOrder, ...newIds];
    });
  }, [store]);

  // Apply saved order to blog posts
  const orderedBlogPosts = [...blogPosts].sort((a, b) => {
    const indexA = blogOrder.indexOf(a.id);
    const indexB = blogOrder.indexOf(b.id);
    // If not in order array, put at end
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Move blog post in the order array
  const moveBlogPost = useCallback((dragId: string, hoverId: string) => {
    setBlogOrder(prevOrder => {
      const newOrder = [...prevOrder];
      const dragIndex = newOrder.indexOf(dragId);
      const hoverIndex = newOrder.indexOf(hoverId);
      if (dragIndex === -1 || hoverIndex === -1) return prevOrder;
      newOrder.splice(dragIndex, 1);
      newOrder.splice(hoverIndex, 0, dragId);
      setStore('blogOrder' as CMSKey, newOrder);
      return newOrder;
    });
  }, [setStore]);

  // Extract unique years and months from blog posts
  const getTimeline = () => {
    const timeline: { [year: string]: Set<string> } = {};
    
    blogPosts.forEach(post => {
      const date = new Date(post.date);
      const year = date.getFullYear().toString();
      const month = date.toLocaleString('en-US', { month: 'long' });
      
      if (!timeline[year]) {
        timeline[year] = new Set();
      }
      timeline[year].add(month);
    });
    
    // Add all months from January to March for 2026
    if (!timeline['2026']) {
      timeline['2026'] = new Set();
    }
    timeline['2026'].add('January');
    timeline['2026'].add('February');
    timeline['2026'].add('March');
    
    // Convert to sorted array structure
    return Object.keys(timeline)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .map(year => ({
        year,
        months: Array.from(timeline[year]).sort((a, b) => {
          const monthA = new Date(`${a} 1, ${year}`).getMonth();
          const monthB = new Date(`${b} 1, ${year}`).getMonth();
          return monthB - monthA;
        })
      }));
  };

  const timeline = getTimeline();

  const filteredPosts = orderedBlogPosts.filter(post => {
    const categoryMatch = selectedCategory ? post.category === selectedCategory : true;
    const timelineMatch = selectedTimeline
      ? post.date.includes(selectedTimeline)
      : true;
    return categoryMatch && timelineMatch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Reset to page 1 when filter changes
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleYear = (year: string) => {
    const newExpandedYears = new Set(expandedYears);
    if (newExpandedYears.has(year)) {
      newExpandedYears.delete(year);
    } else {
      newExpandedYears.add(year);
    }
    setExpandedYears(newExpandedYears);
  };

  const handleSaveTitle = async () => {
    await setStore('blogPageTitle' as CMSKey, pageTitle);
    setIsEditingTitle(false);
  };

  const handleCancelTitle = () => {
    setPageTitle(store['blogPageTitle'] ?? DEFAULT_BLOG_TITLE);
    setIsEditingTitle(false);
  };

  const handleSaveDescription = async () => {
    await setStore('blogPageDescription' as CMSKey, pageDescription);
    setIsEditingDescription(false);
  };

  const handleCancelDescription = () => {
    setPageDescription(store['blogPageDescription'] ?? DEFAULT_BLOG_DESC);
    setIsEditingDescription(false);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background">
        <Navigation />
      
      <section className="py-32 pt-40">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          {/* Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-primary to-purple-600 mb-8 rounded-full"
            />
            <div className="relative group">
              {isEditingTitle ? (
                <div className="space-y-3 mb-6">
                  <input
                    type="text"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    className="w-full px-4 py-3 text-[56px] md:text-[72px] lg:text-[88px] font-medium tracking-[-0.03em] leading-[1.05] md:leading-[0.95] border border-border/60 rounded-xl bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    autoFocus
                    style={{ fontFeatureSettings: "'ss01' on, 'cv05' on, 'cv08' on" }}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveTitle}
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelTitle}
                      className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <h1 className="text-[56px] md:text-[72px] lg:text-[88px] font-medium mb-6 tracking-[-0.03em] leading-[1.05] md:leading-[0.95] inline-flex items-center gap-6" style={{ fontFeatureSettings: "'ss01' on, 'cv05' on, 'cv08' on" }}>
                  <span>{pageTitle}</span>
                  <img
                    src={patternLockIcon}
                    alt="pattern lock"
                    className="w-9 h-9 md:w-11 md:h-11 lg:w-14 lg:h-14 rotate-180 page-icon flex-shrink-0"
                  />
                  {isAdminView && (
                    <button
                      onClick={() => setIsEditingTitle(true)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-muted rounded-lg"
                      title="Edit title"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  )}
                </h1>
              )}
            </div>
            <div className="relative group max-w-4xl">
              {isEditingDescription ? (
                <div className="space-y-3">
                  <textarea
                    value={pageDescription}
                    onChange={(e) => setPageDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 text-[19px] md:text-[21px] text-muted-foreground leading-[1.6] tracking-[-0.011em] border border-border/60 rounded-xl bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveDescription}
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelDescription}
                      className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-[19px] md:text-[21px] text-muted-foreground leading-[1.6] tracking-[-0.011em]">
                    {pageDescription}
                  </p>
                  {isAdminView && (
                    <button
                      onClick={() => setIsEditingDescription(true)}
                      className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-muted rounded-lg"
                      title="Edit description"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {/* Filters */}
          <div className="mb-16">
            <h2 className="text-[15px] uppercase tracking-[0.12em] font-bold text-muted-foreground/50 mb-6">
              Domain
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-5 py-1.5 rounded-[4px] text-[14px] font-medium transition-all border-2 ${
                  selectedCategory === null
                    ? "bg-foreground/90 text-background border-foreground/90"
                    : "bg-background text-foreground border-border hover:border-primary/50"
                }`}
              >
                All
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-5 py-1.5 rounded-[4px] text-[14px] font-medium transition-all border-2 ${
                    selectedCategory === category
                      ? "bg-foreground/90 text-background border-foreground/90"
                      : "bg-background text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Filter - Mobile Only */}
          <div className="mb-16 lg:hidden">
            <h2 className="text-[15px] uppercase tracking-[0.12em] font-bold text-muted-foreground/50 mb-6">
              Timeline
            </h2>
            <nav className="space-y-1">
              <button
                onClick={() => setSelectedTimeline(null)}
                className={`w-full flex items-baseline gap-3.5 py-3 px-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-2 rounded-[4px] ${
                  selectedTimeline === null
                    ? "bg-foreground/90 text-background border-foreground/90"
                    : "bg-background text-foreground border-border hover:border-primary/50"
                }`}
              >
                <span className="leading-[1.35] transition-all duration-250">All</span>
              </button>
              {timeline.map((yearData, yearIndex) => (
                <div key={yearData.year} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTimeline(yearData.year)}
                      className={`flex-1 flex items-baseline gap-3.5 py-3 px-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-2 rounded-[4px] ${
                        selectedTimeline === yearData.year
                          ? "bg-foreground/90 text-background border-foreground/90"
                          : "bg-background text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="leading-[1.35] transition-all duration-250">{yearData.year}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleYear(yearData.year);
                      }}
                      className="p-3 hover:bg-muted/50 rounded-[4px] border-2 border-border transition-all duration-200"
                    >
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 text-muted-foreground ${
                          expandedYears.has(yearData.year) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                  {expandedYears.has(yearData.year) && (
                    <div className="pl-4 space-y-1">
                      {yearData.months.map((month) => (
                        <button
                          key={month}
                          onClick={() => setSelectedTimeline(`${month} ${yearData.year}`)}
                          className={`w-full flex items-baseline gap-3.5 py-2.5 px-5 text-[13.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-2 rounded-[4px] ${
                            selectedTimeline === `${month} ${yearData.year}`
                              ? "bg-foreground/90 text-background border-foreground/90"
                              : "bg-background text-foreground border-border hover:border-primary/50"
                          }`}
                        >
                          <span className="leading-[1.35] transition-all duration-250">{month}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Layout Grid with Timeline Sidebar */}
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            {/* Timeline Column - Sticky on left (Desktop only) */}
            <div className="hidden lg:block col-span-2">
              <div className="sticky top-32">
                <h4 className="text-[15px] uppercase tracking-[0.12em] font-bold text-muted-foreground/50 mb-10">
                  Timeline
                </h4>
                <nav className="space-y-1 border-l-[1.5px] border-border/20">
                  <button
                    onClick={() => setSelectedTimeline(null)}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer w-full text-left ${
                      selectedTimeline === null
                        ? "border-primary text-foreground font-medium"
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className="leading-[1.35] transition-all duration-250">All</span>
                  </button>
                  {timeline.map((yearData, yearIndex) => (
                    <div key={yearData.year}>
                      <div className="flex items-center">
                        <button
                          onClick={() => setSelectedTimeline(yearData.year)}
                          className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer flex-1 text-left ${
                            selectedTimeline === yearData.year
                              ? "border-primary text-foreground font-medium"
                              : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                          }`}
                        >
                          <span className="leading-[1.35] transition-all duration-250">{yearData.year}</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleYear(yearData.year);
                          }}
                          className="p-2 hover:bg-muted/50 rounded transition-all duration-200"
                        >
                          <ChevronDown 
                            size={14} 
                            className={`transition-transform duration-200 text-muted-foreground/50 ${
                              expandedYears.has(yearData.year) ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>
                      {expandedYears.has(yearData.year) && yearData.months.map((month) => (
                        <button
                          key={month}
                          onClick={() => setSelectedTimeline(`${month} ${yearData.year}`)}
                          className={`group flex items-baseline gap-3.5 py-2.5 pl-12 text-[13.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer w-full text-left ${
                            selectedTimeline === `${month} ${yearData.year}`
                              ? "border-primary text-foreground font-medium"
                              : "border-transparent text-muted-foreground/50 hover:text-foreground/90 hover:border-primary/30 hover:pl-[3.2rem] hover:font-medium"
                          }`}
                        >
                          <span className="leading-[1.35] transition-all duration-250">{month}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content Column */}
            <div className="col-span-12 lg:col-span-10">
              {/* Results count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-10"
              >
                <p className="text-[15px] text-muted-foreground tracking-[-0.01em]">
                  Showing {indexOfFirstPost + 1}–{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} articles
                </p>
              </motion.div>

              {/* Blog Grid */}
              <motion.div
                key={currentPage} // Force re-animation on page change
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 mb-20"
              >
                {currentPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <DraggableBlogCard
                      post={post}
                      index={index}
                      moveBlogPost={moveBlogPost}
                      onUpdate={handleUpdate}
                      isAdminView={isAdminView}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-24">
                  <p className="text-[17px] text-muted-foreground tracking-[-0.011em]">
                    No blog posts found for the selected filters.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center justify-center gap-3 mt-20"
                >
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-3 rounded-xl bg-muted hover:bg-muted/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <ChevronLeft size={20} />
                  </motion.button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <motion.button
                      key={pageNumber}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`min-w-[48px] h-[48px] rounded-xl font-medium transition-all duration-300 text-[15px] tracking-[-0.01em] ${
                        currentPage === pageNumber
                          ? "bg-foreground text-background shadow-lg"
                          : "bg-muted text-muted-foreground hover:bg-muted/70"
                      }`}
                    >
                      {pageNumber}
                    </motion.button>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-xl bg-muted hover:bg-muted/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <ChevronRight size={20} />
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* New Post Button - Admin Only */}
      {isAdminView && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/blog/new")}
          className="fixed top-24 right-8 z-50 bg-foreground text-background rounded-full px-6 py-3 shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2 group"
          title="Create New Post"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium text-sm">
            New Post
          </span>
        </motion.button>
      )}

      <Footer />
      </div>
    </DndProvider>
  );
}
