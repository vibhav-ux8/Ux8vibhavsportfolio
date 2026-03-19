import predictThumbnail from "figma:asset/e929fd97ca6cf96cdf890fac8668f5c1bf76e312.png";
import predictLogo from "figma:asset/f0e549839af9b3f17bcbbdb771522c6d05f6a431.png";
import predictLogoOverlay from "figma:asset/805085f5019797d0c845ddc4bb7cea53d9066e58.png";
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
    images: []
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
  },
  {
    id: "education-learning-platform",
    title: "K-12 Digital Learning Platform",
    description: "Redesigned online learning platform for 500+ schools, improving student engagement and supporting remote education equity.",
    tags: ["Digital Public Infrastructure", "Accessibility"],
    category: "DPI & Governance",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    icon: "GraduationCap",
    year: "2024-2026",
    role: "Product Designer",
    context: "School districts needed equitable digital learning platform supporting in-person, remote, and hybrid education. Existing tools weren't accessible for students with disabilities or those with limited home internet. Platform needed to work across devices with varying capabilities.",
    research: "Conducted research with teachers, students, and parents across 15 schools. Observed classroom and home learning environments. Identified digital divide affecting 40% of students. Created accessibility requirements supporting students with visual, auditory, cognitive, and motor disabilities.",
    designSystem: "Designed offline-first architecture syncing when connection available. Created low-bandwidth mode with optimized media. Built universal design patterns supporting screen readers, keyboard navigation, and switch controls. Designed parent dashboard in 12 languages with literacy-appropriate content.",
    prototyping: "Tested prototypes with students ages 5-18 including those with disabilities. Conducted co-design sessions with special education teachers. Validated on low-end devices and limited bandwidth. Iterated on gamification elements ensuring they supported learning rather than distraction.",
    outcome: "Adopted by 500+ schools serving 200,000+ students. Student engagement metrics improved 85% vs legacy platform. Students with disabilities reported 4.5/5 satisfaction (vs 2.1 previously). Platform maintained 99.8% uptime including low-bandwidth scenarios. Received accessibility commendation from Department of Education.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
        caption: "Offline-first architecture with universal design patterns"
      },
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
        caption: "Multi-language parent dashboard supporting family engagement"
      }
    ]
  },
  {
    id: "fintech-mobile-banking",
    title: "Mobile Banking App for Underbanked Communities",
    description: "Created inclusive mobile banking experience serving first-time banking users with focus on financial literacy and trust.",
    tags: ["Fintech", "Accessibility"],
    category: "Services",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    icon: "Wallet",
    year: "2024-2026",
    role: "Product Designer",
    context: "Fintech startup targeting underbanked populations who distrust traditional banks or lack access. Users had limited banking knowledge and concerns about fees, security, and complexity. Design needed to build trust while educating users on financial concepts.",
    research: "Conducted ethnographic research in underserved communities. Interviewed 80+ first-time banking users about pain points and fears. Partnered with financial literacy organizations to understand educational needs. Analyzed competitor apps through lens of inclusive design.",
    designSystem: "Designed progressive onboarding explaining banking concepts in plain language. Created transparent fee structure visible before every action. Built security features that felt protective rather than intimidating. Designed bilingual interface with culturally relevant imagery and examples.",
    prototyping: "Tested prototypes with 60+ users including ESL speakers and elderly users. Conducted longitudinal diary studies tracking confidence over first 90 days. Iterated on financial education content based on comprehension testing. Created trust-building features like immediate transaction confirmations.",
    outcome: "Acquired 100,000+ users in first year with 82% retention rate. Users reported 90% confidence in banking tasks vs 45% at onboarding. Zero-fee structure and transparent design led to 4.8/5 trust rating. Featured in Forbes as model for inclusive fintech design. 75% of users referred family members.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
        caption: "Progressive onboarding with plain-language financial education"
      },
      {
        url: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=1200&q=80",
        caption: "Transparent fee structure and trust-building security features"
      }
    ]
  },
  {
    id: "supply-chain-platform",
    title: "Supply Chain Management Platform",
    description: "Designed logistics platform for global manufacturers, optimizing supply chain visibility and reducing delivery delays by 40%.",
    tags: ["Governance", "Digital Investigation"],
    category: "e-commerce",
    sector: "Product Design",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    icon: "Truck",
    year: "2024-2026",
    role: "Product Designer",
    context: "Global manufacturing company struggled with supply chain visibility across 200+ suppliers and 50+ warehouses. Delays cost millions annually and customer satisfaction suffered. Needed unified platform for tracking, forecasting, and rapid response to disruptions.",
    research: "Interviewed supply chain managers, warehouse operators, and logistics coordinators across 3 continents. Mapped current workflows identifying 15+ disconnected tools. Analyzed historical delay data to identify patterns. Shadowed teams during crisis response situations.",
    designSystem: "Designed real-time tracking dashboard with predictive delay alerts. Created role-based views for different supply chain stakeholders. Built mobile-first interface for warehouse floor use. Designed exception-focused UI highlighting issues requiring immediate attention.",
    prototyping: "Created interactive prototypes with simulated supply chain data. Tested with 30+ users in warehouse and office settings. Iterated on alert prioritization and mobile workflows. Built communication features enabling cross-team coordination during disruptions.",
    outcome: "Reduced delivery delays by 40% in first 6 months. Improved supply chain visibility from 60% to 98%. Cut emergency shipping costs by $2.3M annually. User satisfaction at 4.6/5. Platform now used by 500+ employees across global operations.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80",
        caption: "Real-time tracking dashboard with predictive analytics"
      },
      {
        url: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80",
        caption: "Mobile interface for warehouse operations"
      }
    ]
  },
  {
    id: "nonprofit-volunteer-platform",
    title: "Dummy Title",
    description: "This project is work in progress and will be updated soon",
    tags: ["Digital Public Infrastructure", "Governance"],
    category: "Services",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    icon: "Image",
    year: "2026",
    role: "Lead Designer",
    context: "Nonprofits struggled with volunteer management using spreadsheets and email. High volunteer drop-off due to poor communication and complicated scheduling. Organizations needed affordable, easy-to-use solution for small teams with limited technical skills.",
    research: "Partnered with 20 nonprofits to understand workflows. Interviewed 100+ volunteers about their experiences. Identified key friction points: unclear expectations, scheduling conflicts, and lack of impact visibility. Observed volunteer coordination in action at community events.",
    designSystem: "Designed intuitive scheduling system with calendar sync and automated reminders. Created volunteer profiles showing impact metrics and achievements. Built mobile-first interface for on-the-go coordination. Designed admin dashboard optimized for non-technical users.",
    prototyping: "Co-designed with nonprofit staff through iterative workshops. Tested prototypes with volunteers across age ranges 18-75. Simplified onboarding flow from 10 steps to 3. Added gamification elements celebrating volunteer contributions.",
    outcome: "Adopted by 200+ nonprofits coordinating 50,000+ volunteers. Volunteer retention increased 65%. No-show rates dropped from 35% to 8%. Admin time spent on coordination reduced by 70%. Platform won Social Impact Design Award 2021.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80",
        caption: "Volunteer scheduling and impact tracking"
      },
      {
        url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
        caption: "Admin dashboard for nonprofit coordinators"
      }
    ]
  },
  {
    id: "real-estate-search-platform",
    title: "Dummy Title",
    description: "This project is work in progress and will be updated soon",
    tags: ["Fintech", "Digital Investigation", "Generative AI"],
    category: "Services",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    icon: "Image",
    year: "2026",
    role: "Product Designer",
    context: "Real estate platform wanted to differentiate through personalized AI recommendations. Traditional search was overwhelming with 10,000+ listings. Buyers spent months searching and often missed ideal properties due to generic filters.",
    research: "Shadowed 30+ homebuyers throughout their search journey. Interviewed real estate agents to understand buyer behavior patterns. Analyzed search data revealing that traditional filters missed 60% of buyer preferences. Conducted preference-mapping exercises with diverse buyer personas.",
    designSystem: "Designed conversational onboarding capturing lifestyle preferences beyond typical filters. Created swipe-based interface with ML learning from each interaction. Built map-first exploration with neighborhood insights. Designed saved search alerts with smart timing based on listing patterns.",
    prototyping: "Tested AI recommendation accuracy with 100+ real buyers. Iterated on preference-capture questions to improve relevance. Built prototypes with increasing AI transparency showing 'why' behind recommendations. Validated mobile and desktop experiences.",
    outcome: "Reduced average time-to-find from 3 months to 3 weeks. Recommendation relevance rated 4.4/5 by users. 85% of users found property through AI suggestions vs traditional search. Platform engagement increased 3x. Featured in TechCrunch as innovative proptech solution.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200&q=80",
        caption: "AI-powered recommendations with lifestyle-based preferences"
      },
      {
        url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80",
        caption: "Map-first exploration with neighborhood insights"
      }
    ]
  },
  {
    id: "restaurant-pos-system",
    title: "Dummy Title",
    description: "This project is work in progress and will be updated soon",
    tags: ["Fintech", "Governance"],
    category: "Services",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    icon: "Image",
    year: "2026",
    role: "Senior Product Designer",
    context: "Restaurant chains needed modern POS to replace outdated systems causing errors and slow service. High staff turnover required minimal training time. System needed to work in fast-paced, high-stress environments with diverse menu complexity.",
    research: "Observed restaurant operations during peak and off-peak hours at 15 locations. Interviewed servers, kitchen staff, and managers. Timed existing workflows and identified bottlenecks. Analyzed error patterns showing 15% of orders had modifications entered incorrectly.",
    designSystem: "Designed touch-optimized interface for speed and accuracy. Created visual menu navigation reducing clicks and cognitive load. Built smart order modification system preventing common errors. Designed kitchen display system integrating with order flow.",
    prototyping: "Built working prototypes tested in live restaurant environments. Conducted time-motion studies comparing new vs old system. Iterated based on server feedback during high-stress service periods. Validated across different restaurant formats (casual, fine dining, quick service).",
    outcome: "Order accuracy improved from 85% to 98%. Service time reduced 35% during peak hours. New server training time cut from 2 days to 4 hours. Deployed to 500+ restaurant locations. Staff satisfaction increased from 3.1 to 4.5/5.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80",
        caption: "Touch-optimized order entry interface"
      },
      {
        url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80",
        caption: "Integrated kitchen display system"
      }
    ]
  },
  {
    id: "event-management-platform",
    title: "Dummy Title",
    description: "This project is work in progress and will be updated soon",
    tags: ["Governance", "Digital Public Infrastructure", "Accessibility"],
    category: "Services",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    icon: "Image",
    year: "2026",
    role: "Product Designer",
    context: "Event management company needed unified platform for registration, networking, and engagement. Existing solutions were fragmented requiring 5+ separate tools. Organizers spent excessive time on logistics instead of attendee experience.",
    research: "Attended 10 major conferences observing attendee behavior and pain points. Interviewed event organizers about logistical challenges. Surveyed 500+ attendees about their event experiences. Mapped entire event lifecycle from registration to post-event follow-up.",
    designSystem: "Designed comprehensive platform covering registration, agenda building, networking, and analytics. Created personalized attendee experience with AI-powered session recommendations. Built networking features enabling meaningful connections. Designed organizer dashboard for real-time event management.",
    prototyping: "Piloted at 3 conferences with 1,000+ attendees each. Tested networking features in live event settings. Iterated on notification strategy to enhance engagement without overwhelming. Validated mobile-first approach for on-site use.",
    outcome: "Managed 100+ events with 100,000+ total attendees. Attendee satisfaction increased 45% vs previous solutions. Networking connections per attendee increased from 3 to 12. Organizer setup time reduced 60%. Platform generated $5M revenue in year two.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
        caption: "Personalized attendee experience with session recommendations"
      },
      {
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80",
        caption: "Networking features and real-time event analytics"
      }
    ]
  },
  {
    id: "fleet-management-system",
    title: "Dummy Title",
    description: "This project is work in progress and will be updated soon",
    tags: ["Governance", "Digital Investigation"],
    category: "Services",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    icon: "Image",
    year: "2026",
    role: "Product Designer",
    context: "Delivery company with 500+ vehicles lacked efficient fleet management. Inefficient routing increased fuel costs and delivery times. Dispatchers manually assigned routes causing delays and driver frustration. Needed system balancing automation with driver preferences.",
    research: "Rode along with drivers to understand daily challenges. Interviewed dispatchers about routing decisions and constraints. Analyzed historical route data identifying inefficiencies. Mapped driver personas from veterans to new hires with different needs.",
    designSystem: "Designed AI-powered route optimization with manual override capability. Created driver mobile app with turn-by-turn navigation and delivery confirmation. Built dispatch dashboard with real-time fleet visibility. Designed for poor connectivity scenarios common in delivery areas.",
    prototyping: "Tested prototypes with 50+ drivers across urban and rural routes. Validated dispatch interface with operations team. Iterated on route modification workflows based on field testing. Built offline capabilities for areas with poor signal.",
    outcome: "Reduced fuel costs by 25% through optimized routing. Delivery times improved 30% with better route planning. Driver satisfaction increased from 3.2 to 4.4/5. System managed 500+ vehicles making 10,000+ daily deliveries. ROI achieved in 8 months.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=1200&q=80",
        caption: "Real-time fleet tracking and route optimization"
      },
      {
        url: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80",
        caption: "Driver mobile app with navigation and delivery workflow"
      }
    ]
  },
  {
    id: "telehealth-consultation-platform",
    title: "Dummy Title",
    description: "This project is work in progress and will be updated soon",
    tags: ["Digital Public Infrastructure", "Cybersecurity"],
    category: "Services",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    icon: "Image",
    year: "2026",
    role: "Senior Product Designer",
    context: "Rural communities lacked access to medical specialists requiring 2+ hour drives for consultations. Healthcare system needed telehealth solution that was HIPAA-compliant, accessible to elderly patients, and worked with limited rural internet bandwidth.",
    research: "Conducted research in rural clinics observing technology use by elderly patients. Interviewed patients about barriers to healthcare access. Partnered with physicians to understand clinical workflow needs. Tested bandwidth limitations in target areas.",
    designSystem: "Designed simple video interface optimized for low bandwidth. Created accessibility features for elderly users including large text and simplified navigation. Built patient intake workflow reducing form fatigue. Designed provider dashboard integrating with EHR systems.",
    prototyping: "Tested prototypes with 60+ patients including elderly and non-tech-savvy users. Validated with physicians during mock consultations. Iterated on video quality vs bandwidth tradeoffs. Built fallback to audio-only for very poor connections.",
    outcome: "Facilitated 50,000+ virtual consultations saving patients 100,000+ hours of travel time. Patient satisfaction rated 4.7/5. Reduced specialist wait times from 6 weeks to 1 week. Platform achieved HIPAA certification and 99.9% uptime. Expanded to 200+ rural clinics.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&q=80",
        caption: "Low-bandwidth video interface optimized for rural connectivity"
      },
      {
        url: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80",
        caption: "Provider dashboard with EHR integration"
      }
    ]
  },
  {
    id: "construction-project-management",
    title: "Dummy Title",
    description: "This project is work in progress and will be updated soon",
    tags: ["Governance", "Digital Investigation", "Accessibility"],
    category: "Services",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    icon: "Image",
    year: "2026",
    role: "Product Designer",
    context: "Construction company managed projects using paper blueprints and phone calls leading to miscommunication and delays. Field workers needed mobile-first solution working in harsh conditions (no connectivity, outdoor visibility, gloves). Office staff required project oversight across 50+ simultaneous projects.",
    research: "Spent time on construction sites observing workflows in various weather and lighting conditions. Interviewed project managers, foremen, and field workers. Documented communication breakdowns causing delays. Tested devices in dusty, wet, and high-glare conditions.",
    designSystem: "Designed rugged mobile interface readable in direct sunlight with glove-friendly large touch targets. Created offline-first architecture syncing when connection available. Built photo documentation workflow for quality assurance. Designed dashboard giving project managers visibility across all sites.",
    prototyping: "Field-tested prototypes at 5 active construction sites. Validated with workers wearing gloves and safety equipment. Iterated on offline functionality and sync conflict resolution. Tested device durability in real conditions.",
    outcome: "Reduced project delays by 40% through better communication. Photo documentation reduced disputes by 70%. Adoption rate of 95% among field workers (historically resistant to tech). Managed 200+ projects worth $500M+ in construction value. Industry recognition for field-first design.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
        caption: "Rugged mobile interface for field workers"
      },
      {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
        caption: "Project management dashboard for oversight"
      }
    ]
  },
  {
    id: "museum-interactive-guide",
    title: "Dummy Title",
    description: "This project is work in progress and will be updated soon",
    tags: ["Digital Public Infrastructure", "Accessibility"],
    category: "Services",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    icon: "Image",
    year: "2026",
    role: "Product Designer",
    context: "Major museum wanted to enhance visitor experience with digital guide replacing outdated audio tours. Needed to appeal to diverse audiences from children to scholars. Goal was increasing engagement without detracting from actual exhibits.",
    research: "Observed 100+ museum visitors tracking engagement patterns. Interviewed visitors about current audio guide experience. Partnered with curators to understand educational goals. Analyzed visitor flow and popular vs ignored exhibits.",
    designSystem: "Designed progressive content layers serving casual visitors and enthusiasts. Created AR features revealing hidden details and historical context. Built accessible interface supporting screen readers and audio descriptions. Designed for multiple languages and reading levels.",
    prototyping: "Conducted user testing with diverse visitor demographics in museum setting. Tested AR features to ensure they enhanced rather than distracted from exhibits. Iterated on navigation helping visitors discover less popular exhibits. Validated battery life for full museum visit.",
    outcome: "Increased visitor engagement by 180% measured through interaction rates. Average visit duration increased from 75 to 120 minutes. 4.6/5 visitor satisfaction. 40% increase in discovery of secondary exhibits. App downloaded by 85% of visitors. Won Museums + Heritage Award.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1200&q=80",
        caption: "AR features revealing exhibit context and hidden details"
      },
      {
        url: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=1200&q=80",
        caption: "Multi-level content serving diverse visitor interests"
      }
    ]
  },
  {
    id: "insurance-claims-processing",
    title: "Dummy Title",
    description: "This project is work in progress and will be updated soon",
    tags: ["Fintech", "Governance"],
    category: "Services",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    icon: "Image",
    year: "2026",
    role: "Product Designer",
    context: "Insurance company had legacy claims process requiring 15+ steps and manual handoffs. 30-day average processing time hurt customer satisfaction and increased costs. Needed to balance automation with human judgment for complex claims.",
    research: "Shadowed claims adjusters through entire workflow. Mapped all process steps identifying bottlenecks and unnecessary handoffs. Interviewed customers about claims experience pain points. Analyzed data on claim types, approval rates, and common issues.",
    designSystem: "Designed intelligent workflow routing claims by complexity. Created unified interface consolidating 5 separate tools adjusters were using. Built smart document processing with OCR and data extraction. Designed exception queues for claims requiring human review.",
    prototyping: "Tested prototypes with 30+ claims adjusters processing real claims. Validated automation accuracy rates before deployment. Iterated on dashboard design for supervisors monitoring team performance. Built training mode for new adjuster onboarding.",
    outcome: "Reduced processing time from 30 days to 5 days (83% improvement). Claims accuracy improved from 92% to 98%. Customer satisfaction increased from 3.1 to 4.5/5. Adjuster productivity improved 200%. Automation handled 60% of simple claims end-to-end.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
        caption: "Intelligent claim routing and unified adjuster interface"
      },
      {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
        caption: "Automated document processing with smart data extraction"
      }
    ]
  },
  {
    id: "smart-home-control-app",
    title: "Dummy Title",
    description: "This project is work in progress and will be updated soon",
    tags: ["Cybersecurity", "Digital Investigation"],
    category: "Services",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    icon: "Image",
    year: "2026",
    role: "Senior Product Designer",
    context: "Smart home device manufacturers each had separate apps creating fragmented user experience. Users needed to juggle 5+ apps for lights, thermostat, security, entertainment. Non-technical users found setup complicated leading to low smart home adoption.",
    research: "Interviewed 80+ smart home users about their current setups and frustrations. Observed in-home use identifying usability issues. Analyzed app store reviews for competing solutions. Conducted card sorting to understand user mental models for device grouping.",
    designSystem: "Designed unified interface with room-based organization matching how people think about homes. Created simple automation builder with natural language-like rules. Built voice control integration for hands-free operation. Designed setup wizard reducing configuration from 30 minutes to 3 minutes.",
    prototyping: "Tested prototypes in real homes with diverse smart device setups. Validated automation builder with non-technical users. Iterated on device discovery and pairing process. Conducted longitudinal studies tracking long-term usage patterns.",
    outcome: "Unified control of 50+ device types from major brands. User satisfaction rated 4.5/5 vs 2.8/5 for individual manufacturer apps. Setup time reduced 90%. Daily active users 3x higher than previous solutions. App ranked #1 in smart home category with 2M+ downloads.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=1200&q=80",
        caption: "Room-based device organization and unified control"
      },
      {
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
        caption: "Simple automation builder with natural language rules"
      }
    ]
  },
  {
    id: "language-learning-app",
    title: "Dummy Title",
    description: "This project is work in progress and will be updated soon",
    tags: ["Digital Public Infrastructure", "Generative AI", "Accessibility"],
    category: "Services",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    icon: "Image",
    year: "2026",
    role: "Product Designer",
    context: "Language learning apps had high initial downloads but 85% abandonment within first month. One-size-fits-all curriculum didn't adapt to individual learning pace or goals. Users needed motivation and felt disconnected from practical language use.",
    research: "Interviewed 100+ language learners about their goals and barriers. Analyzed learning patterns from 50,000+ users. Partnered with linguists to understand effective learning methodology. Studied gamification in education identifying engagement drivers that actually aid learning.",
    designSystem: "Designed adaptive curriculum that adjusts difficulty based on performance. Created contextual learning with real-world scenarios relevant to user goals. Built spaced repetition system optimized for retention. Designed social features connecting learners with native speakers.",
    prototyping: "Tested curriculum with diverse learner profiles. Validated AI adaptation with learning science experts. Iterated on gamification ensuring it supported learning rather than just engagement. Conducted A/B tests on motivation and reminder strategies.",
    outcome: "Achieved 75% course completion rate vs 15% industry average. Users reached conversational fluency 40% faster than traditional methods. 4.7/5 app store rating with 500K+ reviews. Daily active user rate of 65%. Featured as Apple App of the Day.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
        caption: "Adaptive curriculum personalizing to individual learning pace"
      },
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
        caption: "Social features connecting learners with native speakers"
      }
    ]
  },
  {
    id: "retail-inventory-management",
    title: "Dummy Title",
    description: "This project is work in progress and will be updated soon",
    tags: ["Governance", "Digital Investigation"],
    category: "Services",
    sector: "UI-UX Design",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    icon: "Image",
    year: "2026",
    role: "Product Designer",
    context: "Retail chain with 300+ stores struggled with inventory management. Frequent stockouts of popular items lost sales while overstock tied up capital. Manual ordering process relied on gut feeling rather than data. Needed ML solution that store managers could trust and understand.",
    research: "Interviewed store managers, warehouse staff, and purchasing teams. Analyzed 2 years of sales and inventory data. Observed in-store operations during different seasons. Identified that managers didn't trust previous automated systems due to lack of transparency.",
    designSystem: "Designed ML forecasting system with explainable recommendations. Created visual inventory dashboard showing current stock, forecasts, and suggested orders. Built exception alerts for unusual patterns requiring attention. Designed mobile interface for store managers to adjust orders based on local knowledge.",
    prototyping: "Piloted with 10 stores comparing performance against control stores. Tested forecast accuracy and manager trust levels. Iterated on explanation features showing 'why' behind recommendations. Validated mobile ordering workflow during store operations.",
    outcome: "Reduced stockouts by 60% and excess inventory by 35%. Increased inventory turnover rate by 40%. Manager adoption rate of 92% due to transparent AI. Saved $4.2M annually in inventory costs. Rolled out to all 300+ stores. System won Retail Technology Innovation Award.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=1200&q=80",
        caption: "ML forecasting with explainable recommendations"
      },
      {
        url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
        caption: "Mobile ordering interface for store managers"
      }
    ]
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
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

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(p => p.category === category);
}