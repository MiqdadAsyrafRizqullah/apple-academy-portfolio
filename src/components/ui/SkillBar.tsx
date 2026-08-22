import { useState } from 'react';
import { motion } from 'framer-motion';
import type { SkillCategory } from '../../types';

interface SkillBarProps {
  name: string;
  icon: string;
  proficiency: number; // 0-100
  category: SkillCategory;
  tooltip?: string;
}

export function SkillBar({ name, icon, tooltip }: SkillBarProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      className="relative group h-full cursor-default"
      initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
      role="listitem"
      aria-label={name}
      style={{ perspective: '1000px' }}
    >
      {showTooltip && (
        <div
          role="tooltip"
          className="absolute -top-14 left-1/2 -translate-x-1/2 z-20 px-3 py-2 text-xs text-white bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl whitespace-nowrap pointer-events-none"
        >
          {tooltip ?? name}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/90" />
        </div>
      )}

      {/* 3D Glassmorphic Card */}
      <div className="flex flex-col items-center justify-center p-4 h-full min-h-[120px] rounded-2xl bg-[var(--color-surface)] border border-white/10 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 transform-gpu group-hover:-translate-y-2 group-hover:rotate-1 group-hover:scale-105 group-hover:shadow-[0_15px_30px_rgba(99,102,241,0.2)] relative overflow-hidden">
        
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon with 3D drop shadow */}
        <img
          src={icon}
          alt={`${name} icon`}
          className="w-12 h-12 mb-3 object-contain drop-shadow-sm group-hover:drop-shadow-[0_0_12px_rgba(99,102,241,0.6)] transition-all duration-300 relative z-10"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />

        <span className="text-sm font-semibold text-[var(--color-text-primary)] text-center relative z-10">
          {name}
        </span>
      </div>
    </motion.div>
  );
}

export default SkillBar;
