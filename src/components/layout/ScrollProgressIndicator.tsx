import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * Thin progress bar at the top of the page showing scroll progress.
 * Uses useScrollProgress hook (0–100).
 */
export function ScrollProgressIndicator() {
  const scrollProgress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progres scroll halaman"
    >
      <div
        className="h-full bg-[var(--color-primary)] transition-none"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

export default ScrollProgressIndicator;
