import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import { ParticleSystem } from '../ui/ParticleSystem';
import { TypewriterEffect } from '../ui/TypewriterEffect';
import { personalInfo } from '../../data/personal';
import { scrollToSection } from '../../utils/scrollUtils';

// Inline SVG brand icons (lucide-react v1.14 does not include brand icons)
function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

/**
 * Hero / Landing Section
 * - ParticleSystem background
 * - Profile photo, name, TypewriterEffect titles, tagline
 * - CTA buttons (Portfolio, Contact)
 * - Social links
 * - Scroll indicator with bounce animation
 * - Parallax background via Framer Motion useScroll + useTransform
 */
export function HeroSection() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  const socialLinks = [
    { href: personalInfo.social.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
    { href: personalInfo.social.github, icon: GithubIcon, label: 'GitHub' },
    { href: personalInfo.social.instagram, icon: InstagramIcon, label: 'Instagram' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0"
      aria-label="Beranda"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
        aria-hidden="true"
      >
        <ParticleSystem />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-10000" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-7000 delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-background)]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Profile photo */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', damping: 20 }}
        >
          <div className="relative">
            <img
              src={personalInfo.profileImage}
              alt={`Foto profil ${personalInfo.name}`}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-[var(--color-primary)] shadow-xl"
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = 'none';
              }}
            />
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-full border-4 border-[var(--color-primary)] opacity-30 animate-ping"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-purple-500 to-[var(--color-primary)] mb-4 pb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Typewriter titles */}
        <motion.div
          className="text-xl sm:text-2xl text-[var(--color-primary)] font-medium mb-4 h-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <TypewriterEffect texts={personalInfo.titles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            type="button"
            onClick={() => scrollToSection('portfolio')}
            className="px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold text-base hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 min-w-[160px]"
            aria-label="Lihat portofolio saya"
          >
            Lihat Portofolio
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold text-base hover:bg-[var(--color-primary)] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 min-w-[160px]"
            aria-label="Hubungi saya"
          >
            Hubungi Saya
          </button>
          <a
            href={personalInfo.cvUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold text-base hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 min-w-[160px]"
            aria-label="Unduh CV saya"
          >
            <Download size={16} aria-hidden="true" />
            Unduh CV
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              aria-label={`Kunjungi profil ${label} saya`}
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--color-text-secondary)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
