import { useParams, Link, Navigate } from "react-router";
import { getProjectById } from "../data/projects";
import { ArrowUp, Layers, ThumbsUp, Heart, Mail, Save, Type, Image as ImageIcon, Video, Trash2, Upload } from "lucide-react";
import { ArrowsOut, ArrowsIn, CaretLeft, CaretRight, Plus, Minus } from "@phosphor-icons/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { EditableText } from "../components/EditableText";
import { EditableImage } from "../components/EditableImage";
import { ImageUpload } from "../components/ImageUpload";
import { useAdminView } from "../contexts/AdminViewContext";
import { useCMS } from "../contexts/CMSContext";
import type { CMSKey } from "../lib/cms";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import predictArchitecture from "figma:asset/9d537f5cc6573164bde668097537f5d4460a2997.png";
import storyImage from "figma:asset/0418e59b0a42e10c2978165728c33ac9f5e7486e.png";
import storyImage1 from "figma:asset/42ddec3b3b3f0fcea97f963ff30bdc2d9fa927e0.png";
import storyImage2 from "figma:asset/7d6742cc0e7238c6630ddb4a8d10adc4ccef6883.png";
import storyImage3 from "figma:asset/dbbcc6b446f40326ac0658af0e618cf1372ed220.png";
import predictContextImage from "figma:asset/485b0e9763c9f09882949ad898f424a052b9318a.png";
import contentImage1 from "figma:asset/3aec6e0300112e1fb9394e5fbf8ade4a496a771b.png";
import contentImage2 from "figma:asset/41cd0bb93ca68087159f7bf0a5082e4af29039d2.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow Components
const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, x: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300"
      aria-label="Previous slide"
    >
      <motion.div
        whileHover={{ x: -2 }}
        transition={{ duration: 0.2 }}
      >
        <CaretLeft size={20} weight="bold" className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" />
      </motion.div>
    </motion.button>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, x: 3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300"
      aria-label="Next slide"
    >
      <motion.div
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        <CaretRight size={20} weight="bold" className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" />
      </motion.div>
    </motion.button>
  );
};

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const { isAdminView } = useAdminView();
  const { store, setStore, loading: cmsLoading } = useCMS();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("cover");
  const [isManualClick, setIsManualClick] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoved, setIsLoved] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string>("");
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isCarouselFullscreen, setIsCarouselFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);

  // Reload project data whenever id or cmsStore changes
  const [project, setProject] = useState(id ? getProjectById(id, store) : undefined);
  const [editableProject, setEditableProject] = useState(project);

  useEffect(() => {
    const freshProject = id ? getProjectById(id, store) : undefined;
    setProject(freshProject);
    setEditableProject(freshProject);
  }, [id, store]);

  const handleSaveChanges = async () => {
    if (!project || !editableProject) return;
    const projectsData = { ...(store['cmsProjectsData'] ?? {}), [project.id]: editableProject };
    await setStore('cmsProjectsData' as CMSKey, projectsData);
    alert("Changes saved successfully!");
  };

  const handlePublish = async () => {
    if (!project || !editableProject) return;
    const updatedProject = { ...editableProject, published: true, publishedAt: new Date().toISOString() };
    const projectsData = { ...(store['cmsProjectsData'] ?? {}), [project.id]: updatedProject };
    await setStore('cmsProjectsData' as CMSKey, projectsData);
    alert("Project published successfully!");
  };

  const updateProjectField = (field: string, value: any) => {
    setEditableProject((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateCarouselImage = (index: number, newUrl: string) => {
    if (!editableProject?.sectionsData) return;

    const updatedSections = editableProject.sectionsData.map((section: any) => {
      if (section.id === "context") {
        const carouselBlockId = `context-carousel-${index + 1}`;
        return {
          ...section,
          content: section.content.map((block: any) =>
            block.id === carouselBlockId ? { ...block, content: newUrl } : block
          ),
        };
      }
      return section;
    });

    setEditableProject((prev: any) => ({
      ...prev,
      sectionsData: updatedSections,
    }));
  };

  const deleteCarouselImage = (index: number) => {
    if (!editableProject?.sectionsData) return;

    const updatedSections = editableProject.sectionsData.map((section: any) => {
      if (section.id === "context") {
        const carouselBlockId = `context-carousel-${index + 1}`;
        return {
          ...section,
          content: section.content.map((block: any) =>
            block.id === carouselBlockId ? { ...block, content: "" } : block
          ),
        };
      }
      return section;
    });

    setEditableProject((prev: any) => ({
      ...prev,
      sectionsData: updatedSections,
    }));
  };

  const updateLongImage = (newUrl: string) => {
    if (!editableProject?.sectionsData) return;

    const updatedSections = editableProject.sectionsData.map((section: any) => {
      if (section.id === "context") {
        return {
          ...section,
          content: section.content.map((block: any) =>
            block.id === "context-long-image" ? { ...block, content: newUrl } : block
          ),
        };
      }
      return section;
    });

    setEditableProject((prev: any) => ({
      ...prev,
      sectionsData: updatedSections,
    }));
  };

  const deleteLongImage = () => {
    if (!editableProject?.sectionsData) return;

    const updatedSections = editableProject.sectionsData.map((section: any) => {
      if (section.id === "context") {
        return {
          ...section,
          content: section.content.map((block: any) =>
            block.id === "context-long-image" ? { ...block, content: "" } : block
          ),
        };
      }
      return section;
    });

    setEditableProject((prev: any) => ({
      ...prev,
      sectionsData: updatedSections,
    }));
  };

  const addContentBlock = (sectionId: string, type: "text" | "image" | "video") => {
    if (!editableProject?.sectionsData) return;

    const updatedSections = editableProject.sectionsData.map((section: any) => {
      if (section.id === sectionId) {
        return {
          ...section,
          content: [
            ...section.content,
            {
              id: `${sectionId}-${type}-${Date.now()}`,
              type,
              content: "",
              caption: type === "image" || type === "video" ? "" : undefined,
            },
          ],
        };
      }
      return section;
    });

    setEditableProject((prev: any) => ({
      ...prev,
      sectionsData: updatedSections,
    }));
  };

  const deleteContentBlock = (sectionId: string, blockId: string) => {
    if (!editableProject?.sectionsData) return;

    const updatedSections = editableProject.sectionsData.map((section: any) => {
      if (section.id === sectionId) {
        return {
          ...section,
          content: section.content.filter((block: any) => block.id !== blockId),
        };
      }
      return section;
    });

    setEditableProject((prev: any) => ({
      ...prev,
      sectionsData: updatedSections,
    }));
  };

  const updateSectionContent = (sectionId: string, blockId: string, newContent: string) => {
    if (!editableProject?.sectionsData) return;

    const updatedSections = editableProject.sectionsData.map((section: any) => {
      if (section.id === sectionId) {
        return {
          ...section,
          content: section.content.map((block: any) =>
            block.id === blockId ? { ...block, content: newContent } : block
          ),
        };
      }
      return section;
    });

    setEditableProject((prev: any) => ({
      ...prev,
      sectionsData: updatedSections,
    }));
  };

  // Load custom sections data from CMS if available
  const sectionsData = (project as any)?.sectionsData;

  // Helper to get content from sections
  const getSectionContent = (sectionId: string, blockId: string, defaultValue: string = "") => {
    if (!sectionsData) return defaultValue;
    const section = sectionsData.find((s: any) => s.id === sectionId);
    if (!section) return defaultValue;
    const block = section.content.find((c: any) => c.id === blockId);
    // Return empty string if block exists but content is empty (user deleted it)
    // Only return default if block doesn't exist at all
    return block !== undefined ? (block.content !== undefined ? block.content : "") : defaultValue;
  };

  // Dynamic carousel and story images based on project
  const getProjectImages = (projectId: string | undefined) => {
    // First check if there's custom carousel images in sectionsData
    if (sectionsData) {
      const contextSection = sectionsData.find((s: any) => s.id === "context");
      if (contextSection) {
        const carouselImages = contextSection.content
          .filter((c: any) => c.id.startsWith("context-carousel-") && c.content)
          .map((c: any) => c.content);
        const longImageBlock = contextSection.content.find((c: any) => c.id === "context-long-image");
        const longImage = longImageBlock?.content || "";

        // Return custom images if available, otherwise return empty
        return {
          carouselImages: carouselImages,
          longImage: longImage
        };
      }
    }

    // Only use default images for the original 3 projects (Predict, Immune, Kavach)
    // All new projects will have no default images
    const imageMap: Record<string, { carouselImages: string[], longImage: string }> = {
      "ai-assisted-decision-platform": {
        carouselImages: [predictContextImage, storyImage1, storyImage2, storyImage3],
        longImage: storyImage
      },
      "enterprise-design-system": {
        carouselImages: [
          "https://images.unsplash.com/photo-1577976655502-85300c5ca2cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwZGVzaWduJTIwc3lzdGVtJTIwY29tcG9uZW50c3xlbnwxfHx8fDE3NzM5MDI3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1606733803396-1d028f0e6f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVSSUyMGNvbXBvbmVudCUyMGxpYnJhcnl8ZW58MXx8fHwxNzczOTAyNzMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1625468743270-9c3c5b27933b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZGVzaWduJTIwdG9rZW5zfGVufDF8fHx8MTc3MzkwMjczMnww&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1663784294206-9b508132baf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1vbml0b3JpbmclMjB2ZXJ0aWNhbHxlbnwxfHx8fDE3NzM5MDI3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      "healthcare-patient-portal": {
        carouselImages: [
          "https://images.unsplash.com/photo-1762340916350-ad5a3d620c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzczODM0NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1763144536757-d90b9144e6ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGhyZWF0JTIwbW9uaXRvcmluZ3xlbnwxfHx8fDE3NzM5MDI3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1559236790-4e54e81fa3c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZXJvJTIwdHJ1c3QlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczOTAyNzMzfDA&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1660836814985-8523a0d713b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHZlcnRpY2FsfGVufDF8fHx8MTc3MzkwMjc1NXww&ixlib=rb-4.1.0&q=80&w=1080"
      }
    };

    // Return empty arrays for projects not in the imageMap (new projects)
    return imageMap[projectId || ""] || {
      carouselImages: [],
      longImage: ""
    };
  };

  const { carouselImages, longImage } = getProjectImages(project?.id);
  
  const { scrollYProgress } = useScroll();
  const progressBarScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observerOptions = {
      rootMargin: '-120px 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Skip observer updates if user just clicked a nav item
      if (isManualClick) {
        return;
      }

      // Find all intersecting sections
      const intersectingSections = entries.filter(entry => entry.isIntersecting);
      
      if (intersectingSections.length > 0) {
        // Get the section order
        const sectionOrder = ['cover', 'context', 'product-vision', 'user-research', 'design-direction', 'methods-processes', 'design-deliverables', 'analysis-impact', 'future-scope', 'credits'];
        
        // Find the topmost visible section based on scroll position
        let topmostSection = intersectingSections[0];
        let smallestTop = intersectingSections[0].boundingClientRect.top;
        
        intersectingSections.forEach(entry => {
          const entryTop = entry.boundingClientRect.top;
          // Find the section that's closest to the top of the viewport (but still visible)
          if (entryTop < smallestTop && entryTop >= -100) {
            smallestTop = entryTop;
            topmostSection = entry;
          }
        });
        
        const newActiveSection = topmostSection.target.id;
        
        // Only update if it's a valid section and different from current
        if (sectionOrder.includes(newActiveSection) && newActiveSection !== activeSection) {
          setActiveSection(newActiveSection);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ['cover', 'context', 'product-vision', 'user-research', 'design-direction', 'methods-processes', 'design-deliverables', 'analysis-impact', 'future-scope', 'credits'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isManualClick, activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    // Update active state
    setActiveSection(sectionId);
    setIsManualClick(true);

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Get the target element
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      // Use scrollIntoView which respects CSS scroll-margin
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Re-enable observer after scroll completes
    scrollTimeoutRef.current = setTimeout(() => {
      setIsManualClick(false);
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevImage = () => {
    const newIndex = (fullscreenImageIndex - 1 + carouselImages.length) % carouselImages.length;
    setFullscreenImageIndex(newIndex);
    setFullscreenImage(carouselImages[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = (fullscreenImageIndex + 1) % carouselImages.length;
    setFullscreenImageIndex(newIndex);
    setFullscreenImage(carouselImages[newIndex]);
  };

  // Zoom handlers for fullscreen image
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3)); // Max 3x zoom
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5)); // Min 0.5x zoom
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  // Reset zoom when opening fullscreen
  useEffect(() => {
    if (isFullscreen) {
      setZoomLevel(1);
      if (fullscreenContainerRef.current) {
        fullscreenContainerRef.current.scrollTop = 0;
      }
    }
  }, [isFullscreen]);
  
  if (cmsLoading) {
    return null;
  }

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Redirect if project is archived and user is not in admin view
  if (project.archived === true && !isAdminView) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <h1 className="text-4xl font-medium mb-4">Project Archived</h1>
          <p className="text-muted-foreground mb-6">This project has been archived and is no longer publicly available.</p>
          <a href="/work" className="text-primary hover:underline">
            View all projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary/90 to-primary z-50 origin-left shadow-[0_1px_3px_rgba(0,82,255,0.4)]"
        style={{ scaleX: progressBarScaleX }}
      />

      <div className="pt-24 pb-32">
        {/* Hero Section with Parallax */}
        <motion.div 
          id="cover"
          className="relative w-full mb-6 lg:mb-20 overflow-hidden scroll-mt-52 lg:scroll-mt-32"
        >
          <div className="max-w-[1800px] mx-auto overflow-x-hidden">
            {/* Background Image with Overlay */}
            <div className="relative min-h-[85vh] flex items-end">
              <div className="absolute inset-0">
                <EditableImage editable={false}
                  src={editableProject?.coverImage || (project as any)?.coverImage || editableProject?.thumbnail || project.thumbnail}
                  alt={editableProject?.title || project.title}
                  className="w-full h-full object-cover"
                  onReplace={(newUrl) => updateProjectField("coverImage", newUrl)}
                  onDelete={() => updateProjectField("coverImage", "")}
                  uploadPath="projects/covers/"
                />
                {/* Multi-layer gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-32 pt-6 pb-16 md:pb-20 lg:pb-24 max-w-[1600px] mx-auto">
                {/* Icon + Title */}
                <div className="flex items-center gap-5 md:gap-7 lg:gap-8 mb-8">
                  {/* Square Icon - Bigger with white border and centered icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 bg-transparent backdrop-blur-sm border-[3px] md:border-[4px] border-white/90 rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex items-center justify-center"
                  >
                    <Layers className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 text-white" strokeWidth={2} />
                  </motion.div>
                  
                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1"
                  >
                    <EditableText editable={false}
                      value={editableProject?.title || ""}
                      onChange={(value) => updateProjectField("title", value)}
                      className="text-[44px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-medium leading-[1.05] tracking-[-0.04em] text-white drop-shadow-2xl"
                      as="h1"
                    />
                  </motion.div>
                </div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-4xl mb-12"
                >
                  <EditableText editable={false}
                    value={editableProject?.description || ""}
                    onChange={(value) => updateProjectField("description", value)}
                    className="text-[19px] md:text-[22px] lg:text-[26px] text-white/90 leading-[1.39] tracking-[-0.018em] drop-shadow-lg font-light"
                    multiline
                    rows={3}
                  />
                </motion.div>

                {/* Tags */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="flex flex-wrap gap-2.5 mb-10"
                >
                  {project.tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.4 + index * 0.1,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                      className="text-[13px] px-3 py-1.5 bg-muted text-muted-foreground rounded-md font-medium tracking-[-0.01em] opacity-70"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Metadata - Enhanced Design */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap gap-10 md:gap-16 pt-10 border-t border-white/15"
                >
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold">Category</p>
                    <EditableText editable={false}
                      value={editableProject?.category || ""}
                      onChange={(value) => updateProjectField("category", value)}
                      className="text-[22px] md:text-[24px] font-semibold tracking-[-0.02em] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold">Year</p>
                    <EditableText editable={false}
                      value={editableProject?.year || ""}
                      onChange={(value) => updateProjectField("year", value)}
                      className="text-[22px] md:text-[24px] font-semibold tracking-[-0.02em] text-white"
                    />
                  </div>
                  <div className="space-y-2 max-w-md">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold">Role</p>
                    <EditableText editable={false}
                      value={editableProject?.role || ""}
                      onChange={(value) => updateProjectField("role", value)}
                      className="text-[22px] md:text-[24px] font-semibold tracking-[-0.02em] text-white leading-tight"
                      multiline
                      rows={2}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Sections - Refined Layout */}
        <div className="max-w-[1400px] mx-auto">
          {/* Mobile Sticky Index - Fixed below hero */}
          <div className="lg:hidden sticky top-20 z-[60] bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm pointer-events-auto">
            <div className="px-6 py-3">
              <div className="grid grid-cols-5 gap-x-6 gap-y-3.5 mb-2.5">
                <a
                  href="#cover"
                  onClick={(e) => handleNavClick(e, "cover")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "cover"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  00
                </a>
                <a
                  href="#context"
                  onClick={(e) => handleNavClick(e, "context")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "context"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  01
                </a>
                <a
                  href="#product-vision"
                  onClick={(e) => handleNavClick(e, "product-vision")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "product-vision"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  02
                </a>
                <a
                  href="#user-research"
                  onClick={(e) => handleNavClick(e, "user-research")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "user-research"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  03
                </a>
                <a
                  href="#design-direction"
                  onClick={(e) => handleNavClick(e, "design-direction")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "design-direction"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  04
                </a>
                <a
                  href="#methods-processes"
                  onClick={(e) => handleNavClick(e, "methods-processes")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "methods-processes"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  05
                </a>
                <a
                  href="#design-deliverables"
                  onClick={(e) => handleNavClick(e, "design-deliverables")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "design-deliverables"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  06
                </a>
                <a
                  href="#analysis-impact"
                  onClick={(e) => handleNavClick(e, "analysis-impact")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "analysis-impact"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  07
                </a>
                <a
                  href="#future-scope"
                  onClick={(e) => handleNavClick(e, "future-scope")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "future-scope"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  08
                </a>
                <a
                  href="#credits"
                  onClick={(e) => handleNavClick(e, "credits")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "credits"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  09
                </a>
              </div>
              {/* Active Section Title */}
              <div className="mt-2.5 min-h-[24px]">
                <motion.p 
                  key={activeSection}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[13px] font-medium text-foreground/90 tracking-[-0.01em]"
                >
                  {activeSection === "cover" && "Cover"}
                  {activeSection === "context" && "Context"}
                  {activeSection === "product-vision" && "Product Vision"}
                  {activeSection === "user-research" && "User Research"}
                  {activeSection === "design-direction" && "Design Direction"}
                  {activeSection === "methods-processes" && "Methods & Processes"}
                  {activeSection === "design-deliverables" && "Design Deliverables"}
                  {activeSection === "analysis-impact" && "Analysis & Impact"}
                  {activeSection === "future-scope" && "Future Scope"}
                  {activeSection === "credits" && "Credits"}
                </motion.p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 lg:gap-2 md:px-12 lg:px-20">
            {/* Index Column - Sticky on left (Desktop only) */}
            <aside className="hidden lg:block col-span-2 lg:col-start-1">
              <div className="sticky top-32">
                <h4 className="text-[15px] uppercase tracking-[0.12em] font-bold text-muted-foreground/50 mb-10">
                  Contents
                </h4>
                <nav className="space-y-1 border-l-[1.5px] border-border/20">
                  <a
                    href="#cover"
                    onClick={(e) => handleNavClick(e, "cover")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "cover"
                        ? "border-primary text-foreground font-medium"
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "cover"
                        ? "text-primary scale-110 translate-x-0.5"
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>00</span>
                    <span className="leading-[1.35] transition-all duration-250">{editableProject?.sectionTitles?.cover || "Cover"}</span>
                  </a>
                  <a
                    href="#context"
                    onClick={(e) => handleNavClick(e, "context")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "context"
                        ? "border-primary text-foreground font-medium"
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "context"
                        ? "text-primary scale-110 translate-x-0.5"
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>01</span>
                    <span className="leading-[1.35] transition-all duration-250">{editableProject?.sectionTitles?.context || "Context"}</span>
                  </a>
                  <a
                    href="#product-vision"
                    onClick={(e) => handleNavClick(e, "product-vision")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "product-vision"
                        ? "border-primary text-foreground font-medium"
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "product-vision"
                        ? "text-primary scale-110 translate-x-0.5"
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>02</span>
                    <span className="leading-[1.35] transition-all duration-250">{editableProject?.sectionTitles?.["product-vision"] || "Product Vision"}</span>
                  </a>
                  <a
                    href="#user-research"
                    onClick={(e) => handleNavClick(e, "user-research")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "user-research"
                        ? "border-primary text-foreground font-medium"
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "user-research"
                        ? "text-primary scale-110 translate-x-0.5"
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>03</span>
                    <span className="leading-[1.35] transition-all duration-250">{editableProject?.sectionTitles?.["user-research"] || "User Research"}</span>
                  </a>
                  <a
                    href="#design-direction"
                    onClick={(e) => handleNavClick(e, "design-direction")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "design-direction"
                        ? "border-primary text-foreground font-medium"
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "design-direction"
                        ? "text-primary scale-110 translate-x-0.5"
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>04</span>
                    <span className="leading-[1.35] transition-all duration-250">{editableProject?.sectionTitles?.["design-direction"] || "Design Direction"}</span>
                  </a>
                  <a
                    href="#methods-processes"
                    onClick={(e) => handleNavClick(e, "methods-processes")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "methods-processes"
                        ? "border-primary text-foreground font-medium"
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "methods-processes"
                        ? "text-primary scale-110 translate-x-0.5"
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>05</span>
                    <span className="leading-[1.35] transition-all duration-250">{editableProject?.sectionTitles?.["methods-processes"] || "Methods & Processes"}</span>
                  </a>
                  <a
                    href="#design-deliverables"
                    onClick={(e) => handleNavClick(e, "design-deliverables")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "design-deliverables"
                        ? "border-primary text-foreground font-medium"
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "design-deliverables"
                        ? "text-primary scale-110 translate-x-0.5"
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>06</span>
                    <span className="leading-[1.35] transition-all duration-250">{editableProject?.sectionTitles?.["design-deliverables"] || "Design Deliverables"}</span>
                  </a>
                  <a
                    href="#analysis-impact"
                    onClick={(e) => handleNavClick(e, "analysis-impact")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "analysis-impact"
                        ? "border-primary text-foreground font-medium"
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "analysis-impact"
                        ? "text-primary scale-110 translate-x-0.5"
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>07</span>
                    <span className="leading-[1.35] transition-all duration-250">{editableProject?.sectionTitles?.["analysis-impact"] || "Analysis & Impact"}</span>
                  </a>
                  <a
                    href="#future-scope"
                    onClick={(e) => handleNavClick(e, "future-scope")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "future-scope"
                        ? "border-primary text-foreground font-medium"
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "future-scope"
                        ? "text-primary scale-110 translate-x-0.5"
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>08</span>
                    <span className="leading-[1.35] transition-all duration-250">{editableProject?.sectionTitles?.["future-scope"] || "Future Scope"}</span>
                  </a>
                  <a
                    href="#credits"
                    onClick={(e) => handleNavClick(e, "credits")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "credits"
                        ? "border-primary text-foreground font-medium"
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "credits"
                        ? "text-primary scale-110 translate-x-0.5"
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>09</span>
                    <span className="leading-[1.35] transition-all duration-250">{editableProject?.sectionTitles?.credits || "Credits"}</span>
                  </a>
                </nav>
              </div>
            </aside>

            {/* Main Content Column */}
            <div className="col-span-12 lg:col-span-9 lg:col-start-4 px-6 md:px-0">
              
              {/* Context Section */}
              <motion.section
                id="context"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                      01
                    </h2>
                    <EditableText editable={false}
                      value={editableProject?.sectionTitles?.context || "Context"}
                      onChange={(value) => {
                        setEditableProject((prev: any) => ({
                          ...prev,
                          sectionTitles: {
                            ...prev?.sectionTitles,
                            context: value
                          }
                        }));
                      }}
                      className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]"
                      as="h3"
                    />
                  </div>
                  {isAdminView && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => addContentBlock("context", "text")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Text Block"
                      >
                        <Type className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("context", "image")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Image Block"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("context", "video")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Video Block"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="max-w-[75ch] mb-12">
                  <EditableText editable={false}
                    value={editableProject?.context || ""}
                    onChange={(value) => updateProjectField("context", value)}
                    className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased"
                    multiline
                    rows={6}
                  />
                </div>

                {/* Carousel for Story Images - Only show if there are carousel images */}
                {carouselImages.length > 0 && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-16 -mx-6 md:mx-0"
                    >
                      <div className="relative group carousel-container">
                        <style>{`
                          .carousel-container .slick-slider {
                            position: relative;
                          }
                          .carousel-container .slick-list {
                            overflow: hidden;
                            border-radius: 0;
                            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px -10px rgba(0, 0, 0, 0.15);
                            border: none;
                            background: transparent;
                          }
                          @media (min-width: 768px) {
                            .carousel-container .slick-list {
                              border-radius: 16px;
                              border: 1px solid rgba(0, 0, 0, 0.06);
                            }
                          }
                          .carousel-container .slick-track {
                            display: flex;
                            align-items: stretch;
                          }
                          .carousel-container .slick-slide {
                            height: auto;
                            display: flex;
                          }
                          .carousel-container .slick-slide > div {
                            height: 100%;
                            width: 100%;
                            display: flex;
                          }
                          .carousel-container .slick-slide > div > div {
                            height: 100%;
                            width: 100%;
                            display: flex;
                          }
                          .carousel-container .slick-slide img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                          }
                          .carousel-container .slick-dots {
                            bottom: 20px;
                            z-index: 20;
                            display: flex !important;
                            justify-content: center;
                            align-items: center;
                            gap: 6px;
                            padding: 0;
                            margin: 0;
                            width: fit-content;
                            left: 50%;
                            transform: translateX(-50%);
                          }
                          .carousel-container .slick-dots li {
                            width: 8px;
                            height: 8px;
                            margin: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          }
                          .carousel-container .slick-dots li button {
                            width: 8px;
                            height: 8px;
                            padding: 0;
                            font-size: 0;
                            line-height: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            color: transparent;
                            border: 0;
                            outline: none;
                            background: transparent;
                            position: relative;
                          }
                          .carousel-container .slick-dots li button:before {
                            font-family: 'slick';
                            font-size: 0;
                            line-height: 0;
                            position: relative;
                            top: auto;
                            left: auto;
                            content: '•';
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: rgba(255, 255, 255, 0.4);
                            opacity: 1;
                            transition: all 0.25s cubic-bezier(0.33, 1, 0.68, 1);
                            display: block;
                          }
                          .carousel-container .slick-dots li.slick-active button:before {
                            background: rgba(255, 255, 255, 1);
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
                          }
                          .carousel-container .slick-dots li:hover button:before {
                            background: rgba(255, 255, 255, 0.65);
                          }
                        `}</style>
                        
                        {/* Fixed Maximize Button */}
                        <motion.button
                          onClick={() => {
                            setFullscreenImage(carouselImages[currentSlide]);
                            setFullscreenImageIndex(currentSlide);
                            setIsCarouselFullscreen(true);
                            setIsFullscreen(true);
                          }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                          aria-label="View fullscreen"
                        >
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowsOut 
                              size={18} 
                              weight="bold"
                              className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                            />
                          </motion.div>
                        </motion.button>
                        
                        <Slider
                          dots={true}
                          infinite={true}
                          speed={600}
                          slidesToShow={1}
                          slidesToScroll={1}
                          autoplay={false}
                          arrows={true}
                          prevArrow={<CustomPrevArrow />}
                          nextArrow={<CustomNextArrow />}
                          cssEase="cubic-bezier(0.4, 0, 0.2, 1)"
                          lazyLoad="progressive"
                          beforeChange={(oldIndex: number, newIndex: number) => setCurrentSlide(newIndex)}
                        >
                          {carouselImages.map((image, index) => (
                            <div key={index}>
                              <div className="relative w-full h-full">
                                <EditableImage editable={false}
                                  src={image}
                                  alt={`Story image ${index + 1}`}
                                  className="w-full h-full block select-none"
                                  onReplace={(newUrl) => updateCarouselImage(index, newUrl)}
                                  onDelete={() => deleteCarouselImage(index)}
                                  uploadPath="projects/context/carousel/"
                                />
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </motion.div>
                  </>
                )}

                    {(getSectionContent("context", "context-para-1") || getSectionContent("context", "context-para-2") || getSectionContent("context", "context-para-3")) && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-16 space-y-8"
                      >
                        {getSectionContent("context", "context-para-1") && (
                          <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                            {getSectionContent("context", "context-para-1", "")}
                          </p>
                        )}

                        {getSectionContent("context", "context-para-2") && (
                          <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                            {getSectionContent("context", "context-para-2", "")}
                          </p>
                        )}

                        {getSectionContent("context", "context-para-3") && (
                          <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                            {getSectionContent("context", "context-para-3", "")}
                          </p>
                        )}
                      </motion.div>
                    )}

                    {/* Second Story Image - Only show if longImage exists */}
                    {longImage && (
                      <motion.figure
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-16 group -mx-6 md:mx-0"
                      >
                        <div className="relative overflow-hidden">
                          {/* Maximize Button - Same as Carousel */}
                          <motion.button
                            onClick={() => {
                              setFullscreenImage(longImage);
                              setIsCarouselFullscreen(false);
                              setIsFullscreen(true);
                            }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                            aria-label="View fullscreen"
                          >
                            <motion.div
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ArrowsOut
                                size={18}
                                weight="bold"
                                className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                              />
                            </motion.div>
                          </motion.button>

                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="md:rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_40px_-10px_rgba(0,0,0,0.15)] md:border md:border-black/[0.06]"
                          >
                            <EditableImage editable={false}
                              src={longImage}
                              alt="Context section image"
                              className="w-full h-auto block select-none"
                              onReplace={updateLongImage}
                              onDelete={deleteLongImage}
                              uploadPath="projects/context/"
                            />
                          </motion.div>
                        </div>
                      </motion.figure>
                    )}

                {/* Dynamic Content Blocks */}
                {editableProject?.sectionsData && (
                  <div className="mt-16 space-y-6">
                    {editableProject.sectionsData
                      .find((s: any) => s.id === "context")
                      ?.content.filter(
                        (block: any) =>
                          !["context-para-1", "context-para-2", "context-para-3", "context-carousel-1", "context-carousel-2", "context-carousel-3", "context-carousel-4", "context-long-image"].includes(block.id) && block.content
                      )
                      .map((block: any) => (
                        <div key={block.id}>
                          {/* Admin View - Editable */}
                          {isAdminView && (
                            <div className="group relative bg-muted/20 border border-border/50 rounded-xl p-6">
                              {block.type === "text" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Text Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("context", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <textarea
                                    value={block.content}
                                    onChange={(e) =>
                                      updateSectionContent("context", block.id, e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                    placeholder="Enter text content..."
                                  />
                                </div>
                              )}

                              {block.type === "image" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Image Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("context", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <ImageUpload
                                    value={block.content}
                                    onChange={(url) => updateSectionContent("context", block.id, url)}
                                    path={`projects/context/`}
                                    label="Drop image here"
                                  />
                                </div>
                              )}

                              {block.type === "video" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Video Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("context", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <input
                                    type="url"
                                    value={block.content}
                                    onChange={(e) => updateSectionContent("context", block.id, e.target.value)}
                                    placeholder="YouTube or Vimeo URL"
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Public View - Read-only */}
                          {!isAdminView && (
                            <div>
                              {block.type === "text" && (
                                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased whitespace-pre-wrap">
                                  {block.content}
                                </p>
                              )}

                              {block.type === "image" && (
                                <motion.figure
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="group"
                                >
                                  <div className="relative overflow-hidden rounded-xl">
                                    <img src={block.content} alt="" className="w-full h-auto" />
                                  </div>
                                </motion.figure>
                              )}

                              {block.type === "video" && block.content && (
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="relative rounded-xl overflow-hidden"
                                  style={{ paddingBottom: "56.25%" }}
                                >
                                  <iframe
                                    src={block.content.includes("youtube") ? block.content.replace("watch?v=", "embed/") : block.content}
                                    className="absolute top-0 left-0 w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </motion.section>

              {/* Research Section */}
              <motion.section 
                id="product-vision"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                      02
                    </h2>
                    <EditableText editable={false}
                      value={editableProject?.sectionTitles?.['product-vision'] || "Product Vision"}
                      onChange={(value) => {
                        setEditableProject((prev: any) => ({
                          ...prev,
                          sectionTitles: {
                            ...prev?.sectionTitles,
                            'product-vision': value
                          }
                        }));
                      }}
                      className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]"
                      as="h3"
                    />
                  </div>
                  {isAdminView && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => addContentBlock("product-vision", "text")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Text Block"
                      >
                        <Type className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("product-vision", "image")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Image Block"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("product-vision", "video")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Video Block"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
{(editableProject?.research || isAdminView) && (
                  <div className="max-w-[75ch] mb-12">
                    <EditableText editable={false}
                      value={editableProject?.research || ""}
                      onChange={(value) => updateProjectField("research", value)}
                      className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased"
                      multiline
                      rows={6}
                    />
                  </div>
                )}

                {getSectionContent("product-vision", "vision-para-1") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                    {getSectionContent("product-vision", "vision-para-1", "")}
                  </p>
                )}

                {getSectionContent("product-vision", "vision-image-1") && (
                  <motion.figure
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12 group"
                  >
                    <div className="relative overflow-hidden">
                      <motion.button
                        onClick={() => {
                          setFullscreenImage(getSectionContent("product-vision", "vision-image-1", contentImage1));
                          setIsCarouselFullscreen(false);
                          setIsFullscreen(true);
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                        aria-label="View fullscreen"
                      >
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowsOut
                            size={18}
                            weight="bold"
                            className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                          />
                        </motion.div>
                      </motion.button>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-xl overflow-hidden shadow-lg"
                      >
                        <img src={getSectionContent("product-vision", "vision-image-1", contentImage1)} alt="Product Vision" className="w-full h-auto" />
                      </motion.div>
                    </div>
                  </motion.figure>
                )}

{getSectionContent("product-vision", "vision-para-2") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                    {getSectionContent("product-vision", "vision-para-2", "")}
                  </p>
                )}

                {getSectionContent("product-vision", "vision-image-2") && (
                  <motion.figure
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12 group"
                  >
                    <div className="relative overflow-hidden">
                      <motion.button
                        onClick={() => {
                          setFullscreenImage(getSectionContent("product-vision", "vision-image-2", contentImage2));
                          setIsCarouselFullscreen(false);
                          setIsFullscreen(true);
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                        aria-label="View fullscreen"
                      >
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowsOut
                            size={18}
                            weight="bold"
                            className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                          />
                        </motion.div>
                      </motion.button>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-xl overflow-hidden shadow-lg"
                      >
                        <img src={getSectionContent("product-vision", "vision-image-2", contentImage2)} alt="Product Strategy" className="w-full h-auto" />
                      </motion.div>
                    </div>
                  </motion.figure>
                )}

{getSectionContent("product-vision", "vision-para-3") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                    {getSectionContent("product-vision", "vision-para-3", "")}
                  </p>
                )}

                {/* Dynamic Content Blocks */}
                {editableProject?.sectionsData && (
                  <div className="mt-16 space-y-6">
                    {editableProject.sectionsData
                      .find((s: any) => s.id === "product-vision")
                      ?.content.filter(
                        (block: any) =>
                          !["vision-para-1", "vision-image-1", "vision-para-2", "vision-image-2", "vision-para-3"].includes(block.id) && block.content
                      )
                      .map((block: any) => (
                        <div key={block.id}>
                          {/* Admin View - Editable */}
                          {isAdminView && (
                            <div className="group relative bg-muted/20 border border-border/50 rounded-xl p-6">
                              {block.type === "text" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Text Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("product-vision", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <textarea
                                    value={block.content}
                                    onChange={(e) =>
                                      updateSectionContent("product-vision", block.id, e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                    placeholder="Enter text content..."
                                  />
                                </div>
                              )}

                              {block.type === "image" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Image Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("product-vision", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <ImageUpload
                                    value={block.content}
                                    onChange={(url) => updateSectionContent("product-vision", block.id, url)}
                                    path={`projects/product-vision/`}
                                    label="Drop image here"
                                  />
                                </div>
                              )}

                              {block.type === "video" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Video Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("product-vision", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <input
                                    type="url"
                                    value={block.content}
                                    onChange={(e) => updateSectionContent("product-vision", block.id, e.target.value)}
                                    placeholder="YouTube or Vimeo URL"
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Public View - Read-only */}
                          {!isAdminView && (
                            <div>
                              {block.type === "text" && (
                                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased whitespace-pre-wrap">
                                  {block.content}
                                </p>
                              )}

                              {block.type === "image" && (
                                <motion.figure
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="group"
                                >
                                  <div className="relative overflow-hidden rounded-xl">
                                    <img src={block.content} alt="" className="w-full h-auto" />
                                  </div>
                                </motion.figure>
                              )}

                              {block.type === "video" && block.content && (
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="relative rounded-xl overflow-hidden"
                                  style={{ paddingBottom: "56.25%" }}
                                >
                                  <iframe
                                    src={block.content.includes("youtube") ? block.content.replace("watch?v=", "embed/") : block.content}
                                    className="absolute top-0 left-0 w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </motion.section>

              {/* User Research Section */}
              <motion.section 
                id="user-research"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                      03
                    </h2>
                    <EditableText editable={false}
                      value={editableProject?.sectionTitles?.['user-research'] || "User Research"}
                      onChange={(value) => {
                        setEditableProject((prev: any) => ({
                          ...prev,
                          sectionTitles: {
                            ...prev?.sectionTitles,
                            'user-research': value
                          }
                        }));
                      }}
                      className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]"
                      as="h3"
                    />
                  </div>
                  {isAdminView && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => addContentBlock("user-research", "text")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Text Block"
                      >
                        <Type className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("user-research", "image")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Image Block"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("user-research", "video")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Video Block"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
{(editableProject?.research || isAdminView) && (
                  <div className="max-w-[75ch] mb-12">
                    <EditableText editable={false}
                      value={editableProject?.research || ""}
                      onChange={(value) => updateProjectField("research", value)}
                      className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased"
                      multiline
                      rows={6}
                    />
                  </div>
                )}

                {getSectionContent("user-research", "research-para-1") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                    {getSectionContent("user-research", "research-para-1", "")}
                  </p>
                )}

                {/* Dynamic Content Blocks */}
                {editableProject?.sectionsData && (
                  <div className="mt-16 space-y-6">
                    {editableProject.sectionsData
                      .find((s: any) => s.id === "user-research")
                      ?.content.filter(
                        (block: any) =>
                          !["research-para-1"].includes(block.id) && block.content
                      )
                      .map((block: any) => (
                        <div key={block.id}>
                          {/* Admin View - Editable */}
                          {isAdminView && (
                            <div className="group relative bg-muted/20 border border-border/50 rounded-xl p-6">
                              {block.type === "text" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Text Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("user-research", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <textarea
                                    value={block.content}
                                    onChange={(e) =>
                                      updateSectionContent("user-research", block.id, e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                    placeholder="Enter text content..."
                                  />
                                </div>
                              )}

                              {block.type === "image" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Image Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("user-research", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <ImageUpload
                                    value={block.content}
                                    onChange={(url) => updateSectionContent("user-research", block.id, url)}
                                    path={`projects/user-research/`}
                                    label="Drop image here"
                                  />
                                </div>
                              )}

                              {block.type === "video" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Video Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("user-research", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <input
                                    type="url"
                                    value={block.content}
                                    onChange={(e) => updateSectionContent("user-research", block.id, e.target.value)}
                                    placeholder="YouTube or Vimeo URL"
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Public View - Read-only */}
                          {!isAdminView && (
                            <div>
                              {block.type === "text" && (
                                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased whitespace-pre-wrap">
                                  {block.content}
                                </p>
                              )}

                              {block.type === "image" && (
                                <motion.figure
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="group"
                                >
                                  <div className="relative overflow-hidden rounded-xl">
                                    <img src={block.content} alt="" className="w-full h-auto" />
                                  </div>
                                </motion.figure>
                              )}

                              {block.type === "video" && block.content && (
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="relative rounded-xl overflow-hidden"
                                  style={{ paddingBottom: "56.25%" }}
                                >
                                  <iframe
                                    src={block.content.includes("youtube") ? block.content.replace("watch?v=", "embed/") : block.content}
                                    className="absolute top-0 left-0 w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </motion.section>

              {/* Design Direction Section */}
              <motion.section 
                id="design-direction"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                      04
                    </h2>
                    <EditableText editable={false}
                      value={editableProject?.sectionTitles?.['design-direction'] || "Design Direction"}
                      onChange={(value) => {
                        setEditableProject((prev: any) => ({
                          ...prev,
                          sectionTitles: {
                            ...prev?.sectionTitles,
                            'design-direction': value
                          }
                        }));
                      }}
                      className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]"
                      as="h3"
                    />
                  </div>
                  {isAdminView && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => addContentBlock("design-direction", "text")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Text Block"
                      >
                        <Type className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("design-direction", "image")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Image Block"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("design-direction", "video")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Video Block"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
{(editableProject?.designSystem || isAdminView) && (
                  <div className="max-w-[75ch] mb-12">
                    <EditableText editable={false}
                      value={editableProject?.designSystem || ""}
                      onChange={(value) => updateProjectField("designSystem", value)}
                      className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased"
                      multiline
                      rows={6}
                    />
                  </div>
                )}

                {getSectionContent("design-direction", "direction-para-1") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                    {getSectionContent("design-direction", "direction-para-1", "")}
                  </p>
                )}

                {getSectionContent("design-direction", "direction-image-1") && (
                  <motion.figure
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12 group"
                  >
                    <div className="relative overflow-hidden">
                      <motion.button
                        onClick={() => {
                          setFullscreenImage(getSectionContent("design-direction", "direction-image-1", contentImage1));
                          setIsCarouselFullscreen(false);
                          setIsFullscreen(true);
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                        aria-label="View fullscreen"
                      >
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowsOut
                            size={18}
                            weight="bold"
                            className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                          />
                        </motion.div>
                      </motion.button>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-xl overflow-hidden shadow-lg"
                      >
                        <img src={getSectionContent("design-direction", "direction-image-1", contentImage1)} alt="Design Direction" className="w-full h-auto" />
                      </motion.div>
                    </div>
                  </motion.figure>
                )}

{getSectionContent("design-direction", "direction-para-2") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                    {getSectionContent("design-direction", "direction-para-2", "")}
                  </p>
                )}

                {getSectionContent("design-direction", "direction-image-2") && (
                  <motion.figure
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12 group"
                  >
                    <div className="relative overflow-hidden">
                      <motion.button
                        onClick={() => {
                          setFullscreenImage(getSectionContent("design-direction", "direction-image-2", contentImage2));
                          setIsCarouselFullscreen(false);
                          setIsFullscreen(true);
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                        aria-label="View fullscreen"
                      >
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowsOut
                            size={18}
                            weight="bold"
                            className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                          />
                        </motion.div>
                      </motion.button>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-xl overflow-hidden shadow-lg"
                      >
                        <img src={getSectionContent("design-direction", "direction-image-2", contentImage2)} alt="Design System" className="w-full h-auto" />
                      </motion.div>
                    </div>
                  </motion.figure>
                )}

{getSectionContent("design-direction", "direction-para-3") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                    {getSectionContent("design-direction", "direction-para-3", "")}
                  </p>
                )}

                {/* Dynamic Content Blocks */}
                {editableProject?.sectionsData && (
                  <div className="mt-16 space-y-6">
                    {editableProject.sectionsData
                      .find((s: any) => s.id === "design-direction")
                      ?.content.filter(
                        (block: any) =>
                          !["direction-para-1", "direction-image-1", "direction-para-2", "direction-image-2", "direction-para-3"].includes(block.id) && block.content
                      )
                      .map((block: any) => (
                        <div key={block.id}>
                          {/* Admin View - Editable */}
                          {isAdminView && (
                            <div className="group relative bg-muted/20 border border-border/50 rounded-xl p-6">
                              {block.type === "text" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Text Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("design-direction", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <textarea
                                    value={block.content}
                                    onChange={(e) =>
                                      updateSectionContent("design-direction", block.id, e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                    placeholder="Enter text content..."
                                  />
                                </div>
                              )}

                              {block.type === "image" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Image Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("design-direction", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <ImageUpload
                                    value={block.content}
                                    onChange={(url) => updateSectionContent("design-direction", block.id, url)}
                                    path={`projects/design-direction/`}
                                    label="Drop image here"
                                  />
                                </div>
                              )}

                              {block.type === "video" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Video Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("design-direction", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <input
                                    type="url"
                                    value={block.content}
                                    onChange={(e) => updateSectionContent("design-direction", block.id, e.target.value)}
                                    placeholder="YouTube or Vimeo URL"
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Public View - Read-only */}
                          {!isAdminView && (
                            <div>
                              {block.type === "text" && (
                                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased whitespace-pre-wrap">
                                  {block.content}
                                </p>
                              )}

                              {block.type === "image" && (
                                <motion.figure
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="group"
                                >
                                  <div className="relative overflow-hidden rounded-xl">
                                    <img src={block.content} alt="" className="w-full h-auto" />
                                  </div>
                                </motion.figure>
                              )}

                              {block.type === "video" && block.content && (
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="relative rounded-xl overflow-hidden"
                                  style={{ paddingBottom: "56.25%" }}
                                >
                                  <iframe
                                    src={block.content.includes("youtube") ? block.content.replace("watch?v=", "embed/") : block.content}
                                    className="absolute top-0 left-0 w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </motion.section>

              {/* Images Section */}
              {project.images.length > 0 && (
                <section className="mb-32 mt-20">
                  <div className="space-y-24">
                    {project.images.map((image, index) => (
                      <motion.figure 
                        key={index}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-150px" }}
                        transition={{ 
                          duration: 0.9, 
                          delay: index * 0.15,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="group -mx-6 md:mx-0"
                      >
                        <div className="relative overflow-hidden bg-muted/30">
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="md:rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_40px_-10px_rgba(0,0,0,0.15)]"
                          >
                            <ImageWithFallback
                              src={image.url}
                              alt={image.caption}
                              className="w-full h-auto"
                            />
                          </motion.div>
                        </div>
                        <figcaption className="mt-6 px-6 md:px-0 text-[15px] text-muted-foreground leading-[1.47] max-w-4xl font-light">
                          {image.caption}
                        </figcaption>
                      </motion.figure>
                    ))}
                  </div>
                </section>
              )}

              {/* Methods & Processes Section */}
              <motion.section
                id="methods-processes"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                      05
                    </h2>
                    <EditableText editable={false}
                      value={editableProject?.sectionTitles?.['methods-processes'] || "Methods & Processes"}
                      onChange={(value) => {
                        setEditableProject((prev: any) => ({
                          ...prev,
                          sectionTitles: {
                            ...prev?.sectionTitles,
                            'methods-processes': value
                          }
                        }));
                      }}
                      className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]"
                      as="h3"
                    />
                  </div>
                  {isAdminView && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => addContentBlock("methods-processes", "text")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Text Block"
                      >
                        <Type className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("methods-processes", "image")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Image Block"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("methods-processes", "video")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Video Block"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
{(editableProject?.prototyping || isAdminView) && (
                  <div className="max-w-[75ch] mb-12">
                    <EditableText editable={false}
                      value={editableProject?.prototyping || ""}
                      onChange={(value) => updateProjectField("prototyping", value)}
                      className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased"
                      multiline
                      rows={6}
                    />
                  </div>
                )}

                {getSectionContent("methods-processes", "methods-para-1") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                    {getSectionContent("methods-processes", "methods-para-1", "")}
                  </p>
                )}

                {getSectionContent("methods-processes", "methods-para-2") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                    {getSectionContent("methods-processes", "methods-para-2", "")}
                  </p>
                )}

                {getSectionContent("methods-processes", "methods-para-3") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                    {getSectionContent("methods-processes", "methods-para-3", "")}
                  </p>
                )}

                {/* Dynamic Content Blocks */}
                {editableProject?.sectionsData && (
                  <div className="mt-16 space-y-6">
                    {editableProject.sectionsData
                      .find((s: any) => s.id === "methods-processes")
                      ?.content.filter(
                        (block: any) =>
                          !["methods-para-1", "methods-para-2", "methods-para-3"].includes(block.id) && block.content
                      )
                      .map((block: any) => (
                        <div key={block.id}>
                          {/* Admin View - Editable */}
                          {isAdminView && (
                            <div className="group relative bg-muted/20 border border-border/50 rounded-xl p-6">
                              {block.type === "text" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Text Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("methods-processes", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <textarea
                                    value={block.content}
                                    onChange={(e) =>
                                      updateSectionContent("methods-processes", block.id, e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                    placeholder="Enter text content..."
                                  />
                                </div>
                              )}

                              {block.type === "image" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Image Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("methods-processes", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <ImageUpload
                                    value={block.content}
                                    onChange={(url) => updateSectionContent("methods-processes", block.id, url)}
                                    path={`projects/methods-processes/`}
                                    label="Drop image here"
                                  />
                                </div>
                              )}

                              {block.type === "video" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Video Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("methods-processes", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <input
                                    type="url"
                                    value={block.content}
                                    onChange={(e) => updateSectionContent("methods-processes", block.id, e.target.value)}
                                    placeholder="YouTube or Vimeo URL"
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Public View - Read-only */}
                          {!isAdminView && (
                            <div>
                              {block.type === "text" && (
                                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased whitespace-pre-wrap">
                                  {block.content}
                                </p>
                              )}

                              {block.type === "image" && (
                                <motion.figure
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="group"
                                >
                                  <div className="relative overflow-hidden rounded-xl">
                                    <img src={block.content} alt="" className="w-full h-auto" />
                                  </div>
                                </motion.figure>
                              )}

                              {block.type === "video" && block.content && (
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="relative rounded-xl overflow-hidden"
                                  style={{ paddingBottom: "56.25%" }}
                                >
                                  <iframe
                                    src={block.content.includes("youtube") ? block.content.replace("watch?v=", "embed/") : block.content}
                                    className="absolute top-0 left-0 w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </motion.section>

              {/* Design Deliverables Section */}
              <motion.section
                id="design-deliverables"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                      06
                    </h2>
                    <EditableText editable={false}
                      value={editableProject?.sectionTitles?.['design-deliverables'] || "Design Deliverables"}
                      onChange={(value) => {
                        setEditableProject((prev: any) => ({
                          ...prev,
                          sectionTitles: {
                            ...prev?.sectionTitles,
                            'design-deliverables': value
                          }
                        }));
                      }}
                      className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]"
                      as="h3"
                    />
                  </div>
                  {isAdminView && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => addContentBlock("design-deliverables", "text")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Text Block"
                      >
                        <Type className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("design-deliverables", "image")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Image Block"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("design-deliverables", "video")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Video Block"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
{getSectionContent("design-deliverables", "deliverables-text-main") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                    {getSectionContent("design-deliverables", "deliverables-text-main", "")}
                  </p>
                )}

                {getSectionContent("design-deliverables", "deliverables-para-1") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                    {getSectionContent("design-deliverables", "deliverables-para-1", "")}
                  </p>
                )}

                {getSectionContent("design-deliverables", "deliverables-para-2") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                    {getSectionContent("design-deliverables", "deliverables-para-2", "")}
                  </p>
                )}

                {/* Dynamic Content Blocks */}
                {editableProject?.sectionsData && (
                  <div className="mt-16 space-y-6">
                    {editableProject.sectionsData
                      .find((s: any) => s.id === "design-deliverables")
                      ?.content.filter(
                        (block: any) =>
                          !["deliverables-text-main", "deliverables-para-1", "deliverables-para-2"].includes(block.id) && block.content
                      )
                      .map((block: any) => (
                        <div key={block.id}>
                          {/* Admin View - Editable */}
                          {isAdminView && (
                            <div className="group relative bg-muted/20 border border-border/50 rounded-xl p-6">
                              {block.type === "text" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Text Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("design-deliverables", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <textarea
                                    value={block.content}
                                    onChange={(e) =>
                                      updateSectionContent("design-deliverables", block.id, e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                    placeholder="Enter text content..."
                                  />
                                </div>
                              )}

                              {block.type === "image" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Image Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("design-deliverables", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <ImageUpload
                                    value={block.content}
                                    onChange={(url) => updateSectionContent("design-deliverables", block.id, url)}
                                    path={`projects/design-deliverables/`}
                                    label="Drop image here"
                                  />
                                </div>
                              )}

                              {block.type === "video" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Video Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("design-deliverables", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <input
                                    type="url"
                                    value={block.content}
                                    onChange={(e) => updateSectionContent("design-deliverables", block.id, e.target.value)}
                                    placeholder="YouTube or Vimeo URL"
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Public View - Read-only */}
                          {!isAdminView && (
                            <div>
                              {block.type === "text" && (
                                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased whitespace-pre-wrap">
                                  {block.content}
                                </p>
                              )}

                              {block.type === "image" && (
                                <motion.figure
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="group"
                                >
                                  <div className="relative overflow-hidden rounded-xl">
                                    <img src={block.content} alt="" className="w-full h-auto" />
                                  </div>
                                </motion.figure>
                              )}

                              {block.type === "video" && block.content && (
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="relative rounded-xl overflow-hidden"
                                  style={{ paddingBottom: "56.25%" }}
                                >
                                  <iframe
                                    src={block.content.includes("youtube") ? block.content.replace("watch?v=", "embed/") : block.content}
                                    className="absolute top-0 left-0 w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </motion.section>

              {/* Analysis & Impact Section */}
              <motion.section
                id="analysis-impact"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                      07
                    </h2>
                    <EditableText editable={false}
                      value={editableProject?.sectionTitles?.['analysis-impact'] || "Analysis & Impact"}
                      onChange={(value) => {
                        setEditableProject((prev: any) => ({
                          ...prev,
                          sectionTitles: {
                            ...prev?.sectionTitles,
                            'analysis-impact': value
                          }
                        }));
                      }}
                      className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]"
                      as="h3"
                    />
                  </div>
                  {isAdminView && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => addContentBlock("analysis-impact", "text")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Text Block"
                      >
                        <Type className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("analysis-impact", "image")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Image Block"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("analysis-impact", "video")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Video Block"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
{(editableProject?.outcome || isAdminView) && (
                  <div className="max-w-[75ch] mb-12">
                    <EditableText editable={false}
                      value={editableProject?.outcome || ""}
                      onChange={(value) => updateProjectField("outcome", value)}
                      className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased"
                      multiline
                      rows={6}
                    />
                  </div>
                )}

                {getSectionContent("analysis-impact", "impact-para-1") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                    {getSectionContent("analysis-impact", "impact-para-1", "")}
                  </p>
                )}

                {getSectionContent("analysis-impact", "impact-para-2") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                    {getSectionContent("analysis-impact", "impact-para-2", "")}
                  </p>
                )}

                {/* Dynamic Content Blocks */}
                {editableProject?.sectionsData && (
                  <div className="mt-16 space-y-6">
                    {editableProject.sectionsData
                      .find((s: any) => s.id === "analysis-impact")
                      ?.content.filter(
                        (block: any) =>
                          !["impact-para-1", "impact-para-2"].includes(block.id) && block.content
                      )
                      .map((block: any) => (
                        <div key={block.id}>
                          {/* Admin View - Editable */}
                          {isAdminView && (
                            <div className="group relative bg-muted/20 border border-border/50 rounded-xl p-6">
                              {block.type === "text" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Text Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("analysis-impact", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <textarea
                                    value={block.content}
                                    onChange={(e) =>
                                      updateSectionContent("analysis-impact", block.id, e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                    placeholder="Enter text content..."
                                  />
                                </div>
                              )}

                              {block.type === "image" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Image Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("analysis-impact", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <ImageUpload
                                    value={block.content}
                                    onChange={(url) => updateSectionContent("analysis-impact", block.id, url)}
                                    path={`projects/analysis-impact/`}
                                    label="Drop image here"
                                  />
                                </div>
                              )}

                              {block.type === "video" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Video Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("analysis-impact", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <input
                                    type="url"
                                    value={block.content}
                                    onChange={(e) => updateSectionContent("analysis-impact", block.id, e.target.value)}
                                    placeholder="YouTube or Vimeo URL"
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Public View - Read-only */}
                          {!isAdminView && (
                            <div>
                              {block.type === "text" && (
                                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased whitespace-pre-wrap">
                                  {block.content}
                                </p>
                              )}

                              {block.type === "image" && (
                                <motion.figure
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="group"
                                >
                                  <div className="relative overflow-hidden rounded-xl">
                                    <img src={block.content} alt="" className="w-full h-auto" />
                                  </div>
                                </motion.figure>
                              )}

                              {block.type === "video" && block.content && (
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="relative rounded-xl overflow-hidden"
                                  style={{ paddingBottom: "56.25%" }}
                                >
                                  <iframe
                                    src={block.content.includes("youtube") ? block.content.replace("watch?v=", "embed/") : block.content}
                                    className="absolute top-0 left-0 w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </motion.section>

              {/* Future Scope Section */}
              <motion.section
                id="future-scope"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                      08
                    </h2>
                    <EditableText editable={false}
                      value={editableProject?.sectionTitles?.['future-scope'] || "Future Scope"}
                      onChange={(value) => {
                        setEditableProject((prev: any) => ({
                          ...prev,
                          sectionTitles: {
                            ...prev?.sectionTitles,
                            'future-scope': value
                          }
                        }));
                      }}
                      className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]"
                      as="h3"
                    />
                  </div>
                  {isAdminView && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => addContentBlock("future-scope", "text")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Text Block"
                      >
                        <Type className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("future-scope", "image")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Image Block"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("future-scope", "video")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Video Block"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
{getSectionContent("future-scope", "future-text-main") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                    {getSectionContent("future-scope", "future-text-main", "")}
                  </p>
                )}

                {getSectionContent("future-scope", "future-para-1") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                    {getSectionContent("future-scope", "future-para-1", "")}
                  </p>
                )}

                {getSectionContent("future-scope", "future-para-2") && (
                  <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                    {getSectionContent("future-scope", "future-para-2", "")}
                  </p>
                )}

                {/* Dynamic Content Blocks */}
                {editableProject?.sectionsData && (
                  <div className="mt-16 space-y-6">
                    {editableProject.sectionsData
                      .find((s: any) => s.id === "future-scope")
                      ?.content.filter(
                        (block: any) =>
                          !["future-text-main", "future-para-1", "future-para-2"].includes(block.id) && block.content
                      )
                      .map((block: any) => (
                        <div key={block.id}>
                          {/* Admin View - Editable */}
                          {isAdminView && (
                            <div className="group relative bg-muted/20 border border-border/50 rounded-xl p-6">
                              {block.type === "text" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Text Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("future-scope", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <textarea
                                    value={block.content}
                                    onChange={(e) =>
                                      updateSectionContent("future-scope", block.id, e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                    placeholder="Enter text content..."
                                  />
                                </div>
                              )}

                              {block.type === "image" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Image Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("future-scope", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <ImageUpload
                                    value={block.content}
                                    onChange={(url) => updateSectionContent("future-scope", block.id, url)}
                                    path={`projects/future-scope/`}
                                    label="Drop image here"
                                  />
                                </div>
                              )}

                              {block.type === "video" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Video Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("future-scope", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <input
                                    type="url"
                                    value={block.content}
                                    onChange={(e) => updateSectionContent("future-scope", block.id, e.target.value)}
                                    placeholder="YouTube or Vimeo URL"
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Public View - Read-only */}
                          {!isAdminView && (
                            <div>
                              {block.type === "text" && (
                                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased whitespace-pre-wrap">
                                  {block.content}
                                </p>
                              )}

                              {block.type === "image" && (
                                <motion.figure
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="group"
                                >
                                  <div className="relative overflow-hidden rounded-xl">
                                    <img src={block.content} alt="" className="w-full h-auto" />
                                  </div>
                                </motion.figure>
                              )}

                              {block.type === "video" && block.content && (
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="relative rounded-xl overflow-hidden"
                                  style={{ paddingBottom: "56.25%" }}
                                >
                                  <iframe
                                    src={block.content.includes("youtube") ? block.content.replace("watch?v=", "embed/") : block.content}
                                    className="absolute top-0 left-0 w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </motion.section>

              {/* Credits Section */}
              <motion.section
                id="credits"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                      09
                    </h2>
                    <EditableText editable={false}
                      value={editableProject?.sectionTitles?.['credits'] || "Credits"}
                      onChange={(value) => {
                        setEditableProject((prev: any) => ({
                          ...prev,
                          sectionTitles: {
                            ...prev?.sectionTitles,
                            'credits': value
                          }
                        }));
                      }}
                      className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]"
                      as="h3"
                    />
                  </div>
                  {isAdminView && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => addContentBlock("credits", "text")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Text Block"
                      >
                        <Type className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("credits", "image")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Image Block"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addContentBlock("credits", "video")}
                        className="p-2 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                        title="Add Video Block"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Display all credits content blocks */}
                {sectionsData && sectionsData.find((s: any) => s.id === "credits")?.content
                  .filter((block: any) => block.content)
                  .map((block: any) => (
                    <div key={block.id} className="mb-8">
                      {block.type === "text" && (
                        <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased whitespace-pre-wrap">
                          {block.content}
                        </p>
                      )}
                      {block.type === "image" && block.content && (
                        <motion.figure
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="group"
                        >
                          <div className="relative overflow-hidden">
                            <img src={block.content} alt={block.caption || ""} className="w-full rounded-xl" />
                          </div>
                          {block.caption && (
                            <figcaption className="mt-4 text-[15px] text-muted-foreground leading-[1.47] font-light">
                              {block.caption}
                            </figcaption>
                          )}
                        </motion.figure>
                      )}
                    </div>
                  ))
                }

                {/* Fallback if no CMS data */}
                {!sectionsData && (
                  <>
                    <div className="mb-8">
                      <p className="text-[15px] uppercase tracking-[0.12em] text-muted-foreground/60 mb-2 font-bold">Role</p>
                      <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased">
                        {project.role}
                      </p>
                    </div>
                    <div className="mb-8">
                      <p className="text-[15px] uppercase tracking-[0.12em] text-muted-foreground/60 mb-2 font-bold">Year</p>
                      <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased">
                        {project.year}
                      </p>
                    </div>
                  </>
                )}

                {/* Dynamic Content Blocks */}
                {editableProject?.sectionsData && (
                  <div className="mt-16 space-y-6">
                    {editableProject.sectionsData
                      .find((s: any) => s.id === "credits")
                      ?.content.filter(
                        (block: any) =>
                          ![].includes(block.id) && block.content
                      )
                      .map((block: any) => (
                        <div key={block.id}>
                          {/* Admin View - Editable */}
                          {isAdminView && (
                            <div className="group relative bg-muted/20 border border-border/50 rounded-xl p-6">
                              {block.type === "text" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Text Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("credits", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <textarea
                                    value={block.content}
                                    onChange={(e) =>
                                      updateSectionContent("credits", block.id, e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                    placeholder="Enter text content..."
                                  />
                                </div>
                              )}

                              {block.type === "image" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Image Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("credits", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <ImageUpload
                                    value={block.content}
                                    onChange={(url) => updateSectionContent("credits", block.id, url)}
                                    path={`projects/credits/`}
                                    label="Drop image here"
                                  />
                                </div>
                              )}

                              {block.type === "video" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs text-muted-foreground font-medium">Video Block</label>
                                    <button
                                      onClick={() => deleteContentBlock("credits", block.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <input
                                    type="url"
                                    value={block.content}
                                    onChange={(e) => updateSectionContent("credits", block.id, e.target.value)}
                                    placeholder="YouTube or Vimeo URL"
                                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Public View - Read-only */}
                          {!isAdminView && (
                            <div>
                              {block.type === "text" && (
                                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] font-light antialiased whitespace-pre-wrap">
                                  {block.content}
                                </p>
                              )}

                              {block.type === "image" && (
                                <motion.figure
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="group"
                                >
                                  <div className="relative overflow-hidden rounded-xl">
                                    <img src={block.content} alt="" className="w-full h-auto" />
                                  </div>
                                </motion.figure>
                              )}

                              {block.type === "video" && block.content && (
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="relative rounded-xl overflow-hidden"
                                  style={{ paddingBottom: "56.25%" }}
                                >
                                  <iframe
                                    src={block.content.includes("youtube") ? block.content.replace("watch?v=", "embed/") : block.content}
                                    className="absolute top-0 left-0 w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </motion.section>

              {/* Reaction Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-20"
              >
                <div className="flex flex-wrap items-center gap-3">
                  {/* Like and Love - Left Side */}
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-center gap-2.5 px-5 py-3 bg-background hover:bg-muted/30 border border-border/50 hover:border-border rounded-lg transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm hover:shadow-md"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <ThumbsUp 
                      size={16} 
                      className={`transition-colors duration-400 ${
                        isLiked 
                          ? 'text-primary' 
                          : 'text-muted-foreground/70 group-hover:text-foreground'
                      }`} 
                      strokeWidth={isLiked ? 0 : 2.2}
                      fill={isLiked ? '#0052FF' : 'none'}
                      style={{ transition: 'fill 400ms cubic-bezier(0.4,0,0.2,1)' }}
                    />
                    <span className="text-[14px] font-medium text-muted-foreground/80 group-hover:text-foreground tracking-[-0.006em] transition-colors duration-400">
                      Like
                    </span>
                    <span className="text-[14px] font-bold text-foreground/60 group-hover:text-foreground tabular-nums tracking-[0.01em] transition-colors duration-400 ml-0.5">
                      156
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-center gap-2.5 px-5 py-3 bg-background hover:bg-muted/30 border border-border/50 hover:border-border rounded-lg transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm hover:shadow-md"
                    onClick={() => setIsLoved(!isLoved)}
                  >
                    <Heart 
                      size={16} 
                      className={`transition-colors duration-400 ${
                        isLoved 
                          ? 'text-red-500' 
                          : 'text-muted-foreground/70 group-hover:text-red-500'
                      }`} 
                      strokeWidth={isLoved ? 0 : 2.2}
                      fill={isLoved ? '#ef4444' : 'none'}
                      style={{ transition: 'fill 400ms cubic-bezier(0.4,0,0.2,1)' }}
                    />
                    <span className="text-[14px] font-medium text-muted-foreground/80 group-hover:text-foreground tracking-[-0.006em] transition-colors duration-400">
                      Love
                    </span>
                    <span className="text-[14px] font-bold text-foreground/60 group-hover:text-foreground tabular-nums tracking-[0.01em] transition-colors duration-400 ml-0.5">
                      84
                    </span>
                  </motion.button>

                  {/* Spacer to push right buttons to the end */}
                  <div className="flex-1"></div>

                  {/* Contact Me - Right Side */}
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="group flex items-center gap-2.5 px-5 py-3 bg-foreground hover:bg-foreground/90 rounded-lg transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm hover:shadow-md"
                    >
                      <Mail size={16} className="text-background transition-colors duration-400" strokeWidth={2.2} />
                      <span className="text-[14px] font-medium text-background tracking-[-0.006em] transition-colors duration-400">
                        Contact me
                      </span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>


      {/* Scroll to Top Button */}
      {!isAdminView && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: showScrollTop ? 1 : 0,
            scale: showScrollTop ? 1 : 0.8,
            y: showScrollTop ? 0 : 20
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-40 bg-foreground/95 hover:bg-foreground text-background p-4 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer backdrop-blur-sm"
          style={{ pointerEvents: showScrollTop ? 'auto' : 'none' }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full overflow-y-auto overflow-x-hidden"
              onClick={(e) => e.stopPropagation()}
              ref={fullscreenContainerRef}
            >
              {/* Minimize Button - Prominent Design */}
              <motion.button
                onClick={() => setIsFullscreen(false)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed top-2 md:top-3 right-2 md:right-3 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl transition-all duration-300"
                aria-label="Exit fullscreen"
              >
                <motion.div
                  whileHover={{ scale: 0.85 }}
                  whileTap={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowsIn 
                    size={18} 
                    weight="bold"
                    className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                  />
                </motion.div>
              </motion.button>

              {/* Previous Arrow - Only for carousel images */}
              {isCarouselFullscreen && (
                <motion.button
                  onClick={handlePrevImage}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-black/40 hover:bg-black/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] transition-all duration-300 backdrop-blur-2xl"
                  aria-label="Previous image"
                >
                  <CaretLeft size={20} weight="bold" className="text-white" />
                </motion.button>
              )}

              {/* Next Arrow - Only for carousel images */}
              {isCarouselFullscreen && (
                <motion.button
                  onClick={handleNextImage}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-black/40 hover:bg-black/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] transition-all duration-300 backdrop-blur-2xl"
                  aria-label="Next image"
                >
                  <CaretRight size={20} weight="bold" className="text-white" />
                </motion.button>
              )}

              {/* Zoom Controls - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-20 flex flex-col gap-2"
              >
                {/* Zoom In Button */}
                <motion.button
                  onClick={handleZoomIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-black/40 hover:bg-black/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] transition-all duration-300 backdrop-blur-2xl"
                  aria-label="Zoom in"
                  disabled={zoomLevel >= 3}
                >
                  <Plus size={20} weight="bold" className="text-white" />
                </motion.button>

                {/* Zoom Level Indicator */}
                <div className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-black/40 rounded-full backdrop-blur-2xl">
                  <span className="text-white text-xs font-medium">{Math.round(zoomLevel * 100)}%</span>
                </div>

                {/* Zoom Out Button */}
                <motion.button
                  onClick={handleZoomOut}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-black/40 hover:bg-black/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] transition-all duration-300 backdrop-blur-2xl"
                  aria-label="Zoom out"
                  disabled={zoomLevel <= 0.5}
                >
                  <Minus size={20} weight="bold" className="text-white" />
                </motion.button>
              </motion.div>

              {/* Image - Full Width, Scrollable Vertically */}
              <div className="w-full min-h-full flex items-start justify-center p-4 md:p-8">
                <img 
                  src={fullscreenImage} 
                  alt="Fullscreen view"
                  className="w-full h-auto object-contain rounded-lg shadow-2xl"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.3s ease-out'
                  }}
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}