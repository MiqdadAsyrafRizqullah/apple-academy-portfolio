import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useCountingAnimation } from '../../hooks/useCountingAnimation';

interface AnimatedCounterProps {
  target: number;
  duration?: number; // ms, default 2000, max 2000
  suffix?: string;
  className?: string;
}

/**
 * Animates a number from 0 to target when it enters the viewport.
 * Fallback: if target is not a valid number, displays target directly without animation.
 */
export function AnimatedCounter({ target, duration = 2000, suffix = '', className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isIntersecting = useIntersectionObserver(ref as any, { threshold: 0.1 });

  const isValidTarget = Number.isFinite(target) && target >= 0;
  const currentValue = useCountingAnimation(
    isValidTarget ? target : 0,
    duration,
    isIntersecting && isValidTarget
  );

  return (
    <span ref={ref} className={className} aria-live="polite">
      {isValidTarget ? `${currentValue}${suffix}` : `${target}${suffix}`}
    </span>
  );
}

export default AnimatedCounter;
