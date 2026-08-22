import { useState, useEffect } from 'react';

/**
 * Tracks scroll position as a percentage (0–100).
 * Returns scrollProgress: number
 */
export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
}
