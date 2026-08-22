/** Satu jam untuk progress bar + animasi 3D (dimulai saat overlay loader tampil). */
let epochMs: number | null = null;

export function startIntroClock(): void {
  epochMs = performance.now();
}

export function getIntroElapsedMs(): number {
  if (epochMs === null) return 0;
  return performance.now() - epochMs;
}

export function resetIntroClock(): void {
  epochMs = null;
}
