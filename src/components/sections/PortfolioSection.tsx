import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '../ui/ProjectCard';
import { ProjectModal } from '../ui/ProjectModal';
import { projects } from '../../data/projects';
import type { Project, ProjectCategory } from '../../types';
import { lockPageScroll } from '../../utils/scrollLock';

type FilterCategory = ProjectCategory | 'Semua';

const FILTER_CATEGORIES: FilterCategory[] = ['Semua', 'Web', 'UI/UX', 'Aplikasi', 'AI'];

/**
 * Portfolio / Projects Section
 * - Filter bar by category
 * - Staggered entrance animation per card
 * - ProjectModal with AnimatePresence
 */
export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('Semua');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProjectModal = (project: Project) => {
    lockPageScroll();
    setSelectedProject(project);
  };

  const filteredProjects =
    activeFilter === 'Semua'
      ? projects
      : projects.filter(p => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="py-20 lg:py-32 bg-[var(--color-background)]"
      aria-label="Portofolio"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Portofolio
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Proyek-proyek yang telah saya kerjakan
          </p>
          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto rounded-full mt-4" aria-hidden="true" />
        </motion.div>

        {/* Filter bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          role="group"
          aria-label="Filter kategori proyek"
        >
          {FILTER_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                activeFilter === category
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
              }`}
              aria-pressed={activeFilter === category}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProjectCard
                  project={project}
                  onOpenModal={openProjectModal}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-[var(--color-text-secondary)]">
            <p>Tidak ada proyek dalam kategori ini.</p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

export default PortfolioSection;
