import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group, Mesh } from 'three';
import { getIntroElapsedMs } from '../../lib/introClock';
import { getPartRotation, type IntroPartSeed } from '../../lib/introPartConfig';
import { getIntroPose, INTRO_TOTAL_MS } from '../../lib/mechanicalAnimation';

interface IntroSceneDriverProps {
  groupRef: React.RefObject<Group | null>;
  partsRef: React.MutableRefObject<Mesh[]>;
  onIntroStart?: () => void;
  onIntroComplete?: () => void;
}

/**
 * Grup maju + berputar; tiap part (kotak, layar, ring, torus) berputar sendiri.
 */
export function IntroSceneDriver({
  groupRef,
  partsRef,
  onIntroStart,
  onIntroComplete,
}: IntroSceneDriverProps) {
  const startedRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      onIntroStart?.();
    }
  }, [onIntroStart]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const elapsed = getIntroElapsedMs();
    const elapsedSec = elapsed / 1000;
    const { positionZ, rotationY, approachT } = getIntroPose(elapsed);

    group.position.set(0, 0, positionZ);
    group.rotation.y = rotationY;

    const reveal = Math.min(1, approachT * 1.4 + 0.15);

    for (const mesh of partsRef.current) {
      if (!mesh) continue;

      const seed = mesh.userData.partSeed as IntroPartSeed | undefined;
      const targetScale = mesh.userData.targetScale as number | undefined;
      if (targetScale !== undefined) {
        const s = targetScale * reveal;
        mesh.scale.set(s, s, s);
      }

      if (seed) {
        const [rx, ry, rz] = getPartRotation(seed, elapsedSec);
        mesh.rotation.set(rx, ry, rz);
      }
    }

    if (elapsed >= INTRO_TOTAL_MS && !completedRef.current) {
      completedRef.current = true;
      onIntroComplete?.();
    }
  });

  return null;
}
