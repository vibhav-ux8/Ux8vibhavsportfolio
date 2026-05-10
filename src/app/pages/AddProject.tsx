import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Save,
  Image as ImageIcon,
  Video,
  Type,
  Trash2,
  Plus,
  ArrowUp,
  Eye,
  CheckCircle,
  ArrowLeft,
  Edit2,
  X
} from "lucide-react";
import { ImageUpload } from "../components/ImageUpload";

interface ContentBlock {
  id: string;
  type: "text" | "image" | "video";
  content: string;
  caption?: string;
}

interface Section {
  id: string;
  name: string;
  content: ContentBlock[];
}

export default function AddProject() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<string>("cover");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState<string | null>(null);
  const [sectionTitleValue, setSectionTitleValue] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Initialize sections with default structure
  const [sections, setSections] = useState<Section[]>([
    {
      id: "cover",
      name: "00 Cover",
      content: [
        { id: "cover-hero", type: "image", content: "", caption: "" },
        { id: "cover-thumb", type: "image", content: "", caption: "" },
        { id: "cover-logo", type: "image", content: "", caption: "" },
      ],
    },
    {
      id: "context",
      name: "01 Context",
      content: [],
    },
    {
      id: "product-vision",
      name: "02 Product Vision",
      content: [],
    },
    {
      id: "user-research",
      name: "03 User Research",
      content: [],
    },
    {
      id: "design-direction",
      name: "04 Design Direction",
      content: [],
    },
    {
      id: "methods-processes",
      name: "05 Methods & Processes",
      content: [],
    },
    {
      id: "design-deliverables",
      name: "06 Design Deliverables",
      content: [],
    },
    {
      id: "analysis-impact",
      name: "07 Analysis & Impact",
      content: [],
    },
    {
      id: "future-scope",
      name: "08 Future Scope",
      content: [],
    },
    {
      id: "credits",
      name: "09 Credits",
      content: [],
    },
  ]);

  const [basicInfo, setBasicInfo] = useState({
    title: "",
    description: "",
    category: [] as string[],
    sector: [] as string[],
    tags: "",
    year: new Date().getFullYear().toString(),
    role: "",
    thumbnail: "",
    logoOverlay: "",
    coverImage: "",
  });

  // Category management
  const [categories, setCategories] = useState([
    "LEA & Defence",
    "DPI & Governance",
    "IKS & Culture",
    "Healthcare",
    "Services",
    "e-commerce"
  ]);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategoryValue, setEditCategoryValue] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Domain management
  const [domains, setDomains] = useState([
    "UI-UX Design",
    "Product Design",
    "Communication",
    "Game Design",
    "Digital Illustration"
  ]);
  const [editingDomain, setEditingDomain] = useState<string | null>(null);
  const [editDomainValue, setEditDomainValue] = useState("");
  const [showAddDomain, setShowAddDomain] = useState(false);
  const [newDomainName, setNewDomainName] = useState("");

  const [projectImages, setProjectImages] = useState<Array<{ url: string; caption: string }>>([]);

  const { scrollYProgress } = useScroll();
  const progressBarScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    let isMounted = true;
    const handleScroll = () => {
      if (isMounted) {
        setShowScrollTop(window.scrollY > 600);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      isMounted = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateContent = (sectionId: string, blockId: string, newContent: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((block) =>
                block.id === blockId ? { ...block, content: newContent } : block
              ),
            }
          : section
      )
    );
  };

  const updateCaption = (sectionId: string, blockId: string, newCaption: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((block) =>
                block.id === blockId ? { ...block, caption: newCaption } : block
              ),
            }
          : section
      )
    );
  };

  const addContentBlock = (sectionId: string, type: "text" | "image" | "video") => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: [
                ...section.content,
                {
                  id: `${sectionId}-${type}-${Date.now()}`,
                  type,
                  content: "",
                  caption: type !== "text" ? "" : undefined,
                },
              ],
            }
          : section
      )
    );
  };

  const deleteContentBlock = (sectionId: string, blockId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.filter((block) => block.id !== blockId),
            }
          : section
      )
    );
  };

  const updateSectionTitle = (sectionId: string, newName: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, name: newName }
          : section
      )
    );
  };

  const handleEditSectionTitle = (sectionId: string, currentName: string) => {
    setEditingSectionTitle(sectionId);
    setSectionTitleValue(currentName);
  };

  const handleSaveSectionTitle = (sectionId: string) => {
    if (sectionTitleValue.trim()) {
      updateSectionTitle(sectionId, sectionTitleValue);
    }
    setEditingSectionTitle(null);
    setSectionTitleValue("");
  };

  const addProjectImage = () => {
    setProjectImages([...projectImages, { url: "", caption: "" }]);
  };

  const updateProjectImage = (index: number, field: "url" | "caption", value: string) => {
    const updated = [...projectImages];
    updated[index][field] = value;
    setProjectImages(updated);
  };

  const deleteProjectImage = (index: number) => {
    setProjectImages(projectImages.filter((_, i) => i !== index));
  };

  // Category management functions
  const handleEditCategory = (category: string) => {
    setEditingCategory(category);
    setEditCategoryValue(category);
  };

  const handleSaveCategory = () => {
    if (editingCategory && editCategoryValue && editCategoryValue !== editingCategory) {
      const updatedCategories = categories.map(cat =>
        cat === editingCategory ? editCategoryValue : cat
      );
      setCategories(updatedCategories);

      // Update basicInfo if the edited category was selected
      if (basicInfo.category.includes(editingCategory)) {
        const updatedSelected = basicInfo.category.map(cat =>
          cat === editingCategory ? editCategoryValue : cat
        );
        setBasicInfo({ ...basicInfo, category: updatedSelected });
      }
    }
    setEditingCategory(null);
    setEditCategoryValue("");
  };

  const handleDeleteCategory = (category: string) => {
    if (confirm(`Are you sure you want to delete the category "${category}"?`)) {
      setCategories(categories.filter(cat => cat !== category));

      // Remove from basicInfo category if the deleted category was selected
      if (basicInfo.category.includes(category)) {
        setBasicInfo({
          ...basicInfo,
          category: basicInfo.category.filter(cat => cat !== category)
        });
      }
    }
  };

  const toggleCategory = (category: string) => {
    if (basicInfo.category.includes(category)) {
      setBasicInfo({
        ...basicInfo,
        category: basicInfo.category.filter(cat => cat !== category)
      });
    } else {
      setBasicInfo({
        ...basicInfo,
        category: [...basicInfo.category, category]
      });
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName && !categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName]);
      setNewCategoryName("");
      setShowAddCategory(false);
    } else if (categories.includes(newCategoryName)) {
      alert("Category already exists!");
    }
  };

  // Domain management functions
  const handleEditDomain = (domain: string) => {
    setEditingDomain(domain);
    setEditDomainValue(domain);
  };

  const handleSaveDomain = () => {
    if (editingDomain && editDomainValue && editDomainValue !== editingDomain) {
      const updatedDomains = domains.map(dom =>
        dom === editingDomain ? editDomainValue : dom
      );
      setDomains(updatedDomains);

      // Update basicInfo if the edited domain was selected
      if (basicInfo.sector.includes(editingDomain)) {
        const updatedSelected = basicInfo.sector.map(dom =>
          dom === editingDomain ? editDomainValue : dom
        );
        setBasicInfo({ ...basicInfo, sector: updatedSelected });
      }
    }
    setEditingDomain(null);
    setEditDomainValue("");
  };

  const handleDeleteDomain = (domain: string) => {
    if (confirm(`Are you sure you want to delete the domain "${domain}"?`)) {
      setDomains(domains.filter(dom => dom !== domain));

      // Remove from basicInfo sector if the deleted domain was selected
      if (basicInfo.sector.includes(domain)) {
        setBasicInfo({
          ...basicInfo,
          sector: basicInfo.sector.filter(dom => dom !== domain)
        });
      }
    }
  };

  const toggleDomain = (domain: string) => {
    if (basicInfo.sector.includes(domain)) {
      setBasicInfo({
        ...basicInfo,
        sector: basicInfo.sector.filter(dom => dom !== domain)
      });
    } else {
      setBasicInfo({
        ...basicInfo,
        sector: [...basicInfo.sector, domain]
      });
    }
  };

  const handleAddDomain = () => {
    if (newDomainName && !domains.includes(newDomainName)) {
      setDomains([...domains, newDomainName]);
      setNewDomainName("");
      setShowAddDomain(false);
    } else if (domains.includes(newDomainName)) {
      alert("Domain already exists!");
    }
  };

  const handleSaveDraft = () => {
    const savedData = {
      sections,
      basicInfo,
      projectImages,
    };
    localStorage.setItem("newProjectDraft", JSON.stringify(savedData));
    alert("Draft saved successfully!");
  };

  const handlePublish = () => {
    try {
      if (!basicInfo.title || basicInfo.category.length === 0) {
        alert("Please fill in at least the title and select at least one category before publishing.");
        return;
      }

      // Generate slug from title
      const slug = basicInfo.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Extract content from sections - use first text block in each section
      const contextSection = sections.find((s) => s.id === "context");
      const visionSection = sections.find((s) => s.id === "product-vision");
      const directionSection = sections.find((s) => s.id === "design-direction");
      const methodsSection = sections.find((s) => s.id === "methods-processes");
      const impactSection = sections.find((s) => s.id === "analysis-impact");

      const newProject = {
        id: slug,
        title: basicInfo.title,
        description: basicInfo.description,
        category: basicInfo.category,
        sector: basicInfo.sector,
        tags: basicInfo.tags.split(",").map((tag) => tag.trim()).filter(t => t),
        year: basicInfo.year,
        role: basicInfo.role,
        thumbnail: sections.find((s) => s.id === "cover")?.content.find(c => c.id === "cover-thumb")?.content || "",
        logoOverlay: sections.find((s) => s.id === "cover")?.content.find(c => c.id === "cover-logo")?.content || "",
        coverImage: sections.find((s) => s.id === "cover")?.content.find(c => c.id === "cover-hero")?.content || "",
        icon: "Layers",
        context: contextSection?.content.find(c => c.type === "text")?.content || "",
        research: visionSection?.content.find(c => c.type === "text")?.content || "",
        designSystem: directionSection?.content.find(c => c.type === "text")?.content || "",
        prototyping: methodsSection?.content.find(c => c.type === "text")?.content || "",
        outcome: impactSection?.content.find(c => c.type === "text")?.content || "",
        sectionsData: sections,
        images: projectImages,
      };

      const existingProjects = localStorage.getItem("cmsNewProjects");
      const projectsList = existingProjects ? JSON.parse(existingProjects) : [];

      const existingIndex = projectsList.findIndex((p: any) => p.id === newProject.id);
      if (existingIndex >= 0) {
        projectsList[existingIndex] = newProject;
      } else {
        projectsList.push(newProject);
      }

      localStorage.setItem("cmsNewProjects", JSON.stringify(projectsList));

      alert("Project published successfully!");
      navigate("/work");
    } catch (error) {
      console.error("Error publishing project:", error);
      alert("Error publishing project. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary/90 to-primary z-[60] origin-left shadow-[0_1px_3px_rgba(0,82,255,0.4)]"
        style={{ scaleX: progressBarScaleX }}
      />

      {/* Header - Floating Style */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-sm border border-border z-50 rounded-full shadow-lg">
        <div className="px-6 py-3 flex items-center gap-6">
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-muted rounded-full hover:bg-muted/80 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Publish
          </button>
        </div>
      </header>

      {/* Left Navigation */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="space-y-1 bg-background/90 backdrop-blur-md border border-border/50 rounded-xl p-2 shadow-lg">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`block w-full text-left px-4 py-2.5 text-xs font-medium rounded-lg transition-all ${
                activeSection === section.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-muted/50 text-muted-foreground"
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-32 lg:pl-64">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-12">
          {/* Back to Work Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Work
            </Link>
          </motion.div>

          {/* Hero Cover Section */}
          <div id="cover" className="scroll-mt-32 mb-20">
            {basicInfo.thumbnail && (
              <div className="relative min-h-[50vh] mb-12 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={basicInfo.thumbnail}
                  alt={basicInfo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-4 tracking-tight">
                    {basicInfo.title || "Project Title"}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                    {basicInfo.description || "Project description"}
                  </p>
                </div>
              </div>
            )}

            {/* Basic Info Section */}
            <div className="bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 rounded-2xl p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-primary rounded-full" />
                <h2 className="text-2xl font-medium">Basic Information</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-muted-foreground">Project Title</label>
                  <input
                    type="text"
                    value={basicInfo.title}
                    onChange={(e) => setBasicInfo({ ...basicInfo, title: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-muted-foreground">Description</label>
                  <textarea
                    value={basicInfo.description}
                    onChange={(e) => setBasicInfo({ ...basicInfo, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                    placeholder="Brief project description"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-muted-foreground">Category</label>
                      <button
                        onClick={() => setShowAddCategory(true)}
                        className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                        type="button"
                      >
                        <Plus className="w-3 h-3" />
                        Add
                      </button>
                    </div>
                    <div className="space-y-2 p-4 bg-background border border-border/60 rounded-xl max-h-[280px] overflow-y-auto">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center justify-between group">
                          {editingCategory === category ? (
                            <div className="flex items-center gap-2 flex-1">
                              <input
                                type="text"
                                value={editCategoryValue}
                                onChange={(e) => setEditCategoryValue(e.target.value)}
                                className="flex-1 px-3 py-1 text-sm border border-primary rounded-lg outline-none"
                                autoFocus
                                onKeyPress={(e) => e.key === "Enter" && handleSaveCategory()}
                              />
                              <button
                                onClick={handleSaveCategory}
                                className="text-green-600 hover:text-green-700"
                                type="button"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingCategory(null);
                                  setEditCategoryValue("");
                                }}
                                className="text-muted-foreground hover:text-foreground"
                                type="button"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <label className="flex items-center gap-3 flex-1 cursor-pointer">
                                <input
                                  type="checkbox"
                                  value={category}
                                  checked={basicInfo.category.includes(category)}
                                  onChange={() => toggleCategory(category)}
                                  className="w-4 h-4 border-2 border-border rounded bg-white text-primary focus:ring-2 focus:ring-primary/20"
                                />
                                <span className="text-sm">{category}</span>
                              </label>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => handleEditCategory(category)}
                                  className="p-1 hover:bg-muted rounded"
                                  title="Edit"
                                  type="button"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCategory(category)}
                                  className="p-1 hover:bg-red-50 hover:text-red-600 rounded"
                                  title="Delete"
                                  type="button"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Add Category Modal */}
                    {showAddCategory && (
                      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-background border border-border rounded-xl p-6 max-w-md w-full mx-4"
                        >
                          <h3 className="text-lg font-medium mb-4">Add New Category</h3>
                          <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Enter category name"
                            className="w-full px-4 py-2 border border-border rounded-lg mb-4"
                            autoFocus
                            onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                          />
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => {
                                setShowAddCategory(false);
                                setNewCategoryName("");
                              }}
                              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted"
                              type="button"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleAddCategory}
                              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                              type="button"
                            >
                              Add
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-muted-foreground">Domain</label>
                      <button
                        onClick={() => setShowAddDomain(true)}
                        className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                        type="button"
                      >
                        <Plus className="w-3 h-3" />
                        Add
                      </button>
                    </div>
                    <div className="space-y-2 p-4 bg-background border border-border/60 rounded-xl max-h-[280px] overflow-y-auto">
                      {domains.map((domain) => (
                        <div key={domain} className="flex items-center justify-between group">
                          {editingDomain === domain ? (
                            <div className="flex items-center gap-2 flex-1">
                              <input
                                type="text"
                                value={editDomainValue}
                                onChange={(e) => setEditDomainValue(e.target.value)}
                                className="flex-1 px-3 py-1 text-sm border border-primary rounded-lg outline-none"
                                autoFocus
                                onKeyPress={(e) => e.key === "Enter" && handleSaveDomain()}
                              />
                              <button
                                onClick={handleSaveDomain}
                                className="text-green-600 hover:text-green-700"
                                type="button"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingDomain(null);
                                  setEditDomainValue("");
                                }}
                                className="text-muted-foreground hover:text-foreground"
                                type="button"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <label className="flex items-center gap-3 flex-1 cursor-pointer">
                                <input
                                  type="checkbox"
                                  value={domain}
                                  checked={basicInfo.sector.includes(domain)}
                                  onChange={() => toggleDomain(domain)}
                                  className="w-4 h-4 border-2 border-border rounded bg-white text-primary focus:ring-2 focus:ring-primary/20"
                                />
                                <span className="text-sm">{domain}</span>
                              </label>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => handleEditDomain(domain)}
                                  className="p-1 hover:bg-muted rounded"
                                  title="Edit"
                                  type="button"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleDeleteDomain(domain)}
                                  className="p-1 hover:bg-red-50 hover:text-red-600 rounded"
                                  title="Delete"
                                  type="button"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Add Domain Modal */}
                    {showAddDomain && (
                      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-background border border-border rounded-xl p-6 max-w-md w-full mx-4"
                        >
                          <h3 className="text-lg font-medium mb-4">Add New Domain</h3>
                          <input
                            type="text"
                            value={newDomainName}
                            onChange={(e) => setNewDomainName(e.target.value)}
                            placeholder="Enter domain name"
                            className="w-full px-4 py-2 border border-border rounded-lg mb-4"
                            autoFocus
                            onKeyPress={(e) => e.key === "Enter" && handleAddDomain()}
                          />
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => {
                                setShowAddDomain(false);
                                setNewDomainName("");
                              }}
                              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted"
                              type="button"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleAddDomain}
                              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                              type="button"
                            >
                              Add
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-muted-foreground">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={basicInfo.tags}
                    onChange={(e) => setBasicInfo({ ...basicInfo, tags: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="UX Design, AI, Enterprise"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-muted-foreground">Role</label>
                    <input
                      type="text"
                      value={basicInfo.role}
                      onChange={(e) => setBasicInfo({ ...basicInfo, role: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      placeholder="Lead Designer, UX Researcher"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3 text-muted-foreground">Year</label>
                    <input
                      type="text"
                      value={basicInfo.year}
                      onChange={(e) => setBasicInfo({ ...basicInfo, year: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      placeholder="2024"
                    />
                  </div>
                </div>

                {/* Cover Images */}
                <div className="pt-6 border-t border-border/40">
                  <h3 className="text-sm font-medium mb-4 text-muted-foreground">Cover Images</h3>

                  {/* Cover Image (Hero Background) */}
                  <div className="mb-6">
                    <label className="block text-sm mb-2">Cover Image (Hero Background)</label>
                    <p className="text-xs text-muted-foreground mb-3">Large background image that appears behind the title and description on the project page</p>
                    <div className="max-w-2xl">
                      <ImageUpload
                        value={sections.find((s) => s.id === "cover")?.content.find(c => c.id === "cover-hero")?.content || ""}
                        onChange={(url) => {
                          updateContent("cover", "cover-hero", url);
                          setBasicInfo({ ...basicInfo, coverImage: url });
                        }}
                        path="projects/covers/"
                        label="Drop cover image (recommended: 1920x1080 or larger)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm mb-2">Thumbnail Image</label>
                      <div className="max-w-sm">
                        <ImageUpload
                          value={sections.find((s) => s.id === "cover")?.content.find(c => c.id === "cover-thumb")?.content || ""}
                          onChange={(url) => {
                            updateContent("cover", "cover-thumb", url);
                            setBasicInfo({ ...basicInfo, thumbnail: url });
                          }}
                          path="projects/thumbnails/"
                          label="Drop thumbnail image"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Logo Overlay (Optional)</label>
                      <div className="max-w-xs">
                        <ImageUpload
                          value={sections.find((s) => s.id === "cover")?.content.find(c => c.id === "cover-logo")?.content || ""}
                          onChange={(url) => {
                            updateContent("cover", "cover-logo", url);
                            setBasicInfo({ ...basicInfo, logoOverlay: url });
                          }}
                          path="projects/logos/"
                          label="Drop logo overlay"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          {sections.filter(s => s.id !== "cover").map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              className="scroll-mt-32 mb-20"
            >
              <div className="bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 rounded-2xl p-8 md:p-10 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-1 h-8 bg-primary rounded-full" />
                    {editingSectionTitle === section.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={sectionTitleValue}
                          onChange={(e) => setSectionTitleValue(e.target.value)}
                          className="text-2xl font-medium px-3 py-1 border-2 border-primary rounded-lg outline-none flex-1"
                          autoFocus
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSaveSectionTitle(section.id);
                            }
                          }}
                        />
                        <button
                          onClick={() => handleSaveSectionTitle(section.id)}
                          className="p-2 text-green-600 hover:text-green-700"
                          type="button"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingSectionTitle(null);
                            setSectionTitleValue("");
                          }}
                          className="p-2 text-muted-foreground hover:text-foreground"
                          type="button"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <h2
                        className="text-2xl font-medium cursor-pointer hover:text-primary transition-colors"
                        onClick={() => handleEditSectionTitle(section.id, section.name)}
                      >
                        {section.name}
                      </h2>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addContentBlock(section.id, "text")}
                      className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                      title="Add Text"
                    >
                      <Type className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addContentBlock(section.id, "image")}
                      className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                      title="Add Image"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addContentBlock(section.id, "video")}
                      className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                      title="Add Video"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {section.content.map((block) => (
                    <div key={block.id} className="group relative">
                      {block.type === "text" && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-muted-foreground">Text Block</label>
                            <button
                              onClick={() => deleteContentBlock(section.id, block.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 hover:text-destructive rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <textarea
                            value={block.content}
                            onChange={(e) => updateContent(section.id, block.id, e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                            placeholder="Enter text content..."
                          />
                        </div>
                      )}

                      {block.type === "image" && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-muted-foreground">Image Block</label>
                            <div className="flex gap-2">
                              {block.content && (
                                <button
                                  onClick={() => updateContent(section.id, block.id, '')}
                                  className="p-1 hover:bg-yellow-50 hover:text-yellow-600 rounded text-xs"
                                  title="Clear image"
                                >
                                  Clear
                                </button>
                              )}
                              <button
                                onClick={() => deleteContentBlock(section.id, block.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 hover:text-destructive rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <ImageUpload
                            value={block.content}
                            onChange={(url) => updateContent(section.id, block.id, url)}
                            path={`projects/${section.id}/`}
                            label={block.caption || "Drop image"}
                          />
                          <input
                            type="text"
                            value={block.caption || ""}
                            onChange={(e) => updateCaption(section.id, block.id, e.target.value)}
                            placeholder="Image caption (optional)"
                            className="mt-2 w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                          />
                        </div>
                      )}

                      {block.type === "video" && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-muted-foreground">Video Block</label>
                            <button
                              onClick={() => deleteContentBlock(section.id, block.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 hover:text-destructive rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <input
                            type="url"
                            value={block.content}
                            onChange={(e) => updateContent(section.id, block.id, e.target.value)}
                            placeholder="YouTube or Vimeo URL"
                            className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Project Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-32 mb-20"
          >
            <div className="bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 rounded-2xl p-8 md:p-10 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl font-medium">Project Gallery</h2>
                </div>
                <button
                  onClick={addProjectImage}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Image
                </button>
              </div>

              <div className="space-y-6">
                {projectImages.map((img, index) => (
                  <div key={index} className="group relative">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs text-muted-foreground">Gallery Image {index + 1}</label>
                      <button
                        onClick={() => deleteProjectImage(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 hover:text-destructive rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <ImageUpload
                      value={img.url}
                      onChange={(url) => updateProjectImage(index, "url", url)}
                      path="projects/gallery/"
                      label="Drop gallery image"
                    />
                    <input
                      type="text"
                      value={img.caption}
                      onChange={(e) => updateProjectImage(index, "caption", e.target.value)}
                      placeholder="Image caption (optional)"
                      className="mt-2 w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                ))}
                {projectImages.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No gallery images yet. Click "Add Image" to get started.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}
