import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { 
  ArrowLeft, Save, Edit2, Check, X, Calendar, Clock, 
  Plus, Trash2, Type, Heading2, Image as ImageIcon, 
  Music, Video, ChevronUp, ChevronDown, GripVertical 
} from "lucide-react";
import { blogPosts, BlogPost, ContentBlock } from "../data/blog";

export default function EditBlogPost() {
  const navigate = useNavigate();
  const { slug } = useParams();
  
  // Find the blog post
  const originalPost = blogPosts.find((p) => p.slug === slug);

  const [editingField, setEditingField] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
    if (!originalPost) {
      alert("Blog post not found!");
      navigate("/admin/dashboard");
    }
  }, [navigate, originalPost]);

  // Initialize post data with existing CMS data or defaults
  const [postData, setPostData] = useState<BlogPost>(() => {
    // Load from localStorage if exists
    const savedPosts = localStorage.getItem("cmsBlogPosts");
    if (savedPosts) {
      const parsed = JSON.parse(savedPosts);
      const savedPost = parsed.find((p: BlogPost) => p.slug === slug);
      if (savedPost) return savedPost;
    }
    return originalPost || {
      id: "",
      title: "",
      excerpt: "",
      date: "",
      readTime: "",
      tags: [],
      category: "",
      slug: "",
      image: "",
      content: [],
    };
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSave = () => {
    try {
      // Get existing saved posts
      const savedPosts = localStorage.getItem("cmsBlogPosts");
      let posts: BlogPost[] = savedPosts ? JSON.parse(savedPosts) : [];

      // Update or add the post
      const existingIndex = posts.findIndex((p) => p.slug === postData.slug);
      if (existingIndex >= 0) {
        posts[existingIndex] = postData;
      } else {
        posts.push(postData);
      }

      // Save to localStorage
      localStorage.setItem("cmsBlogPosts", JSON.stringify(posts));
      alert("Blog post saved successfully!");
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("Error saving blog post. Please try again.");
    }
  };

  const handlePublish = () => {
    handleSave();
    alert("Blog post published successfully!");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Content Block Management
  const addContentBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: type === 'heading' ? 'New Heading' : type === 'text' ? 'Start typing your content here...' : '',
      metadata: type === 'heading' ? { level: 2 } : type === 'image' ? { alt: '', caption: '' } : { caption: '' }
    };
    setPostData({
      ...postData,
      content: [...(postData.content || []), newBlock]
    });
    // Automatically activate editing for the new block
    setEditingBlockId(newBlock.id);
  };

  const updateContentBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    setPostData({
      ...postData,
      content: (postData.content || []).map(block =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    });
  };

  const deleteContentBlock = (blockId: string) => {
    if (confirm('Delete this content block?')) {
      setPostData({
        ...postData,
        content: (postData.content || []).filter(block => block.id !== blockId)
      });
    }
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const blocks = postData.content || [];
    const index = blocks.findIndex(b => b.id === blockId);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    
    setPostData({ ...postData, content: newBlocks });
  };

  const renderContentBlock = (block: ContentBlock, index: number) => {
    const isEditing = editingBlockId === block.id;
    
    return (
      <motion.div
        key={block.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative border border-border rounded-lg p-4 bg-background hover:border-primary/50 transition-colors"
      >
        {/* Block Controls */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => moveBlock(block.id, 'up')}
            disabled={index === 0}
            className="p-1.5 bg-background border border-border rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move up"
          >
            <ChevronUp className="w-3 h-3" />
          </button>
          <div className="p-1.5 bg-background border border-border rounded cursor-move">
            <GripVertical className="w-3 h-3" />
          </div>
          <button
            onClick={() => moveBlock(block.id, 'down')}
            disabled={index === (postData.content || []).length - 1}
            className="p-1.5 bg-background border border-border rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move down"
          >
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* Block Type Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs px-2 py-1 bg-muted rounded capitalize flex items-center gap-1.5">
            {block.type === 'text' && <Type className="w-3 h-3" />}
            {block.type === 'heading' && <Heading2 className="w-3 h-3" />}
            {block.type === 'image' && <ImageIcon className="w-3 h-3" />}
            {block.type === 'audio' && <Music className="w-3 h-3" />}
            {block.type === 'video' && <Video className="w-3 h-3" />}
            {block.type}
          </span>
          <div className="flex items-center gap-1">
            {!isEditing && (
              <button
                onClick={() => setEditingBlockId(block.id)}
                className="p-1.5 hover:bg-muted rounded transition-colors"
                title="Edit"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => deleteContentBlock(block.id)}
              className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Block Content */}
        {isEditing ? (
          <div className="space-y-3">
            {/* Text Block Editor */}
            {block.type === 'text' && (
              <textarea
                value={block.content}
                onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={6}
                placeholder="Enter your text content..."
              />
            )}

            {/* Heading Block Editor */}
            {block.type === 'heading' && (
              <>
                <div className="flex gap-2">
                  <select
                    value={block.metadata?.level || 2}
                    onChange={(e) => updateContentBlock(block.id, { 
                      metadata: { ...block.metadata, level: parseInt(e.target.value) } 
                    })}
                    className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value={2}>H2</option>
                    <option value={3}>H3</option>
                    <option value={4}>H4</option>
                  </select>
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
                    className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Heading text"
                  />
                </div>
              </>
            )}

            {/* Image Block Editor */}
            {block.type === 'image' && (
              <>
                <input
                  type="url"
                  value={block.content}
                  onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Image URL (https://...)"
                />
                <input
                  type="text"
                  value={block.metadata?.alt || ''}
                  onChange={(e) => updateContentBlock(block.id, { 
                    metadata: { ...block.metadata, alt: e.target.value } 
                  })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Alt text (for accessibility)"
                />
                <input
                  type="text"
                  value={block.metadata?.caption || ''}
                  onChange={(e) => updateContentBlock(block.id, { 
                    metadata: { ...block.metadata, caption: e.target.value } 
                  })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Caption (optional)"
                />
                {block.content && (
                  <img src={block.content} alt={block.metadata?.alt || ''} className="w-full rounded-lg mt-2" />
                )}
              </>
            )}

            {/* Audio Block Editor */}
            {block.type === 'audio' && (
              <>
                <input
                  type="url"
                  value={block.content}
                  onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Audio URL (https://...)"
                />
                <input
                  type="text"
                  value={block.metadata?.caption || ''}
                  onChange={(e) => updateContentBlock(block.id, { 
                    metadata: { ...block.metadata, caption: e.target.value } 
                  })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Caption (optional)"
                />
                {block.content && (
                  <audio controls className="w-full mt-2">
                    <source src={block.content} />
                  </audio>
                )}
              </>
            )}

            {/* Video Block Editor */}
            {block.type === 'video' && (
              <>
                <input
                  type="url"
                  value={block.content}
                  onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Video URL (YouTube, Vimeo, or direct URL)"
                />
                <input
                  type="text"
                  value={block.metadata?.caption || ''}
                  onChange={(e) => updateContentBlock(block.id, { 
                    metadata: { ...block.metadata, caption: e.target.value } 
                  })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Caption (optional)"
                />
                {block.content && (
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mt-2">
                    <Video className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </>
            )}

            {/* Edit Actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setEditingBlockId(null)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-foreground text-background rounded-lg hover:bg-foreground/90"
              >
                <Check className="w-3 h-3" />
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            {/* Display Text Block */}
            {block.type === 'text' && (
              <p className="text-muted-foreground whitespace-pre-wrap">{block.content}</p>
            )}

            {/* Display Heading Block */}
            {block.type === 'heading' && (
              <>
                {block.metadata?.level === 2 && <h2 className="font-medium text-xl">{block.content}</h2>}
                {block.metadata?.level === 3 && <h3 className="font-medium text-lg">{block.content}</h3>}
                {block.metadata?.level === 4 && <h4 className="font-medium">{block.content}</h4>}
              </>
            )}

            {/* Display Image Block */}
            {block.type === 'image' && block.content && (
              <figure>
                <img src={block.content} alt={block.metadata?.alt || ''} className="w-full rounded-lg" />
                {block.metadata?.caption && (
                  <figcaption className="text-sm text-muted-foreground text-center mt-2">
                    {block.metadata.caption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Display Audio Block */}
            {block.type === 'audio' && block.content && (
              <figure>
                <audio controls className="w-full">
                  <source src={block.content} />
                  Your browser does not support the audio element.
                </audio>
                {block.metadata?.caption && (
                  <figcaption className="text-sm text-muted-foreground mt-2">
                    {block.metadata.caption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Display Video Block */}
            {block.type === 'video' && block.content && (
              <figure>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  {block.content.includes('youtube.com') || block.content.includes('youtu.be') ? (
                    <iframe
                      src={block.content.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : block.content.includes('vimeo.com') ? (
                    <iframe
                      src={block.content.replace('vimeo.com/', 'player.vimeo.com/video/')}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video controls className="w-full h-full">
                      <source src={block.content} />
                      Your browser does not support the video element.
                    </video>
                  )}
                </div>
                {block.metadata?.caption && (
                  <figcaption className="text-sm text-muted-foreground mt-2">
                    {block.metadata.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  if (!originalPost) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button
                onClick={handlePublish}
                className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                Publish Changes
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <article className="pt-12 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Edit Banner */}
          <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm text-primary">
              <strong>Editing Mode:</strong> Click on any field to edit. Use the content blocks below to build your article.
            </p>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="aspect-[21/9] overflow-hidden rounded-lg bg-muted mb-8 relative group">
              {editingField === "image" ? (
                <div className="absolute inset-0 bg-background/95 p-4 z-10">
                  <div className="h-full flex flex-col">
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                      type="url"
                      value={postData.image}
                      onChange={(e) =>
                        setPostData({ ...postData, image: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                      placeholder="https://images.unsplash.com/..."
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingField(null)}
                        className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Done
                      </button>
                      <button
                        onClick={() => {
                          setPostData({ ...postData, image: originalPost.image });
                          setEditingField(null);
                        }}
                        className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={postData.image}
                    alt={postData.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setEditingField("image")}
                    className="absolute top-4 right-4 p-2 bg-background/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Edit image"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Tags */}
            <div className="mb-6">
              {editingField === "tags" ? (
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <label className="block text-sm font-medium mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={postData.tags.join(", ")}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        tags: e.target.value.split(",").map((t) => t.trim()),
                      })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingField(null)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-foreground text-background rounded-lg hover:bg-foreground/90"
                    >
                      <Check className="w-3 h-3" />
                      Done
                    </button>
                    <button
                      onClick={() => {
                        setPostData({ ...postData, tags: originalPost.tags });
                        setEditingField(null);
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted"
                    >
                      <X className="w-3 h-3" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 relative group">
                  {postData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-sm bg-muted rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  <button
                    onClick={() => setEditingField("tags")}
                    className="ml-2 p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Edit tags"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Title */}
            {editingField === "title" ? (
              <div className="p-4 bg-muted/30 rounded-lg border border-border mb-6">
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={postData.title}
                  onChange={(e) =>
                    setPostData({ ...postData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 text-3xl md:text-4xl font-medium border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingField(null)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-foreground text-background rounded-lg hover:bg-foreground/90"
                  >
                    <Check className="w-3 h-3" />
                    Done
                  </button>
                  <button
                    onClick={() => {
                      setPostData({ ...postData, title: originalPost.title });
                      setEditingField(null);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted"
                  >
                    <X className="w-3 h-3" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group mb-6">
                <h1 className="text-4xl md:text-5xl font-medium">{postData.title}</h1>
                <button
                  onClick={() => setEditingField("title")}
                  className="absolute -right-10 top-2 p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Edit title"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              {editingField === "date" ? (
                <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg border border-border">
                  <Calendar size={16} />
                  <input
                    type="text"
                    value={postData.date}
                    onChange={(e) =>
                      setPostData({ ...postData, date: e.target.value })
                    }
                    className="px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="March 18, 2026"
                    autoFocus
                  />
                  <button
                    onClick={() => setEditingField(null)}
                    className="p-1 hover:bg-background rounded"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditingField("date")}
                  className="flex items-center gap-2 hover:bg-muted px-2 py-1 rounded transition-colors"
                >
                  <Calendar size={16} />
                  {postData.date}
                  <Edit2 className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                </button>
              )}

              {editingField === "readTime" ? (
                <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg border border-border">
                  <Clock size={16} />
                  <input
                    type="text"
                    value={postData.readTime}
                    onChange={(e) =>
                      setPostData({ ...postData, readTime: e.target.value })
                    }
                    className="px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="8 min read"
                    autoFocus
                  />
                  <button
                    onClick={() => setEditingField(null)}
                    className="p-1 hover:bg-background rounded"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditingField("readTime")}
                  className="flex items-center gap-2 hover:bg-muted px-2 py-1 rounded transition-colors"
                >
                  <Clock size={16} />
                  {postData.readTime}
                  <Edit2 className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                </button>
              )}

              {editingField === "category" ? (
                <div className="p-2 bg-muted/30 rounded-lg border border-border">
                  <input
                    type="text"
                    value={postData.category}
                    onChange={(e) =>
                      setPostData({ ...postData, category: e.target.value })
                    }
                    className="px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Category"
                    autoFocus
                  />
                  <button
                    onClick={() => setEditingField(null)}
                    className="ml-2 p-1 hover:bg-background rounded"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditingField("category")}
                  className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                >
                  {postData.category}
                  <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </button>
              )}
            </div>

            {/* Excerpt */}
            {editingField === "excerpt" ? (
              <div className="p-4 bg-muted/30 rounded-lg border border-border">
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <textarea
                  value={postData.excerpt}
                  onChange={(e) =>
                    setPostData({ ...postData, excerpt: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  autoFocus
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditingField(null)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-foreground text-background rounded-lg hover:bg-foreground/90"
                  >
                    <Check className="w-3 h-3" />
                    Done
                  </button>
                  <button
                    onClick={() => {
                      setPostData({ ...postData, excerpt: originalPost.excerpt });
                      setEditingField(null);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted"
                  >
                    <X className="w-3 h-3" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {postData.excerpt}
                </p>
                <button
                  onClick={() => setEditingField("excerpt")}
                  className="absolute -right-10 top-2 p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Edit excerpt"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Content Editor Section */}
          <div className="border-t border-border pt-12">
            <div className="mb-6">
              <h2 className="text-2xl font-medium mb-2">Article Content</h2>
              <p className="text-sm text-muted-foreground">
                Build your article by adding content blocks below. Drag to reorder.
              </p>
            </div>

            {/* Add Content Block Buttons */}
            <div className="flex flex-wrap gap-3 mb-8 p-4 bg-muted/30 rounded-lg border border-border">
              <span className="text-sm font-medium mr-2">Add Block:</span>
              <button
                onClick={() => addContentBlock('text')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-background border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Type className="w-4 h-4" />
                Text
              </button>
              <button
                onClick={() => addContentBlock('heading')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-background border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Heading2 className="w-4 h-4" />
                Heading
              </button>
              <button
                onClick={() => addContentBlock('image')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-background border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
                Image
              </button>
              <button
                onClick={() => addContentBlock('audio')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-background border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Music className="w-4 h-4" />
                Audio
              </button>
              <button
                onClick={() => addContentBlock('video')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-background border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Video className="w-4 h-4" />
                Video
              </button>
            </div>

            {/* Content Blocks */}
            <div className="space-y-4 mb-8">
              {(postData.content || []).length > 0 ? (
                (postData.content || []).map((block, index) => renderContentBlock(block, index))
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed border-border">
                  <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">No content blocks yet</p>
                  <p className="text-sm text-muted-foreground">
                    Click the buttons above to add text, images, audio, or video to your article
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-foreground text-background rounded-full shadow-lg hover:bg-foreground/90 transition-colors z-50"
        >
          <ArrowLeft className="w-5 h-5 rotate-90" />
        </motion.button>
      )}
    </div>
  );
}