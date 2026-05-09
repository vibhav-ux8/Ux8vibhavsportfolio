import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Save,
  Image as ImageIcon,
  Video,
  Type,
  Trash2,
  Edit2,
  Check,
  X,
  Plus,
  ArrowUp,
  Eye
} from "lucide-react";
import { getProjectById } from "../data/projects";

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

export default function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const project = getProjectById(id || "");

  const [activeSection, setActiveSection] = useState<string>("cover");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [editingBlock, setEditingBlock] = useState<string | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
    if (!project) {
      alert("Project not found!");
      navigate("/admin/dashboard");
    }
  }, [navigate, project]);

  // Initialize sections with ALL project data that appears on frontend
  // Load from existing sectionsData if available (from previous edits)
  const [sections, setSections] = useState<Section[]>(() => {
    // Check if project has existing sectionsData from previous CMS edits
    if ((project as any)?.sectionsData) {
      return (project as any).sectionsData;
    }

    // Otherwise initialize with default structure
    return [
    {
      id: "cover",
      name: "00 Cover",
      content: [
        { id: "cover-title", type: "text", content: project?.title || "" },
        { id: "cover-desc", type: "text", content: project?.description || "" },
        { id: "cover-thumb", type: "image", content: project?.thumbnail || "", caption: "Project thumbnail" },
        { id: "cover-logo", type: "image", content: project?.logoOverlay || "", caption: "Logo overlay" },
      ],
    },
    {
      id: "context",
      name: "01 Context",
      content: [
        { id: "context-text-main", type: "text", content: project?.context || "" },
        { id: "context-carousel-1", type: "image", content: "", caption: "Carousel image 1" },
        { id: "context-carousel-2", type: "image", content: "", caption: "Carousel image 2" },
        { id: "context-carousel-3", type: "image", content: "", caption: "Carousel image 3" },
        { id: "context-carousel-4", type: "image", content: "", caption: "Carousel image 4" },
        { id: "context-para-1", type: "text", content: "Our design approach emphasized creating a cohesive user experience that seamlessly integrated complex workflows into intuitive interfaces. Through extensive user research and iterative prototyping, we developed interaction patterns that reduced cognitive load while maintaining the depth of functionality required by power users." },
        { id: "context-para-2", type: "text", content: "The visual language we established balanced professional aesthetics with accessibility considerations, ensuring that the interface remained approachable for diverse user groups. Strategic use of white space, typography, and subtle animations created a sense of clarity and refinement throughout the product experience." },
        { id: "context-para-3", type: "text", content: "Cross-functional collaboration played a crucial role in translating stakeholder requirements into design solutions that addressed real user needs. Regular design reviews and usability testing sessions ensured alignment between business objectives, technical constraints, and user expectations throughout the development process." },
        { id: "context-long-image", type: "image", content: "", caption: "Long form story image" },
      ],
    },
    {
      id: "product-vision",
      name: "02 Product Vision",
      content: [
        { id: "vision-text-main", type: "text", content: project?.research || "" },
        { id: "vision-para-1", type: "text", content: "Our vision centered on creating a cohesive ecosystem that would empower users to make informed decisions. Through extensive stakeholder interviews and user research, we identified key pain points and opportunities for innovation. The product strategy focused on scalability, accessibility, and seamless integration with existing workflows." },
        { id: "vision-image-1", type: "image", content: "", caption: "Early strategic alignment sessions defining core product principles" },
        { id: "vision-para-2", type: "text", content: "We established clear principles that would guide all design decisions: prioritize user needs, maintain consistency across touchpoints, and ensure every interaction adds value. The roadmap was structured around iterative releases, allowing us to validate assumptions and incorporate feedback continuously." },
        { id: "vision-image-2", type: "image", content: "", caption: "Product roadmap visualization showing phased rollout" },
        { id: "vision-para-3", type: "text", content: "By aligning cross-functional teams around shared objectives and success metrics, we created a foundation for sustainable growth. The vision emphasized long-term impact over short-term gains, ensuring that every feature contributed to the broader product narrative and user value proposition." },
      ],
    },
    {
      id: "user-research",
      name: "03 User Research",
      content: [
        { id: "research-text-main", type: "text", content: project?.research || "" },
        { id: "research-para-1", type: "text", content: "Our research methodology combined qualitative and quantitative approaches, ensuring comprehensive insights into user needs and behaviors. Through extensive stakeholder interviews and usability testing, we identified key pain points and opportunities for innovation." },
      ],
    },
    {
      id: "design-direction",
      name: "04 Design Direction",
      content: [
        { id: "direction-text-main", type: "text", content: project?.designSystem || "" },
        { id: "direction-para-1", type: "text", content: "The design direction was rooted in clarity and purpose. We explored various visual languages, testing different approaches with users to understand which resonated most effectively. Every element was intentionally crafted to support the user's journey while maintaining brand consistency." },
        { id: "direction-image-1", type: "image", content: "", caption: "Visual exploration showcasing typography hierarchy and color palette" },
        { id: "direction-para-2", type: "text", content: "Typography, color, and spatial relationships were carefully considered to create a harmonious system. We established a comprehensive design language that could scale across platforms while maintaining coherence. Accessibility was built into the foundation, ensuring inclusive experiences for all users." },
        { id: "direction-image-2", type: "image", content: "", caption: "Component library and interaction patterns" },
        { id: "direction-para-3", type: "text", content: "The direction extended beyond visual aesthetics to encompass motion design and micro-interactions. Subtle animations guided users through complex workflows, providing feedback and reducing uncertainty. Each interaction was designed to feel responsive and purposeful." },
      ],
    },
    {
      id: "methods-processes",
      name: "05 Methods & Processes",
      content: [
        { id: "methods-text-main", type: "text", content: project?.prototyping || "" },
        { id: "methods-para-1", type: "text", content: "Our methodology combined lean UX principles with design thinking frameworks. We facilitated collaborative workshops that brought together diverse perspectives, ensuring alignment across stakeholders. Rapid prototyping enabled us to test concepts early and often, reducing risk and accelerating learning." },
        { id: "methods-para-2", type: "text", content: "User research formed the backbone of our process. Through interviews, usability testing, and analytics analysis, we gathered actionable insights that informed every decision. Cross-functional rituals ensured transparent communication and continuous alignment throughout the product lifecycle." },
        { id: "methods-para-3", type: "text", content: "By establishing clear rituals and documentation practices, we created a sustainable workflow that supported both speed and quality. The process remained flexible enough to adapt to emerging needs while maintaining the rigor necessary for delivering exceptional experiences." },
      ],
    },
    {
      id: "design-deliverables",
      name: "06 Design Deliverables",
      content: [
        { id: "deliverables-text-main", type: "text", content: "Comprehensive design documentation including component libraries, style guides, interaction specifications, and prototype files. All deliverables were structured to support seamless handoff and ongoing maintenance." },
        { id: "deliverables-para-1", type: "text", content: "Interactive prototypes validated design decisions and facilitated stakeholder alignment. High-fidelity mockups demonstrated visual refinement, while detailed specifications ensured engineering teams had the information needed for accurate implementation." },
        { id: "deliverables-para-2", type: "text", content: "Regular documentation reviews and updates kept the system relevant as the product matured. We fostered a culture of contribution where team members could propose improvements, ensuring the documentation remained valuable and reflective of current practices." },
      ],
    },
    {
      id: "analysis-impact",
      name: "07 Analysis & Impact",
      content: [
        { id: "impact-text-main", type: "text", content: project?.outcome || "" },
        { id: "impact-para-1", type: "text", content: "Success metrics were tracked across user satisfaction, task completion rates, and business outcomes. Post-launch analysis revealed significant improvements in key performance indicators, validating our design approach and informing future iterations." },
        { id: "impact-para-2", type: "text", content: "Long-term analysis showed sustained improvements in user engagement and business outcomes. The foundation we built enabled rapid iteration on new features while maintaining quality standards. This project demonstrated how thoughtful design creates compounding value over time." },
      ],
    },
    {
      id: "future-scope",
      name: "08 Future Scope",
      content: [
        { id: "future-text-main", type: "text", content: "Future enhancements will focus on expanding platform capabilities, introducing advanced personalization features, and further optimizing performance. Ongoing user research continues to inform our product roadmap and design evolution." },
        { id: "future-para-1", type: "text", content: "We envision a system that adapts intelligently to user contexts, proactively addressing needs before they arise. Continued investment in accessibility, performance, and scalability will ensure the platform remains best-in-class as user needs evolve." },
        { id: "future-para-2", type: "text", content: "Expanding into new platforms and channels will require thoughtful adaptation of our design system. We're exploring how to maintain consistency while respecting the unique constraints and opportunities of each context. User research continues to inform our prioritization and strategic direction. The next phase focuses on deepening engagement and expanding reach, using data and feedback to evolve the experience while remaining open to unexpected opportunities." },
      ],
    },
    {
      id: "credits",
      name: "09 Credits",
      content: [
        { id: "credits-role", type: "text", content: `Role: ${project?.role || ""}` },
        { id: "credits-year", type: "text", content: `Year: ${project?.year || ""}` },
        { id: "credits-team", type: "text", content: "Team: Collaborative effort across design, engineering, product, and stakeholder teams." },
      ],
    },
  ];
  });

  const [basicInfo, setBasicInfo] = useState({
    title: project?.title || "",
    description: project?.description || "",
    category: project?.category || "",
    sector: project?.sector || "",
    tags: project?.tags.join(", ") || "",
    year: project?.year || "",
    role: project?.role || "",
    thumbnail: project?.thumbnail || "",
    logoOverlay: project?.logoOverlay || "",
  });

  // Store project images array
  const [projectImages, setProjectImages] = useState(
    project?.images || []
  );

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

  const handleSaveDraft = () => {
    const savedData = {
      sections,
      basicInfo,
      projectImages,
      projectId: project?.id,
    };
    localStorage.setItem(`projectDraft_${project?.id}`, JSON.stringify(savedData));
    alert("Draft saved successfully!");
  };

  const handlePublish = () => {
    try {
      // Extract all content from sections
      const updatedProject = {
        ...project,
        ...basicInfo,
        tags: basicInfo.tags.split(",").map((tag) => tag.trim()).filter(t => t),

        // Map section content back to project fields
        context: sections.find((s) => s.id === "context")?.content.find(c => c.id === "context-text-main")?.content || "",
        research: sections.find((s) => s.id === "product-vision")?.content.find(c => c.id === "vision-text-main")?.content || "",
        designSystem: sections.find((s) => s.id === "design-direction")?.content.find(c => c.id === "direction-text-main")?.content || "",
        prototyping: sections.find((s) => s.id === "methods-processes")?.content.find(c => c.id === "methods-text-main")?.content || "",
        outcome: sections.find((s) => s.id === "analysis-impact")?.content.find(c => c.id === "impact-text-main")?.content || "",

        // Store sections data for custom content
        sectionsData: sections,
        images: projectImages,
      };

      const existingProjects = localStorage.getItem("cmsProjectsData");
      const projectsData = existingProjects ? JSON.parse(existingProjects) : {};
      projectsData[project!.id] = updatedProject;
      localStorage.setItem("cmsProjectsData", JSON.stringify(projectsData));

      alert("Project published successfully!");

      // Use window.location for navigation to ensure clean page load
      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error("Error publishing project:", error);
      alert("Error publishing project. Please try again.");
    }
  };

  if (!project) {
    return null;
  }

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
          <Link
            to="/work"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Work
          </Link>
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-muted rounded-full hover:bg-muted/80 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <div className="border-l border-border pl-6 pr-2">
            <Link
              to="/work"
              className="flex items-center gap-2 px-4 py-2 text-sm bg-muted rounded-full hover:bg-muted/80 transition-colors"
              title="View Published Projects"
            >
              <Eye className="w-4 h-4" />
              <span>View Work</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Left Navigation - Similar to Published */}
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
          {/* Hero Cover Section - Similar to Published */}
          <div id="cover" className="scroll-mt-32 mb-20">
            {/* Preview of hero image */}
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

            {/* Basic Info Section - Refined Design */}
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
                <label className="block text-sm font-medium mb-3 text-muted-foreground">Category</label>
                <select
                  value={basicInfo.category}
                  onChange={(e) => setBasicInfo({ ...basicInfo, category: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                >
                  <option value="LEA & Defence">LEA & Defence</option>
                  <option value="DPI & Governance">DPI & Governance</option>
                  <option value="IKS & Culture">IKS & Culture</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Services">Services</option>
                  <option value="e-commerce">e-commerce</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-muted-foreground">Sector</label>
                <select
                  value={basicInfo.sector}
                  onChange={(e) => setBasicInfo({ ...basicInfo, sector: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                >
                  <option value="UI-UX Design">UI-UX Design</option>
                  <option value="Product Design">Product Design</option>
                  <option value="Communication">Communication</option>
                  <option value="Game Design">Game Design</option>
                  <option value="Digital Illustration">Digital Illustration</option>
                </select>
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
                <label className="block text-sm font-medium mb-3 text-muted-foreground">Year</label>
                <input
                  type="text"
                  value={basicInfo.year}
                  onChange={(e) => setBasicInfo({ ...basicInfo, year: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-muted-foreground">Role</label>
                <input
                  type="text"
                  value={basicInfo.role}
                  onChange={(e) => setBasicInfo({ ...basicInfo, role: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="Lead Product Designer"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-3 text-muted-foreground">Thumbnail Image URL</label>
              <input
                type="text"
                value={basicInfo.thumbnail}
                onChange={(e) => setBasicInfo({ ...basicInfo, thumbnail: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-mono text-sm"
                placeholder="figma:asset/... or https://..."
              />
              {basicInfo.thumbnail && (
                <div className="mt-3 rounded-lg overflow-hidden border border-border/60">
                  <img src={basicInfo.thumbnail} alt="Thumbnail preview" className="w-full h-32 object-cover" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-3 text-muted-foreground">Logo Overlay URL</label>
              <input
                type="text"
                value={basicInfo.logoOverlay}
                onChange={(e) => setBasicInfo({ ...basicInfo, logoOverlay: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-mono text-sm"
                placeholder="figma:asset/... or https://..."
              />
              {basicInfo.logoOverlay && (
                <div className="mt-3 rounded-lg overflow-hidden border border-border/60 bg-muted/30 p-4">
                  <img src={basicInfo.logoOverlay} alt="Logo preview" className="w-24 h-24 object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>

          </div>
        </div>

        {/* Project Images Gallery */}
        <div className="mb-20 bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 rounded-2xl p-8 md:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h2 className="text-2xl font-medium">Project Images Gallery</h2>
            </div>
            <button
              onClick={addProjectImage}
              className="flex items-center gap-2 px-5 py-2.5 text-sm bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Image
            </button>
          </div>
          <div className="space-y-6">
            {projectImages.map((img, index) => (
              <div key={index} className="bg-background border border-border/60 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Image {index + 1}</span>
                  <button
                    onClick={() => deleteProjectImage(index)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <input
                  type="text"
                  value={img.url}
                  onChange={(e) => updateProjectImage(index, "url", e.target.value)}
                  placeholder="Image URL or figma:asset path"
                  className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-mono text-sm"
                />
                <input
                  type="text"
                  value={img.caption}
                  onChange={(e) => updateProjectImage(index, "caption", e.target.value)}
                  placeholder="Image caption (optional)"
                  className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
                {img.url && (
                  <div className="rounded-lg overflow-hidden border border-border/60">
                    <img src={img.url} alt={img.caption} className="w-full h-48 object-cover" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sections - Refined Design */}
        <div className="space-y-20">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-32 bg-gradient-to-br from-muted/20 to-muted/5 border border-border/40 rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-12 bg-gradient-to-b from-primary to-primary/60 rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{section.name}</h2>
                </div>
                <span className="text-xs text-muted-foreground px-4 py-2 bg-background border border-border/60 rounded-full font-medium">
                  {section.content.length} blocks
                </span>
              </div>

              {/* Content Blocks */}
              <div className="space-y-8">
                {section.content.map((block) => (
                  <div key={block.id} className="group relative">
                    {block.type === "text" && (
                      <div className="relative">
                        {editingBlock === block.id ? (
                          <div className="space-y-3">
                            <textarea
                              value={block.content}
                              onChange={(e) =>
                                updateContent(section.id, block.id, e.target.value)
                              }
                              rows={8}
                              className="w-full px-5 py-4 bg-background border-2 border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-base leading-relaxed"
                              placeholder="Enter your content here..."
                            />
                            <div className="flex justify-end">
                              <button
                                onClick={() => setEditingBlock(null)}
                                className="px-5 py-2.5 text-sm bg-foreground text-background rounded-full flex items-center gap-2 hover:bg-foreground/90 transition-colors shadow-sm"
                              >
                                <Check className="w-4 h-4" />
                                Done Editing
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="relative group/text bg-background/50 rounded-xl p-6 border border-border/40 hover:border-border/80 transition-all">
                            <p className="text-foreground/80 leading-[1.75] text-[17px] pr-24 whitespace-pre-wrap">
                              {block.content || <span className="text-muted-foreground italic">Empty text block - click edit to add content</span>}
                            </p>
                            <div className="absolute top-4 right-4 opacity-0 group-hover/text:opacity-100 transition-opacity flex gap-2">
                              <button
                                onClick={() => setEditingBlock(block.id)}
                                className="p-2.5 bg-background border border-border rounded-lg hover:bg-muted shadow-sm"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm("Delete this block?")) {
                                    deleteContentBlock(section.id, block.id);
                                  }
                                }}
                                className="p-2.5 bg-background border border-border rounded-lg hover:bg-red-50 shadow-sm"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {block.type === "image" && (
                      <div className="relative group/image bg-background/50 rounded-xl border border-border/40 p-6 hover:border-border/80 transition-all">
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={block.content}
                            onChange={(e) =>
                              updateContent(section.id, block.id, e.target.value)
                            }
                            placeholder="figma:asset/... or https://..."
                            className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-mono text-sm"
                          />
                          {block.content && (
                            <div className="rounded-lg overflow-hidden shadow-md">
                              <img
                                src={block.content}
                                alt={block.caption || ""}
                                className="w-full object-cover"
                              />
                            </div>
                          )}
                          <input
                            type="text"
                            value={block.caption || ""}
                            onChange={(e) => updateCaption(section.id, block.id, e.target.value)}
                            placeholder="Caption (optional)"
                            className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-muted-foreground"
                          />
                        </div>
                        <button
                          onClick={() => {
                            if (confirm("Delete this image?")) {
                              deleteContentBlock(section.id, block.id);
                            }
                          }}
                          className="absolute top-4 right-4 p-2.5 bg-background border border-border rounded-lg hover:bg-red-50 opacity-0 group-hover/image:opacity-100 transition-opacity shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    )}

                    {block.type === "video" && (
                      <div className="relative group/video bg-background/50 rounded-xl border border-border/40 p-6 hover:border-border/80 transition-all">
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={block.content}
                            onChange={(e) =>
                              updateContent(section.id, block.id, e.target.value)
                            }
                            placeholder="Video URL (YouTube, Vimeo, etc.)"
                            className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-mono text-sm"
                          />
                          {block.content && (
                            <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center border border-border/40">
                              <div className="text-center">
                                <Video className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">Video Preview</p>
                              </div>
                            </div>
                          )}
                          <input
                            type="text"
                            value={block.caption || ""}
                            onChange={(e) => updateCaption(section.id, block.id, e.target.value)}
                            placeholder="Caption (optional)"
                            className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-muted-foreground"
                          />
                        </div>
                        <button
                          onClick={() => {
                            if (confirm("Delete this video?")) {
                              deleteContentBlock(section.id, block.id);
                            }
                          }}
                          className="absolute top-4 right-4 p-2.5 bg-background border border-border rounded-lg hover:bg-red-50 opacity-0 group-hover/video:opacity-100 transition-opacity shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Content Buttons */}
              <div className="mt-10 flex flex-wrap gap-3 pt-8 border-t border-border/40">
                <button
                  onClick={() => addContentBlock(section.id, "text")}
                  className="flex items-center gap-2 px-5 py-3 text-sm bg-background border border-border/60 rounded-xl hover:bg-muted/50 hover:border-primary/30 transition-all shadow-sm"
                >
                  <Type className="w-4 h-4" />
                  Add Text Block
                </button>
                <button
                  onClick={() => addContentBlock(section.id, "image")}
                  className="flex items-center gap-2 px-5 py-3 text-sm bg-background border border-border/60 rounded-xl hover:bg-muted/50 hover:border-primary/30 transition-all shadow-sm"
                >
                  <ImageIcon className="w-4 h-4" />
                  Add Image
                </button>
                <button
                  onClick={() => addContentBlock(section.id, "video")}
                  className="flex items-center gap-2 px-5 py-3 text-sm bg-background border border-border/60 rounded-xl hover:bg-muted/50 hover:border-primary/30 transition-all shadow-sm"
                >
                  <Video className="w-4 h-4" />
                  Add Video
                </button>
              </div>
            </section>
          ))}
        </div>

        {/* Publish Button */}
        <div className="mt-20 pt-12 border-t border-border/40 flex justify-center">
          <button
            onClick={handlePublish}
            className="flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full hover:shadow-xl hover:scale-105 transition-all text-lg font-medium shadow-lg"
          >
            <Check className="w-6 h-6" />
            Publish Changes
          </button>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-foreground text-background rounded-full shadow-2xl hover:bg-foreground/90 hover:scale-110 transition-all z-40 border border-background/20"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}
