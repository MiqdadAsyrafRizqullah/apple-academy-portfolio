import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Eye } from 'lucide-react';
import type { Certificate } from '../../types';

interface CertificateCardProps {
  certificate: Certificate;
  onOpenLightbox: (certificate: Certificate) => void;
}

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWUxZTJlIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjM2NmYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn4+RPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R2FtYmFyIHRpZGFrIHRlcnNlZGlhPC90ZXh0Pjwvc3ZnPg==';

export function CertificateCard({ certificate, onOpenLightbox }: CertificateCardProps) {
  const [imgError, setImgError] = useState(false);

  const openDetail = () => onOpenLightbox(certificate);

  return (
    <motion.article
      className="certificate-card relative z-20 h-full flex flex-col rounded-xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer touch-manipulation"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)' }}
      onClick={openDetail}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDetail();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Lihat detail sertifikat: ${certificate.name}`}
    >
      <div className="relative shrink-0 aspect-[4/3] overflow-hidden bg-gray-800 group">
        <img
          src={imgError ? PLACEHOLDER_IMAGE : certificate.image}
          alt={`Sertifikat ${certificate.name} dari ${certificate.issuer}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          loading="lazy"
          onError={() => setImgError(true)}
          draggable={false}
        />

        {certificate.featured && (
          <span
            className="absolute top-2 right-2 p-1.5 rounded-full bg-yellow-500 text-white pointer-events-none"
            aria-label="Sertifikat unggulan"
          >
            <Award size={12} aria-hidden="true" />
          </span>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium pointer-events-none">
            <Eye size={14} aria-hidden="true" />
            View Details
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1 line-clamp-2 pointer-events-none">
          {certificate.name}
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] mb-1 pointer-events-none">
          {certificate.issuer}
        </p>
        <p className="text-xs text-[var(--color-text-secondary)] mb-3 flex-grow pointer-events-none">
          {certificate.year}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openDetail();
          }}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)] hover:text-white transition-colors font-medium"
          aria-label={`Lihat detail ${certificate.name}`}
        >
          <Eye size={14} aria-hidden="true" />
          View Details
        </button>

        {certificate.verificationUrl && (
          <a
            href={certificate.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            aria-label={`Verifikasi sertifikat ${certificate.name}`}
          >
            <ExternalLink size={12} aria-hidden="true" />
            Verifikasi
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default CertificateCard;
