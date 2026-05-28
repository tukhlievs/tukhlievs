"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DUST_COUNT = 320;

/**
 * Day atmosphere: the same icosahedron form, rendered in warmer tones
 * against a soft cream sky. Identical motion language to NightScene so
 * the theme switch feels like a mood change, not a different page.
 */
export function DayScene(): JSX.Element {
  const icosaRef = useRef<THREE.LineSegments>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const dustRef = useRef<THREE.Points>(null);

  const edgesGeo = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(2.6, 1);
    return new THREE.EdgesGeometry(base, 12);
  }, []);

  const glowGeo = useMemo(() => new THREE.IcosahedronGeometry(2.55, 2), []);

  const dustGeo = useMemo(() => {
    const positions = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = -1 - Math.random() * 14;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (icosaRef.current) {
      icosaRef.current.rotation.y += dt * 0.08;
      icosaRef.current.rotation.x += dt * 0.04;
      icosaRef.current.position.x = 2.4 + Math.sin(t * 0.15) * 0.15;
      icosaRef.current.position.y = -0.3 + Math.cos(t * 0.1) * 0.18;
    }
    if (glowRef.current && icosaRef.current) {
      glowRef.current.rotation.copy(icosaRef.current.rotation);
      glowRef.current.position.copy(icosaRef.current.position);
    }
    if (dustRef.current) {
      const pos = dustRef.current.geometry.attributes.position;
      if (pos) {
        for (let i = 0; i < DUST_COUNT; i++) {
          const idx = i * 3 + 1;
          pos.array[idx] += dt * (0.03 + (i % 7) * 0.004);
          if (pos.array[idx]! > 6) pos.array[idx] = -6;
        }
        pos.needsUpdate = true;
      }
    }
  });

  return (
    <>
      <color attach="background" args={["#ece4d2"]} />
      <fog attach="fog" args={["#ece4d2", 10, 26]} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[6, 8, 4]} intensity={0.6} color="#fff3df" />

      <lineSegments ref={icosaRef} geometry={edgesGeo} position={[2.4, -0.3, -1]}>
        <lineBasicMaterial color="#1c1814" transparent opacity={0.18} />
      </lineSegments>

      <mesh ref={glowRef} geometry={glowGeo} position={[2.4, -0.3, -1]}>
        <meshBasicMaterial
          color="#b95a3a"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      <points ref={dustRef} geometry={dustGeo}>
        <pointsMaterial
          size={0.032}
          color="#6b6357"
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </points>
    </>
  );
}
