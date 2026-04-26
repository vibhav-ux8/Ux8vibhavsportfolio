import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Save,
  Eye,
  CheckCircle,
  Upload,
  X,
  Plus,
  GripVertical,
  Link as LinkIcon,
  Image as ImageIcon,
  FileText,
  BarChart3,
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
  User,
  Globe,
  Github,
  ExternalLink,
  Palette,
  Star,
  Home,
  Hash,
  Tag,
  Layers,
  ChevronDown,
  Play
} from "lucide-react";

interface ContentBlock {
  id: string;
  type: "text" | "image" | "gallery" | "metrics" | "testimonial";
  content: any;
}

export default function AddProject() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving" | "">("");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    tags: [] as string[],
    featuredImage: null as File | null,
    gallery: [] as File[],
    embedUrl: "",
    techStack: [] as string[],
    status: "completed",
    clientName: "",
    projectDate: "",
    duration: "",
    liveDemoUrl: "",
    githubUrl: "",
    caseStudyUrl: "",
    externalLinks: [] as { label: string; url: string }[],
    isFeatured: false,
    showOnHomepage: false,
    priority: 1,
    themeColor: "#000000",
    metaTitle: "",
    metaDescription: "",
    ogImage: null as File | null
  });

  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [currentTech, setCurrentTech] = useState("");
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);

  // Case study subsections with toggle states and content
  const [caseStudySections, setCaseStudySections] = useState([
    { id: "00", name: "Cover", enabled: true, text: "", image: "", video: "", link: "" },
    { id: "01", name: "Context", enabled: true, text: "", image: "", video: "", link: "" },
    { id: "02", name: "Product Vision", enabled: true, text: "", image: "", video: "", link: "" },
    { id: "03", name: "User Research", enabled: true, text: "", image: "", video: "", link: "" },
    { id: "04", name: "Design Direction", enabled: true, text: "", image: "", video: "", link: "" },
    { id: "05", name: "Methods & Processes", enabled: true, text: "", image: "", video: "", link: "" },
    { id: "06", name: "Design Deliverables", enabled: true, text: "", image: "", video: "", link: "" },
    { id: "07", name: "Analysis & Impact", enabled: true, text: "", image: "", video: "", link: "" },
    { id: "08", name: "Future Scope", enabled: true, text: "", image: "", video: "", link: "" },
    { id: "09", name: "Credits", enabled: true, text: "", image: "", video: "", link: "" }
  ]);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, formData.slug]);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.title) {
        setAutoSaveStatus("saving");
        setTimeout(() => {
          localStorage.setItem("draft_project", JSON.stringify(formData));
          setAutoSaveStatus("saved");
          setTimeout(() => setAutoSaveStatus(""), 2000);
        }, 500);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, currentTag] }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleAddTech = () => {
    if (currentTech && !formData.techStack.includes(currentTech)) {
      setFormData((prev) => ({ ...prev, techStack: [...prev.techStack, currentTech] }));
      setCurrentTech("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData((prev) => ({ ...prev, techStack: prev.techStack.filter((t) => t !== tech) }));
  };

  const handleAddExternalLink = () => {
    setFormData((prev) => ({
      ...prev,
      externalLinks: [...prev.externalLinks, { label: "", url: "" }]
    }));
  };

  const handleRemoveExternalLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      externalLinks: prev.externalLinks.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateExternalLink = (index: number, field: "label" | "url", value: string) => {
    setFormData((prev) => ({
      ...prev,
      externalLinks: prev.externalLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const handleAddContentBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: type === "metrics" ? [] : ""
    };
    setContentBlocks((prev) => [...prev, newBlock]);
  };

  const handleRemoveContentBlock = (id: string) => {
    setContentBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  const handleToggleCaseStudySection = (sectionId: string) => {
    setCaseStudySections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, enabled: !section.enabled } : section
      )
    );
  };

  const handleUpdateCaseStudySection = (sectionId: string, field: "text" | "image" | "video" | "link", value: string) => {
    setCaseStudySections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    );
  };

  const handleDragStart = (id: string) => {
    setDraggedBlock(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedBlock && draggedBlock !== id) {
      const draggedIndex = contentBlocks.findIndex((b) => b.id === draggedBlock);
      const targetIndex = contentBlocks.findIndex((b) => b.id === id);
      const newBlocks = [...contentBlocks];
      const [removed] = newBlocks.splice(draggedIndex, 1);
      newBlocks.splice(targetIndex, 0, removed);
      setContentBlocks(newBlocks);
    }
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    localStorage.setItem("draft_project", JSON.stringify({ ...formData, contentBlocks }));
    setTimeout(() => {
      setIsSaving(false);
      alert("Draft saved successfully!");
    }, 1000);
  };

  const handlePreview = () => {
    window.open("/work/preview", "_blank");
  };

  const handlePublish = () => {
    setIsSaving(true);
    // In production, this would send data to backend
    console.log("Publishing project:", { ...formData, contentBlocks });
    setTimeout(() => {
      setIsSaving(false);
      alert("Project published successfully!");
      navigate("/admin/dashboard");
    }, 1500);
  };

  const categories = [
    "LEA & Defence",
    "DPI & Governance",
    "IKS & Culture",
    "Healthcare",
    "Services",
    "e-commerce"
  ];

  const statuses = ["completed", "in-progress", "archived"];

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Dashboard</span>
              </button>
              <div className="h-6 w-[1px] bg-border" />
              <div>
                <h1 className="text-lg font-medium">Add New Project</h1>
                <p className="text-xs text-muted-foreground">
                  {autoSaveStatus === "saving" && "Saving..."}
                  {autoSaveStatus === "saved" && "All changes saved"}
                  {!autoSaveStatus && "Create a new portfolio project"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save Draft</span>
              </button>
              <button
                onClick={handlePreview}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </button>
              <button
                onClick={handlePublish}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isSaving ? "Publishing..." : "Publish Project"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-background border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-muted rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Project Details</h2>
                  <p className="text-sm text-muted-foreground">Basic information about your project</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter project title"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    URL Slug *
                    <span className="text-xs text-muted-foreground ml-2">(Auto-generated from title)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">/work/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => handleInputChange("slug", e.target.value)}
                      placeholder="project-slug"
                      className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Short Description *</label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                    placeholder="Brief description for project cards (1-2 sentences)"
                    rows={2}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Full Description</label>
                  <textarea
                    value={formData.fullDescription}
                    onChange={(e) => handleInputChange("fullDescription", e.target.value)}
                    placeholder="Detailed project description..."
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-background"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-background"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg text-sm"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-destructive transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      placeholder="Add a tag..."
                      className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Media Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-background border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-muted rounded-lg">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Media</h2>
                  <p className="text-sm text-muted-foreground">Upload images and videos</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Featured Image *</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">Recommended: 1200x800px, JPG or PNG</p>
                    <input type="file" className="hidden" accept="image/*" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Gallery</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload multiple images
                    </p>
                    <p className="text-xs text-muted-foreground">You can select multiple files at once</p>
                    <input type="file" className="hidden" accept="image/*" multiple />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Video/Prototype Embed URL</label>
                  <input
                    type="url"
                    value={formData.embedUrl}
                    onChange={(e) => handleInputChange("embedUrl", e.target.value)}
                    placeholder="YouTube, Vimeo, or Figma prototype URL"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </motion.div>

            {/* Case Study Builder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-background border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium">Case Study Builder</h2>
                    <p className="text-sm text-muted-foreground">Add modular content blocks</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddContentBlock("text")}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="Add Text Block"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAddContentBlock("image")}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="Add Image Block"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAddContentBlock("gallery")}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="Add Gallery Block"
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAddContentBlock("metrics")}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="Add Metrics Block"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAddContentBlock("testimonial")}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="Add Testimonial Block"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Case Study Subsections */}
              <div className="mb-6">
                <div className="mb-4">
                  <h3 className="font-medium mb-1">Case Study Sections</h3>
                  <p className="text-sm text-muted-foreground">
                    Toggle sections to include in your case study
                  </p>
                </div>
                <div className="space-y-3">
                  {caseStudySections.map((section) => (
                    <div
                      key={section.id}
                      className="bg-background border border-border rounded-lg overflow-hidden"
                    >
                      <div className="flex items-center justify-between p-3 hover:bg-muted/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-muted-foreground w-6">
                            {section.id}
                          </span>
                          <span className="text-sm font-medium">{section.name}</span>
                        </div>
                        <button
                          onClick={() => handleToggleCaseStudySection(section.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors border ${
                            section.enabled ? "bg-foreground border-foreground" : "bg-muted-foreground/20 border-border"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                              section.enabled ? "bg-white translate-x-6" : "bg-muted-foreground translate-x-1"
                            }`}
                          />
                        </button>
                      </div>

                      {section.enabled && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-border p-4 space-y-3"
                        >
                          <div>
                            <label className="block text-xs font-medium mb-1.5 text-muted-foreground">
                              Text Content
                            </label>
                            <textarea
                              value={section.text}
                              onChange={(e) => handleUpdateCaseStudySection(section.id, "text", e.target.value)}
                              placeholder="Enter section text content..."
                              rows={4}
                              className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1.5 text-muted-foreground">
                              Image URL
                            </label>
                            <div className="relative">
                              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <input
                                type="url"
                                value={section.image}
                                onChange={(e) => handleUpdateCaseStudySection(section.id, "image", e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="w-full pl-10 pr-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1.5 text-muted-foreground">
                              Video URL
                            </label>
                            <div className="relative">
                              <Play className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <input
                                type="url"
                                value={section.video}
                                onChange={(e) => handleUpdateCaseStudySection(section.id, "video", e.target.value)}
                                placeholder="https://youtube.com/watch?v=..."
                                className="w-full pl-10 pr-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1.5 text-muted-foreground">
                              Related Link
                            </label>
                            <div className="relative">
                              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <input
                                type="url"
                                value={section.link}
                                onChange={(e) => handleUpdateCaseStudySection(section.id, "link", e.target.value)}
                                placeholder="https://..."
                                className="w-full pl-10 pr-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Content Blocks */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="mb-4">
                  <h3 className="font-medium mb-1">Additional Content Blocks</h3>
                  <p className="text-sm text-muted-foreground">
                    Add extra modular blocks for rich content
                  </p>
                </div>
              {contentBlocks.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                  <Layers className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">No content blocks yet</p>
                  <p className="text-xs text-muted-foreground">Click the icons above to add blocks</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {contentBlocks.map((block) => (
                    <div
                      key={block.id}
                      draggable
                      onDragStart={() => handleDragStart(block.id)}
                      onDragOver={(e) => handleDragOver(e, block.id)}
                      className="flex items-center gap-3 p-4 border border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-move"
                    >
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {block.type === "text" && <FileText className="w-4 h-4" />}
                          {block.type === "image" && <ImageIcon className="w-4 h-4" />}
                          {block.type === "gallery" && <Layers className="w-4 h-4" />}
                          {block.type === "metrics" && <BarChart3 className="w-4 h-4" />}
                          {block.type === "testimonial" && <MessageSquare className="w-4 h-4" />}
                          <span className="text-sm font-medium capitalize">{block.type} Block</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Drag to reorder • Click to edit
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveContentBlock(block.id)}
                        className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              </div>
            </motion.div>

            {/* Project Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-background border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-muted rounded-lg">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Metadata</h2>
                  <p className="text-sm text-muted-foreground">Additional project information</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Tech Stack</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm"
                      >
                        <Sparkles className="w-3 h-3" />
                        {tech}
                        <button
                          onClick={() => handleRemoveTech(tech)}
                          className="hover:text-destructive transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentTech}
                      onChange={(e) => setCurrentTech(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
                      placeholder="Add technology..."
                      className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={handleAddTech}
                      className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Client Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.clientName}
                        onChange={(e) => handleInputChange("clientName", e.target.value)}
                        placeholder="Client or company name"
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.projectDate}
                        onChange={(e) => handleInputChange("projectDate", e.target.value)}
                        placeholder="e.g., 2024-2025"
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Duration</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                      placeholder="e.g., 6 months"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-background border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-muted rounded-lg">
                  <LinkIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Links</h2>
                  <p className="text-sm text-muted-foreground">External project links</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Live Demo URL</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={formData.liveDemoUrl}
                      onChange={(e) => handleInputChange("liveDemoUrl", e.target.value)}
                      placeholder="https://..."
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">GitHub Repository</label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Case Study URL</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={formData.caseStudyUrl}
                      onChange={(e) => handleInputChange("caseStudyUrl", e.target.value)}
                      placeholder="https://..."
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">Additional Links</label>
                    <button
                      onClick={handleAddExternalLink}
                      className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"
                    >
                      <Plus className="w-4 h-4" />
                      Add Link
                    </button>
                  </div>
                  {formData.externalLinks.map((link, index) => (
                    <div key={index} className="grid grid-cols-[1fr,2fr,auto] gap-2 mb-2">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => handleUpdateExternalLink(index, "label", e.target.value)}
                        placeholder="Label"
                        className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => handleUpdateExternalLink(index, "url", e.target.value)}
                        placeholder="URL"
                        className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                      <button
                        onClick={() => handleRemoveExternalLink(index)}
                        className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* SEO Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="bg-background border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-muted rounded-lg">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">SEO Settings</h2>
                  <p className="text-sm text-muted-foreground">Search engine optimization</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                    placeholder="Project title for search engines"
                    maxLength={60}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.metaTitle.length}/60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description</label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                    placeholder="Brief description for search results"
                    maxLength={160}
                    rows={3}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.metaDescription.length}/160 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Open Graph Image</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <ImageIcon className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Recommended: 1200x630px</p>
                    <input type="file" className="hidden" accept="image/*" />
                  </div>
                </div>

                {/* SEO Preview */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium mb-3">Search Preview</p>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-blue-600 text-sm mb-1">
                      {formData.metaTitle || formData.title || "Project Title"}
                    </p>
                    <p className="text-xs text-green-700 mb-2">
                      ux8.in › work › {formData.slug || "project-slug"}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {formData.metaDescription || formData.shortDescription || "Project description will appear here"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar - Settings & Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Portfolio Showcase Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <h3 className="text-sm font-medium mb-4">Portfolio Settings</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Featured Project</span>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => handleInputChange("isFeatured", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer-checked:bg-primary transition-colors" />
                      <div className="absolute left-1 top-1 w-4 h-4 bg-background rounded-full transition-transform peer-checked:translate-x-5" />
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Show on Homepage</span>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.showOnHomepage}
                        onChange={(e) => handleInputChange("showOnHomepage", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer-checked:bg-primary transition-colors" />
                      <div className="absolute left-1 top-1 w-4 h-4 bg-background rounded-full transition-transform peer-checked:translate-x-5" />
                    </div>
                  </label>

                  <div>
                    <label className="flex items-center gap-2 text-sm mb-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.priority}
                      onChange={(e) => handleInputChange("priority", parseInt(e.target.value) || 1)}
                      min="1"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm mb-2">
                      <Palette className="w-4 h-4 text-muted-foreground" />
                      Theme Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={formData.themeColor}
                        onChange={(e) => handleInputChange("themeColor", e.target.value)}
                        className="w-12 h-12 border border-border rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.themeColor}
                        onChange={(e) => handleInputChange("themeColor", e.target.value)}
                        className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Project Preview Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <h3 className="text-sm font-medium mb-4">Card Preview</h3>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {formData.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-muted rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-medium mb-1 line-clamp-1">
                      {formData.title || "Project Title"}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {formData.shortDescription || "Short description will appear here"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <h3 className="text-sm font-medium mb-4">Project Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium capitalize">{formData.status.replace("-", " ")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Content Blocks</span>
                    <span className="font-medium">{contentBlocks.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tags</span>
                    <span className="font-medium">{formData.tags.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tech Stack</span>
                    <span className="font-medium">{formData.techStack.length}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
