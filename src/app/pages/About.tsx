import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Hammer, Eye, Sparkles, Save, Edit3, Settings, Trash2, Upload } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useAdminView } from "../contexts/AdminViewContext";
import { useCMS } from "../contexts/CMSContext";
import { uploadImage } from "../lib/supabase";
import type { CMSKey } from "../lib/cms";
import profileImage from "../../imports/Vibhav_photo_3-1.png";

export default function About() {
  const { isAdminView } = useAdminView();
  const { store, loading, setStore, removeStore } = useCMS();
  const [hasChanges, setHasChanges] = useState(false);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [customProfileImage, setCustomProfileImage] = useState<string | null>(
    store['cmsAboutProfileImage'] ?? null
  );
  const photoMenuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default data structure
  const defaultData = {
    hero: {
      name: "Vibhav Kamat",
      lead: "I have always been curious about the relationship between humans, technology, the times and environments we live in.",
      journey: "My journey in design has been shaped by observing how people interact with systems—social, cultural, and technological.",
      location: "Goa, India",
      education1: "M.Des (New Media)",
      education1Sub: "National Institute of Design, Gujarat",
      education2: "B.F.A (Applied Art)",
      education2Sub: "Goa College of Art, Goa",
      focus: "AI Systems, Governance, Nation Building"
    },
    biography: {
      background1: "I graduated from Goa College of Art, where I studied Applied Art and Audio-Visual Communication, and later continued my Master's journey with the National Institute of Design (NID) as part of the New Media Design program. These experiences helped me explore design not merely as visual expression, but as a way of understanding complex relations and interactions between people, technology, policy, economy and culture.",
      background2: "Growing up in Antruz Mahal in Goa, a region deeply rooted in cultural traditions and the temple ecosystem, gave me a unique exposure to an integral and rhythmic community life, social networks and profound meanings. Observing everyday life in such a culturally rich environment cultivated a deep curiosity about nature, ancestral wisdom, human behavior, and the philosophy of technology.",
      practice1: "Over the years, my work has taken me into the technology sector across critical domains related to nation-building and security. Working with law enforcement agencies, governance systems, and intelligence contexts, I have been involved in designing AI and machine-learning driven tools for high-pressure environments, where decisions carry real-world consequences.",
      practice2: "These experiences shaped my perspective on technology, not just as innovation, but as responsibility. Designing for such contexts requires clarity, resilience, and a deep understanding of how emerging exponential technologies affect people and institutions.",
      pullQuote: "My interest lies in building ideas and systems that matter over the long duration, tools and experiences that contribute meaningfully to society, governance, collective progress and prosperity.",
      closing: "With the impact of AI tools, the domain of design has evolved from research, synthesis, ideation, prototyping and more to direct building, observation and refinement, whereas only some fundamental aspects of human realities remain constant."
    },
    designApproach: {
      heading: "Creating scalable solutions through strategic thinking, collaborative leadership, and inclusive design practices.",
      principle1Title: "Strategic Systems Thinking",
      principle1Desc: "I design at the intersection of user needs, business goals, and technical constraints—creating scalable solutions that serve diverse stakeholders across complex organizations.",
      principle2Title: "Cross-Functional Leadership",
      principle2Desc: "Leading design across product, engineering, and executive teams—driving alignment through clear communication, collaborative workshops, and data-informed decision making.",
      principle3Title: "Inclusive by Design",
      principle3Desc: "Championing accessibility and inclusive design practices—ensuring that digital products serve everyone, especially underserved and vulnerable populations."
    }
  };

  const mergeAboutData = (saved: any) => ({
    hero: { ...defaultData.hero, ...(saved?.hero ?? {}) },
    biography: { ...defaultData.biography, ...(saved?.biography ?? {}) },
    designApproach: { ...defaultData.designApproach, ...(saved?.designApproach ?? {}) },
  });

  const [cmsData, setCmsData] = useState<any>(() => mergeAboutData(store['cmsAboutData']));

  // Sync from context once CMS finishes loading
  useEffect(() => {
    if (!loading) {
      setCmsData(mergeAboutData(store['cmsAboutData']));
      setCustomProfileImage(store['cmsAboutProfileImage'] ?? null);
    }
  }, [loading]);

  // Handle click outside photo menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (photoMenuRef.current && !photoMenuRef.current.contains(event.target as Node)) {
        setShowPhotoMenu(false);
      }
    }

    if (showPhotoMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPhotoMenu]);

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
    await setStore('cmsAboutData' as CMSKey, cmsData);
    setHasChanges(false);
    alert("About page updated successfully!");
  };

  const handleReplacePhoto = () => {
    fileInputRef.current?.click();
    setShowPhotoMenu(false);
  };

  const handlePhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const url = await uploadImage(file, 'profile/');
      setCustomProfileImage(url);
      await setStore('cmsAboutProfileImage' as CMSKey, url);
    } catch (err) {
      console.error('Profile photo upload failed:', err);
      alert('Photo upload failed. Please try again.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleDeletePhoto = async () => {
    if (confirm("Are you sure you want to delete the custom profile photo and restore the default?")) {
      setCustomProfileImage(null);
      await removeStore('cmsAboutProfileImage' as CMSKey);
      setShowPhotoMenu(false);
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
      return as === "p" || as === "div" ?
        React.createElement(as, { className }, value || "") :
        <span className={className}>{value || ""}</span>;
    }

    return React.createElement(as, {
      contentEditable: true,
      suppressContentEditableWarning: true,
      onBlur: (e: any) => handleContentEdit(path, e.target.textContent),
      className: `${className} ${isAdminView ? 'outline-2 outline-dashed outline-yellow-400/50 hover:outline-yellow-400 focus:outline-yellow-500 rounded px-2 -mx-2 transition-all' : ''}`,
      dangerouslySetInnerHTML: { __html: value || "" }
    });
  };
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
                    src={customProfileImage || profileImage}
                    alt="Vibhav Kamat"
                    className="w-full h-full object-cover object-top grayscale-[15%]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== profileImage) {
                        target.src = profileImage;
                        setCustomProfileImage(null);
                        removeStore('cmsAboutProfileImage' as CMSKey);
                      }
                    }}
                  />

                  {/* Admin Controls */}
                  {isAdminView && (
                    <>
                      <div ref={photoMenuRef}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowPhotoMenu(!showPhotoMenu);
                          }}
                          className="absolute top-3 left-3 z-10 p-2 bg-background/95 backdrop-blur-sm hover:bg-background rounded-full shadow-lg transition-all hover:shadow-xl border border-border"
                          title="Photo settings"
                        >
                          <Settings className="w-4 h-4 text-foreground/70 hover:text-foreground" />
                        </motion.button>

                        <AnimatePresence>
                          {showPhotoMenu && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className="absolute top-14 left-3 z-20 bg-card rounded-lg shadow-xl border border-border min-w-[180px] overflow-hidden"
                            >
                              <div className="py-1">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleReplacePhoto();
                                  }}
                                  className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-muted transition-colors text-sm text-card-foreground"
                                >
                                  <Upload className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                  <span>Replace</span>
                                </button>

                                <div className="border-t border-border my-1" />

                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDeletePhoto();
                                  }}
                                  className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-destructive/10 transition-colors text-sm text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}
                </div>

                {/* Hidden file input for photo upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoFileChange}
                  className="hidden"
                />
              </motion.div>

              {/* Meta Information */}
              <motion.div
                variants={fadeIn}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="hidden md:block space-y-6 text-[15px] leading-[1.6] tracking-[-0.01em]"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-muted-foreground font-medium min-w-[100px]">Location</span>
                  <span className="text-foreground"><Editable path="hero.location" /></span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-muted-foreground font-medium min-w-[100px]">Education</span>
                  <div className="text-foreground">
                    <div><Editable path="hero.education1" /></div>
                    <div className="text-muted-foreground text-[14px] mt-1"><Editable path="hero.education1Sub" /></div>
                    <div className="mt-3"><Editable path="hero.education2" /></div>
                    <div className="text-muted-foreground text-[14px] mt-1"><Editable path="hero.education2Sub" /></div>
                  </div>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-muted-foreground font-medium min-w-[100px]">Focus</span>
                  <span className="text-foreground"><Editable path="hero.focus" /></span>
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
                  <Editable path="hero.name" />
                </h1>

                <div className="text-[19px] md:text-[21px] text-muted-foreground max-w-4xl leading-[1.6] tracking-[-0.011em]">
                  <Editable path="hero.lead" as="p" className="text-[19px] md:text-[21px] text-muted-foreground max-w-4xl leading-[1.6] tracking-[-0.011em]" />
                </div>

                <div className="w-12 h-[1px] bg-foreground/20" />

                <div className="text-[17px] sm:text-[18px] md:text-[19px] font-[400] leading-[1.7] sm:leading-[1.75] tracking-[-0.012em] sm:tracking-[-0.013em] text-muted-foreground">
                  <Editable path="hero.journey" as="p" className="text-[17px] sm:text-[18px] md:text-[19px] font-[400] leading-[1.7] sm:leading-[1.75] tracking-[-0.012em] sm:tracking-[-0.013em] text-muted-foreground" />
                </div>
              </div>

              {/* Bio Sections */}
              <div className="space-y-10 sm:space-y-12 pt-4 sm:pt-8">
                <div className="space-y-6 sm:space-y-8">
                  <h3 className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground font-medium">Background</h3>

                  <div className="space-y-5 sm:space-y-6 text-[16px] sm:text-[17px] leading-[1.72] sm:leading-[1.8] tracking-[-0.012em] sm:tracking-[-0.013em] text-foreground/75">
                    <Editable path="biography.background1" as="p" className="text-[16px] sm:text-[17px] leading-[1.72] sm:leading-[1.8] tracking-[-0.012em] sm:tracking-[-0.013em] text-foreground/75" />
                    <Editable path="biography.background2" as="p" className="text-[16px] sm:text-[17px] leading-[1.72] sm:leading-[1.8] tracking-[-0.012em] sm:tracking-[-0.013em] text-foreground/75" />
                  </div>
                </div>

                <div className="space-y-6 sm:space-y-8 pt-4 sm:pt-8">
                  <h3 className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground font-medium">Practice</h3>

                  <div className="space-y-5 sm:space-y-6 text-[16px] sm:text-[17px] leading-[1.72] sm:leading-[1.8] tracking-[-0.012em] sm:tracking-[-0.013em] text-foreground/75">
                    <Editable path="biography.practice1" as="p" className="text-[16px] sm:text-[17px] leading-[1.72] sm:leading-[1.8] tracking-[-0.012em] sm:tracking-[-0.013em] text-foreground/75" />
                    <Editable path="biography.practice2" as="p" className="text-[16px] sm:text-[17px] leading-[1.72] sm:leading-[1.8] tracking-[-0.012em] sm:tracking-[-0.013em] text-foreground/75" />
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
                  <Editable path="biography.pullQuote" as="p" className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-[350] leading-[1.4] sm:leading-[1.45] tracking-[-0.017em] sm:tracking-[-0.018em] text-foreground/95 italic" />
                </motion.div>

                <div className="space-y-5 sm:space-y-6 text-[16px] sm:text-[17px] leading-[1.72] sm:leading-[1.8] tracking-[-0.012em] sm:tracking-[-0.013em] text-foreground/75 pt-2 sm:pt-4">
                  <Editable path="biography.closing" as="p" className="text-[16px] sm:text-[17px] leading-[1.72] sm:leading-[1.8] tracking-[-0.012em] sm:tracking-[-0.013em] text-foreground/75" />
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
              <Editable path="designApproach.heading" as="p" className="text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-[300] leading-[1.35] sm:leading-[1.3] tracking-[-0.023em] sm:tracking-[-0.022em] text-foreground/90" />
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
                    <Editable path="designApproach.principle1Title" />
                  </h3>
                  <Editable path="designApproach.principle1Desc" as="p" className="text-[15px] sm:text-[16px] leading-[1.7] sm:leading-[1.75] tracking-[-0.010em] sm:tracking-[-0.011em] text-foreground/65" />
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
                    <Editable path="designApproach.principle2Title" />
                  </h3>
                  <Editable path="designApproach.principle2Desc" as="p" className="text-[15px] sm:text-[16px] leading-[1.7] sm:leading-[1.75] tracking-[-0.010em] sm:tracking-[-0.011em] text-foreground/65" />
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
                    <Editable path="designApproach.principle3Title" />
                  </h3>
                  <Editable path="designApproach.principle3Desc" as="p" className="text-[15px] sm:text-[16px] leading-[1.7] sm:leading-[1.75] tracking-[-0.010em] sm:tracking-[-0.011em] text-foreground/65" />
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
              {hasChanges ? "Update About Page" : "No Changes"}
            </span>
          </motion.button>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}