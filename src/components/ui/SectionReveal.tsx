import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type RevealVariant =
  | 'slide-up'
  | 'split'
  | 'curtain-down'
  | 'fan-left'
  | 'tilt-3d'
  | 'glow-up';

interface SectionRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
}

function getVariantStates(variant: RevealVariant) {
  switch (variant) {
    case 'slide-up':
      return {
        hidden: { opacity: 0, y: 100, scale: 0.94, filter: 'blur(14px)' },
        visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
        duration: 1.3,
      };

    case 'split':
      return {
        hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        duration: 0.9,
      };

    case 'curtain-down':
      return {
        hidden: { opacity: 0, y: -100, scaleY: 0.88, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, scaleY: 1, filter: 'blur(0px)' },
        duration: 1.2,
      };

    case 'fan-left':
      return {
        hidden: { opacity: 0, x: 140, rotate: 3, filter: 'blur(12px)' },
        visible: { opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' },
        duration: 1.2,
      };

    case 'tilt-3d':
      return {
        hidden: {
          opacity: 0,
          y: 80,
          rotateX: 18,
          scale: 0.93,
          filter: 'blur(12px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
        },
        duration: 1.4,
      };

    case 'glow-up':
      return {
        hidden: {
          opacity: 0,
          y: 80,
          scale: 0.95,
          filter: 'blur(16px) brightness(0.5)',
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px) brightness(1)',
        },
        duration: 1.3,
      };

    default:
      return {
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0 },
        duration: 1.2,
      };
  }
}

/**
 * SectionReveal — per-section unique scroll animation.
 * - once: false → retriggers on scroll back up
 * - margin: '-15% 0px' → triggers exit animation early enough to be visible
 */
export function SectionReveal({
  children,
  variant = 'slide-up',
  delay = 0,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  // '-15% 0px' shrinks the "visible zone" so exit fires while section still visible
  const isInView = useInView(ref, {
    once: false,
    margin: '-15% 0px',
  });

  const { hidden, visible, duration } = getVariantStates(variant);

  return (
    <div
      ref={ref}
      style={{ perspective: variant === 'tilt-3d' ? '1400px' : undefined }}
    >
      <motion.div
        animate={isInView ? visible : hidden}
        transition={{
          duration,
          delay: isInView ? delay : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: 'center top', willChange: 'transform, opacity, filter' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default SectionReveal;
