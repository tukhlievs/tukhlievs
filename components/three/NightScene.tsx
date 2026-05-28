"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DUST_COUNT = 380;

/**
 * Night atmosphere: a single low-poly wireframe icosahedron drifting
 * off-axis, surrounded by a sparse field of slow-rising dust particles.
 * Calmer and more intentional than a scattered starfield + city silhouette —
 * the form is the subject, not the chrome.
 */
export function NightScene(): JSX.Element {
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
          pos.array[idx] += dt * (0.04 + (i % 7) * 0.005);
          if (pos.array[idx]! > 6) pos.array[idx] = -6;
        }
        pos.needsUpdate = true;
      }
    }
  });

  return (
    <>
      <color attach="background" args={["#0f0d0a"]} />
      <fog attach="fog" args={["#0f0d0a", 10, 26]} />
      <ambientLight intensity={0.4} />

      <lineSegments ref={icosaRef} geometry={edgesGeo} position={[2.4, -0.3, -1]}>
        <lineBasicMaterial color="#ece6d8" transparent opacity={0.32} />
      </lineSegments>

      <mesh ref={glowRef} geometry={glowGeo} position={[2.4, -0.3, -1]}>
        <meshBasicMaterial
          color="#d2724b"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      <points ref={dustRef} geometry={dustGeo}>
        <pointsMaterial
          size={0.035}
          color="#ece6d8"
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </points>
    </>
  );
}
