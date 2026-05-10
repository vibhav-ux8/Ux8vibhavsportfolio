import predictThumbnail from "figma:asset/e929fd97ca6cf96cdf890fac8668f5c1bf76e312.png";
import predictLogoOverlay from "figma:asset/805085f5019797d0c845ddc4bb7cea53d9066e58.png";
import predictContextImage from "figma:asset/485b0e9763c9f09882949ad898f424a052b9318a.png";
import kavachThumbnail from "figma:asset/45e5cd2d6bc059c07d9741ad2d8d8c8a2b4816ac.png";
import kavachLogoOverlay from "figma:asset/585b3b78ebd78bd8195037b7d052c0617ba5ed56.png";
import immuneThumbnail from "figma:asset/67bc22aba19654ede810fd7ef233a8e777a29076.png";
import immuneLogoOverlay from "figma:asset/61524d725f7719b193079141feda829efdb07bee.png";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string | string[];
  sector: string | string[];
  thumbnail: string;
  logo?: string;
  logoOverlay?: string;
  coverImage?: string;
  year: string;
  role: string;
  context: string;
  research: string;
  designSystem: string;
  prototyping: string;
  outcome: string;
  icon: string;
  archived?: boolean;
  images: {
    url: string;
    caption: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "ai-assisted-decision-platform",
    title: "Predict",
    description: "Comprehensive Investigation and Analysis platform for Law Enforcement Agencies",
    tags: ["Law enforcement", "Investigative tools", "Case study", "Digital forensics"],
    category: "LEA & Defence",
    sector: "UI-UX Design",
    thumbnail: predictThumbnail,
    logoOverlay: predictLogoOverlay,
    icon: "Search",
    year: "2024-2026",
    role: "Principal Product Designer, Cross-functional Lead",
    context: "Federal agencies needed a unified platform to leverage AI for complex policy decisions while maintaining security, transparency, and compliance with government standards. The challenge was designing for diverse user groups—analysts, policy makers, and IT administrators—each with distinct needs and varying technical literacy.",
    research: "Conducted 40+ stakeholder interviews across 8 agencies. Led participatory design workshops with analysts and policy makers. Performed comparative analysis of existing government systems. Identified key pain points: lack of transparency in AI recommendations, fragmented workflows across agencies, and complex approval processes that slowed decision making.",
    designSystem: "Developed a comprehensive design system built on WCAG 2.1 AAA standards and Section 508 compliance. Created a modular component library with 60+ components optimized for accessibility and government branding requirements. Designed adaptive data visualization patterns that scale from simple charts to complex multi-agency dashboards.",
    prototyping: "Built high-fidelity prototypes in Figma with interactive AI feedback loops. Conducted 5 rounds of usability testing with 50+ government users. Iterated on transparency features, introducing 'AI confidence scores' and 'decision audit trails' that increased user trust by 85% in testing.",
    outcome: "Platform adopted by 12 federal agencies within 9 months of launch. Reduced average decision-making time from 6 weeks to 10 days. Achieved 92% user satisfaction score. Design system now serves as foundation for 8+ additional government digital products.",
    images: [
      {
        url: predictContextImage,
        caption: "AI-powered investigation platform interface for law enforcement agencies"
      }
    ]
  },
  {
    id: "enterprise-design-system",
    title: "Immune",
    description: "Comprehensive Social Media Threat Monitoring for Government Agencies and Enterprises",
    tags: ["Brand Security", "Social Media", "5G warfare", "Case study"],
    category: "LEA & Defence",
    sector: "UI-UX Design",
    thumbnail: immuneThumbnail,
    logoOverlay: immuneLogoOverlay,
    icon: "Shield",
    year: "2024-2026",
    role: "Principal Designer, Design Systems Lead",
    context: "A rapidly scaling enterprise SaaS company faced significant design debt, with inconsistent UI patterns across 20+ products. Engineering teams were rebuilding similar components, and design velocity was slowing as the organization grew from 50 to 200+ product team members.",
    research: "Audited 18 product surfaces, cataloging 300+ UI inconsistencies. Interviewed 45 designers and engineers to understand pain points. Analyzed component reuse patterns and identified 80% overlap in common UI needs. Mapped the organizational structure to understand team dependencies and adoption blockers.",
    designSystem: "Designed a token-based design system with 8 core themes supporting white-label customization. Built 120+ production-ready components in React and Figma. Established governance model with contribution guidelines and quarterly review cycles. Created comprehensive documentation with live code examples and accessibility annotations.",
    prototyping: "Developed rapid prototyping toolkit enabling designers to build high-fidelity prototypes 3x faster. Created interactive Figma libraries with auto-layout and variant systems. Built design-to-code pipeline reducing handoff friction by 70%.",
    outcome: "Achieved 85% adoption rate across product teams within 6 months. Reduced design-to-development time by 60%. Decreased UI-related bugs by 45%. Design system now supports $400M+ ARR product portfolio. Enabled company to scale from 2 to 15 product launches per quarter.",
    images: [
      {
        url: immuneThumbnail,
        caption: "Token-based architecture enabling theme customization and white-label flexibility"
      },
      {
        url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
        caption: "Component library documentation with accessibility guidelines and code examples"
      }
    ]
  },
  {
    id: "healthcare-patient-portal",
    title: "Kavach",
    description: "Digital Threat Monitoring for Enterprises and Government Organizations",
    tags: ["Cybersecurity", "Zero-Trust"],
    category: "Healthcare",
    sector: "UI-UX Design",
    thumbnail: kavachThumbnail,
    logoOverlay: kavachLogoOverlay,
    icon: "ShieldCheck",
    year: "2024-2026",
    role: "Senior Product Designer, UX Research Lead",
    context: "Regional healthcare network needed to modernize their patient portal to improve health outcomes and reduce administrative burden. The existing system had low adoption (22%) and high support costs. Patient population included significant Spanish-speaking community and older adults with varying digital literacy.",
    research: "Conducted contextual inquiry with 60+ patients across urban and rural settings. Led accessibility audits identifying 200+ WCAG violations. Performed diary studies revealing that patients struggled with medical jargon and complex navigation. Partnered with community health centers to understand barriers for underserved populations.",
    designSystem: "Designed bilingual interface with culturally adapted content and imagery. Created plain-language patterns for medical information with readability scores at 6th-grade level. Built flexible type scale supporting vision-impaired users. Designed progressive disclosure patterns reducing cognitive load for complex health data.",
    prototyping: "Built mobile-first prototypes tested with 80+ patients including those with disabilities. Conducted usability testing in clinical settings with physicians present to validate medical accuracy. Iterated on appointment scheduling flow, reducing steps from 12 to 4.",
    outcome: "Patient adoption increased from 22% to 68% within 12 months. Support calls reduced by 52%. Patient satisfaction scores improved from 3.2 to 4.6/5. Portal achieved WCAG 2.1 AAA rating. 45% reduction in missed appointments due to improved reminder and scheduling UX.",
    images: [
      {
        url: kavachThumbnail,
        caption: "Mobile-first interface with plain-language medical information and progressive disclosure"
      },
      {
        url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&q=80",
        caption: "Bilingual appointment scheduling flow optimized for accessibility and health literacy"
      }
    ]
  }
];

