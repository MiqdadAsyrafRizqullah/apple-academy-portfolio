import { motion } from 'framer-motion';
import { SkillBar } from '../ui/SkillBar';
import { skills } from '../../data/skills';
import type { SkillCategory } from '../../types';

const CATEGORIES: SkillCategory[] = [
  'UI/UX Design',
  'Web Development',
  'Mobile Development',
  'Artificial Intelligence',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/**
 * Skills Section
 * - Skills grouped by 4 categories
 * - Staggered entrance animation via Framer Motion staggerChildren
 * - Background animation runs continuously (always on)
 */
export function SkillsSection() {
  const skillsByCategory = (category: SkillCategory) =>
    skills.filter(s => s.category === category);

  return (
    <section
      id="skills"
      className="relative py-20 lg:py-32 bg-[var(--color-surface)]"
      aria-label="Skills"
    >
      {/* 3D Perspective Moving Grid Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 origin-top [transform:perspective(1000px)_rotateX(60deg)_scale(2.5)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]">
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]"
            animate={{ backgroundPositionY: ['0rem', '4rem'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 4 }}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Skills
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Technologies and tools I have mastered across various fields
          </p>
          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto rounded-full mt-4" aria-hidden="true" />
        </motion.div>

        {/* Categories grid (Stable Manual Masonry) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Column 1: UI/UX & Mobile */}
          <div className="flex flex-col gap-8">
            {[CATEGORIES[0], CATEGORIES[2]].map((category, catIndex) => {
              const actualIndex = catIndex === 0 ? 0 : 2;
              return (
                <motion.div
                  key={category}
                  className="bg-[var(--color-background)]/50 backdrop-blur-md p-6 rounded-3xl border border-[var(--color-border)] shadow-sm"
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: false, margin: '-10%' }}
                  transition={{ duration: 0.8, delay: actualIndex * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
                    {category}
                  </h3>
                  <motion.ul
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                    role="list"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: '-10%' }}
                  >
                    {skillsByCategory(category).map((skill) => (
                      <li key={skill.id} className="h-full">
                        <SkillBar
                          name={skill.name}
                          icon={skill.icon}
                          proficiency={skill.proficiency}
                          category={skill.category}
                          tooltip={skill.tooltip}
                        />
                      </li>
                    ))}
                  </motion.ul>
                </motion.div>
              );
            })}
          </div>

          {/* Column 2: Web & AI */}
          <div className="flex flex-col gap-8">
            {[CATEGORIES[1], CATEGORIES[3]].map((category, catIndex) => {
              const actualIndex = catIndex === 0 ? 1 : 3;
              return (
                <motion.div
                  key={category}
                  className="bg-[var(--color-background)]/50 backdrop-blur-md p-6 rounded-3xl border border-[var(--color-border)] shadow-sm"
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: false, margin: '-10%' }}
                  transition={{ duration: 0.8, delay: actualIndex * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
                    {category}
                  </h3>
                  <motion.ul
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                    role="list"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: '-10%' }}
                  >
                    {skillsByCategory(category).map((skill) => (
                      <li key={skill.id} className="h-full">
                        <SkillBar
                          name={skill.name}
                          icon={skill.icon}
                          proficiency={skill.proficiency}
                          category={skill.category}
                          tooltip={skill.tooltip}
                        />
                      </li>
                    ))}
                  </motion.ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
