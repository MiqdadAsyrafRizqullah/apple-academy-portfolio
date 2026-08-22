/** Bentuk wireframe intro — metafora komponen UI / desain web */
export type IntroPartType = 'module' | 'screen' | 'ring' | 'orbit';

export interface IntroPartSeed {
  position: [number, number, number];
  baseRotation: [number, number, number];
  scale: number;
  type: IntroPartType;
  colorIndex: number;
  spin: [number, number, number];
}

const TYPE_CYCLE: IntroPartType[] = ['module', 'screen', 'ring', 'orbit', 'module', 'orbit'];

/** Kecepatan rotasi per sumbu (rad/detik) — tiap part unik */
function spinForType(type: IntroPartType, index: number): [number, number, number] {
  const s = 0.35 + (index % 7) * 0.08;
  switch (type) {
    case 'orbit':
      return [s * 0.4, s * 1.1, s * 0.35];
    case 'ring':
      return [s * 0.25, s * 0.7, s * 1.2];
    case 'screen':
      return [s * 0.15, s * 0.5, s * 0.45];
    case 'module':
    default:
      return [s * 0.55, s * 0.85, s * 0.6];
  }
}

export function createIntroPartSeeds(count: number): IntroPartSeed[] {
  const seeds: IntroPartSeed[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.22;
    const radius = 1.65 + (i % 6) * 0.32;
    const layer = ((i % 5) - 2) * 0.38;
    const type = TYPE_CYCLE[i % TYPE_CYCLE.length];

    let scale = 0.32 + (i % 4) * 0.09;
    if (type === 'screen') scale = 0.5 + (i % 3) * 0.08;
    if (type === 'orbit') scale = 0.28 + (i % 3) * 0.06;
    if (type === 'ring') scale = 0.38 + (i % 4) * 0.07;

    seeds.push({
      position: [
        Math.cos(angle) * radius,
        layer + (i % 4) * 0.06,
        Math.sin(angle) * radius - 0.35,
      ],
      baseRotation: [
        (i % 5) * 0.31,
        angle * 0.5 + (i % 3) * 0.4,
        (i % 4) * 0.27,
      ],
      scale,
      type,
      colorIndex: i % 5,
      spin: spinForType(type, i),
    });
  }
  return seeds;
}

export function getPartRotation(
  seed: Pick<IntroPartSeed, 'baseRotation' | 'spin'>,
  elapsedSec: number,
): [number, number, number] {
  return [
    seed.baseRotation[0] + seed.spin[0] * elapsedSec,
    seed.baseRotation[1] + seed.spin[1] * elapsedSec,
    seed.baseRotation[2] + seed.spin[2] * elapsedSec,
  ];
}
