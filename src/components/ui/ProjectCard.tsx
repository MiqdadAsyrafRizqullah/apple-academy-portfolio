import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWUxZTJlIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjM2NmYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5OZPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R2FtYmFyIHRpZGFrIHRlcnNlZGlhPC90ZXh0Pjwvc3ZnPg==';

/**
 * Project card with hover overlay and lazy-loaded thumbnail.
 * Clicking the card or "View Details" button opens the project modal.
 */
export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="relative h-full flex flex-col rounded-xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenModal(project)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenModal(project); }}
      tabIndex={0}
      role="button"
      aria-label={`View details proyek: ${project.title}`}
    >
      {/* Thumbnail */}
      <div className="relative shrink-0 aspect-video overflow-hidden bg-gray-800">
        <img
          src={imgError ? PLACEHOLDER_IMAGE : project.thumbnail}
          alt={`Thumbnail proyek ${project.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgError(true)}
        />

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full bg-[var(--color-primary)] text-white">
          {project.category}
        </span>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black/70 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden={!isHovered}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onOpenModal(project); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={`View details ${project.title}`}
          >
            <Eye size={14} aria-hidden="true" />
            View Details
          </button>

          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={`Buka tautan ${project.title}`}
            >
              <ExternalLink size={14} aria-hidden="true" />
              Buka Tautan
            </a>
          )}

          {!project.projectUrl && project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={`Lihat repositori ${project.title}`}
            >
              <FaGithub size={14} aria-hidden="true" />
              Repositori
            </a>
          )}
        </motion.div>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 flex-grow line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-full bg-[var(--color-border)] text-[var(--color-text-secondary)]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--color-border)] text-[var(--color-text-secondary)]">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