// Get merged projects (static + localStorage edits + new projects - deleted projects)
export function getMergedProjects(): Project[] {
  if (typeof window === 'undefined') return projects;

  // Get deleted projects list
  const deletedProjectsStr = localStorage.getItem("cmsDeletedProjects");
  const deletedProjects = deletedProjectsStr ? JSON.parse(deletedProjectsStr) : [];

  // Get edited existing projects
  const savedEdits = localStorage.getItem("cmsProjectsData");
  let mergedProjects = [...projects];

  if (savedEdits) {
    const editsData = JSON.parse(savedEdits);
    console.log("Loading CMS edits:", editsData);
    mergedProjects = projects.map(project => {
      if (editsData[project.id]) {
        console.log(`Merging edits for project ${project.id}:`, editsData[project.id]);
        const editedProject = { ...project, ...editsData[project.id] };
        // Preserve original thumbnail and logoOverlay if not explicitly changed in edits
        if (!editsData[project.id].thumbnail || editsData[project.id].thumbnail === '') {
          editedProject.thumbnail = project.thumbnail;
        }
        if (!editsData[project.id].logoOverlay || editsData[project.id].logoOverlay === '') {
          editedProject.logoOverlay = project.logoOverlay;
        }
        if (!editsData[project.id].logo || editsData[project.id].logo === '') {
          editedProject.logo = project.logo;
        }
        return editedProject;
      }
      return project;
    });
  }

  // Filter out deleted projects
  mergedProjects = mergedProjects.filter(project => !deletedProjects.includes(project.id));

  // Get new projects created via CMS
  const newProjects = localStorage.getItem("cmsNewProjects");
  if (newProjects) {
    const newProjectsList = JSON.parse(newProjects);
    // Also filter deleted projects from new projects
    const filteredNewProjects = newProjectsList.filter((p: Project) => !deletedProjects.includes(p.id));
    mergedProjects = [...mergedProjects, ...filteredNewProjects];
  }

  return mergedProjects;
}

