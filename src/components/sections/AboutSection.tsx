import { useRef } from 'react';
import type React from 'react';
import { motion } from 'framer-motion';
import { Download, Briefcase, Palette, Smartphone, Brain, Code2, Globe, GitBranch, Camera, Cpu, Layers, Music, BookOpen, Gamepad2, Coffee, Pen } from 'lucide-react';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { personalInfo } from '../../data/personal';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const fadeInUp = {
  initial: { opacity: 0, y: 50, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: false, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const expertiseAreas = [
  { icon: Palette, label: 'UI/UX Design', description: 'Merancang antarmuka yang intuitif dan estetis' },
  { icon: Briefcase, label: 'Web Development', description: 'Membangun aplikasi web modern dan responsif' },
  { icon: Smartphone, label: 'App Development', description: 'Mengembangkan aplikasi mobile cross-platform' },
  { icon: Brain, label: 'Artificial Intelligence', description: 'Menerapkan solusi AI untuk masalah nyata' },
];

const interestIconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  'UI/UX Design': Palette,
  'Web Development': Code2,
  'Mobile Apps': Smartphone,
  'Artificial Intelligence': Cpu,
  'Open Source': GitBranch,
  'Photography': Camera,
  'Music': Music,
  'Reading': BookOpen,
  'Gaming': Gamepad2,
  'Coffee': Coffee,
  'Writing': Pen,
  'Design': Layers,
  'Research': Brain,
  'Networking': Globe,
};

/**
 * About Section
 * - Asymmetric layout: photo left, text right
 * - Bio, professional background, stats (AnimatedCounter), interests
 * - CV download button
 * - Scroll animations: fade-in/slide-in per content block
 */
export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useIntersectionObserver(sectionRef as React.RefObject<Element>, { threshold: 0.1 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[var(--color-background)]"
      aria-label="Tentang saya"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            About Me
          </h2>
          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto rounded-full" aria-hidden="true" />
        </motion.div>

        {/* Asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center mb-16">
          {/* Photo — 2 columns */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, x: -120, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <img
                src={personalInfo.profileImage}
                alt={`Foto profil ${personalInfo.name}`}
                className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl object-cover shadow-2xl"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Decorative border */}
              <div
                className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-[var(--color-primary)] opacity-30"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Text — 3 columns */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 100, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div {...fadeInUp}>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                Halo, saya {personalInfo.name} 👋
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {personalInfo.bio}
              </p>
            </motion.div>

            {/* Expertise areas */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {expertiseAreas.map(({ icon: Icon, label, description }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
                >
                  <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 flex-shrink-0">
                    <Icon size={16} className="text-[var(--color-primary)]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{label}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CV download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href={personalInfo.cvUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
                aria-label="Unduh CV saya"
              >
                <Download size={16} aria-hidden="true" />
                Unduh CV
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { target: personalInfo.stats.projectsCompleted, label: 'Proyek Portofolio', suffix: '', delay: 0 },
            { target: personalInfo.stats.yearsExperience, label: 'Sertifikat & Kursus', suffix: '', delay: 0.15 },
            { target: personalInfo.stats.clients, label: 'Bidang Keahlian', suffix: '', delay: 0.3 },
          ].map(({ target, label, suffix, delay }) => (
            <motion.div
              key={label}
              className="text-center p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              initial={{ opacity: 0, y: 60, scale: 0.85, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: false, margin: '-10%' }}
              transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                <AnimatedCounter target={target} suffix={suffix} />
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 70, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, margin: '-10%' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1 text-center">
            Minat & Hobi
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] text-center mb-6">
            Hal-hal yang saya sukai di luar coding
          </p>

          {/* Row 1 — scrolls left */}
          <div className="relative overflow-hidden flex items-center py-2 w-full mb-3">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 z-10 bg-gradient-to-r from-[var(--color-background)] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 z-10 bg-gradient-to-l from-[var(--color-background)] to-transparent pointer-events-none" />
            <motion.div
              className="flex gap-4 w-max"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
            >
              {[...personalInfo.interests, ...personalInfo.interests].map(({ label }, index) => {
                const gradients = [
                  'from-violet-500/20 to-purple-500/10 border-violet-500/30 hover:border-violet-400/60',
                  'from-blue-500/20 to-cyan-500/10 border-blue-500/30 hover:border-blue-400/60',
                  'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 hover:border-emerald-400/60',
                  'from-rose-500/20 to-pink-500/10 border-rose-500/30 hover:border-rose-400/60',
                  'from-amber-500/20 to-orange-500/10 border-amber-500/30 hover:border-amber-400/60',
                  'from-indigo-500/20 to-blue-500/10 border-indigo-500/30 hover:border-indigo-400/60',
                ];
                const glows = [
                  'hover:shadow-violet-500/20',
                  'hover:shadow-blue-500/20',
                  'hover:shadow-emerald-500/20',
                  'hover:shadow-rose-500/20',
                  'hover:shadow-amber-500/20',
                  'hover:shadow-indigo-500/20',
                ];
                const g = gradients[index % gradients.length];
                const glow = glows[index % glows.length];
                return (
                  <div
                    key={`row1-${label}-${index}`}
                    className={`group flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-br ${g} border backdrop-blur-sm shadow-md hover:shadow-xl ${glow} hover:-translate-y-1.5 transition-all duration-300 whitespace-nowrap cursor-default`}
                  >
                    {(() => { const Icon = interestIconMap[label] ?? Briefcase; return <Icon size={18} className="text-[var(--color-text-primary)] group-hover:scale-125 transition-transform duration-300 shrink-0" />; })()}
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">{label}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Row 2 — scrolls right (opposite direction) */}
          <div className="relative overflow-hidden flex items-center py-2 w-full">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 z-10 bg-gradient-to-r from-[var(--color-background)] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 z-10 bg-gradient-to-l from-[var(--color-background)] to-transparent pointer-events-none" />
            <motion.div
              className="flex gap-4 w-max"
              animate={{ x: ['-50%', '0%'] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
            >
              {[...personalInfo.interests, ...personalInfo.interests].map(({ label }, index) => {
                const gradients = [
                  'from-fuchsia-500/20 to-pink-500/10 border-fuchsia-500/30 hover:border-fuchsia-400/60',
                  'from-sky-500/20 to-blue-500/10 border-sky-500/30 hover:border-sky-400/60',
                  'from-lime-500/20 to-green-500/10 border-lime-500/30 hover:border-lime-400/60',
                  'from-orange-500/20 to-red-500/10 border-orange-500/30 hover:border-orange-400/60',
                  'from-teal-500/20 to-cyan-500/10 border-teal-500/30 hover:border-teal-400/60',
                  'from-purple-500/20 to-violet-500/10 border-purple-500/30 hover:border-purple-400/60',
                ];
                const glows = [
                  'hover:shadow-fuchsia-500/20',
                  'hover:shadow-sky-500/20',
                  'hover:shadow-lime-500/20',
                  'hover:shadow-orange-500/20',
                  'hover:shadow-teal-500/20',
                  'hover:shadow-purple-500/20',
                ];
                const g = gradients[index % gradients.length];
                const glow = glows[index % glows.length];
                return (
                  <div
                    key={`row2-${label}-${index}`}
                    className={`group flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-br ${g} border backdrop-blur-sm shadow-md hover:shadow-xl ${glow} hover:-translate-y-1.5 transition-all duration-300 whitespace-nowrap cursor-default`}
                  >
                    {(() => { const Icon = interestIconMap[label] ?? Briefcase; return <Icon size={18} className="text-[var(--color-text-primary)] group-hover:scale-125 transition-transform duration-300 shrink-0" />; })()}
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">{label}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
