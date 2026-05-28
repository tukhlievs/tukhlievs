"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MONOLITH_COUNT = 9;

interface Monolith {
  readonly position: readonly [number, number, number];
  readonly scale: readonly [number, number, number];
  readonly rotation: readonly [number, number, number];
  readonly color: string;
  readonly speed: number;
}

/**
 * Daylight: warm sky, floating geometric monoliths drifting in air.
 */
export function DayScene(): JSX.Element {
  const monoliths = useMemo<Monolith[]>(() => {
    const palette = ["#f1d6b8", "#e9c39a", "#d97757", "#c46a3d", "#a8541d"];
    const items: Monolith[] = [];
    for (let i = 0; i < MONOLITH_COUNT; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 6;
      const z = -3 - Math.random() * 10;
      const w = 0.4 + Math.random() * 0.7;
      const h = 1 + Math.random() * 3.2;
      const d = 0.4 + Math.random() * 0.7;
      items.push({
        position: [x, y, z],
        scale: [w, h, d],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * 0.4 - 0.2,
        ],
        color: palette[i % palette.length] ?? "#d97757",
        speed: 0.08 + Math.random() * 0.18,
      });
    }
    return items;
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const m = monoliths[i];
      if (!m) return;
      child.position.y = m.position[1] + Math.sin(t * m.speed + i) * 0.35;
      child.rotation.y = m.rotation[1] + t * 0.05;
    });
  });

  return (
    <>
      <color attach="background" args={["#f4efe7"]} />
      <fog attach="fog" args={["#f4efe7", 9, 28]} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[6, 8, 4]} intensity={1.1} color="#fff5e6" />
      <directionalLight position={[-5, 2, 3]} intensity={0.35} color="#ffd3a8" />

      {/* warm sky band */}
      <mesh position={[0, 4, -16]}>
        <planeGeometry args={[60, 10, 1, 1]} />
        <meshBasicMaterial color="#f7c89b" transparent opacity={0.35} depthWrite={false} />
      </mesh>

      <group ref={groupRef}>
        {monoliths.map((m, i) => (
          <mesh
            key={i}
            position={m.position as [number, number, number]}
            scale={m.scale as [number, number, number]}
            rotation={m.rotation as [number, number, number]}
            castShadow
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={m.color}
              roughness={0.55}
              metalness={0.08}
            />
          </mesh>
        ))}
      </group>

      {/* ground */}
      <mesh position={[0, -3.4, -6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 30, 1, 1]} />
        <meshStandardMaterial color="#ead9c2" roughness={1} metalness={0} />
      </mesh>
    </>
  );
}
