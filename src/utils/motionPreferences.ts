/**
 * Shared motion / device preferences for 3D scenes and loaders.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches;
}

export function getMechanicalMeshCount(): number {
  if (prefersReducedMotion()) return 0;
  return isMobileViewport() ? 20 : 44;
}

export function getPrimaryWireframeColor(): string {
  if (typeof document === 'undefined') return '#818cf8';
  const root = document.documentElement;
  const primary = getComputedStyle(root).getPropertyValue('--color-primary').trim();
  return primary || '#818cf8';
}

/** Palet wireframe intro — selaras tema portofolio (indigo / ungu / cyan) */
export function getIntroWireframeColors(): string[] {
  const primary = getPrimaryWireframeColor();
  return [primary, '#a78bfa', '#6366f1', '#22d3ee', '#c084fc'];
}
