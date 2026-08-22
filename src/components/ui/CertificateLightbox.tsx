import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award } from 'lucide-react';
import type { Certificate } from '../../types';
import { ModalPortal } from './ModalPortal';
import { forceUnlockPageScroll, unlockPageScroll } from '../../utils/scrollLock';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWUxZTJlIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjM2NmYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn4+RPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R2FtYmFyIHRpZGFrIHRlcnNlZGlhPC90ZXh0Pjwvc3ZnPg==';

interface CertificateLightboxProps {
  certificate: Certificate | null;
  onClose: () => void;
}

/**
 * Full-screen certificate detail (portaled). Replaces broken in-section fixed layout.
 */
export function CertificateLightbox({ certificate, onClose }: CertificateLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [imgError, setImgError] = useState(false);
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
    setImgError(false);
  }, [certificate?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (certificate) {
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
  }, [certificate, onClose]);

  return (
    <ModalPortal>
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {certificate && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
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
                aria-labelledby="lightbox-title"
                className="relative w-full max-w-lg max-h-[min(92vh,calc(100dvh-5.5rem))] flex flex-col rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl pointer-events-auto overflow-hidden"
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleClose}
                  className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label="Tutup detail sertifikat"
                >
                  <X size={18} aria-hidden="true" />
                </button>

                <div className="overflow-y-auto overscroll-contain">
                  <div className="relative aspect-[4/3] bg-gray-900 border-b border-[var(--color-border)]">
                    <img
                      src={imgError ? PLACEHOLDER_IMAGE : certificate.image}
                      alt={`Sertifikat ${certificate.name} dari ${certificate.issuer}`}
                      className="w-full h-full object-contain p-2"
                      onError={() => setImgError(true)}
                    />
                    {certificate.featured && (
                      <span
                        className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/90 text-white text-xs font-medium"
                        aria-label="Sertifikat unggulan"
                      >
                        <Award size={12} aria-hidden="true" />
                        Unggulan
                      </span>
                    )}
                  </div>

                  <div className="p-5 sm:p-6">
                    <h2
                      id="lightbox-title"
                      className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] mb-2 pr-8 leading-snug"
                    >
                      {certificate.name}
                    </h2>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                      {certificate.issuer}
                    </p>
                    <p className="text-sm text-[var(--color-primary)] font-medium mb-5">
                      Tahun {certificate.year}
                    </p>

                    {certificate.verificationUrl && (
                      <a
                        href={certificate.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                        aria-label={`Verifikasi sertifikat ${certificate.name}`}
                      >
                        <ExternalLink size={16} aria-hidden="true" />
                        Verifikasi Sertifikat
                      </a>
                    )}
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

export default CertificateLightbox;
