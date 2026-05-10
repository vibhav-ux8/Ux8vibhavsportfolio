import { Link, useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "../data/projects";
import * as LucideIcons from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import React from "react";
import { useAdminView } from "../contexts/AdminViewContext";
import { AdminActionMenu } from "./AdminActionMenu";
import { deleteProject } from "../data/projects";

interface CaseStudyCardProps {
  project: Project;
  isFlipped?: boolean;
  onFlip?: () => void;
  onUpdate?: () => void;
}

export function CaseStudyCard({ project, isFlipped = false, onFlip, onUpdate }: CaseStudyCardProps) {
  const IconComponent = (LucideIcons as any)[project.icon] || LucideIcons.Box;
  const [isHovered, setIsHovered] = React.useState(false);
  const [isTouched, setIsTouched] = React.useState(false);
  const { isAdminView } = useAdminView();
  const navigate = useNavigate();

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
  };

  const handleEdit = () => {
    navigate(`/work/edit/${project.id}`);
  };

  const handleDuplicate = () => {
    const newProject = {
      ...project,
      id: `${project.id}-copy-${Date.now()}`,
      title: `${project.title} (Copy)`
    };

    const newProjects = localStorage.getItem("cmsNewProjects");
    const projectsList = newProjects ? JSON.parse(newProjects) : [];
    projectsList.push(newProject);
    localStorage.setItem("cmsNewProjects", JSON.stringify(projectsList));

    if (onUpdate) onUpdate();
    alert(`"${project.title}" duplicated successfully!`);
  };

  const handleMoveTo = () => {
    const categories = ['AI & Machine Learning', 'Enterprise SaaS', 'Public Sector', 'Design Systems', 'E-commerce', 'Other'];
    const currentCategory = Array.isArray(project.category) ? project.category.join(', ') : project.category;
    const currentCategoryArray = Array.isArray(project.category) ? project.category : [project.category];
    const otherCategories = categories.filter(c => !currentCategoryArray.includes(c));

    const choice = prompt(
      `Move "${project.title}" to:\n\nCurrent: ${currentCategory}\n\nEnter new category:\n${otherCategories.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\nOr type a custom category:`
    );

    if (choice) {
      const selectedCategory = isNaN(Number(choice))
        ? choice
        : otherCategories[Number(choice) - 1];

      if (selectedCategory) {
        const savedEdits = localStorage.getItem("cmsProjectsData");
        const editsData = savedEdits ? JSON.parse(savedEdits) : {};

        editsData[project.id] = {
          ...editsData[project.id],
          category: selectedCategory
        };

        localStorage.setItem("cmsProjectsData", JSON.stringify(editsData));
        if (onUpdate) onUpdate();
        alert(`"${project.title}" moved to "${selectedCategory}"!`);
      }
    }
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${project.title}"?\n\nThis action cannot be undone.`)) {
      deleteProject(project.id);
      if (onUpdate) onUpdate();
    }
  };

  const handleArchive = () => {
    const isCurrentlyArchived = project.archived || false;
    const action = isCurrentlyArchived ? 'Unarchive' : 'Archive';
    const message = isCurrentlyArchived
      ? `Unarchive "${project.title}"?\n\nThis project will be visible in public view again.`
      : `Archive "${project.title}"?\n\nArchived projects will be hidden from the public view but can be restored later.`;

    if (confirm(message)) {
      const savedEdits = localStorage.getItem("cmsProjectsData");
      const editsData = savedEdits ? JSON.parse(savedEdits) : {};

      editsData[project.id] = {
        ...editsData[project.id],
        archived: !isCurrentlyArchived
      };

      localStorage.setItem("cmsProjectsData", JSON.stringify(editsData));
      if (onUpdate) onUpdate();
      alert(`"${project.title}" has been ${isCurrentlyArchived ? 'unarchived' : 'archived'}.`);
    }
  };
  
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.016 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="group relative border-2 border-border rounded-2xl hover:border-primary/50 transition-all duration-500 h-full flex flex-col"
    >
      <Link
        to={`/work/${project.id}`}
        className="block relative h-full flex flex-col overflow-hidden rounded-[14px]"
      >
        {/* Admin Action Menu */}
        {isAdminView && (
          <div className="absolute top-0 left-0 z-20">
            <AdminActionMenu
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onArchive={handleArchive}
              onDelete={handleDelete}
              isArchived={project.archived || false}
            />
          </div>
        )}
        {/* Archived Badge */}
        {isAdminView && project.archived === true && (
          <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full shadow-lg">
            Archived
          </div>
        )}
        {/* Thumbnail */}
        <motion.div
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1.0]
          }}
          className="relative aspect-[16/10] overflow-hidden bg-muted flex-shrink-0 rounded-t-[14px]"
          style={{ perspective: '1500px' }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ 
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
            className="w-full h-full overflow-hidden"
          >
            <ImageWithFallback
              src={project.thumbnail}
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                isTouched || isHovered ? 'grayscale-0' : 'grayscale'
              }`}
            />
          </motion.div>
          {/* Flip overlay */}
          {project.logoOverlay && (
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out"
              style={{ 
                opacity: isHovered || isTouched ? 0 : 1
              }}
            >
              {/* Semi-transparent white backing */}
              <div className="absolute inset-0 bg-white opacity-15" />
              <img
                src={project.logoOverlay}
                alt={`${project.title} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {/* Regular logo overlay (bottom left, unfold on hover) */}
          {project.logo && (
            <div className="absolute bottom-6 left-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 origin-bottom-left scale-y-0 group-hover:scale-y-100">
              <img
                src={project.logo}
                alt={`${project.title} logo`}
                className="max-w-[200px] max-h-[80px] object-contain"
              />
            </div>
          )}
        </motion.div>

        {/* Content */}
        <div className="space-y-4 flex flex-col flex-grow p-6">
          {/* Title */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors duration-500">
              <IconComponent className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors duration-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-medium leading-tight tracking-tight group-hover:text-primary transition-colors duration-500" style={{ fontFeatureSettings: "'ss01' on" }}>
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-base text-muted-foreground leading-relaxed tracking-normal flex-grow">
            {project.description}
          </p>

          {/* Category and Sector */}
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            {Array.isArray(project.category) ? (
              project.category.map((cat, idx) => (
                <span key={idx} className="inline-block px-4 py-1 rounded-[4px] text-[11px] font-medium bg-foreground/80 text-background tracking-normal">
                  {cat}
                </span>
              ))
            ) : (
              <span className="inline-block px-4 py-1 rounded-[4px] text-[11px] font-medium bg-foreground/80 text-background tracking-normal">
                {project.category}
              </span>
            )}
            {Array.isArray(project.sector) ? (
              project.sector.map((sec, idx) => (
                <span key={idx} className="inline-block px-4 py-1 rounded-[4px] text-[11px] font-medium bg-foreground/80 text-background tracking-normal">
                  {sec}
                </span>
              ))
            ) : (
              <span className="inline-block px-4 py-1 rounded-[4px] text-[11px] font-medium bg-foreground/80 text-background tracking-normal">
                {project.sector}
              </span>
            )}
          </div>

          {/* Year and View Link */}
          <div className="flex items-center justify-between pt-3 flex-shrink-0">
            <span className="text-sm text-muted-foreground font-normal tracking-normal">
              {project.year}
            </span>
            <div className="flex items-center gap-2.5 text-base font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-500 tracking-tight">
              View project
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 30 
                }}
                className="group-hover:translate-x-2 transition-transform duration-500 ease-out"
              >
                <ArrowRight size={17} strokeWidth={2.5} />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}