export function getProjectById(id: string): Project | undefined {
  const mergedProjects = getMergedProjects();
  return mergedProjects.find(p => p.id === id);
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(p => p.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  projects.forEach(p => p.tags.forEach(t => tags.add(t)));
  return Array.from(tags).sort().slice(0, 9);
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  // Use merged projects instead of just static projects
  const allProjects = getMergedProjects();
  allProjects.forEach(p => {
    // Handle both string and array types
    if (p.category) {
      if (Array.isArray(p.category)) {
        p.category.forEach(cat => {
          if (cat && cat.trim() !== '') {
            categories.add(cat);
          }
        });
      } else if (typeof p.category === 'string' && p.category.trim() !== '') {
        categories.add(p.category);
      }
    }
  });
  // Custom sort order
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

export function getAllSectors(): string[] {
  const sectors = new Set<string>();
  // Use merged projects instead of just static projects
  const allProjects = getMergedProjects();
  allProjects.forEach(p => {
    // Handle both string and array types
    if (p.sector) {
      if (Array.isArray(p.sector)) {
        p.sector.forEach(sec => {
          if (sec && sec.trim() !== '') {
            sectors.add(sec);
          }
        });
      } else if (typeof p.sector === 'string' && p.sector.trim() !== '') {
        sectors.add(p.sector);
      }
    }
  });
  // Custom sort order
  const order = [
    "UI-UX Design",
    "Product Design",
    "Communication",
    "Game Design",
    "Digital Illustration"
  ];
  const sortedSectors = Array.from(sectors).sort((a, b) => {
    const indexA = order.indexOf(a);
    const indexB = order.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
  return sortedSectors;
}

// Utility function to reset a specific project to its original state
export function resetProjectToOriginal(projectId: string): void {
  if (typeof window === 'undefined') return;

  const savedEdits = localStorage.getItem("cmsProjectsData");
  if (savedEdits) {
    const editsData = JSON.parse(savedEdits);
    delete editsData[projectId];
    localStorage.setItem("cmsProjectsData", JSON.stringify(editsData));
  }
}

// Utility function to clear all project edits (reset all to original)
export function resetAllProjectEdits(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem("cmsProjectsData");
}

// Delete a project (adds it to deleted list in localStorage)
export function deleteProject(projectId: string): void {
  if (typeof window === 'undefined') return;

  // Add to deleted projects list
  const deletedProjectsStr = localStorage.getItem("cmsDeletedProjects");
  const deletedProjects = deletedProjectsStr ? JSON.parse(deletedProjectsStr) : [];

  if (!deletedProjects.includes(projectId)) {
    deletedProjects.push(projectId);
    localStorage.setItem("cmsDeletedProjects", JSON.stringify(deletedProjects));
  }

  // Also remove from new projects if it exists there
  const newProjectsStr = localStorage.getItem("cmsNewProjects");
  if (newProjectsStr) {
    const newProjects = JSON.parse(newProjectsStr);
    const filteredNewProjects = newProjects.filter((p: Project) => p.id !== projectId);
    localStorage.setItem("cmsNewProjects", JSON.stringify(filteredNewProjects));
  }

  // Also remove from edited projects if it exists there
  const savedEdits = localStorage.getItem("cmsProjectsData");
  if (savedEdits) {
    const editsData = JSON.parse(savedEdits);
    delete editsData[projectId];
    localStorage.setItem("cmsProjectsData", JSON.stringify(editsData));
  }
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(p => p.category === category);
}
