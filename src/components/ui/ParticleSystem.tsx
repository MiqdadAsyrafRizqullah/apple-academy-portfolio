import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

interface ParticleSystemProps {
  className?: string;
}

const particlesConfig: ISourceOptions = {
  background: {
    color: { value: 'transparent' },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'grab',
      },
      onClick: {
        enable: true,
        mode: 'push',
      },
    },
    modes: {
      grab: {
        distance: 200,
        links: {
          opacity: 0.9,
          color: '#a855f7',
        },
      },
      push: {
        quantity: 3,
      },
    },
  },
  particles: {
    color: { value: ['#6366f1', '#8b5cf6', '#3b82f6', '#ec4899'] },
    links: {
      color: '#818cf8',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1.5,
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'bounce' },
    },
    number: {
      density: { enable: true },
      value: 120,
    },
    opacity: { 
      value: { min: 0.4, max: 0.8 },
      animation: { enable: true, speed: 1, sync: false }
    },
    shape: { type: 'circle' },
    size: { 
      value: { min: 1.5, max: 4.5 },
      animation: { enable: true, speed: 2, sync: false }
    },
  },
  detectRetina: true,
};

export function ParticleSystem({ className }: ParticleSystemProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-slate-900/20 ${className ?? ''}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <Particles
      id="tsparticles"
      className={`absolute inset-0 ${className ?? ''}`}
      options={particlesConfig}
    />
  );
}

export default ParticleSystem;

