import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { LogOut, FileText, FolderOpen, PlusCircle, Home, User, Mail } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"home" | "about" | "work" | "blog" | "contact">("home");

  // Home Page State
  const [homeData, setHomeData] = useState(() => {
    const saved = localStorage.getItem("cmsHomeData");
    return saved ? JSON.parse(saved) : {
      hero: {
        logo: "../../imports/UX8_Logo_2.svg",
        heading1: "Envisioning smart UI-UX",
        heading2: "with contextual awareness",
        subtitle: "Bridging AI innovation, enterprise systems, and public-sector digital infrastructure through strategic design leadership.",
        button1: "View Projects",
        button2: "Let's Connect"
      },
      approach: {
        heading: "Design is the bridge between complex problems and elegant solutions that scale",
        description: "I transform organizational challenges into intuitive experiences through strategic systems thinking, rigorous research, and human-centered design."
      },
      stats: [
        { value: "10+", label: "Years Experience", icon1: "Clock", icon2: "TrendingUp" },
        { value: "15+", label: "Team Members Led", icon1: "Users", icon2: "Network" },
        { value: "80K", label: "Users Impacted", icon1: "BarChart3", icon2: "Target" },
        { value: "25+", label: "Major Projects", icon1: "Zap", icon2: "Lightbulb" }
      ],
      process: {
        heading: "Quick Design Process",
        description: "A rigorous, iterative approach balancing user needs with business objectives",
        steps: [
          { number: "01", title: "Understand Context", desc: "Deep user insights and stakeholder alignment through contextual inquiry" },
          { number: "02", title: "Ideate Solutions", desc: "Collaborative exploration of solutions through co-design workshops" },
          { number: "03", title: "Build Prototype", desc: "Rapid prototyping with real users ensuring product-market fit" },
          { number: "04", title: "Observe User Behavior", desc: "Testing and validation with data-driven insights and user feedback" },
          { number: "05", title: "Refine Product", desc: "Scalable systems with measurable impact and continuous iteration" }
        ]
      },
      organizations: {
        heading: "Impact Beyond Design",
        description: "Contributing to organizations and initiatives that shape the future of design, culture, and technology",
        items: [
          { name: "UX8", icon: "../../imports/UX8_icon.svg", desc: "Fostering design excellence and innovation through community-driven initiatives and collaborative learning experiences.", tag: "Design Community" },
          { name: "Dharmic Futures", icon: "figma:asset/3814864fe79b8dfaf3cac21e9286d36e89b8d371.png", desc: "Exploring intersections of technology, ethics, and cultural wisdom to build more inclusive and sustainable digital futures.", tag: "Research & Ethics" },
          { name: "सृजनालय", icon: "figma:asset/b923f899c2bae651111cebc7798a8737cf209542.png", desc: "Championing creative expression and cultural preservation through design, connecting traditional wisdom with contemporary practice.", tag: "Cultural Design" }
        ]
      },
      about: {
        heading: "About",
        intro: "Design Leader with 10+ years of experience across UI/UX, Product Design, Visual Design, and Strategic Design, delivering digital products designed for scale, performance, and measurable impact across Digital Public Infrastructure, Cybersecurity, Defence, FinTech, Governance, and B2B/B2C platforms.",
        specialization: "I specialise in AI Product Design, Agentic AI Interfaces, Human-AI Interaction, Explainable AI (XAI), Design Systems, and Data-Driven Decision Platforms — translating complex, high-stakes systems into intuitive, secure, and trust-centered user experiences built for global scalability.",
        approach: "My approach combines first-principles thinking, human-centered design, systems thinking, and responsible AI integration, enabling products that scale across users, geographies, and enterprise environments.",
        linkText: "Learn more about my background",
        email: "vibhav.ux8@gmail.com",
        linkedin: "https://www.linkedin.com/in/vibhav-kamat-504460153/"
      },
      contact: {
        heading: "Get in Touch",
        description: "I'm always interested in hearing about new opportunities, collaborations, or just connecting with fellow designers and product leaders.",
        buttonText: "Send Message",
        successMessage: "Thank you for reaching out! I'll get back to you within 24-48 hours."
      }
    };
  });

  // About Page State
  const [aboutData, setAboutData] = useState(() => {
    const saved = localStorage.getItem("cmsAboutData");
    return saved ? JSON.parse(saved) : {
      hero: {
        name: "Vibhav Kamat",
        image: "figma:asset/1804ff83437d465d1844d7bdefee7249fb9aa493.png",
        lead: "I have always been curious about the relationship between humans, technology, the times and environments we live in.",
        journey: "My journey in design has been shaped by observing how people interact with systems—social, cultural, and technological.",
        location: "Goa, India",
        education: "M.Des (New Media)",
        focus: "AI Systems, Governance, Nation Building"
      },
      biography: {
        background1: "I graduated from Goa College of Art, where I studied Applied Art and Audio-Visual Communication, and later continued my Master's journey with the National Institute of Design (NID) as part of the New Media Design program. These experiences helped me explore design not merely as visual expression, but as a way of understanding complex relations and interactions between people, technology, policy, economy and culture.",
        background2: "Growing up in Antruz Mahal in Goa, a region deeply rooted in cultural traditions and the temple ecosystem, gave me a unique exposure to an integral and rhythmic community life, social networks and profound meanings. Observing everyday life in such a culturally rich environment cultivated a deep curiosity about nature, ancestral wisdom, human behavior, and the philosophy of technology.",
        practice1: "Over the years, my work has taken me into the technology sector across critical domains related to nation-building and security. Working with law enforcement agencies, governance systems, and intelligence contexts, I have been involved in designing AI and machine-learning driven tools for high-pressure environments, where decisions carry real-world consequences.",
        practice2: "These experiences shaped my perspective on technology, not just as innovation, but as responsibility. Designing for such contexts requires clarity, resilience, and a deep understanding of how emerging exponential technologies affect people and institutions."
      },
      philosophy: {
        pullQuote: "My interest lies in building ideas and systems that matter over the long duration, tools and experiences that contribute meaningfully to society, governance, collective progress and prosperity.",
        evolution: "With the impact of AI tools, the domain of design has evolved from research, synthesis, ideation, prototyping and more to direct building, observation and refinement, whereas only some fundamental aspects of human realities remain constant."
      },
      approach: {
        intro: "Creating scalable solutions through strategic thinking, collaborative leadership, and inclusive design practices.",
        principles: [
          { number: "01", title: "Strategic Systems Thinking", desc: "I design at the intersection of user needs, business goals, and technical constraints—creating scalable solutions that serve diverse stakeholders across complex organizations." },
          { number: "02", title: "Cross-Functional Leadership", desc: "Leading design across product, engineering, and executive teams—driving alignment through clear communication, collaborative workshops, and data-informed decision making." },
          { number: "03", title: "Inclusive by Design", desc: "Championing accessibility and inclusive design practices—ensuring that digital products serve everyone, especially underserved and vulnerable populations." }
        ]
      },
      methodology: {
        intro: "An emergent, iterative approach that prioritizes direct building, real-world observation, and continuous refinement.",
        steps: [
          { icon: "Hammer", title: "Build", desc: "Create rapid prototypes and working solutions that can be tested with real users. Focus on tangible outputs over extensive planning—learning emerges through making." },
          { icon: "Eye", title: "Observe", desc: "Watch how users interact with the product in real contexts. Gather behavioral data, identify friction points, and surface unexpected insights that inform the next iteration." },
          { icon: "Sparkles", title: "Refine", desc: "Synthesize observations into actionable improvements. Make targeted changes based on evidence, then return to building—creating a continuous cycle of evolution." }
        ],
        philosophy: "This iterative approach acknowledges that great design emerges through continuous experimentation and learning—not through perfect planning. Each cycle reveals new insights that couldn't be anticipated upfront."
      },
      skills: [
        "Enterprise UX",
        "Complex Systems Design",
        "AI-assisted Workflows",
        "Investigative & Data-heavy Platforms",
        "Design Systems",
        "Information Architecture",
        "Interaction Design",
        "High-security & Regulated Environments"
      ],
      tools: [
        "Figma",
        "Adobe Creative Suite",
        "Prototyping Tools",
        "Design System Documentation"
      ],
      experience: [
        { period: "Dec 2025 - Present", title: "UI/UX Design Consultant", location: "Goa", desc: "Providing UX strategy and product design for cybersecurity and governance-focused digital products. Clients include Pinaca Technologies / Saptang Labs (investigative & security systems), Coolture Design (tangible product innovation & Indian timekeeping systems). Focus: scalable digital systems, product clarity, and strategic UX alignment." },
        { period: "Dec 2023 - Nov 2025", title: "Senior UI/UX Designer", location: "Pinaca Technologies", desc: "Led Central Design Team for cybersecurity and investigative intelligence platforms. Redesigned multi-layered investigative dashboards, reducing analyst task completion time by ~25–35%. Built and scaled a unified design system across 3+ security products, reducing UI inconsistencies by ~40% and accelerating feature release cycles by 20–25%. Mentored 6 designers and established centralized UX documentation standards." },
        { period: "Jul 2022 - Nov 2023", title: "UI/UX & Product Designer", location: "Folium Labs (Blockchain Fintech Startup) | Bengaluru", desc: "Designed UX for blockchain-based fintech platform serving B2B and digital asset workflows. Led visual language and interaction design for dashboards, blockchain workflows, and user journeys. Simplified complex financial and blockchain processes into intuitive, task-driven flows. Created data-heavy interfaces optimized for decision-making and operational efficiency." },
        { period: "2017 - 2020", title: "Design Consultancy", location: "Goa, Hyderabad & Chennai", desc: "Experience design for public events and interactive environments. Designed spatial and experiential systems for children's learning spaces. Led conceptual design experiment \"Game of Trust – Swayambhu Seed\"." },
        { period: "2011 - 2013", title: "Visual Designer", location: "Cognizant Technology Solutions | Pune", desc: "Delivered visual and communication design for enterprise clients. Contributed to digital system standardization and brand consistency initiatives." }
      ],
      education: [
        { degree: "M.Des (New Media)", institution: "National Institute of Design, Gujarat", year: "2014–2017", note: "Transdisciplinary program exploring intersections of culture, technology, and systems design" },
        { degree: "PG Diploma in Public Leadership", institution: "Rashtram, Rishihood University", year: "2021–2022", note: "Focused on India-centric public policy, governance systems, and institutional design" },
        { degree: "B.F.A (Applied Arts)", institution: "Goa College of Art, Goa", year: "2007–2011", note: "Foundation in visual communication, advertising, film-making, and design fundamentals" }
      ],
      currentFocus: {
        title: "UI/UX for Agentic AI Systems",
        description: "Designing human-AI collaboration models for critical and decision-driven sectors"
      }
    };
  });

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Save functions
  const saveHomeData = () => {
    localStorage.setItem("cmsHomeData", JSON.stringify(homeData));
    alert("Home page data saved successfully!");
  };

  const saveAboutData = () => {
    localStorage.setItem("cmsAboutData", JSON.stringify(aboutData));
    alert("About page data saved successfully!");
  };

  const publishChanges = (section: string) => {
    if (section === "home") {
      saveHomeData();
    } else if (section === "about") {
      saveAboutData();
    }
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} page published successfully!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium">Content Management</h1>
            <p className="text-sm text-muted-foreground">Manage your portfolio content</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === "home"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === "about"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="w-5 h-5" />
            About
          </button>
          <button
            onClick={() => setActiveTab("work")}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === "work"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <FolderOpen className="w-5 h-5" />
            Work
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === "blog"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="w-5 h-5" />
            Blog
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === "contact"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mail className="w-5 h-5" />
            Contact
          </button>
        </div>

        {/* Home Tab */}
        {activeTab === "home" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">Home</h2>
                <p className="text-sm text-muted-foreground">Manage your home page content</p>
              </div>
            </div>

            <div className="space-y-12">
              {/* PANEL 1: HERO SECTION */}
              <div className="bg-gradient-to-b from-muted/30 to-background border-2 border-primary/20 rounded-2xl p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b-2 border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">Panel 1</div>
                    <h3 className="text-xl font-medium">Hero Section</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Main landing area with logo, heading, and CTAs</p>
                </div>
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Hero Section
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Logo Image URL</label>
                    <input
                      type="url"
                      value={homeData.hero.logo}
                      onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, logo: e.target.value}})}
                      placeholder="Logo image path or URL"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Upload logo to imports folder</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Main Heading (Line 1)</label>
                    <input
                      type="text"
                      value={homeData.hero.heading1}
                      onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, heading1: e.target.value}})}
                      placeholder="First line of heading"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Main Heading (Line 2 - Highlighted)</label>
                    <input
                      type="text"
                      value={homeData.hero.heading2}
                      onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, heading2: e.target.value}})}
                      placeholder="Second line of heading (gradient text)"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subtitle</label>
                    <textarea
                      value={homeData.hero.subtitle}
                      onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, subtitle: e.target.value}})}
                      placeholder="Brief introduction or tagline"
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Primary Button Text</label>
                      <input
                        type="text"
                        value={homeData.hero.button1}
                        onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, button1: e.target.value}})}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Secondary Button Text</label>
                      <input
                        type="text"
                        value={homeData.hero.button2}
                        onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, button2: e.target.value}})}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={saveHomeData}
                  className="px-4 py-2 text-sm border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors"
                >
                  Save Draft
                </button>
              </div>
              </div>

              {/* PANEL 2: APPROACH SECTION */}
              <div className="bg-gradient-to-b from-muted/50 via-muted/30 to-muted/50 border-2 border-purple-500/20 rounded-2xl p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b-2 border-purple-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-purple-500/10 rounded-full text-sm font-medium text-purple-600">Panel 2</div>
                    <h3 className="text-xl font-medium">Approach & Process</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Stats infographic and design process timeline</p>
                </div>

                {/* Section Header */}
                <div className="bg-background border border-border rounded-lg p-6 mb-6">
                  <h4 className="font-medium mb-4">Section Header</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Main Heading</label>
                      <textarea
                        defaultValue="Design is the bridge between complex problems and elegant solutions that scale"
                        rows={2}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        defaultValue="I transform organizational challenges into intuitive experiences through strategic systems thinking, rigorous research, and human-centered design."
                        rows={2}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                  </div>
                </div>

              {/* Stats Section */}
              <div className="bg-background border border-border rounded-lg p-6 mb-6">
                <h3 className="font-medium mb-4">Stats Infographic</h3>
                <div className="space-y-6">
                  {[
                    { label: "Years Experience", value: "10+", icon1: "Clock", icon2: "TrendingUp" },
                    { label: "Team Members Led", value: "15+", icon1: "Users", icon2: "Network" },
                    { label: "Users Impacted", value: "80K", icon1: "BarChart3", icon2: "Target" },
                    { label: "Major Projects", value: "25+", icon1: "Zap", icon2: "Lightbulb" }
                  ].map((stat, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                      <div>
                        <label className="block text-xs font-medium mb-2">Value</label>
                        <input
                          type="text"
                          defaultValue={stat.value}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2">Label</label>
                        <input
                          type="text"
                          defaultValue={stat.label}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2">Icons (Lucide)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            defaultValue={stat.icon1}
                            placeholder="Icon 1"
                            className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                          <input
                            type="text"
                            defaultValue={stat.icon2}
                            placeholder="Icon 2"
                            className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Process Section */}
              <div className="bg-background border border-border rounded-lg p-6 mb-0">
                <h3 className="font-medium mb-4">Design Process</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Section Heading</label>
                    <input
                      type="text"
                      defaultValue="Quick Design Process"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Section Description</label>
                    <textarea
                      defaultValue="A rigorous, iterative approach balancing user needs with business objectives"
                      rows={2}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { number: "01", title: "Understand Context", desc: "Deep user insights and stakeholder alignment through contextual inquiry" },
                    { number: "02", title: "Ideate Solutions", desc: "Collaborative exploration of solutions through co-design workshops" },
                    { number: "03", title: "Build Prototype", desc: "Rapid prototyping with real users ensuring product-market fit" },
                    { number: "04", title: "Observe User Behavior", desc: "Testing and validation with data-driven insights and user feedback" },
                    { number: "05", title: "Refine Product", desc: "Scalable systems with measurable impact and continuous iteration" }
                  ].map((step) => (
                    <div key={step.number} className="grid grid-cols-[60px,1fr,2fr] gap-4 p-4 bg-muted/30 rounded-lg">
                      <input
                        type="text"
                        defaultValue={step.number}
                        className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-center"
                      />
                      <input
                        type="text"
                        defaultValue={step.title}
                        className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                      <input
                        type="text"
                        defaultValue={step.desc}
                        className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={saveHomeData}
                  className="px-4 py-2 text-sm border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors"
                >
                  Save Draft
                </button>
              </div>
              </div>

              {/* PANEL 3: ORGANIZATIONS/INITIATIVES */}
              <div className="bg-background border-2 border-emerald-500/20 rounded-2xl p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b-2 border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-emerald-500/10 rounded-full text-sm font-medium text-emerald-600">Panel 3</div>
                    <h3 className="text-xl font-medium">Organizations & Initiatives</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Impact beyond design - community and cultural initiatives</p>
                </div>

              {/* Organizations/Initiatives Section */}
              <div className="bg-background border border-border rounded-lg p-6 mb-4">
                <h3 className="font-medium mb-4">Organizations & Initiatives</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Section Heading</label>
                    <input
                      type="text"
                      defaultValue="Impact Beyond Design"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Section Description</label>
                    <textarea
                      defaultValue="Contributing to organizations and initiatives that shape the future of design, culture, and technology"
                      rows={2}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      name: "UX8",
                      icon: "../../imports/UX8_icon.svg",
                      desc: "Fostering design excellence and innovation through community-driven initiatives and collaborative learning experiences.",
                      tag: "Design Community"
                    },
                    {
                      name: "Dharmic Futures",
                      icon: "figma:asset/3814864fe79b8dfaf3cac21e9286d36e89b8d371.png",
                      desc: "Exploring intersections of technology, ethics, and cultural wisdom to build more inclusive and sustainable digital futures.",
                      tag: "Research & Ethics"
                    },
                    {
                      name: "सृजनालय",
                      icon: "figma:asset/b923f899c2bae651111cebc7798a8737cf209542.png",
                      desc: "Championing creative expression and cultural preservation through design, connecting traditional wisdom with contemporary practice.",
                      tag: "Cultural Design"
                    }
                  ].map((org, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-2">Organization Name</label>
                          <input
                            type="text"
                            defaultValue={org.name}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-2">Tag</label>
                          <input
                            type="text"
                            defaultValue={org.tag}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2">Icon/Logo URL</label>
                        <input
                          type="text"
                          defaultValue={org.icon}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2">Description</label>
                        <textarea
                          defaultValue={org.desc}
                          rows={2}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={saveHomeData}
                  className="px-4 py-2 text-sm border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors"
                >
                  Save Draft
                </button>
              </div>
              </div>

              {/* PANEL 4: ABOUT & CONTACT */}
              <div className="bg-muted/20 border-2 border-pink-500/20 rounded-2xl p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b-2 border-pink-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-pink-500/10 rounded-full text-sm font-medium text-pink-600">Panel 4</div>
                    <h3 className="text-xl font-medium">About & Contact</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Two-column layout with about content and contact form</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* About Section - Left Column */}
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  About Content (Left Column)
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Section Heading</label>
                    <input
                      type="text"
                      defaultValue="About"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Introduction Paragraph</label>
                    <textarea
                      defaultValue="Design Leader with 10+ years of experience across UI/UX, Product Design, Visual Design, and Strategic Design, delivering digital products designed for scale, performance, and measurable impact across Digital Public Infrastructure, Cybersecurity, Defence, FinTech, Governance, and B2B/B2C platforms."
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Specialization Paragraph</label>
                    <textarea
                      defaultValue="I specialise in AI Product Design, Agentic AI Interfaces, Human-AI Interaction, Explainable AI (XAI), Design Systems, and Data-Driven Decision Platforms — translating complex, high-stakes systems into intuitive, secure, and trust-centered user experiences built for global scalability."
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Approach Paragraph</label>
                    <textarea
                      defaultValue="My approach combines first-principles thinking, human-centered design, systems thinking, and responsible AI integration, enabling products that scale across users, geographies, and enterprise environments."
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Learn More Link Text</label>
                    <input
                      type="text"
                      defaultValue="Learn more about my background"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium mb-3">Quick Contact</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="vibhav.ux8@gmail.com"
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2">LinkedIn URL</label>
                        <input
                          type="url"
                          defaultValue="https://www.linkedin.com/in/vibhav-kamat-504460153/"
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Section - Right Column */}
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Form (Right Column)
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Section Heading</label>
                    <input
                      type="text"
                      defaultValue="Get in Touch"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Section Description</label>
                    <textarea
                      defaultValue="I'm always interested in hearing about new opportunities, collaborations, or just connecting with fellow designers and product leaders."
                      rows={2}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Submit Button Text</label>
                    <input
                      type="text"
                      defaultValue="Send Message"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Success Message</label>
                    <textarea
                      defaultValue="Thank you for reaching out! I'll get back to you within 24-48 hours."
                      rows={2}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>
              </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={saveHomeData}
                  className="px-4 py-2 text-sm border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors"
                >
                  Save Draft
                </button>
              </div>
            </div>

            {/* Save and Publish Buttons */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={saveHomeData}
                className="flex items-center gap-2 px-6 py-3 border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Save Draft
              </button>
              <button
                onClick={() => publishChanges("home")}
                className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                Publish Changes
              </button>
            </div>
          </motion.div>
        )}

        {/* About Tab */}
        {activeTab === "about" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">About Page</h2>
                <p className="text-sm text-muted-foreground">Manage your about page content</p>
              </div>
            </div>

            <div className="space-y-12">
              {/* PANEL 1: HERO SECTION */}
              <div className="bg-background border-2 border-primary/20 rounded-2xl p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b-2 border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">Panel 1</div>
                    <h3 className="text-xl font-medium">Hero Section</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Profile image, name, introduction, and meta information</p>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={aboutData.hero.name}
                        onChange={(e) => setAboutData({...aboutData, hero: {...aboutData.hero, name: e.target.value}})}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                      <input
                        type="text"
                        value={aboutData.hero.image}
                        onChange={(e) => setAboutData({...aboutData, hero: {...aboutData.hero, image: e.target.value}})}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Lead Paragraph (Curiosity Statement)</label>
                    <textarea
                      value={aboutData.hero.lead}
                      onChange={(e) => setAboutData({...aboutData, hero: {...aboutData.hero, lead: e.target.value}})}
                      rows={2}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Journey Paragraph</label>
                    <textarea
                      value={aboutData.hero.journey}
                      onChange={(e) => setAboutData({...aboutData, hero: {...aboutData.hero, journey: e.target.value}})}
                      rows={2}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input
                        type="text"
                        value={aboutData.hero.location}
                        onChange={(e) => setAboutData({...aboutData, hero: {...aboutData.hero, location: e.target.value}})}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Primary Education Display</label>
                      <input
                        type="text"
                        value={aboutData.hero.education}
                        onChange={(e) => setAboutData({...aboutData, hero: {...aboutData.hero, education: e.target.value}})}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Focus Areas</label>
                      <input
                        type="text"
                        value={aboutData.hero.focus}
                        onChange={(e) => setAboutData({...aboutData, hero: {...aboutData.hero, focus: e.target.value}})}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 text-sm border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors">
                    Save Draft
                  </button>
                </div>
              </div>

              {/* PANEL 2: BIOGRAPHY */}
              <div className="bg-gradient-to-b from-muted/30 to-background border-2 border-purple-500/20 rounded-2xl p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b-2 border-purple-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-purple-500/10 rounded-full text-sm font-medium text-purple-600">Panel 2</div>
                    <h3 className="text-xl font-medium">Biography</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Background, practice, and journey</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Background - Paragraph 1</label>
                    <textarea
                      defaultValue="I graduated from Goa College of Art, where I studied Applied Art and Audio-Visual Communication, and later continued my Master's journey with the National Institute of Design (NID) as part of the New Media Design program. These experiences helped me explore design not merely as visual expression, but as a way of understanding complex relations and interactions between people, technology, policy, economy and culture."
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Background - Paragraph 2 (Cultural Context)</label>
                    <textarea
                      defaultValue="Growing up in Antruz Mahal in Goa, a region deeply rooted in cultural traditions and the temple ecosystem, gave me a unique exposure to an integral and rhythmic community life, social networks and profound meanings. Observing everyday life in such a culturally rich environment cultivated a deep curiosity about nature, ancestral wisdom, human behavior, and the philosophy of technology."
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Practice - Paragraph 1</label>
                    <textarea
                      defaultValue="Over the years, my work has taken me into the technology sector across critical domains related to nation-building and security. Working with law enforcement agencies, governance systems, and intelligence contexts, I have been involved in designing AI and machine-learning driven tools for high-pressure environments, where decisions carry real-world consequences."
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Practice - Paragraph 2</label>
                    <textarea
                      defaultValue="These experiences shaped my perspective on technology, not just as innovation, but as responsibility. Designing for such contexts requires clarity, resilience, and a deep understanding of how emerging exponential technologies affect people and institutions."
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 text-sm border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors">
                    Save Draft
                  </button>
                </div>
              </div>

              {/* PANEL 3: PULL QUOTE & CURRENT EVOLUTION */}
              <div className="bg-background border-2 border-emerald-500/20 rounded-2xl p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b-2 border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-emerald-500/10 rounded-full text-sm font-medium text-emerald-600">Panel 3</div>
                    <h3 className="text-xl font-medium">Philosophy & Current Evolution</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Core philosophy statement and current design evolution</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Pull Quote (Highlighted Statement)</label>
                    <textarea
                      defaultValue="My interest lies in building ideas and systems that matter over the long duration, tools and experiences that contribute meaningfully to society, governance, collective progress and prosperity."
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Evolution Statement</label>
                    <textarea
                      defaultValue="With the impact of AI tools, the domain of design has evolved from research, synthesis, ideation, prototyping and more to direct building, observation and refinement, whereas only some fundamental aspects of human realities remain constant."
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 text-sm border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors">
                    Save Draft
                  </button>
                </div>
              </div>

              {/* PANEL 4: DESIGN APPROACH */}
              <div className="bg-muted/20 border-2 border-blue-500/20 rounded-2xl p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b-2 border-blue-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-blue-500/10 rounded-full text-sm font-medium text-blue-600">Panel 4</div>
                    <h3 className="text-xl font-medium">Design Approach</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Three core principles of design practice</p>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Section Introduction</label>
                    <textarea
                      defaultValue="Creating scalable solutions through strategic thinking, collaborative leadership, and inclusive design practices."
                      rows={2}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      number: "01",
                      title: "Strategic Systems Thinking",
                      desc: "I design at the intersection of user needs, business goals, and technical constraints—creating scalable solutions that serve diverse stakeholders across complex organizations."
                    },
                    {
                      number: "02",
                      title: "Cross-Functional Leadership",
                      desc: "Leading design across product, engineering, and executive teams—driving alignment through clear communication, collaborative workshops, and data-informed decision making."
                    },
                    {
                      number: "03",
                      title: "Inclusive by Design",
                      desc: "Championing accessibility and inclusive design practices—ensuring that digital products serve everyone, especially underserved and vulnerable populations."
                    }
                  ].map((principle) => (
                    <div key={principle.number} className="p-4 bg-background rounded-lg space-y-3">
                      <div className="grid grid-cols-[60px,1fr] gap-4">
                        <input
                          type="text"
                          defaultValue={principle.number}
                          className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-center"
                        />
                        <input
                          type="text"
                          defaultValue={principle.title}
                          className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>
                      <textarea
                        defaultValue={principle.desc}
                        rows={3}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 text-sm border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors">
                    Save Draft
                  </button>
                </div>
              </div>

              {/* PANEL 5: METHODOLOGY */}
              <div className="bg-foreground text-background border-2 border-foreground rounded-2xl p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b-2 border-background/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-background/10 rounded-full text-sm font-medium">Panel 5</div>
                    <h3 className="text-xl font-medium">Methodology</h3>
                  </div>
                  <p className="text-sm text-background/60">Build → Observe → Refine process with icon inputs</p>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-background/90">Section Introduction</label>
                    <textarea
                      defaultValue="An emergent, iterative approach that prioritizes direct building, real-world observation, and continuous refinement."
                      rows={2}
                      className="w-full px-4 py-3 bg-background/5 border border-background/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-background/40 resize-none text-background placeholder:text-background/40"
                    />
                  </div>
                </div>
                <div className="space-y-6 mb-6">
                  {[
                    {
                      icon: "Hammer",
                      title: "Build",
                      desc: "Create rapid prototypes and working solutions that can be tested with real users. Focus on tangible outputs over extensive planning—learning emerges through making."
                    },
                    {
                      icon: "Eye",
                      title: "Observe",
                      desc: "Watch how users interact with the product in real contexts. Gather behavioral data, identify friction points, and surface unexpected insights that inform the next iteration."
                    },
                    {
                      icon: "Sparkles",
                      title: "Refine",
                      desc: "Synthesize observations into actionable improvements. Make targeted changes based on evidence, then return to building—creating a continuous cycle of evolution."
                    }
                  ].map((step, index) => (
                    <div key={index} className="p-4 bg-background/5 border border-background/10 rounded-lg space-y-3">
                      <div className="grid grid-cols-[120px,1fr] gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-2 text-background/60">Lucide Icon</label>
                          <input
                            type="text"
                            defaultValue={step.icon}
                            className="w-full px-3 py-2 bg-background/10 border border-background/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-background/40 text-sm text-background"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-2 text-background/60">Title</label>
                          <input
                            type="text"
                            defaultValue={step.title}
                            className="w-full px-3 py-2 bg-background/10 border border-background/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-background/40 text-sm text-background"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2 text-background/60">Description</label>
                        <textarea
                          defaultValue={step.desc}
                          rows={3}
                          className="w-full px-3 py-2 bg-background/10 border border-background/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-background/40 text-sm resize-none text-background"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-background/90">Philosophy Statement</label>
                  <textarea
                    defaultValue="This iterative approach acknowledges that great design emerges through continuous experimentation and learning—not through perfect planning. Each cycle reveals new insights that couldn't be anticipated upfront."
                    rows={3}
                    className="w-full px-4 py-3 bg-background/5 border border-background/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-background/40 resize-none text-background placeholder:text-background/40"
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 text-sm bg-background/10 border border-background/20 text-background rounded-lg hover:bg-background/20 transition-colors">
                    Save Draft
                  </button>
                </div>
              </div>

              {/* PANEL 6: SKILLS & TOOLS */}
              <div className="bg-muted/30 border-2 border-orange-500/20 rounded-2xl p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b-2 border-orange-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-orange-500/10 rounded-full text-sm font-medium text-orange-600">Panel 6</div>
                    <h3 className="text-xl font-medium">Skills & Tools</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Core competencies and technical toolkit</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-background rounded-lg p-6">
                    <h4 className="font-medium mb-4">Core Competencies</h4>
                    <div className="space-y-3">
                      {[
                        "Enterprise UX",
                        "Complex Systems Design",
                        "AI-assisted Workflows",
                        "Investigative & Data-heavy Platforms",
                        "Design Systems",
                        "Information Architecture",
                        "Interaction Design",
                        "High-security & Regulated Environments"
                      ].map((skill, index) => (
                        <input
                          key={index}
                          type="text"
                          defaultValue={skill}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-6">
                    <h4 className="font-medium mb-4">Tools & Technologies</h4>
                    <div className="space-y-3">
                      {[
                        "Figma",
                        "Adobe Creative Suite",
                        "Prototyping Tools",
                        "Design System Documentation"
                      ].map((tool, index) => (
                        <input
                          key={index}
                          type="text"
                          defaultValue={tool}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 text-sm border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors">
                    Save Draft
                  </button>
                </div>
              </div>

              {/* PANEL 7: EXPERIENCE TIMELINE */}
              <div className="bg-background border-2 border-cyan-500/20 rounded-2xl p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b-2 border-cyan-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-cyan-500/10 rounded-full text-sm font-medium text-cyan-600">Panel 7</div>
                    <h3 className="text-xl font-medium">Experience Timeline</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Professional work history and major positions</p>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      period: "Dec 2025 - Present",
                      title: "UI/UX Design Consultant",
                      location: "Goa",
                      desc: "Providing UX strategy and product design for cybersecurity and governance-focused digital products. Clients include Pinaca Technologies / Saptang Labs (investigative & security systems), Coolture Design (tangible product innovation & Indian timekeeping systems). Focus: scalable digital systems, product clarity, and strategic UX alignment."
                    },
                    {
                      period: "Dec 2023 - Nov 2025",
                      title: "Senior UI/UX Designer",
                      location: "Pinaca Technologies",
                      desc: "Led Central Design Team for cybersecurity and investigative intelligence platforms. Redesigned multi-layered investigative dashboards, reducing analyst task completion time by ~25–35%. Built and scaled a unified design system across 3+ security products, reducing UI inconsistencies by ~40% and accelerating feature release cycles by 20–25%. Mentored 6 designers and established centralized UX documentation standards."
                    },
                    {
                      period: "Jul 2022 - Nov 2023",
                      title: "UI/UX & Product Designer",
                      location: "Folium Labs (Blockchain Fintech Startup) | Bengaluru",
                      desc: "Designed UX for blockchain-based fintech platform serving B2B and digital asset workflows. Led visual language and interaction design for dashboards, blockchain workflows, and user journeys. Simplified complex financial and blockchain processes into intuitive, task-driven flows. Created data-heavy interfaces optimized for decision-making and operational efficiency."
                    },
                    {
                      period: "2017 - 2020",
                      title: "Design Consultancy",
                      location: "Goa, Hyderabad & Chennai",
                      desc: "Experience design for public events and interactive environments. Designed spatial and experiential systems for children's learning spaces. Led conceptual design experiment \"Game of Trust – Swayambhu Seed\"."
                    },
                    {
                      period: "2011 - 2013",
                      title: "Visual Designer",
                      location: "Cognizant Technology Solutions | Pune",
                      desc: "Delivered visual and communication design for enterprise clients. Contributed to digital system standardization and brand consistency initiatives."
                    }
                  ].map((exp, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-2">Time Period</label>
                          <input
                            type="text"
                            defaultValue={exp.period}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-2">Location/Company</label>
                          <input
                            type="text"
                            defaultValue={exp.location}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2">Position Title</label>
                        <input
                          type="text"
                          defaultValue={exp.title}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2">Description</label>
                        <textarea
                          defaultValue={exp.desc}
                          rows={4}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 text-sm border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors">
                    Save Draft
                  </button>
                </div>
              </div>

              {/* PANEL 8: EDUCATION & CURRENT FOCUS */}
              <div className="bg-gradient-to-b from-muted/50 to-background border-2 border-pink-500/20 rounded-2xl p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b-2 border-pink-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-pink-500/10 rounded-full text-sm font-medium text-pink-600">Panel 8</div>
                    <h3 className="text-xl font-medium">Education & Current Focus</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Academic background and present work direction</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-background rounded-lg p-6">
                    <h4 className="font-medium mb-4">Education</h4>
                    <div className="space-y-6">
                      {[
                        {
                          degree: "M.Des (New Media)",
                          institution: "National Institute of Design, Gujarat",
                          year: "2014–2017",
                          note: "Transdisciplinary program exploring intersections of culture, technology, and systems design"
                        },
                        {
                          degree: "PG Diploma in Public Leadership",
                          institution: "Rashtram, Rishihood University",
                          year: "2021–2022",
                          note: "Focused on India-centric public policy, governance systems, and institutional design"
                        },
                        {
                          degree: "B.F.A (Applied Arts)",
                          institution: "Goa College of Art, Goa",
                          year: "2007–2011",
                          note: "Foundation in visual communication, advertising, film-making, and design fundamentals"
                        }
                      ].map((edu, index) => (
                        <div key={index} className="space-y-2">
                          <input
                            type="text"
                            defaultValue={edu.degree}
                            placeholder="Degree/Certification"
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                          <input
                            type="text"
                            defaultValue={edu.institution}
                            placeholder="Institution"
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                          <input
                            type="text"
                            defaultValue={edu.year}
                            placeholder="Year"
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                          <textarea
                            defaultValue={edu.note}
                            placeholder="Additional notes"
                            rows={2}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                          />
                          {index < 2 && <div className="h-px bg-border my-4" />}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-6">
                    <h4 className="font-medium mb-4">Current Focus</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Focus Area Title</label>
                        <input
                          type="text"
                          defaultValue="UI/UX for Agentic AI Systems"
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Focus Description</label>
                        <textarea
                          defaultValue="Designing human-AI collaboration models for critical and decision-driven sectors"
                          rows={3}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 text-sm border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors">
                    Save Draft
                  </button>
                </div>
              </div>
            </div>

            {/* Save and Publish Buttons */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={saveAboutData}
                className="flex items-center gap-2 px-6 py-3 border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Save Draft
              </button>
              <button
                onClick={() => publishChanges("about")}
                className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                Publish Changes
              </button>
            </div>
          </motion.div>
        )}

        {/* Work Tab */}
        {activeTab === "work" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">Work</h2>
                <p className="text-sm text-muted-foreground">Manage your portfolio projects</p>
              </div>
              <button
                onClick={() => navigate('/admin/dashboard/add-project')}
                className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                Add Project
              </button>
            </div>

            <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
              <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Project Management</h3>
              <p className="text-muted-foreground mb-4">
                Edit your projects data in <code className="bg-muted px-2 py-1 rounded text-sm">src/app/data/projects.ts</code>
              </p>
              <p className="text-sm text-muted-foreground">
                To add, edit, or remove projects, modify the projects array in the data file.
                <br />
                Changes will reflect immediately in your portfolio.
              </p>
            </div>

            {/* Save and Publish Buttons */}
            <div className="mt-8 flex justify-end gap-3">
              <button className="flex items-center gap-2 px-6 py-3 border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors">
                Save Draft
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors">
                Publish Changes
              </button>
            </div>
          </motion.div>
        )}

        {/* Blog Tab */}
        {activeTab === "blog" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">Blog</h2>
                <p className="text-sm text-muted-foreground">Manage your blog content</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors">
                <PlusCircle className="w-5 h-5" />
                Add Post
              </button>
            </div>

            <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Blog Management</h3>
              <p className="text-muted-foreground mb-4">
                Edit your blog posts in <code className="bg-muted px-2 py-1 rounded text-sm">src/app/data/blogPosts.ts</code>
              </p>
              <p className="text-sm text-muted-foreground">
                To add, edit, or remove blog posts, modify the blogPosts array in the data file.
                <br />
                Changes will reflect immediately in your blog.
              </p>
            </div>

            {/* Save and Publish Buttons */}
            <div className="mt-8 flex justify-end gap-3">
              <button className="flex items-center gap-2 px-6 py-3 border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors">
                Save Draft
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors">
                Publish Changes
              </button>
            </div>
          </motion.div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">Contact Page</h2>
                <p className="text-sm text-muted-foreground">Manage contact page settings and form configuration</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Contact Information */}
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="contact@example.com"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Primary email for contact form submissions
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location / Address</label>
                    <textarea
                      placeholder="City, State, Country"
                      rows={2}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Page Content */}
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4">Page Content</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Page Heading</label>
                    <input
                      type="text"
                      placeholder="e.g., Get in Touch"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subtitle / Description</label>
                    <textarea
                      placeholder="Brief message encouraging visitors to reach out..."
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Form Settings */}
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4">Contact Form Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <span className="text-sm font-medium">Enable Contact Form</span>
                      <p className="text-xs text-muted-foreground">Allow visitors to send messages</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-foreground border border-foreground">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Form Fields</label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Name (Required)</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Email (Required)</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Subject</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Message (Required)</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Phone Number</span>
                        <input type="checkbox" className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Success Message</label>
                    <textarea
                      placeholder="e.g., Thank you for reaching out! I'll get back to you soon."
                      rows={2}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4">Social Media & Links</h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Display social media icons on the contact page
                  </p>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm">Show Social Links</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-foreground border border-foreground">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                    </button>
                  </div>
                  <div className="bg-muted/30 border border-border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground">
                      Social links are managed in the About page settings and Footer component
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Integration */}
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4">Email Integration</h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Configure how contact form submissions are handled
                  </p>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Service</label>
                    <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>EmailJS</option>
                      <option>SendGrid</option>
                      <option>Mailgun</option>
                      <option>Custom SMTP</option>
                      <option>Formspree</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Service ID / API Key</label>
                    <input
                      type="text"
                      placeholder="Enter your service credentials"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-xs text-yellow-800">
                      ⚠️ Store sensitive API keys in environment variables, not in the codebase
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Save and Publish Buttons */}
            <div className="mt-8 flex justify-end gap-3">
              <button className="flex items-center gap-2 px-6 py-3 border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-colors">
                Save Draft
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors">
                Publish Changes
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
