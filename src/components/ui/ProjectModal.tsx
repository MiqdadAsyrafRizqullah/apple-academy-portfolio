import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Project } from '../../types';
import { ModalPortal } from './ModalPortal';
import { forceUnlockPageScroll, unlockPageScroll } from '../../utils/scrollLock';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Modal dialog for full project details with Swiper gallery.
 * Portaled to body for stable viewport-centered positioning.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const handleExitComplete = () => {
    unlockPageScroll();
  };

  const handleClose = () => {
    onClose();
    window.setTimeout(() => {
      if (document.body.style.position === 'fixed') {
        forceUnlockPageScroll();
      }
    }, 450);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (project) {
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        try {
          closeButtonRef.current?.focus({ preventScroll: true });
        } catch {
          closeButtonRef.current?.focus();
        }
      }, 50);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <ModalPortal>
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {project && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              aria-hidden="true"
            />

            <div
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
              style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))', paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="relative flex w-full max-w-3xl max-h-[min(90vh,calc(100dvh-5.5rem))] flex-col rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl pointer-events-auto overflow-hidden"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                onClick={handleClose}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label="Close modal"
                >
                  <X size={18} aria-hidden="true" />
                </button>

                <div className="overflow-y-auto overscroll-contain">
                  {project.gallery.length > 0 && (
                    <div className="aspect-video shrink-0 bg-gray-800 border-b border-[var(--color-border)]">
                      <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        className="h-full w-full"
                      >
                        {project.gallery.map((img, i) => (
                          <SwiperSlide key={i}>
                            <img
                              src={img}
                              alt={`${project.title} screenshot ${i + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )}

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 pr-10">
                      <div className="min-w-0">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--color-primary)] text-white">
                            {project.category}
                          </span>
                          {project.teamStatus && (
                            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full border border-[var(--color-primary)] text-[var(--color-primary)]">
                              {project.teamStatus}
                            </span>
                          )}
                          {project.context && (
                            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gray-500/20 text-[var(--color-text-primary)] border border-gray-500/30">
                              {project.context}
                            </span>
                          )}
                        </div>
                        <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                          {project.title}
                        </h2>
                        {project.role && (
                          <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-1.5 mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                            Role: {project.role}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 shrink-0">
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-sm hover:opacity-90 transition-opacity"
                            aria-label={`Buka live site ${project.title}`}
                          >
                            <ExternalLink size={14} aria-hidden="true" />
                            Live Site
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm hover:border-[var(--color-primary)] transition-colors"
                            aria-label={`Lihat repositori ${project.title}`}
                          >
                            <FaGithub size={14} aria-hidden="true" />
                            Repo
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-[var(--color-text-secondary)] mb-5 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                      {project.fullDescription}
                    </p>

                    <div className="mb-5">
                      <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs rounded-full bg-[var(--color-border)] text-[var(--color-text-secondary)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Impact</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{project.impact}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">What I Learned</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{project.learnings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}

export default ProjectModal;
