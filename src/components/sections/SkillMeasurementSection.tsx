import { motion } from 'framer-motion';
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
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

/**
 * Circular Progress Component
 */
function CircularProgress({ percentage, label, icon }: { percentage: number; label: string; icon: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div variants={itemVariants} className="flex flex-col items-center justify-center p-4 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow">
      <div className="relative flex items-center justify-center w-24 h-24 mb-3">
        {/* Background Circle */}
        <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="var(--color-border)"
            strokeWidth="8"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="var(--color-primary)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          />
        </svg>
        
        {/* Icon in Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={icon} alt={label} className="w-8 h-8 object-contain drop-shadow-sm" />
        </div>
      </div>
      
      {/* Label and Percentage */}
      <div className="text-center">
        <span className="block text-sm font-semibold text-[var(--color-text-primary)]">{label}</span>
        <span className="block text-xs font-medium text-[var(--color-primary)] mt-1">{percentage}%</span>
      </div>
    </motion.div>
  );
}

/**
 * Skill Measurement Section
 * - Displays circular progress charts for skills, grouped by category
 */
export function SkillMeasurementSection() {
  const skillsByCategory = (category: SkillCategory) =>
    skills.filter((s) => s.category === category);

  return (
    <section
      id="skill-measurement"
      className="relative py-20 bg-[var(--color-background)] border-t border-[var(--color-border)]"
      aria-label="Pengukuran Keahlian"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Pengukuran Keahlian
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Tingkat kemahiran pada setiap alat dan teknologi
          </p>
          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto rounded-full mt-4" aria-hidden="true" />
        </motion.div>

        <div className="flex flex-col gap-12">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
                {category}
              </h3>
              
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10%' }}
              >
                {skillsByCategory(category).map((skill) => (
                  <CircularProgress
                    key={skill.id}
                    percentage={skill.proficiency}
                    label={skill.name}
                    icon={skill.icon}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillMeasurementSection;
