import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { projects, getAllCategories, getAllSectors } from "../data/projects";
import { motion } from "motion/react";

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const allCategories = getAllCategories();
  const allSectors = getAllSectors();
  const projectsPerPage = 15;
  
  console.log('Categories:', allCategories);
  console.log('Sectors:', allSectors);

  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesSector = selectedSector ? p.sector === selectedSector : true;
    return matchesCategory && matchesSector;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const handleFlip = (projectId: string) => {
    setFlippedCardId(prev => prev === projectId ? null : projectId);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when changing category
  };

  const handleSectorChange = (sector: string | null) => {
    setSelectedSector(sector);
    setCurrentPage(1); // Reset to page 1 when changing sector
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-32 pt-40">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          {/* Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-primary to-purple-600 mb-8 rounded-full"
            />
            
            <h1 className="text-[56px] md:text-[72px] lg:text-[88px] font-medium mb-6 tracking-[-0.03em] leading-[1.05] md:leading-[0.95]" style={{ fontFeatureSettings: "'ss01' on, 'cv05' on, 'cv08' on" }}>
              Work
            </h1>
            <p className="text-[19px] md:text-[21px] text-muted-foreground max-w-4xl leading-[1.6] tracking-[-0.011em]">
              Case studies demonstrating strategic product design, systems thinking, and measurable impact across AI platforms, enterprise tools, and public-sector digital services.
            </p>
          </motion.div>

          {/* Category Filters - Highly Visible */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Domain Filters - Left */}
            <div>
              <h2 className="text-[15px] uppercase tracking-[0.12em] font-bold text-muted-foreground/50 mb-6">
                Domain
              </h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`px-5 py-1.5 rounded-[4px] text-[14px] font-medium transition-all border-2 ${
                    selectedCategory === null
                      ? "bg-foreground/90 text-background border-foreground/90"
                      : "bg-background text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  All
                </button>
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-5 py-1.5 rounded-[4px] text-[14px] font-medium transition-all border-2 ${
                      selectedCategory === category
                        ? "bg-foreground/90 text-background border-foreground/90"
                        : "bg-background text-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sector Filters - Right */}
            <div>
              <h2 className="text-[15px] uppercase tracking-[0.12em] font-bold text-muted-foreground/50 mb-6">
                Disciplines
              </h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleSectorChange(null)}
                  className={`px-5 py-1.5 rounded-[4px] text-[14px] font-medium transition-all border-2 ${
                    selectedSector === null
                      ? "bg-foreground/90 text-background border-foreground/90"
                      : "bg-background text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  All
                </button>
                {allSectors.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => handleSectorChange(sector)}
                    className={`px-5 py-1.5 rounded-[4px] text-[14px] font-medium transition-all border-2 ${
                      selectedSector === sector
                        ? "bg-foreground/90 text-background border-foreground/90"
                        : "bg-background text-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10"
          >
            <p className="text-[15px] text-muted-foreground tracking-[-0.01em]">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </motion.div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProjects.map((project) => (
              <CaseStudyCard 
                key={project.id} 
                project={project} 
                onFlip={handleFlip} 
                isFlipped={flippedCardId === project.id} 
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-24">
              <p className="text-[17px] text-muted-foreground tracking-[-0.011em]">
                No projects found for the selected category and sector.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-all border-2 ${
                  currentPage === 1
                    ? "bg-background text-muted-foreground border-border cursor-not-allowed opacity-50"
                    : "bg-background text-foreground border-foreground/20 hover:border-foreground/40"
                }`}
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-all border-2 ${
                      currentPage === page
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-foreground/20 hover:border-foreground/40"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-all border-2 ${
                  currentPage === totalPages
                    ? "bg-background text-muted-foreground border-border cursor-not-allowed opacity-50"
                    : "bg-background text-foreground border-foreground/20 hover:border-foreground/40"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}