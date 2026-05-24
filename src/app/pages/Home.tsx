import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { Mail, Linkedin, Send, Users, Target, Lightbulb, TrendingUp, Award, Sparkles, ArrowRight, Building2, Globe, Palette, Clock, Network, BarChart3, Zap, Save, Edit3 } from "lucide-react";
import { Link } from "react-router";
import React, { useState, useEffect, useRef } from "react";
import logoImage from "../../imports/UX8_Logo_2.svg";
import ux8IconSvg from "../../imports/UX8_icon.svg";
import dharmicFuturesIcon from "figma:asset/3814864fe79b8dfaf3cac21e9286d36e89b8d371.png";
import srujanalayaIcon from "figma:asset/b923f899c2bae651111cebc7798a8737cf209542.png";
import { useAdminView } from "../contexts/AdminViewContext";
import { useCMS } from "../contexts/CMSContext";
import type { CMSKey } from "../lib/cms";

const defaultHomeData = {
  hero: {
    heading1: "Envisioning smart UI-UX",
    heading2: "with contextual awareness",
    subtitle: "Bridging AI innovation, enterprise systems, and public-sector digital infrastructure through strategic design leadership.",
    button1: "View Projects",
    button2: "Let's Connect"
  },
  approach: {
    heading: "Design is the bridge between complex problems and elegant solutions that scale",
    subheading: "I transform organizational challenges into intuitive experiences through strategic systems thinking, rigorous research, and human-centered design.",
    processTitle: "Quick Design Process",
    processSubtitle: "A rigorous, iterative approach balancing user needs with business objectives"
  },
  organizations: {
    heading: "Impact Beyond Design",
    subheading: "Contributing to organizations and initiatives that shape the future of design, culture, and technology",
    ux8Description: "Fostering design excellence and innovation through community-driven initiatives and collaborative learning experiences.",
    dharmicDescription: "Exploring intersections of technology, ethics, and cultural wisdom to build more inclusive and sustainable digital futures.",
    srujanalayaDescription: "Championing creative expression and cultural preservation through design, connecting traditional wisdom with contemporary practice."
  },
  about: {
    heading: "About",
    paragraph1: "Design Leader with 10+ years of experience across UI/UX, Product Design, Visual Design, and Strategic Design, delivering digital products designed for scale, performance, and measurable impact across Digital Public Infrastructure, Cybersecurity, Defence, FinTech, Governance, and B2B/B2C platforms.",
    paragraph2: "I specialise in AI Product Design, Agentic AI Interfaces, Human-AI Interaction, Explainable AI (XAI), Design Systems, and Data-Driven Decision Platforms — translating complex, high-stakes systems into intuitive, secure, and trust-centered user experiences built for global scalability.",
    paragraph3: "My approach combines first-principles thinking, human-centered design, systems thinking, and responsible AI integration, enabling products that scale across users, geographies, and enterprise environments.",
    learnMoreText: "Learn more about my background"
  },
  contact: {
    heading: "Get in Touch",
    subheading: "I'm always interested in hearing about new opportunities, collaborations, or just connecting with fellow designers and product leaders.",
    connectLabel: "Connect with me",
    emailLabel: "Email",
    emailText: "vibhav.ux8@gmail.com",
    linkedinLabel: "LinkedIn",
    linkedinText: "Connect professionally",
    nameLabel: "Name",
    namePlaceholder: "Your full name",
    emailPlaceholder: "your.email@example.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your project or opportunity...",
    submitButton: "Send Message",
    successButton: "Message Sent Successfully!",
    successMessage: "Thank you for reaching out! I'll get back to you within 24-48 hours."
  }
};

