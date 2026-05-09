import { useState, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { BlogCard } from "../components/BlogCard";
import { getMergedProjects, getAllTags } from "../data/projects";
import { getMergedBlogPosts, getAllBlogTags } from "../data/blog";
import { Mail, Linkedin, Send } from "lucide-react";
import { motion } from "motion/react";

export default function Landing() {
  const [projects, setProjects] = useState(getMergedProjects());
  const [blogPosts, setBlogPosts] = useState(getMergedBlogPosts());

  // Work section state
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const projectsPerPage = 9;
  const allTags = getAllTags();

  // Reload projects when component mounts
  useEffect(() => {
    setProjects(getMergedProjects());
    setBlogPosts(getMergedBlogPosts());
  }, []);

  const handleUpdate = () => {
    setProjects(getMergedProjects());
  };

  const handleBlogUpdate = () => {
    setBlogPosts(getMergedBlogPosts());
  };

  // Blog section state
  const [selectedBlogTag, setSelectedBlogTag] = useState<string | null>(null);
  const allBlogTags = getAllBlogTags();

  const filteredProjects = selectedTag
    ? projects.filter(p => p.tags.includes(selectedTag))
    : projects;

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleFlip = (projectId: string) => {
    setFlippedCardId(prev => prev === projectId ? null : projectId);
  };

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
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

  const skills = [
    "Product Strategy",
    "User Research",
    "Design Systems",
    "Prototyping",
    "Accessibility (WCAG 2.1 AAA)",
    "Cross-functional Leadership",
    "Workshop Facilitation",
    "Data Visualization",
    "AI/ML Product Design",
    "Government Digital Services",
  ];

  const tools = [
    "Figma",
    "Adobe Creative Suite",
    "Principle",
    "Miro",
    "Notion",
    "Jira",
    "React (basic)",
    "D3.js",
    "HTML/CSS",
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* HOME SECTION */}
      <section id="home" className="pt-20">
        <Hero />
      </section>

      {/* WORK SECTION */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6">Projects</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed tracking-tight">
              Case studies demonstrating strategic product design, systems thinking, and measurable impact across AI platforms, enterprise tools, and public-sector digital services.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTagChange(null)}
                className={`px-4 py-2 rounded text-sm transition-colors ${
                  selectedTag === null
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                All Projects
              </motion.button>
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTagChange(tag)}
                  className={`px-4 py-2 rounded text-sm transition-colors ${
                    selectedTag === tag
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Project Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CaseStudyCard project={project} onFlip={handleFlip} isFlipped={flippedCardId === project.id} onUpdate={handleUpdate} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No projects found for the selected filter.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-4 mt-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-6 py-2.5 bg-muted text-foreground hover:bg-muted/70 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Previous
              </motion.button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-6 py-2.5 bg-muted text-foreground hover:bg-muted/70 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Next
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* BLOG SECTION */}
      <section id="blog" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-medium mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Thoughts on design leadership, systems thinking, AI ethics, accessibility, and building products that serve the public good.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedBlogTag(null)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedBlogTag === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                All Posts
              </motion.button>
              {allBlogTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBlogTag(tag)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    selectedBlogTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Blog Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {(selectedBlogTag 
              ? blogPosts.filter(post => post.tags.includes(selectedBlogTag))
              : blogPosts
            ).map((post, index) => (
              <motion.div
                key={post.id}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BlogCard post={post} onUpdate={handleBlogUpdate} />
              </motion.div>
            ))}
          </motion.div>

          {selectedBlogTag && blogPosts.filter(post => post.tags.includes(selectedBlogTag)).length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No blog posts found for the selected tag.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-medium mb-6">About</h1>
          </motion.div>

          {/* Profile Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20"
          >
            {/* Photo */}
            <motion.div 
              variants={scaleIn}
              transition={{ duration: 0.6 }}
              className="md:col-span-1"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                  alt="Vibhav Kamat"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="md:col-span-2 space-y-6 text-muted-foreground leading-relaxed"
            >
              <p className="text-lg">
                I'm a Principal Product Designer with over 12 years of experience designing digital products that serve millions of users across government, healthcare, and enterprise sectors.
              </p>
              <p>
                My work centers on <strong className="text-foreground">strategic systems thinking</strong>—approaching complex problems with a holistic view of user needs, organizational constraints, and technical feasibility. I've led design for AI-powered decision platforms, enterprise design systems serving 200+ team members, and accessible public-sector tools reaching 2M+ citizens.
              </p>
              <p>
                As a cross-functional leader, I thrive at the intersection of design, product, and engineering. I've facilitated workshops with C-suite executives, conducted research with vulnerable populations, and mentored designers across all career levels. My approach emphasizes <strong className="text-foreground">collaborative problem-solving</strong>, <strong className="text-foreground">data-informed decisions</strong>, and <strong className="text-foreground">inclusive design practices</strong>.
              </p>
              <p>
                I'm particularly passionate about designing AI interfaces that are transparent, ethical, and accessible—ensuring that emerging technologies serve everyone, not just the privileged few. My government work has focused on improving digital equity, simplifying complex systems, and building trust through thoughtful, human-centered design.
              </p>
              <p>
                Before focusing on UX, I studied Cognitive Science at UC Berkeley and worked as a front-end developer, experiences that continue to inform my approach to interaction design and systems architecture.
              </p>
            </motion.div>
          </motion.div>

          {/* Design Approach */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-medium mb-12">Design Approach</h2>
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            >
              <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                <div className="border-l-2 border-foreground pl-4 mb-4"></div>
                <h3 className="text-xl font-medium mb-3">Strategic Systems Thinking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I design at the intersection of user needs, business goals, and technical constraints—creating scalable solutions that serve diverse stakeholders across complex organizations.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                <div className="border-l-2 border-foreground pl-4 mb-4"></div>
                <h3 className="text-xl font-medium mb-3">Cross-Functional Leadership</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Leading design across product, engineering, and executive teams—driving alignment through clear communication, collaborative workshops, and data-informed decision making.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                <div className="border-l-2 border-foreground pl-4 mb-4"></div>
                <h3 className="text-xl font-medium mb-3">Inclusive by Design</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Championing accessibility and inclusive design practices—ensuring that digital products serve everyone, especially underserved and vulnerable populations.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Skills & Tools */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"
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

          {/* Experience Highlights */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-20"
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
                <p className="text-sm text-muted-foreground mb-2">2022 - Present</p>
                <h3 className="text-xl font-medium mb-2">
                  Principal Product Designer
                </h3>
                <p className="text-muted-foreground mb-2">
                  Digital Services Agency (Federal Contractor)
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Leading design for AI-powered platforms serving 12+ federal agencies. Established design practice and mentored team of 6 designers. Drove adoption of accessibility standards and inclusive design methodologies across organization.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 4 }}
                className="border-l-2 border-muted pl-6"
              >
                <p className="text-sm text-muted-foreground mb-2">2019 - 2022</p>
                <h3 className="text-xl font-medium mb-2">
                  Senior Product Designer, Design Systems Lead
                </h3>
                <p className="text-muted-foreground mb-2">
                  TechCorp (Enterprise SaaS, Series D)
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Architected enterprise design system serving 15 product teams and 200+ designers/engineers. Led design for flagship analytics platform ($400M+ ARR). Reduced design-to-development time by 60% and improved product consistency across portfolio.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 4 }}
                className="border-l-2 border-muted pl-6"
              >
                <p className="text-sm text-muted-foreground mb-2">2016 - 2019</p>
                <h3 className="text-xl font-medium mb-2">
                  Product Designer
                </h3>
                <p className="text-muted-foreground mb-2">
                  HealthTech Innovations (Healthcare Platform)
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Redesigned patient portal serving 2M+ users across regional healthcare network. Led accessibility initiatives achieving WCAG 2.1 AAA compliance. Increased patient adoption from 22% to 68% through user research and iterative design.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Education & Recognition */}
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
                  <p className="font-medium">B.A. Cognitive Science</p>
                  <p className="text-sm text-muted-foreground">
                    University of California, Berkeley
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-medium mb-6">Recognition</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Best Research Tool, Science Visualization Conference (2023)</li>
                <li>• Featured in UXPA Magazine: "Designing for Government" (2024)</li>
                <li>• Speaker at Design Systems Summit (2023, 2024)</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-medium mb-6">Get in Touch</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              I'm always interested in hearing about new opportunities, collaborations, or just connecting with fellow designers and product leaders. Feel free to reach out.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {/* Contact Info */}
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="md:col-span-1 space-y-8"
            >
              <div>
                <h3 className="font-medium mb-4">Email</h3>
                <motion.a
                  whileHover={{ x: 4 }}
                  href="mailto:vibhav.ux8@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={20} />
                  <span>vibhav.ux8@gmail.com</span>
                </motion.a>
              </div>

              <div>
                <h3 className="font-medium mb-4">Connect</h3>
                <div className="space-y-3">
                  <motion.a
                    whileHover={{ x: 4 }}
                    href="https://www.linkedin.com/in/vibhav-kamat-504460153/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                  </motion.a>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Based in</h3>
                <p className="text-muted-foreground">
                  Goa | Bengaluru | Pune | Delhi
                  <br />
                  Open to remote opportunities
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <label htmlFor="name" className="block mb-2 text-sm">
                    Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label htmlFor="subject" className="block mb-2 text-sm">
                    Subject
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label htmlFor="message" className="block mb-2 text-sm">
                    Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitted}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {submitted ? (
                    <>
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>

              {submitted && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm text-muted-foreground"
                >
                  Thank you for reaching out! I'll get back to you soon.
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}