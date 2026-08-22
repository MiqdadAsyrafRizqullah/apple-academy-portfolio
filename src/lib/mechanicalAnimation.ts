import type { Group } from 'three';

/** Progress bar 0→100% + background maju dari belakang ke depan */
export const LOADING_PROGRESS_MS = 10_000;

/** Jeda setelah 100%: background di depan, tetap berputar */
export const LOADING_HOLD_MS = 10_000;

export const INTRO_TOTAL_MS = LOADING_PROGRESS_MS + LOADING_HOLD_MS;

const START_Z = -3;
const END_Z = 0;
const APPROACH_ROTATION = Math.PI * 1.25;
const HOLD_ROTATION_SPEED = (Math.PI * 2) / 7000;

export interface IntroPose {
  positionZ: number;
  rotationY: number;
  approachT: number;
  isHoldPhase: boolean;
}

/** Hitung pose grup dari waktu yang sudah berlalu (tanpa reset ke belakang). */
export function getIntroPose(elapsedMs: number): IntroPose {
  const approachT = Math.min(1, elapsedMs / LOADING_PROGRESS_MS);
  const positionZ = START_Z + (END_Z - START_Z) * approachT;
  const isHoldPhase = elapsedMs >= LOADING_PROGRESS_MS;

  const approachRotation = APPROACH_ROTATION * approachT;
  const holdElapsed = Math.max(0, elapsedMs - LOADING_PROGRESS_MS);
  const holdRotation = holdElapsed * HOLD_ROTATION_SPEED;
  const rotationY = approachRotation + holdRotation;

  return { positionZ, rotationY, approachT, isHoldPhase };
}

/** Bekukan pose terakhir agar tidak snap saat cleanup. */
export function freezeGroupPose(group: Group, elapsedMs: number): void {
  const { positionZ, rotationY } = getIntroPose(elapsedMs);
  group.position.set(0, 0, positionZ);
  group.rotation.set(group.rotation.x, rotationY, group.rotation.z);
}
