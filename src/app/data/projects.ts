import predictThumbnail from "figma:asset/e929fd97ca6cf96cdf890fac8668f5c1bf76e312.png";
import predictLogo from "figma:asset/f0e549839af9b3f17bcbbdb771522c6d05f6a431.png";
import predictLogoOverlay from "figma:asset/805085f5019797d0c845ddc4bb7cea53d9066e58.png";
import predictContextImage from "figma:asset/485b0e9763c9f09882949ad898f424a052b9318a.png";
import kavachThumbnail from "figma:asset/45e5cd2d6bc059c07d9741ad2d8d8c8a2b4816ac.png";
import kavachLogoOverlay from "figma:asset/585b3b78ebd78bd8195037b7d052c0617ba5ed56.png";
import immuneThumbnail from "figma:asset/67bc22aba19654ede810fd7ef233a8e777a29076.png";
import immuneLogo from "figma:asset/8f326b0148602db45c47ce573ca33f7605115a5e.png";
import immuneLogoOverlay from "figma:asset/61524d725f7719b193079141feda829efdb07bee.png";
import rajmandalaThumbnail from "figma:asset/3a549c7972bed39fde873994e21501818eff1145.png";
import rajmandalaLogoOverlay from "figma:asset/369577dc20e35e5ef56434a4b34e109d714aeaa3.png";
import aranyaniThumbnail from "figma:asset/adb80a6b72e9865ae5846ce374ae9e74d60ad977.png";
import aranyaniLogoOverlay from "figma:asset/ac926c965228b0518c6b00c27eaa5d3ef6db9c87.png";
import parvaDarshiniThumbnail from "figma:asset/44e79e12db43f51e35640c21caacbf8387aae069.png";
import krishakThumbnail from "figma:asset/8640a3f1848fdf7c4ea311c93db0acb22e71805c.png";
import krishakLogoOverlay from "figma:asset/3fb44d4ebb7f82919ef6d6ce2d77bd4d4577374c.png";
import guptThumbnail from "figma:asset/e8e769656578d1efcfd90d5ef3c881d3c9542ae0.png";
import guptLogoOverlay from "figma:asset/2321548836103114ef5e7810b74075629fa3a1cb.png";
import parvaDarshiniLogoOverlay from "figma:asset/7880c9cdff3abfd952c9adaba7e96527298174b4.png";
import kashiThumbnail from "figma:asset/02b9fe41263c97a2716eac009d61fa2d9f77131e.png";
import kashiLogoOverlay from "figma:asset/367014515cc14bf6311457b00a5503817855ce4c.png";
import srujanalayanThumbnail from "figma:asset/ec013fa88eb9afb18e89d543ced8165486c5675f.png";
import srujanalayanLogoOverlay from "figma:asset/baaf948fd23e12a2fda739bb9e1281e2f4f06502.png";
import manavThumbnail from "figma:asset/224ed6a35eac0876ffde6af6cab23335bfcbd4da.png";
import manavLogoOverlay from "figma:asset/975750395aa26be6cfcc84a7e23c8ad6b1a19354.png";
import pravahaLogoOverlay from "figma:asset/20bde341e1ff4139730332f5a997fcab6c8a82ea.png";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  sector: string;
  thumbnail: string;
  logo?: string;
  logoOverlay?: string;
  year: string;
  role: string;
  context: string;
  research: string;
  designSystem: string;
  prototyping: string;
  outcome: string;
  icon: string;
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
  },
  {
    id: "manav",
    title: "Manav",
    description: "Human Resource Management for Large Indian Multinational Enterprises",
    tags: ["HRMS"],
    category: "DPI & Governance",
    sector: "UI-UX Design",
    thumbnail: manavThumbnail,
    logoOverlay: manavLogoOverlay,
    icon: "Users",
    year: "2024-2026",
    role: "Lead Product Designer",
    context: "Large Indian multinational enterprises struggled with fragmented HR systems across multiple geographies, departments, and employee scales. Legacy systems couldn't handle complex organizational hierarchies, diverse employment types, and compliance requirements across different states and countries. Organizations needed unified platform that could scale from 10,000 to 100,000+ employees while maintaining cultural sensitivity and local regulatory compliance.",
    research: "Conducted extensive research across 5 large Indian MNCs spanning IT, manufacturing, and services sectors. Interviewed 200+ stakeholders including HR leaders, managers, employees, and compliance teams. Observed HR workflows across headquarters, regional offices, and factory locations. Identified pain points in talent acquisition, performance management, payroll, and employee engagement across diverse workforce demographics.",
    designSystem: "Designed comprehensive HRMS with role-based interfaces for employees, managers, HR teams, and executives. Created intelligent workflows automating routine tasks while maintaining human oversight for critical decisions. Built unified employee experience platform accessible via web, mobile, and kiosk for frontline workers. Designed analytics dashboards providing insights on workforce trends, attrition risk, and organizational health.",
    prototyping: "Piloted with 10,000 employees across 3 business units. Conducted usability testing with employees from entry-level to C-suite. Validated mobile-first design with field employees having limited connectivity. Iterated on multilingual support covering 8 Indian languages. Tested compliance workflows with legal and finance teams ensuring regulatory adherence.",
    outcome: "Deployed across 5 major Indian MNCs managing 250,000+ employees. Reduced HR administrative time by 60% through automation. Employee self-service adoption reached 85% within 6 months. Performance review cycle time reduced from 3 months to 3 weeks. Platform achieved 4.3/5 employee satisfaction rating. Recognized as 'Best HR Tech Implementation' at India HR Summit 2023.",
    images: [
      {
        url: manavThumbnail,
        caption: "Modern enterprise campus representing organizational scale"
      },
      {
        url: "https://images.unsplash.com/photo-1656291716879-295102bc71e3?w=1200&q=80",
        caption: "Unified employee experience platform and manager dashboard"
      }
    ]
  },
  {
    id: "data-visualization-platform",
    title: "Rajmandala",
    description: "AI powered Geostrategic Intelligence & Situational Awareness Platform",
    tags: ["Governance", "Wildlife management"],
    category: "DPI & Governance",
    sector: "UI-UX Design",
    thumbnail: rajmandalaThumbnail,
    logoOverlay: rajmandalaLogoOverlay,
    icon: "Globe",
    year: "2024-2026",
    role: "Senior Product Designer, Visualization Specialist",
    context: "Climate scientists and policy advisors lacked intuitive tools to explore massive datasets (100TB+) and communicate findings to non-technical stakeholders. Existing tools required coding knowledge, limiting accessibility to researchers without programming backgrounds.",
    research: "Embedded with climate research team for 3 months to understand workflows. Interviewed 30+ researchers and policy advisors. Analyzed existing visualization tools in scientific and policy contexts. Identified need for 'progressive expertise'—interfaces that serve both novice and advanced users.",
    designSystem: "Designed layered interaction model supporting quick insights for novices and deep exploration for experts. Created library of climate-specific visualization patterns (time-series, geospatial, multi-variate). Developed color systems that are colorblind-safe while maintaining scientific accuracy.",
    prototyping: "Built working prototypes with real climate data using D3.js and React. Conducted testing with 40+ researchers in lab and field settings. Iterated on data filtering and export workflows. Created 'guided analysis' feature that suggests relevant visualizations based on data structure.",
    outcome: "Adopted by 500+ researchers across 20 institutions. Enabled non-technical policy makers to independently explore data, reducing analyst bottleneck by 60%. Used to create visualizations for 3 major policy reports influencing $2B+ in climate funding. Won 'Best Research Tool' award at Science Visualization Conference.",
    images: [
      {
        url: rajmandalaThumbnail,
        caption: "Layered interaction model enabling both quick insights and deep data exploration"
      },
      {
        url: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&q=80",
        caption: "Climate-specific visualization patterns with colorblind-safe, scientifically accurate color systems"
      }
    ]
  },
  {
    id: "public-benefits-application",
    title: "Aranyani",
    description: "Forest Intelligence Platform for human-wildlife conflict management",
    tags: ["Wildlife-conservation", "Case study"],
    category: "DPI & Governance",
    sector: "UI-UX Design",
    thumbnail: aranyaniThumbnail,
    logoOverlay: aranyaniLogoOverlay,
    icon: "FileText",
    year: "2024-2026",
    role: "Lead Product Designer",
    context: "State benefits programs had a complex 40+ page application with 85% abandonment rate. Low-income families and elderly applicants struggled with technical jargon and lacked access to required documentation. The redesign needed to balance simplification with legal compliance requirements.",
    research: "Conducted field research at community centers and libraries where residents apply for benefits. Interviewed 50+ applicants and social workers. Analyzed 200+ abandoned applications to identify drop-off points. Created journey maps highlighting emotional stress points and documentation barriers.",
    designSystem: "Designed progressive question flow with plain language and contextual help. Created mobile-first interface supporting offline completion and resume-later functionality. Built document upload system with multiple input methods (photo, scan, fax). Designed for screen readers and low-literacy users.",
    prototyping: "Built prototypes tested with 60+ applicants in community settings. Partnered with social workers for validation. Iterated on question sequencing and help text based on comprehension testing. Created multi-language support for 8 languages based on state demographics.",
    outcome: "Application completion rate increased from 15% to 78%. Average completion time reduced from 2.5 hours to 40 minutes. Support requests decreased 68%. System now processes 50K+ applications monthly. Received national recognition for inclusive design practices.",
    images: [
      {
        url: aranyaniThumbnail,
        caption: "Progressive question flow with plain language and contextual help"
      },
      {
        url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
        caption: "Multi-method document upload supporting diverse user needs"
      }
    ]
  },
  {
    id: "enterprise-analytics-dashboard",
    title: "Krishak",
    description: "AI assisted Advisory for Agriculture",
    tags: ["Agritech", "Weather forecast"],
    category: "DPI & Governance",
    sector: "Product Design",
    thumbnail: krishakThumbnail,
    logoOverlay: krishakLogoOverlay,
    icon: "BarChart3",
    year: "2024-2026",
    role: "Senior Product Designer",
    context: "Large enterprise clients struggled with fragmented analytics tools across departments. Executives needed unified view of KPIs while analysts required deep-dive capabilities. Challenge was designing for 10+ user personas with vastly different technical skills and business needs.",
    research: "Shadowed analysts and executives at 5 Fortune 500 companies. Conducted card sorting exercises to understand mental models for data organization. Analyzed usage patterns from legacy analytics tools. Created persona spectrum from C-suite to data analysts with distinct needs and workflows.",
    designSystem: "Developed modular dashboard system with drag-and-drop customization. Created progressive disclosure patterns for complex data while maintaining scannable overview. Designed role-based templates pre-configured for common use cases. Built accessible color system for charts supporting colorblind users.",
    prototyping: "Built interactive prototypes with realistic data sets. Conducted A/B testing on 3 navigation paradigms with 200+ users. Iterated on drill-down interactions and data export workflows. Created onboarding flow reducing time-to-first-insight from 2 days to 20 minutes.",
    outcome: "Deployed to 8 Fortune 500 clients serving 15,000+ users. Increased daily active users by 240% compared to legacy tools. Reduced time to generate executive reports from 8 hours to 15 minutes. NPS score of 72. Platform contributed to $180M in product revenue.",
    images: [
      {
        url: krishakThumbnail,
        caption: "Modular dashboard with role-based templates and customization"
      },
      {
        url: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&q=80",
        caption: "Progressive disclosure patterns balancing overview and deep analysis"
      }
    ]
  },
  {
    id: "ai-content-moderation",
    title: "Parva Darshini",
    description: "Reclaiming Bharatiya time-keeping via innovative visualisation of Panchang",
    tags: ["Indian Timekeeping", "Vedic Astronomy"],
    category: "IKS & Culture",
    sector: "Digital Illustration",
    thumbnail: parvaDarshiniThumbnail,
    logoOverlay: parvaDarshiniLogoOverlay,
    icon: "ShieldAlert",
    year: "2024-2026",
    role: "Product Designer",
    context: "Social platform needed to scale content moderation while protecting moderator mental health. Existing tools lacked context, causing moderator burnout and inconsistent decisions. Required ethical AI design that maintained human agency and supported moderator wellbeing.",
    research: "Conducted sensitive research with 25+ content moderators. Partnered with mental health experts to understand trauma impacts. Analyzed 10,000+ moderation decisions to identify patterns. Created ethical framework for AI-assisted decision making that prioritized human judgment.",
    designSystem: "Designed queue management system grouping similar content to reduce context-switching trauma. Created AI confidence indicators showing uncertainty to prompt human review. Built wellness features including mandatory breaks and access to support resources. Designed audit trail for transparency and quality assurance.",
    prototyping: "Built prototypes with real moderation scenarios (sanitized). Conducted trauma-informed testing with moderators. Iterated on AI explanation patterns to build trust and understanding. Created customizable workspace allowing moderators to control pacing and content types.",
    outcome: "Moderator accuracy improved from 87% to 96%. Processing time per case reduced 45% while maintaining quality. Moderator satisfaction increased from 2.8 to 4.2/5. 60% reduction in reported emotional distress. AI-human collaboration model adopted as company standard for sensitive automation.",
    images: [
      {
        url: parvaDarshiniThumbnail,
        caption: "AI confidence indicators and human-centered queue management"
      },
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
        caption: "Wellness features and trauma-informed design patterns"
      }
    ]
  },
  {
    id: "gupt",
    title: "गुप्त",
    description: "Indian cypher alphabet system",
    tags: ["Cryptography", "Language"],
    category: "IKS & Culture",
    sector: "Game Design",
    thumbnail: guptThumbnail,
    logoOverlay: guptLogoOverlay,
    icon: "Lock",
    year: "2024-2026",
    role: "Product Designer",
    context: "Indian cypher alphabet system development project.",
    research: "Research conducted on traditional Indian cryptographic methods and modern applications.",
    designSystem: "Designed intuitive interface for cipher encoding and decoding with educational components.",
    prototyping: "Built interactive prototypes demonstrating cipher functionality and learning pathways.",
    outcome: "Successfully developed a comprehensive cypher system preserving traditional Indian cryptographic knowledge.",
    images: [
      {
        url: guptThumbnail,
        caption: "Cipher alphabet system interface"
      },
      {
        url: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1200&q=80",
        caption: "Cryptographic encoding visualization"
      }
    ]
  },
  {
    id: "kashi",
    title: "Kashi",
    description: "Board game for learning Purushartha model of life",
    tags: ["Indic Knowledge", "Living culture", "Game Design"],
    category: "IKS & Culture",
    sector: "Communication",
    thumbnail: kashiThumbnail,
    logoOverlay: kashiLogoOverlay,
    icon: "Dices",
    year: "2024-2026",
    role: "Game Designer & Product Designer",
    context: "Educational board game project designed to teach the Purushartha model of life through interactive gameplay.",
    research: "Researched traditional Indic philosophical concepts and modern game design principles to create an engaging learning experience.",
    designSystem: "Designed game mechanics, board layout, and visual identity that authentically represents the four Purusharthas: Dharma, Artha, Kama, and Moksha.",
    prototyping: "Created multiple prototypes and conducted playtesting sessions to refine game mechanics and educational value.",
    outcome: "Successfully developed an engaging board game that makes ancient wisdom accessible and relevant to contemporary learners.",
    images: [
      {
        url: kashiThumbnail,
        caption: "Board game design and gameplay mechanics"
      },
      {
        url: "https://images.unsplash.com/photo-1611891487950-0bc5a3e7f76f?w=1200&q=80",
        caption: "Educational framework visualizing the Purushartha model"
      }
    ]
  },
  {
    id: "srujanalaya",
    title: "Srujanalaya",
    description: "Storytelling and Digital Art Platform",
    tags: ["Sacred Digital", "Iconography"],
    category: "IKS & Culture",
    sector: "Digital Illustration",
    thumbnail: srujanalayanThumbnail,
    logoOverlay: srujanalayanLogoOverlay,
    icon: "Palette",
    year: "2024-2026",
    role: "Product Designer & Platform Architect",
    context: "Digital platform designed to preserve and share sacred art and storytelling traditions through modern technology.",
    research: "Explored traditional iconographic practices and digital storytelling methods to create a platform that honors cultural heritage while embracing contemporary tools.",
    designSystem: "Developed intuitive tools for digital artists and storytellers to create, curate, and share sacred art while maintaining authenticity and cultural sensitivity.",
    prototyping: "Built collaborative features enabling artists and communities to co-create and preserve traditional narratives in digital formats.",
    outcome: "Created a thriving platform that bridges traditional sacred art practices with digital innovation, serving as a cultural preservation tool.",
    images: [
      {
        url: srujanalayanThumbnail,
        caption: "Digital art creation and storytelling interface"
      },
      {
        url: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=1200&q=80",
        caption: "Sacred iconography gallery and curation tools"
      }
    ]
  },
  {
    id: "pravaha",
    title: "प्रवाह (Pravāha)",
    description: "Dharmic Design & Futures",
    tags: ["Indic Knowledge system", "Manifestation", "Design Pedagogy"],
    category: "IKS & Culture",
    sector: "Communication",
    thumbnail: "https://images.unsplash.com/photo-1605606582211-088f336964ed?w=800&q=80",
    logoOverlay: pravahaLogoOverlay,
    icon: "BookOpen",
    year: "2024-2026",
    role: "Design Educator & Strategic Advisor",
    context: "Educational framework integrating Indic knowledge systems with contemporary design thinking to create culturally grounded futures.",
    research: "Deep exploration of dharmic principles and their application to modern design pedagogy, creating bridges between ancient wisdom and future-focused practice.",
    designSystem: "Developed comprehensive curriculum and manifestation frameworks that ground design education in Indic knowledge systems and cultural values.",
    prototyping: "Created workshops, teaching materials, and collaborative learning experiences that embody dharmic design principles.",
    outcome: "Established new pedagogical approaches that honor traditional knowledge while empowering designers to shape culturally authentic futures.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1605606582211-088f336964ed?w=1200&q=80",
        caption: "Dharmic design framework and pedagogy materials"
      },
      {
        url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&q=80",
        caption: "Manifestation principles and futures thinking workshops"
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
    mergedProjects = projects.map(project => {
      if (editsData[project.id]) {
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
  projects.forEach(p => categories.add(p.category));
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
  projects.forEach(p => sectors.add(p.sector));
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