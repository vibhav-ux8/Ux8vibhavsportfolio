import { ArrowRight, Download, Mail } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import logoImage from "../../imports/UX8_Logo_2.svg";

export function Hero() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-16">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl"
        >
          {/* Logo */}
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <img 
              src={logoImage} 
              alt="UX8" 
              className="h-20 md:h-24 lg:h-28 w-auto"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight mb-10"
          >
            Designing intelligent systems that empower organizations and serve the public good.
          </motion.h1>

          {/* Mission Statement */}
          <motion.p 
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-4xl tracking-tight"
          >
            I lead product design for AI-powered platforms, enterprise tools, and government digital services—combining strategic vision, systems thinking, and cross-functional leadership to deliver impact at scale.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded hover:bg-foreground/90 transition-colors text-base font-medium"
              >
                View Projects
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/jordan-chen-resume.pdf"
              download
              className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded hover:border-foreground transition-colors text-base font-medium"
            >
              <Download size={18} />
              Download Resume
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded hover:border-foreground transition-colors text-base font-medium"
              >
                <Mail size={18} />
                Contact
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}