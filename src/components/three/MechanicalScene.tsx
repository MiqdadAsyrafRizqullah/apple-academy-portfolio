import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  BoxGeometry,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  RingGeometry,
  TorusGeometry,
} from 'three';
import { freezeGroupPose } from '../../lib/mechanicalAnimation';
import { getIntroElapsedMs } from '../../lib/introClock';
import { createIntroPartSeeds, getPartRotation, type IntroPartType } from '../../lib/introPartConfig';
import { IntroSceneDriver } from './IntroSceneDriver';
import { MechanicalFallback } from '../ui/MechanicalFallback';
import {
  getIntroWireframeColors,
  getMechanicalMeshCount,
  prefersReducedMotion,
} from '../../utils/motionPreferences';

interface MechanicalSceneProps {
  className?: string;
  onIntroComplete?: () => void;
  onIntroStart?: () => void;
  onReady?: () => void;
}

function useIntroGeometries() {
  return useMemo(
    () => ({
      module: new BoxGeometry(1, 1, 1),
      screen: new PlaneGeometry(1.15, 0.72),
      ring: new RingGeometry(0.38, 0.52, 20),
      orbit: new TorusGeometry(0.5, 0.16, 8, 20),
    }),
    [],
  );
}

function MechanicalParts({
  seeds,
  colors,
  groupRef,
  partsRef,
  onAllPartsMounted,
}: {
  seeds: ReturnType<typeof createIntroPartSeeds>;
  colors: string[];
  groupRef: React.RefObject<Group | null>;
  partsRef: React.MutableRefObject<Mesh[]>;
  onAllPartsMounted: () => void;
}) {
  const mountedIndices = useRef(new Set<number>());
  const geometries = useIntroGeometries();

  const materials = useMemo(
    () =>
      colors.map(
        (hex) =>
          new MeshBasicMaterial({
            color: new Color(hex),
            wireframe: true,
            transparent: true,
            opacity: 0.88,
          }),
      ),
    [colors],
  );

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    };
  }, [geometries, materials]);

  partsRef.current = [];

  const geometryFor = (type: IntroPartType) => geometries[type];

  return (
    <group ref={groupRef}>
      {seeds.map((seed, index) => (
        <mesh
          key={index}
          ref={(node) => {
            if (node) {
              node.userData.partSeed = seed;
              node.userData.targetScale = seed.scale;
              partsRef.current[index] = node;
              mountedIndices.current.add(index);
              if (mountedIndices.current.size === seeds.length) {
                onAllPartsMounted();
              }
            }
          }}
          geometry={geometryFor(seed.type)}
          material={materials[seed.colorIndex % materials.length]}
          position={seed.position}
          rotation={seed.baseRotation}
          scale={seed.scale}
        />
      ))}
    </group>
  );
}

function freezeAllParts(parts: Mesh[], elapsedMs: number): void {
  const elapsedSec = elapsedMs / 1000;
  for (const mesh of parts) {
    const seed = mesh.userData.partSeed as ReturnType<typeof createIntroPartSeeds>[0] | undefined;
    if (!seed) continue;
    const [rx, ry, rz] = getPartRotation(seed, elapsedSec);
    mesh.rotation.set(rx, ry, rz);
  }
}

function MechanicalCanvas({
  meshCount,
  colors,
  onIntroComplete,
  onIntroStart,
  onReady,
  onWebGLFail,
}: {
  meshCount: number;
  colors: string[];
  onIntroComplete?: () => void;
  onIntroStart?: () => void;
  onReady?: () => void;
  onWebGLFail: () => void;
}) {
  const groupRef = useRef<Group | null>(null);
  const partsRef = useRef<Mesh[]>([]);
  const seeds = useMemo(() => createIntroPartSeeds(meshCount), [meshCount]);
  const [partsReady, setPartsReady] = useState(false);

  useEffect(() => {
    if (!partsReady) return;
    onReady?.();
  }, [partsReady, onReady]);

  useEffect(() => {
    return () => {
      const elapsed = getIntroElapsedMs();
      const group = groupRef.current;
      if (group) freezeGroupPose(group, elapsed);
      freezeAllParts(partsRef.current, elapsed);
    };
  }, []);

  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 65 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      onCreated={({ gl }) => {
        const canvas = gl.domElement;
        const handleContextLost = (event: Event) => {
          event.preventDefault();
          onWebGLFail();
        };
        canvas.addEventListener('webglcontextlost', handleContextLost);
      }}
    >
      <ambientLight intensity={0.5} />
      <MechanicalParts
        seeds={seeds}
        colors={colors}
        groupRef={groupRef}
        partsRef={partsRef}
        onAllPartsMounted={() => setPartsReady(true)}
      />
      <IntroSceneDriver
        groupRef={groupRef}
        partsRef={partsRef}
        onIntroStart={onIntroStart}
        onIntroComplete={onIntroComplete}
      />
    </Canvas>
  );
}

/** Wireframe 3D intro — modul UI, layar, ring, orbit (torus). */
export function MechanicalScene({
  className = '',
  onIntroComplete,
  onIntroStart,
  onReady,
}: MechanicalSceneProps) {
  const [webglFailed, setWebglFailed] = useState(false);
  const reducedMotion = prefersReducedMotion();
  const meshCount = getMechanicalMeshCount();
  const colors = getIntroWireframeColors();

  if (reducedMotion || meshCount === 0 || webglFailed) {
    return <MechanicalFallback className={className} />;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <Suspense fallback={<MechanicalFallback />}>
        <MechanicalCanvas
          meshCount={meshCount}
          colors={colors}
          onIntroComplete={onIntroComplete}
          onIntroStart={onIntroStart}
          onReady={onReady}
          onWebGLFail={() => setWebglFailed(true)}
        />
      </Suspense>
      <WebGLFailureDetector onFail={() => setWebglFailed(true)} />
    </div>
  );
}

function WebGLFailureDetector({ onFail }: { onFail: () => void }) {
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) onFail();
    } catch {
      onFail();
    }
  }, [onFail]);
  return null;
}

export default MechanicalScene;
