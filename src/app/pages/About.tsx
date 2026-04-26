import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Hammer, Eye, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import profileImage from "figma:asset/1804ff83437d465d1844d7bdefee7249fb9aa493.png";

export default function About() {
  // Load CMS data from localStorage
  const [cmsData, setCmsData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("cmsAboutData");
    if (saved) {
      setCmsData(JSON.parse(saved));
    }
  }, []);
  const skills = [
    "Enterprise UX",
    "Complex Systems Design",
    "AI-assisted Workflows",
    "Investigative & Data-heavy Platforms",
    "Design Systems",
    "Information Architecture",
    "Interaction Design",
    "High-security & Regulated Environments",
  ];

  const tools = [
    "Figma",
    "Adobe Creative Suite",
    "Prototyping Tools",
    "Design System Documentation",
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Refined Asymmetric Layout */}
      <section className="relative overflow-hidden">
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        
        <div className="relative max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-20 xl:px-24 pt-28 sm:pt-40 pb-20 sm:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 xl:gap-20 items-start"
          >
            {/* Left Column: Name, Image, and Key Info */}
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
              {/* Profile Image with Refined Treatment */}
              <motion.div
                variants={scaleIn}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative group mb-16 max-w-[88%]"
              >
                <div className="relative aspect-[3/4] rounded-[4px] overflow-hidden bg-muted/50 ring-1 ring-black/[0.04]">
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={profileImage}
                    alt="Vibhav Kamat"
                    className="w-full h-full object-cover object-top grayscale-[15%]"
                  />
                </div>
              </motion.div>

              {/* Meta Information */}
              <motion.div
                variants={fadeIn}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="hidden md:block space-y-6 text-[15px] leading-[1.6] tracking-[-0.01em]"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-muted-foreground font-medium min-w-[100px]">Location</span>
                  <span className="text-foreground">Goa, India</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-muted-foreground font-medium min-w-[100px]">Education</span>
                  <div className="text-foreground">
                    <div>M.Des (New Media)</div>
                    <div className="text-muted-foreground text-[14px] mt-1">National Institute of Design, Gujarat</div>
                    <div className="mt-3">B.F.A (Applied Art)</div>
                    <div className="text-muted-foreground text-[14px] mt-1">Goa College of Art, Goa</div>
                  </div>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-muted-foreground font-medium min-w-[100px]">Focus</span>
                  <span className="text-foreground">AI Systems, Governance,<br/>Nation Building</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Biography Content */}
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-12 sm:space-y-16 pt-0 sm:pt-8"
            >
              {/* Lead Paragraph */}
              <div className="space-y-8 sm:space-y-10">
                {/* Animated Line Accent */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-1 bg-gradient-to-r from-primary to-purple-600 rounded-full"
                />
                
                {/* Name */}
                <h1 className="text-[56px] md:text-[72px] lg:text-[88px] font-medium mb-6 tracking-[-0.03em] leading-[0.95]" style={{ fontFeatureSettings: "'ss01' on, 'cv05' on, 'cv08' on" }}>
                  {cmsData?.hero?.name || "Vibhav Kamat"}
                </h1>

                <p className="text-[19px] md:text-[21px] text-muted-foreground max-w-4xl leading-[1.6] tracking-[-0.011em]">
                  {cmsData?.hero?.lead || "I have always been curious about the relationship between humans, technology, the times and environments we live in."}
                </p>

                <div className="w-12 h-[1px] bg-foreground/20" />

                <p className="text-[17px] sm:text-[18px] md:text-[19px] font-[400] leading-[1.7] sm:leading-[1.75] tracking-[-0.012em] sm:tracking-[-0.013em] text-muted-foreground">
                  {cmsData?.hero?.journey || "My journey in design has been shaped by observing how people interact with systems—social, cultural, and technological."}
                </p>
              </div>

              {/* Bio Sections */}
              <div className="space-y-10 sm:space-y-12 pt-4 sm:pt-8">
                <div className="space-y-6 sm:space-y-8">
                  <h3 className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground font-medium">Background</h3>
                  
                  <div className="space-y-5 sm:space-y-6 text-[16px] sm:text-[17px] leading-[1.72] sm:leading-[1.8] tracking-[-0.012em] sm:tracking-[-0.013em] text-foreground/75">
                    <p>
                      {cmsData?.biography?.background1 || "I graduated from Goa College of Art, where I studied Applied Art and Audio-Visual Communication, and later continued my Master's journey with the National Institute of Design (NID) as part of the New Media Design program. These experiences helped me explore design not merely as visual expression, but as a way of understanding complex relations and interactions between people, technology, policy, economy and culture."}
                    </p>

                    <p>
                      {cmsData?.biography?.background2 || "Growing up in Antruz Mahal in Goa, a region deeply rooted in cultural traditions and the temple ecosystem, gave me a unique exposure to an integral and rhythmic community life, social networks and profound meanings. Observing everyday life in such a culturally rich environment cultivated a deep curiosity about nature, ancestral wisdom, human behavior, and the philosophy of technology."}
                    </p>
                  </div>
                </div>

                <div className="space-y-6 sm:space-y-8 pt-4 sm:pt-8">
                  <h3 className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground font-medium">Practice</h3>

                  <div className="space-y-5 sm:space-y-6 text-[16px] sm:text-[17px] leading-[1.72] sm:leading-[1.8] tracking-[-0.012em] sm:tracking-[-0.013em] text-foreground/75">
                    <p>
                      {cmsData?.biography?.practice1 || "Over the years, my work has taken me into the technology sector across critical domains related to nation-building and security. Working with law enforcement agencies, governance systems, and intelligence contexts, I have been involved in designing AI and machine-learning driven tools for high-pressure environments, where decisions carry real-world consequences."}
                    </p>
                    
                    <p>
                      These experiences shaped my perspective on technology, not just as innovation, but as responsibility. Designing for such contexts requires clarity, resilience, and a deep understanding of how emerging exponential technologies affect people and institutions.
                    </p>
                  </div>
                </div>

                {/* Pull Quote */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="py-10 sm:py-12 pl-6 sm:pl-8 border-l-[2px] border-foreground/90"
                >
                  <p className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-[350] leading-[1.4] sm:leading-[1.45] tracking-[-0.017em] sm:tracking-[-0.018em] text-foreground/95 italic">
                    My interest lies in building ideas and systems that matter over the long duration, tools and experiences that contribute meaningfully to society, governance, collective progress and prosperity.
                  </p>
                </motion.div>

                <div className="space-y-5 sm:space-y-6 text-[16px] sm:text-[17px] leading-[1.72] sm:leading-[1.8] tracking-[-0.012em] sm:tracking-[-0.013em] text-foreground/75 pt-2 sm:pt-4">
                  <p>
                    With the impact of AI tools, the domain of design has evolved from research, synthesis, ideation, prototyping and more to direct building, observation and refinement, whereas only some fundamental aspects of human realities remain constant.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Design Approach - Refined Minimalist Grid */}
      <section className="relative pt-20 sm:pt-28 pb-28 sm:pb-40 overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.015)_0%,transparent_50%)]" />
        
        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-20 xl:px-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-200px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mb-20 sm:mb-32"
            >
              <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
                <h2 className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground font-medium whitespace-nowrap">
                  Design Approach
                </h2>
                <div className="flex-1 h-[1px] bg-border" />
              </div>
              <p className="text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-[300] leading-[1.35] sm:leading-[1.3] tracking-[-0.023em] sm:tracking-[-0.022em] text-foreground/90">
                Creating scalable solutions through strategic thinking, collaborative leadership, and inclusive design practices.
              </p>
            </motion.div>

            {/* Principles Grid */}
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16 lg:gap-20"
            >
              <motion.div 
                variants={fadeInUp} 
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-[13px] tracking-[0.08em] text-muted-foreground font-medium">01</div>
                    <div className="flex-1 h-[1px] bg-border group-hover:bg-foreground/20 transition-colors duration-500" />
                  </div>
                  <h3 className="text-[20px] sm:text-[22px] font-[450] tracking-[-0.017em] sm:tracking-[-0.018em] leading-[1.28] sm:leading-[1.3] text-foreground" style={{ fontFeatureSettings: "'ss01' on" }}>
                    Strategic Systems Thinking
                  </h3>
                  <p className="text-[15px] sm:text-[16px] leading-[1.7] sm:leading-[1.75] tracking-[-0.010em] sm:tracking-[-0.011em] text-foreground/65">
                    I design at the intersection of user needs, business goals, and technical constraints—creating scalable solutions that serve diverse stakeholders across complex organizations.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeInUp} 
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-[13px] tracking-[0.08em] text-muted-foreground font-medium">02</div>
                    <div className="flex-1 h-[1px] bg-border group-hover:bg-foreground/20 transition-colors duration-500" />
                  </div>
                  <h3 className="text-[20px] sm:text-[22px] font-[450] tracking-[-0.017em] sm:tracking-[-0.018em] leading-[1.28] sm:leading-[1.3] text-foreground" style={{ fontFeatureSettings: "'ss01' on" }}>
                    Cross-Functional Leadership
                  </h3>
                  <p className="text-[15px] sm:text-[16px] leading-[1.7] sm:leading-[1.75] tracking-[-0.010em] sm:tracking-[-0.011em] text-foreground/65">
                    Leading design across product, engineering, and executive teams—driving alignment through clear communication, collaborative workshops, and data-informed decision making.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeInUp} 
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-[13px] tracking-[0.08em] text-muted-foreground font-medium">03</div>
                    <div className="flex-1 h-[1px] bg-border group-hover:bg-foreground/20 transition-colors duration-500" />
                  </div>
                  <h3 className="text-[20px] sm:text-[22px] font-[450] tracking-[-0.017em] sm:tracking-[-0.018em] leading-[1.28] sm:leading-[1.3] text-foreground" style={{ fontFeatureSettings: "'ss01' on" }}>
                    Inclusive by Design
                  </h3>
                  <p className="text-[15px] sm:text-[16px] leading-[1.7] sm:leading-[1.75] tracking-[-0.010em] sm:tracking-[-0.011em] text-foreground/65">
                    Championing accessibility and inclusive design practices—ensuring that digital products serve everyone, especially underserved and vulnerable populations.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Meta Information - Mobile Only (After Design Approach, White Background) */}
      <section className="relative md:hidden py-12 bg-background">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="pb-10 border-b border-border/60"
          >
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="space-y-5 text-[15px] leading-[1.65] tracking-[-0.009em]"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-muted-foreground font-[450] min-w-[88px] text-[14px]">Location</span>
                <span className="text-foreground font-[400]">Goa, India</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-muted-foreground font-[450] min-w-[88px] text-[14px]">Education</span>
                <div className="text-foreground font-[400]">
                  <div className="mb-3">
                    <div className="font-[450]">M.Des (New Media)</div>
                    <div className="text-muted-foreground font-[400] text-[13.5px] mt-0.5 leading-[1.5]">National Institute of Design, Gujarat</div>
                  </div>
                  <div>
                    <div className="font-[450]">B.F.A (Applied Art)</div>
                    <div className="text-muted-foreground font-[400] text-[13.5px] mt-0.5 leading-[1.5]">Goa College of Art, Goa</div>
                  </div>
                </div>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-muted-foreground font-[450] min-w-[88px] text-[14px]">Focus</span>
                <span className="text-foreground font-[400] leading-[1.6]">AI Systems, Governance, Nation Building</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Emergent UI-UX Process - Refined Black Section */}
      <section className="relative py-40 bg-foreground text-background overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        <div className="relative max-w-[1400px] mx-auto px-8 lg:px-20 xl:px-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-200px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mb-32"
            >
              <div className="flex items-center gap-6 mb-10">
                <h2 className="text-[11px] tracking-[0.14em] uppercase text-background/60 font-medium">
                  Methodology
                </h2>
                <div className="flex-1 h-[1px] bg-background/20" />
              </div>
              <p className="text-[28px] md:text-[32px] lg:text-[36px] font-[300] leading-[1.3] tracking-[-0.022em] text-background/95 max-w-[800px]">
                An emergent, iterative approach that prioritizes direct building, real-world observation, and continuous refinement.
              </p>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              className="space-y-24"
            >
              {/* Process Flow - Minimal Typography */}
              <motion.div 
                variants={fadeInUp}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20"
              >
                <motion.div 
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-5">
                      <motion.div
                        whileHover={{ 
                          rotate: [0, -8, 8, -8, 8, -4, 4, 0],
                        }}
                        transition={{ 
                          duration: 0.6,
                          ease: "easeInOut"
                        }}
                      >
                        <Hammer className="w-14 h-14 md:w-16 md:h-16 text-background/75 stroke-[1.25]" />
                      </motion.div>
                      <div className="text-[64px] md:text-[72px] font-[350] tracking-[-0.03em] leading-none">Build</div>
                    </div>
                    <p className="text-[15px] text-background/60 leading-[1.7] tracking-[-0.009em]">
                      Create rapid prototypes and working solutions that can be tested with real users. Focus on tangible outputs over extensive planning—learning emerges through making.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-5">
                      <motion.div
                        whileHover={{ 
                          rotate: [0, -8, 8, -8, 8, -4, 4, 0],
                        }}
                        transition={{ 
                          duration: 0.6,
                          ease: "easeInOut"
                        }}
                      >
                        <Eye className="w-14 h-14 md:w-16 md:h-16 text-background/75 stroke-[1.25]" />
                      </motion.div>
                      <div className="text-[64px] md:text-[72px] font-[350] tracking-[-0.03em] leading-none">Observe</div>
                    </div>
                    <p className="text-[15px] text-background/60 leading-[1.7] tracking-[-0.009em]">
                      Watch how users interact with the product in real contexts. Gather behavioral data, identify friction points, and surface unexpected insights that inform the next iteration.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-5">
                      <motion.div
                        whileHover={{ 
                          rotate: [0, -8, 8, -8, 8, -4, 4, 0],
                        }}
                        transition={{ 
                          duration: 0.6,
                          ease: "easeInOut"
                        }}
                      >
                        <Sparkles className="w-14 h-14 md:w-16 md:h-16 text-background/75 stroke-[1.25]" />
                      </motion.div>
                      <div className="text-[64px] md:text-[72px] font-[350] tracking-[-0.03em] leading-none">Refine</div>
                    </div>
                    <p className="text-[15px] text-background/60 leading-[1.7] tracking-[-0.009em]">
                      Synthesize observations into actionable improvements. Make targeted changes based on evidence, then return to building—creating a continuous cycle of evolution.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Philosophy Statement */}
              <motion.div 
                variants={fadeInUp}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="pt-16 max-w-[900px]"
              >
                <div className="pl-8 border-l-[1px] border-background/30">
                  <p className="text-[19px] md:text-[20px] font-[350] leading-[1.6] italic tracking-[-0.014em] text-background/75">
                    This iterative approach acknowledges that great design emerges through continuous experimentation and learning—not through perfect planning. Each cycle reveals new insights that couldn't be anticipated upfront.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills & Tools */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {/* Skills */}
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-medium mb-6">Core Competencies</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-background text-sm rounded"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-medium mb-6">Tools & Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-background text-sm rounded"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <h2 className="text-2xl font-medium mb-8">Experience Highlights</h2>
            <motion.div
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 4 }}
                className="border-l-2 border-primary pl-6"
              >
                <p className="text-sm text-muted-foreground mb-2">Dec 2025 - Present</p>
                <h3 className="text-xl font-medium mb-2">
                  UI/UX Design Consultant
                </h3>
                <p className="text-muted-foreground mb-2">
                  Goa
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Providing UX strategy and product design for cybersecurity and governance-focused digital products. Clients include Pinaca Technologies / Saptang Labs (investigative & security systems), Coolture Design (tangible product innovation & Indian timekeeping systems). Focus: scalable digital systems, product clarity, and strategic UX alignment.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 4 }}
                className="border-l-2 border-muted pl-6"
              >
                <p className="text-sm text-muted-foreground mb-2">Dec 2023 - Nov 2025</p>
                <h3 className="text-xl font-medium mb-2">
                  Senior UI/UX Designer
                </h3>
                <p className="text-muted-foreground mb-2">
                  Pinaca Technologies
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Led Central Design Team for cybersecurity and investigative intelligence platforms. Redesigned multi-layered investigative dashboards, reducing analyst task completion time by ~25–35%. Built and scaled a unified design system across 3+ security products, reducing UI inconsistencies by ~40% and accelerating feature release cycles by 20–25%. Mentored 6 designers and established centralized UX documentation standards.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 4 }}
                className="border-l-2 border-muted pl-6"
              >
                <p className="text-sm text-muted-foreground mb-2">Jul 2022 - Nov 2023</p>
                <h3 className="text-xl font-medium mb-2">
                  UI/UX & Product Designer
                </h3>
                <p className="text-muted-foreground mb-2">
                  Folium Labs (Blockchain Fintech Startup) | Bengaluru
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Designed UX for blockchain-based fintech platform serving B2B and digital asset workflows. Led visual language and interaction design for dashboards, blockchain workflows, and user journeys. Simplified complex financial and blockchain processes into intuitive, task-driven flows. Created data-heavy interfaces optimized for decision-making and operational efficiency.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 4 }}
                className="border-l-2 border-muted pl-6"
              >
                <p className="text-sm text-muted-foreground mb-2">2017 - 2020</p>
                <h3 className="text-xl font-medium mb-2">
                  Design Consultancy
                </h3>
                <p className="text-muted-foreground mb-2">
                  Goa, Hyderabad & Chennai
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Experience design for public events and interactive environments. Designed spatial and experiential systems for children's learning spaces. Led conceptual design experiment "Game of Trust – Swayambhu Seed".
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 4 }}
                className="border-l-2 border-muted pl-6"
              >
                <p className="text-sm text-muted-foreground mb-2">2011 - 2013</p>
                <h3 className="text-xl font-medium mb-2">
                  Visual Designer
                </h3>
                <p className="text-muted-foreground mb-2">
                  Cognizant Technology Solutions | Pune
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Delivered visual and communication design for enterprise clients. Contributed to digital system standardization and brand consistency initiatives.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education & Recognition */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-medium mb-6">Education</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">M.Des (New Media)</p>
                  <p className="text-sm text-muted-foreground">
                    National Institute of Design, Gujarat (2014–2017)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Transdisciplinary program exploring intersections of culture, technology, and systems design
                  </p>
                </div>
                <div>
                  <p className="font-medium">PG Diploma in Public Leadership</p>
                  <p className="text-sm text-muted-foreground">
                    Rashtram, Rishihood University (2021–2022)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Focused on India-centric public policy, governance systems, and institutional design
                  </p>
                </div>
                <div>
                  <p className="font-medium">B.F.A (Applied Arts)</p>
                  <p className="text-sm text-muted-foreground">
                    Goa College of Art, Goa (2007–2011)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Foundation in visual communication, advertising, film-making, and design fundamentals
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-medium mb-6">Current Focus</h2>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">UI/UX for Agentic AI Systems</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Designing human-AI collaboration models for critical and decision-driven sectors
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}