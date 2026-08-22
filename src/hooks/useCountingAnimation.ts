import { useState, useEffect, useRef } from 'react';

/**
 * Animates a number from 0 to target in duration ms (max 2000ms) using requestAnimationFrame.
 * @param target - the final value to count to
 * @param duration - animation duration in ms (capped at 2000ms)
 * @param isActive - whether the animation should start (e.g., when in viewport)
 * @returns currentValue: number
 */
export function useCountingAnimation(
  target: number,
  duration: number = 2000,
  isActive: boolean = true
): number {
  const [currentValue, setCurrentValue] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const clampedDuration = Math.min(duration, 2000);

  useEffect(() => {
    if (!isActive || !Number.isFinite(target) || target < 0) {
      return;
    }

    // Reset
    setCurrentValue(0);
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / clampedDuration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);

      setCurrentValue(value);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(target);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, clampedDuration, isActive]);

  return currentValue;
}
