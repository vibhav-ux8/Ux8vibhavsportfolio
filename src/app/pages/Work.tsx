import { useState, useEffect, useCallback, useRef } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { getMergedProjects, getAllCategories, getAllSectors } from "../data/projects";
import { motion } from "motion/react";
import { useAdminView } from "../contexts/AdminViewContext";
import { useCMS } from "../contexts/CMSContext";
import type { CMSKey } from "../lib/cms";
import { useNavigate } from "react-router";
import { Plus, Settings, Edit2, Trash2, X } from "lucide-react";
import hikingIcon from "../../imports/hiking.png";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface DraggableCardProps {
  project: any;
  index: number;
  moveProject: (dragId: string, hoverId: string) => void;
  onFlip: (id: string) => void;
  isFlipped: boolean;
  onUpdate: () => void;
  isAdminView: boolean;
}

const DraggableCard = ({ project, index, moveProject, onFlip, isFlipped, onUpdate, isAdminView }: DraggableCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "PROJECT_CARD",
    item: { id: project.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isAdminView,
  });

  const [{ isOver }, drop] = useDrop({
    accept: "PROJECT_CARD",
    hover: (item: { id: string; index: number }) => {
      if (!ref.current) return;
      if (item.id === project.id) return;

      moveProject(item.id, project.id);
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
      <CaseStudyCard
        project={project}
        onFlip={onFlip}
        isFlipped={isFlipped}
        onUpdate={onUpdate}
      />
    </div>
  );
};

const DEFAULT_WORK_TITLE = "Work";
const DEFAULT_WORK_DESC = "Case studies demonstrating strategic product design, systems thinking, and measurable impact across AI platforms, enterprise tools, and public-sector digital services.";

export default function Work() {
  const { isAdminView } = useAdminView();
  const { store, loading, setStore } = useCMS();
  const navigate = useNavigate();
  const [projects, setProjects] = useState(() => getMergedProjects(store));
  const [projectOrder, setProjectOrder] = useState<string[]>(() => store['projectOrder'] ?? []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allCategories, setAllCategories] = useState(() => getAllCategories(store));
  const [allSectors, setAllSectors] = useState(() => getAllSectors(store));
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingSector, setEditingSector] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSector, setShowAddSector] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSectorName, setNewSectorName] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [pageTitle, setPageTitle] = useState(store['workPageTitle'] ?? DEFAULT_WORK_TITLE);
  const [pageDescription, setPageDescription] = useState(store['workPageDescription'] ?? DEFAULT_WORK_DESC);
  const projectsPerPage = 15;

  // Sync from context once CMS finishes loading
  useEffect(() => {
    if (!loading) {
      const mergedProjects = getMergedProjects(store);
      setProjects(mergedProjects);
      setAllCategories(getAllCategories(store));
      setAllSectors(getAllSectors(store));
      const savedOrder: string[] = store['projectOrder'] ?? mergedProjects.map(p => p.id);
      setProjectOrder(savedOrder);
      setPageTitle(store['workPageTitle'] ?? DEFAULT_WORK_TITLE);
      setPageDescription(store['workPageDescription'] ?? DEFAULT_WORK_DESC);
    }
  }, [loading]);

  const handleUpdate = useCallback(() => {
    const mergedProjects = getMergedProjects(store);
    setProjects(mergedProjects);
    setAllCategories(getAllCategories(store));
    setAllSectors(getAllSectors(store));
    setProjectOrder(prevOrder => {
      const currentIds = new Set(prevOrder);
      const newIds = mergedProjects.filter(p => !currentIds.has(p.id)).map(p => p.id);
      return [...prevOrder, ...newIds];
    });
  }, [store]);

  // Apply saved order to projects
  const orderedProjects = [...projects].sort((a, b) => {
    const indexA = projectOrder.indexOf(a.id);
    const indexB = projectOrder.indexOf(b.id);
    // If not in order array, put at end
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Move project in the order array
  const moveProject = useCallback((dragId: string, hoverId: string) => {
    setProjectOrder(prevOrder => {
      const newOrder = [...prevOrder];
      const dragIndex = newOrder.indexOf(dragId);
      const hoverIndex = newOrder.indexOf(hoverId);
      if (dragIndex === -1 || hoverIndex === -1) return prevOrder;
      newOrder.splice(dragIndex, 1);
      newOrder.splice(hoverIndex, 0, dragId);
      setStore('projectOrder' as CMSKey, newOrder);
      return newOrder;
    });
  }, [setStore]);

  const handleEditCategory = (category: string) => {
    setEditingCategory(category);
    setEditValue(category);
  };

  const handleSaveCategory = async () => {
    if (editingCategory && editValue && editValue !== editingCategory) {
      const projectsData = { ...(store['cmsProjectsData'] ?? {}) };
      Object.keys(projectsData).forEach(pid => {
        if (projectsData[pid].category === editingCategory) projectsData[pid] = { ...projectsData[pid], category: editValue };
      });
      await setStore('cmsProjectsData' as CMSKey, projectsData);
      handleUpdate();
    }
    setEditingCategory(null);
    setEditValue("");
  };

  const handleDeleteCategory = async (category: string) => {
    if (confirm(`Are you sure you want to delete the category "${category}"? All projects using this category will have it removed.`)) {
      const projectsData = { ...(store['cmsProjectsData'] ?? {}) };
      Object.keys(projectsData).forEach(pid => {
        if (projectsData[pid].category === category) projectsData[pid] = { ...projectsData[pid], category: "" };
      });
      const newProjects = (store['cmsNewProjects'] ?? []).map((p: any) =>
        p.category === category ? { ...p, category: "" } : p
      );
      await Promise.all([
        setStore('cmsProjectsData' as CMSKey, projectsData),
        setStore('cmsNewProjects' as CMSKey, newProjects),
      ]);
      handleUpdate();
      setSelectedCategory(null);
    }
  };

  const handleEditSector = (sector: string) => {
    setEditingSector(sector);
    setEditValue(sector);
  };

  const handleSaveSector = async () => {
    if (editingSector && editValue && editValue !== editingSector) {
      const projectsData = { ...(store['cmsProjectsData'] ?? {}) };
      Object.keys(projectsData).forEach(pid => {
        if (projectsData[pid].sector === editingSector) projectsData[pid] = { ...projectsData[pid], sector: editValue };
      });
      await setStore('cmsProjectsData' as CMSKey, projectsData);
      handleUpdate();
    }
    setEditingSector(null);
    setEditValue("");
  };

  const handleDeleteSector = async (sector: string) => {
    if (confirm(`Are you sure you want to delete the discipline "${sector}"? All projects using this discipline will have it removed.`)) {
      const projectsData = { ...(store['cmsProjectsData'] ?? {}) };
      Object.keys(projectsData).forEach(pid => {
        if (projectsData[pid].sector === sector) projectsData[pid] = { ...projectsData[pid], sector: "" };
      });
      const newProjects = (store['cmsNewProjects'] ?? []).map((p: any) =>
        p.sector === sector ? { ...p, sector: "" } : p
      );
      await Promise.all([
        setStore('cmsProjectsData' as CMSKey, projectsData),
        setStore('cmsNewProjects' as CMSKey, newProjects),
      ]);
      handleUpdate();
      setSelectedSector(null);
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName && !allCategories.includes(newCategoryName)) {
      // We'll add it by creating a placeholder or just refresh - categories come from projects
      setShowAddCategory(false);
      setNewCategoryName("");
      alert("To add a new category, create a project with that category.");
    }
  };

  const handleAddSector = () => {
    if (newSectorName && !allSectors.includes(newSectorName)) {
      setShowAddSector(false);
      setNewSectorName("");
      alert("To add a new discipline, create a project with that discipline.");
    }
  };

  const handleSaveDescription = async () => {
    await setStore('workPageDescription' as CMSKey, pageDescription);
    setIsEditingDescription(false);
  };

  const handleCancelDescription = () => {
    setPageDescription(store['workPageDescription'] ?? DEFAULT_WORK_DESC);
    setIsEditingDescription(false);
  };

  const handleSaveTitle = async () => {
    await setStore('workPageTitle' as CMSKey, pageTitle);
    setIsEditingTitle(false);
  };

  const handleCancelTitle = () => {
    setPageTitle(store['workPageTitle'] ?? DEFAULT_WORK_TITLE);
    setIsEditingTitle(false);
  };

  const filteredProjects = orderedProjects.filter(p => {
    const matchesCategory = selectedCategory
      ? (Array.isArray(p.category) ? p.category.includes(selectedCategory) : p.category === selectedCategory)
      : true;
    const matchesSector = selectedSector
      ? (Array.isArray(p.sector) ? p.sector.includes(selectedSector) : p.sector === selectedSector)
      : true;
    // Hide archived projects in public view
    const matchesArchiveStatus = isAdminView ? true : (p.archived !== true);
    return matchesCategory && matchesSector && matchesArchiveStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const handleFlip = (projectId: string) => {
    setFlippedCardId(prev => prev === projectId ? null : projectId);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when changing category
  };

  const handleSectorChange = (sector: string | null) => {
    setSelectedSector(sector);
    setCurrentPage(1); // Reset to page 1 when changing sector
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
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
                <h1 className="text-[56px] md:text-[72px] lg:text-[88px] font-medium mb-6 tracking-[-0.03em] leading-[1.05] md:leading-[0.95] inline-flex items-center gap-4" style={{ fontFeatureSettings: "'ss01' on, 'cv05' on, 'cv08' on" }}>
                  <span>{pageTitle}</span>
                  <img
                    src={hikingIcon}
                    alt="hiking"
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 page-icon flex-shrink-0"
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

          {/* Category Filters - Highly Visible */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Domain Filters - Left */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] uppercase tracking-[0.12em] font-bold text-muted-foreground/50">
                  Domain
                </h2>
                {isAdminView && (
                  <button
                    onClick={() => setShowAddCategory(true)}
                    className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                    title="Add Category"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                )}
              </div>
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
                  <div key={category} className="relative group">
                    {editingCategory === category ? (
                      <div className="flex items-center gap-2 bg-background border-2 border-primary rounded-[4px] px-3 py-1">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-32 bg-transparent text-[14px] outline-none"
                          autoFocus
                          onKeyPress={(e) => e.key === "Enter" && handleSaveCategory()}
                        />
                        <button
                          onClick={handleSaveCategory}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingCategory(null);
                            setEditValue("");
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleCategoryChange(category)}
                          className={`px-5 py-1.5 rounded-[4px] text-[14px] font-medium transition-all border-2 ${
                            selectedCategory === category
                              ? "bg-foreground/90 text-background border-foreground/90"
                              : "bg-background text-foreground border-border hover:border-primary/50"
                          }`}
                        >
                          {category}
                        </button>
                        {isAdminView && (
                          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-background border border-border rounded-md shadow-lg p-1 flex gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditCategory(category);
                                }}
                                className="p-1 hover:bg-muted rounded"
                                title="Edit"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCategory(category);
                                }}
                                className="p-1 hover:bg-red-50 hover:text-red-600 rounded"
                                title="Delete"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sector Filters - Right */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] uppercase tracking-[0.12em] font-bold text-muted-foreground/50">
                  Disciplines
                </h2>
                {isAdminView && (
                  <button
                    onClick={() => setShowAddSector(true)}
                    className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                    title="Add Discipline"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleSectorChange(null)}
                  className={`px-5 py-1.5 rounded-[4px] text-[14px] font-medium transition-all border-2 ${
                    selectedSector === null
                      ? "bg-foreground/90 text-background border-foreground/90"
                      : "bg-background text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  All
                </button>
                {allSectors.map((sector) => (
                  <div key={sector} className="relative group">
                    {editingSector === sector ? (
                      <div className="flex items-center gap-2 bg-background border-2 border-primary rounded-[4px] px-3 py-1">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-32 bg-transparent text-[14px] outline-none"
                          autoFocus
                          onKeyPress={(e) => e.key === "Enter" && handleSaveSector()}
                        />
                        <button
                          onClick={handleSaveSector}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingSector(null);
                            setEditValue("");
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleSectorChange(sector)}
                          className={`px-5 py-1.5 rounded-[4px] text-[14px] font-medium transition-all border-2 ${
                            selectedSector === sector
                              ? "bg-foreground/90 text-background border-foreground/90"
                              : "bg-background text-foreground border-border hover:border-primary/50"
                          }`}
                        >
                          {sector}
                        </button>
                        {isAdminView && (
                          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-background border border-border rounded-md shadow-lg p-1 flex gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditSector(sector);
                                }}
                                className="p-1 hover:bg-muted rounded"
                                title="Edit"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSector(sector);
                                }}
                                className="p-1 hover:bg-red-50 hover:text-red-600 rounded"
                                title="Delete"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
                <p className="text-sm text-muted-foreground mb-4">
                  Note: Categories are derived from projects. Create a project with this category to make it appear in the filters.
                </p>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full px-4 py-2 border border-border rounded-lg mb-4"
                  autoFocus
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowAddCategory(false);
                      setNewCategoryName("");
                    }}
                    className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCategory}
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Add Sector Modal */}
          {showAddSector && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-background border border-border rounded-xl p-6 max-w-md w-full mx-4"
              >
                <h3 className="text-lg font-medium mb-4">Add New Discipline</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Note: Disciplines are derived from projects. Create a project with this discipline to make it appear in the filters.
                </p>
                <input
                  type="text"
                  value={newSectorName}
                  onChange={(e) => setNewSectorName(e.target.value)}
                  placeholder="Enter discipline name"
                  className="w-full px-4 py-2 border border-border rounded-lg mb-4"
                  autoFocus
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowAddSector(false);
                      setNewSectorName("");
                    }}
                    className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSector}
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Results count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10"
          >
            <p className="text-[15px] text-muted-foreground tracking-[-0.01em]">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </motion.div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProjects.map((project, index) => (
              <DraggableCard
                key={project.id}
                project={project}
                index={index}
                moveProject={moveProject}
                onFlip={handleFlip}
                isFlipped={flippedCardId === project.id}
                onUpdate={handleUpdate}
                isAdminView={isAdminView}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-24">
              <p className="text-[17px] text-muted-foreground tracking-[-0.011em]">
                No projects found for the selected category and sector.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-all border-2 ${
                  currentPage === 1
                    ? "bg-background text-muted-foreground border-border cursor-not-allowed opacity-50"
                    : "bg-background text-foreground border-foreground/20 hover:border-foreground/40"
                }`}
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-all border-2 ${
                      currentPage === page
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-foreground/20 hover:border-foreground/40"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-all border-2 ${
                  currentPage === totalPages
                    ? "bg-background text-muted-foreground border-border cursor-not-allowed opacity-50"
                    : "bg-background text-foreground border-foreground/20 hover:border-foreground/40"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* New Project Button - Admin Only */}
      {isAdminView && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/work/add")}
          className="fixed top-24 right-8 z-50 bg-foreground text-background rounded-full px-6 py-3 shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2 group"
          title="Create New Project"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium text-sm">
            New Project
          </span>
        </motion.button>
      )}

      <Footer />
      </div>
    </DndProvider>
  );
}