export default function Home() {
  const { isAdminView } = useAdminView();
  const { store, loading, setStore } = useCMS();
  const logoRef = useRef<HTMLImageElement>(null);

  // Set initial logo color and update on theme changes
  useEffect(() => {
    const updateLogoColor = () => {
      if (logoRef.current && !logoRef.current.matches(':hover')) {
        const isDark = document.documentElement.classList.contains('dark');
        logoRef.current.style.filter = isDark ? 'brightness(0) invert(1)' : 'brightness(0)';
      }
    };

    // Set initial color
    updateLogoColor();

    const observer = new MutationObserver(updateLogoColor);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const mergeCMSData = (saved: any) => ({
    hero: { ...defaultHomeData.hero, ...(saved?.hero ?? {}) },
    approach: { ...defaultHomeData.approach, ...(saved?.approach ?? {}) },
    organizations: { ...defaultHomeData.organizations, ...(saved?.organizations ?? {}) },
    about: { ...defaultHomeData.about, ...(saved?.about ?? {}) },
    contact: { ...defaultHomeData.contact, ...(saved?.contact ?? {}) },
  });

  const [cmsData, setCmsData] = useState<any>(() => mergeCMSData(store['cmsHomeData']));
  const [hasChanges, setHasChanges] = useState(false);
  const contentRefs = useRef<{ [key: string]: string }>({});

  // Sync from context once CMS finishes loading
  useEffect(() => {
    if (!loading) {
      const merged = mergeCMSData(store['cmsHomeData']);
      setCmsData(merged);
      contentRefs.current = JSON.parse(JSON.stringify(merged));
    }
  }, [loading]);

  const handleContentEdit = (path: string, value: string) => {
    setHasChanges(true);
    const keys = path.split('.');
    const newData = { ...cmsData };
    let current: any = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    setCmsData(newData);
  };

  const handleSave = async () => {
    await setStore('cmsHomeData' as CMSKey, cmsData);
    setHasChanges(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 }
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

  // Editable component for inline editing
  const Editable = ({ path, className = "", as = "span" }: { path: string; className?: string; as?: string }) => {
    const keys = path.split('.');
    let value: any = cmsData;
    for (const key of keys) {
      value = value?.[key];
    }

    if (!isAdminView) {
      return as === "p" ? <p className={className}>{value || ""}</p> : <span className={className}>{value || ""}</span>;
    }

    return React.createElement(as, {
      contentEditable: true,
      suppressContentEditableWarning: true,
      onBlur: (e: any) => handleContentEdit(path, e.target.textContent),
      className: `${className} ${isAdminView ? 'outline-2 outline-dashed outline-yellow-400/50 hover:outline-yellow-400 focus:outline-yellow-500 rounded px-2 -mx-2 transition-all' : ''}`,
      dangerouslySetInnerHTML: { __html: value || "" }
    });
  };

  const stats = [
    {
      value: "10+",
      label: "Years Experience",
      icon: Clock,
      iconAlt: TrendingUp,
      color: "from-blue-500 to-cyan-500"
    },
    {
      value: "15+",
      label: "Team Members Led",
      icon: Users,
      iconAlt: Network,
      color: "from-purple-500 to-pink-500"
    },
    {
      value: "80K",
      label: "Users Impacted",
      icon: BarChart3,
      iconAlt: Target,
      color: "from-orange-500 to-red-500"
    },
    {
      value: "25+",
      label: "Major Projects",
      icon: Zap,
      iconAlt: Lightbulb,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Grain texture overlay - dark mode only */}
      <div className="hidden dark:block fixed inset-0 pointer-events-none opacity-[0.015] z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay'
      }} />
      <div className="relative z-10">
        <Navigation />

      {/* PANEL 1: HERO - ELEVATED & DYNAMIC */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.05, 0.03],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-primary to-blue-600 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.03, 0.05, 0.03],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              variants={fadeInScale}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 1.05 }}
              className="mb-6"
            >
              <motion.img
                ref={logoRef}
                src={logoImage}
                alt="UX8"
                className="h-28 md:h-36 lg:h-44 w-auto mx-auto cursor-pointer hero-logo"
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ transition: 'filter 0.8s ease-in-out' }}
                onMouseEnter={(e) => {
                  const pastelColors = [
                    'brightness(0) saturate(100%) invert(74%) sepia(15%) saturate(1566%) hue-rotate(190deg) brightness(95%) contrast(90%)', // pastel blue
                    'brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(652%) hue-rotate(85deg) brightness(95%) contrast(88%)', // pastel green
                    'brightness(0) saturate(100%) invert(75%) sepia(35%) saturate(845%) hue-rotate(320deg) brightness(100%) contrast(92%)', // pastel orange
                    'brightness(0) saturate(100%) invert(70%) sepia(25%) saturate(1245%) hue-rotate(240deg) brightness(95%) contrast(90%)', // pastel purple
                    'brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(956%) hue-rotate(310deg) brightness(98%) contrast(88%)', // pastel red/pink
                  ];

                  const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];

                  // Delay color change until logo has popped up
                  setTimeout(() => {
                    if ((e.target as HTMLImageElement).matches(':hover')) {
                      (e.target as HTMLImageElement).style.filter = randomColor;
                    }
                  }, 350);
                }}
                onMouseLeave={(e) => {
                  const isDark = document.documentElement.classList.contains('dark');
                  // Smoothly fade back to default color
                  (e.target as HTMLImageElement).style.filter = isDark ? 'brightness(0) invert(1)' : 'brightness(0)';
                }}
              />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] tracking-tight mb-6"
            >
              <Editable path="hero.heading1" className="inline-block" /><br />
              <Editable path="hero.heading2" className="inline-block italic bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent" />
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto"
            >
              <Editable path="hero.subtitle" as="p" className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto" />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link to="/work">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-foreground text-background rounded-full font-medium flex items-center gap-2 shadow-lg"
                >
                  <Editable path="hero.button1" />
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-background border-2 border-border rounded-full font-medium hover:border-foreground transition-colors"
                >
                  <Editable path="hero.button2" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PANEL 2: APPROACH WITH SOPHISTICATED INFOGRAPHIC */}
      <section className="relative py-32 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
              className="text-center mb-24"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mb-8 rounded-full"
              />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-8 max-w-4xl mx-auto">
                <Editable path="approach.heading" />
              </h2>
              <Editable path="approach.subheading" as="p" className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" />
            </motion.div>

            {/* Stats Infographic - Premium Cards */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
            >
              {stats.map((stat, index) => {
                const Icon1 = stat.icon;
                const Icon2 = stat.iconAlt;

                return (
                  <motion.div
                    key={stat.label}
                    variants={fadeInScale}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
                    <div className="relative bg-background border-2 border-border rounded-2xl p-8 text-center hover:border-foreground transition-all duration-300 shadow-sm hover:shadow-xl">
                      <div className="inline-flex items-center justify-center w-24 h-24 mb-6 relative">
                        {/* Outer ring */}
                        <motion.div
                          animate={{
                            scale: [1, 1.08, 1],
                            opacity: [0.1, 0.2, 0.1]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.3
                          }}
                          className="absolute inset-0 rounded-full border-2 border-foreground group-hover:border-foreground/30 transition-colors"
                        />

                        {/* Inner circle with flickering icons */}
                        <div className="absolute inset-2 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                          {/* First icon */}
                          <motion.div
                            animate={{
                              opacity: [1, 1, 1, 0.7, 0.3, 0, 0, 0, 0, 0, 0.3, 0.7, 1, 1, 1],
                              scale: [1, 1, 1, 0.98, 0.96, 0.94, 0.94, 0.94, 0.94, 0.94, 0.96, 0.98, 1, 1, 1]
                            }}
                            transition={{
                              duration: 9,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.5
                            }}
                            className="absolute"
                          >
                            <Icon1 size={40} className="text-foreground stroke-[1.5]" />
                          </motion.div>

                          {/* Second icon */}
                          <motion.div
                            animate={{
                              opacity: [0, 0, 0, 0, 0, 0.3, 0.7, 1, 1, 1, 0.7, 0.3, 0, 0, 0],
                              scale: [0.94, 0.94, 0.94, 0.94, 0.94, 0.96, 0.98, 1, 1, 1, 0.98, 0.96, 0.94, 0.94, 0.94]
                            }}
                            transition={{
                              duration: 9,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.5
                            }}
                            className="absolute"
                          >
                            <Icon2 size={40} className="text-foreground stroke-[1.5]" />
                          </motion.div>
                        </div>
                      </div>

                      <div className="text-5xl md:text-6xl font-medium mb-3 text-foreground tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground font-medium text-sm">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Process Visualization - Timeline */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center mb-16">
                <h3 className="text-4xl md:text-5xl font-medium mb-4">
                  <Editable path="approach.processTitle" />
                </h3>
                <Editable path="approach.processSubtitle" as="p" className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" />
              </div>

              <div className="relative">
                {/* Progress line */}
                <motion.div
                  animate={{
                    scaleX: [1, 1.02, 1, 0.98, 1],
                    y: [0, -2, 0, 2, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-12 left-0 right-0 h-0.5 bg-gray-300 hidden lg:block origin-center"
                />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-4">
                  {[
                    { number: "01", title: "Understand Context", desc: "Deep user insights and stakeholder alignment through contextual inquiry" },
                    { number: "02", title: "Ideate Solutions", desc: "Collaborative exploration of solutions through co-design workshops" },
                    { number: "03", title: "Build Prototype", desc: "Rapid prototyping with real users ensuring product-market fit" },
                    { number: "04", title: "Observe User Behavior", desc: "Testing and validation with data-driven insights and user feedback" },
                    { number: "05", title: "Refine Product", desc: "Scalable systems with measurable impact and continuous iteration" }
                  ].map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      whileHover={{ y: -8 }}
                      className="relative"
                    >
                      <div className="relative z-10 bg-background border-2 border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="inline-flex items-center justify-center w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full mb-4 text-foreground font-bold text-base shadow-sm"
                        >
                          {step.number}
                        </motion.div>
                        <h4 className="text-xl font-medium mb-3">{step.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* NEW PANEL 3: ORGANIZATIONS/INITIATIVES */}
      <section className="relative py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-8 rounded-full"
              />
              <h2 className="text-4xl md:text-5xl font-medium mb-6">
                <Editable path="organizations.heading" />
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                <Editable path="organizations.subheading" />
              </p>
            </motion.div>

            {/* Organization Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* UX8 Tile */}
              <motion.div
                variants={fadeInScale}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-background border-2 border-border rounded-3xl p-10 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-20 h-20 mb-8 overflow-hidden rounded-lg shadow-lg grayscale-0 md:grayscale brightness-100 md:brightness-[1.3] contrast-100 md:contrast-[1.2] md:hover:grayscale-0 md:hover:brightness-100 md:hover:contrast-100 transition-all duration-500"
                  >
                    <img src={ux8IconSvg} alt="UX8" className="w-full h-full object-cover" />
                  </motion.div>

                  <h3 className="text-3xl font-medium mb-4">UX8</h3>

                  <div className="text-muted-foreground leading-relaxed mb-6">
                    <Editable path="organizations.ux8Description" as="p" className="text-muted-foreground leading-relaxed" />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <span>Design Community</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>

              {/* Dharmic Futures Tile */}
              <motion.div
                variants={fadeInScale}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-background border-2 border-border rounded-3xl p-10 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-20 h-20 mb-8 overflow-hidden rounded-lg shadow-lg grayscale-0 md:grayscale brightness-100 md:brightness-[1.3] contrast-100 md:contrast-[1.2] md:hover:grayscale-0 md:hover:brightness-100 md:hover:contrast-100 transition-all duration-500"
                  >
                    <img src={dharmicFuturesIcon} alt="Dharmic Futures" className="w-full h-full object-contain" />
                  </motion.div>

                  <h3 className="text-3xl font-medium mb-4">Dharmic Futures</h3>

                  <div className="text-muted-foreground leading-relaxed mb-6">
                    <Editable path="organizations.dharmicDescription" as="p" className="text-muted-foreground leading-relaxed" />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <span>Research & Ethics</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>

              {/* सृजनालय Tile */}
              <motion.div
                variants={fadeInScale}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-background border-2 border-border rounded-3xl p-10 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-20 h-20 mb-8 overflow-hidden rounded-lg shadow-lg grayscale-0 md:grayscale brightness-100 md:brightness-[1.5] contrast-100 md:contrast-[1.4] md:hover:grayscale-0 md:hover:brightness-100 md:hover:contrast-100 transition-all duration-500"
                  >
                    <img src={srujanalayaIcon} alt="सृजनालय" className="w-full h-full object-contain" />
                  </motion.div>

                  <h3 className="text-3xl font-medium mb-4">सृजनालय</h3>

                  <div className="text-muted-foreground leading-relaxed mb-6">
                    <Editable path="organizations.srujanalayaDescription" as="p" className="text-muted-foreground leading-relaxed" />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <span>Cultural Design</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PANEL 4: ABOUT & CONTACT - ELEGANT SPLIT */}
      <section className="relative py-32 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32"
          >
            {/* About Section - Enhanced */}
            <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
              <div className="sticky top-24">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "60px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-primary to-purple-600 mb-6 rounded-full"
                />

                <h2 className="text-4xl md:text-5xl font-medium mb-8">
                  <Editable path="about.heading" />
                </h2>

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <div className="text-xl text-foreground/90">
                    <Editable path="about.paragraph1" as="p" className="text-xl text-foreground/90" />
                  </div>
                  <div>
                    <Editable path="about.paragraph2" as="p" className="text-lg text-muted-foreground" />
                  </div>
                  <div>
                    <Editable path="about.paragraph3" as="p" className="text-lg text-muted-foreground" />
                  </div>
                </div>

                <motion.div
                  whileHover={{ x: 8 }}
                  className="mt-10"
                >
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-lg font-medium text-primary group"
                  >
                    <Editable path="about.learnMoreText" />
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>

                {/* Quick Contact - Elevated */}
                <div className="mt-12 pt-10 border-t border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-6">
                    <Editable path="contact.connectLabel" />
                  </p>
                  <div className="flex flex-col gap-4">
                    <motion.a
                      whileHover={{ x: 8 }}
                      href="mailto:vibhav.ux8@gmail.com"
                      className="group flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/60 transition-colors"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Mail size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">
                          <Editable path="contact.emailLabel" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <Editable path="contact.emailText" />
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      whileHover={{ x: 8 }}
                      href="https://www.linkedin.com/in/vibhav-kamat-504460153/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/60 transition-colors"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Linkedin size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">
                          <Editable path="contact.linkedinLabel" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <Editable path="contact.linkedinText" />
                        </div>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Section - Premium Form */}
            <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 mb-6 rounded-full"
              />

              <h2 className="text-4xl md:text-5xl font-medium mb-6">
                <Editable path="contact.heading" />
              </h2>

              <Editable path="contact.subheading" as="p" className="text-lg text-muted-foreground mb-10 leading-relaxed" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <label htmlFor="name" className="block mb-3 text-sm font-medium">
                    <Editable path="contact.nameLabel" />
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-muted/50 border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-all text-lg"
                    placeholder={cmsData?.contact?.namePlaceholder || "Your full name"}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label htmlFor="email" className="block mb-3 text-sm font-medium">
                    <Editable path="contact.emailLabel" />
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-muted/50 border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-all text-lg"
                    placeholder={cmsData?.contact?.emailPlaceholder || "your.email@example.com"}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label htmlFor="message" className="block mb-3 text-sm font-medium">
                    <Editable path="contact.messageLabel" />
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 bg-muted/50 border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-all resize-none text-lg"
                    placeholder={cmsData?.contact?.messagePlaceholder || "Tell me about your project or opportunity..."}
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitted}
                  className="w-full group px-8 py-5 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {submitted ? (
                    <>
                      <Award size={20} />
                      <span>{cmsData?.contact?.successButton || "Message Sent Successfully!"}</span>
                    </>
                  ) : (
                    <>
                      <span>{cmsData?.contact?.submitButton || "Send Message"}</span>
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                  >
                    <p className="text-sm text-green-700 dark:text-green-400">
                      {cmsData?.contact?.successMessage || "Thank you for reaching out! I'll get back to you within 24-48 hours."}
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Admin Edit Indicator */}
      {isAdminView && (
        <div className="fixed top-24 right-6 z-50 bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
          <Edit3 size={16} />
          <span className="text-sm font-medium">Click text to edit</span>
        </div>
      )}

      {/* Update Button - Fixed at Bottom in Admin View */}
      {isAdminView && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-8 py-4 rounded-full font-medium flex items-center gap-3 shadow-2xl transition-all ${
              hasChanges
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-400 text-gray-100 cursor-not-allowed"
            }`}
          >
            <Save size={20} />
            <span className="text-lg font-semibold">
              {hasChanges ? "Update Home Page" : "No Changes"}
            </span>
          </motion.button>
        </motion.div>
      )}

      <Footer />
      </div>
    </div>
  );
}
