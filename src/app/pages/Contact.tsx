import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Mail, Linkedin, Send, Edit2 } from "lucide-react";
import { motion } from "motion/react";
import dealIcon from "../../imports/deal.png";
import { useAdminView } from "../contexts/AdminViewContext";

export default function Contact() {
  const { isAdminView } = useAdminView();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [pageTitle, setPageTitle] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('contactPageTitle');
      return saved || "Get in Touch";
    }
    return "Get in Touch";
  });
  const [pageDescription, setPageDescription] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('contactPageDescription');
      return saved || "I'm always interested in hearing about new opportunities, collaborations, or just connecting with fellow designers and product leaders. Feel free to reach out.";
    }
    return "I'm always interested in hearing about new opportunities, collaborations, or just connecting with fellow designers and product leaders. Feel free to reach out.";
  });

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

  const handleSaveTitle = () => {
    localStorage.setItem('contactPageTitle', pageTitle);
    setIsEditingTitle(false);
  };

  const handleCancelTitle = () => {
    const saved = localStorage.getItem('contactPageTitle');
    setPageTitle(saved || "Get in Touch");
    setIsEditingTitle(false);
  };

  const handleSaveDescription = () => {
    localStorage.setItem('contactPageDescription', pageDescription);
    setIsEditingDescription(false);
  };

  const handleCancelDescription = () => {
    const saved = localStorage.getItem('contactPageDescription');
    setPageDescription(saved || "I'm always interested in hearing about new opportunities, collaborations, or just connecting with fellow designers and product leaders. Feel free to reach out.");
    setIsEditingDescription(false);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="relative py-32 pt-40 overflow-hidden">
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        
        <div className="relative max-w-[1200px] mx-auto px-8 lg:px-16">
          {/* Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-1 bg-gradient-to-r from-primary to-purple-600 mb-8 rounded-full"
            />
            <div className="relative group">
              {isEditingTitle ? (
                <div className="space-y-3 mb-6">
                  <input
                    type="text"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    className="w-full px-4 py-3 text-[56px] md:text-[72px] lg:text-[88px] font-medium tracking-[-0.03em] leading-[0.95] border border-border/60 rounded-xl bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
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
                <h1 className="text-[56px] md:text-[72px] lg:text-[88px] font-medium mb-6 tracking-[-0.03em] leading-[0.95] inline-flex items-center gap-4" style={{ fontFeatureSettings: "'ss01' on, 'cv05' on, 'cv08' on" }}>
                  <span>{pageTitle}</span>
                  <img
                    src={dealIcon}
                    alt="handshake"
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