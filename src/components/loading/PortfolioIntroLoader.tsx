import { useEffect, useRef, useState } from 'react';
import { personalInfo } from '../../data/personal';
import { MechanicalScene } from '../three/MechanicalScene';
import { startIntroClock, getIntroElapsedMs, resetIntroClock } from '../../lib/introClock';
import { INTRO_TOTAL_MS, LOADING_PROGRESS_MS } from '../../lib/mechanicalAnimation';
import { prefersReducedMotion } from '../../utils/motionPreferences';

interface PortfolioIntroLoaderProps {
  onComplete: () => void;
  onSkip?: () => void;
}

const FADE_MS = 600;
const REDUCED_MOTION_MS = 800;

type LoaderPhase = 'loading' | 'holding' | 'exiting' | 'done';

/**
 * Jam global dimulai saat overlay tampil — progress & 3D bergerak bersamaan dari 0%.
 */
export function PortfolioIntroLoader({ onComplete, onSkip }: PortfolioIntroLoaderProps) {
  const [phase, setPhase] = useState<LoaderPhase>('loading');
  const [progress, setProgress] = useState(0);
  const reducedMotion = prefersReducedMotion();
  const exitingRef = useRef(false);
  const phaseRef = useRef<LoaderPhase>('loading');
  phaseRef.current = phase;

  useEffect(() => {
    startIntroClock();
    return () => resetIntroClock();
  }, []);

  const startExit = () => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setProgress(100);
    setPhase('exiting');
  };

  const handleIntroAnimationComplete = () => {
    startExit();
  };

  useEffect(() => {
    if (reducedMotion) {
      const duration = REDUCED_MOTION_MS;
      let frame = 0;
      const tick = () => {
        const elapsed = getIntroElapsedMs();
        setProgress(Math.min(100, (elapsed / duration) * 100));
        if (elapsed < duration) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      const t = window.setTimeout(startExit, duration);
      return () => {
        cancelAnimationFrame(frame);
        window.clearTimeout(t);
      };
    }

    let frame = 0;
    const tick = () => {
      const elapsed = getIntroElapsedMs();
      const p = Math.min(100, (elapsed / LOADING_PROGRESS_MS) * 100);
      setProgress(p);

      if (elapsed >= LOADING_PROGRESS_MS && phaseRef.current === 'loading') {
        setPhase('holding');
      }

      if (elapsed < INTRO_TOTAL_MS + FADE_MS + 200) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);

    const safety = window.setTimeout(startExit, INTRO_TOTAL_MS + 400);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(safety);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (phase !== 'exiting') return;
    const t = window.setTimeout(() => {
      setPhase('done');
      onComplete();
    }, FADE_MS);
    return () => window.clearTimeout(t);
  }, [phase, onComplete]);

  const handleSkip = () => {
    onSkip?.();
    startExit();
  };

  if (phase === 'done') return null;

  const statusText =
    phase === 'holding' ? 'Hampir siap…' : 'Memuat pengalaman digital…';

  return (
    <div
      className={`intro-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-[600ms] ${
        phase === 'exiting' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-busy={phase !== 'exiting'}
      aria-label="Memuat portofolio"
    >
      {!reducedMotion && (
        <MechanicalScene onIntroComplete={handleIntroAnimationComplete} />
      )}

      {reducedMotion && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950"
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-indigo-300/80">Portofolio</p>
        <h1 className="max-w-lg font-[Poppins] text-2xl font-bold text-white sm:text-3xl">
          {personalInfo.name}
        </h1>
        <p className="text-sm text-slate-400">{statusText}</p>

        <div
          className="h-1 w-48 overflow-hidden rounded-full bg-slate-800 sm:w-64"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 ease-linear"
            style={{
              width: `${progress}%`,
              transition: 'width 80ms linear',
            }}
          />
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="mt-2 rounded px-2 py-1 text-xs text-slate-500 underline-offset-2 hover:text-indigo-300 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          Lewati
        </button>
      </div>
    </div>
  );
}

export default PortfolioIntroLoader;
