"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 1800;
const CITY_COUNT = 64;

/**
 * Deep night sky: drifting starfield + wireframe city grid on the horizon.
 */
export function NightScene(): JSX.Element {
  const starGeo = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 18 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.6 + 4;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const city = useMemo(() => {
    const items: Array<{ x: number; z: number; h: number; w: number }> = [];
    for (let i = 0; i < CITY_COUNT; i++) {
      const x = (Math.random() - 0.5) * 40;
      const z = -8 - Math.random() * 22;
      const h = 0.6 + Math.random() * 4.5;
      const w = 0.45 + Math.random() * 0.9;
      items.push({ x, z, h, w });
    }
    return items;
  }, []);

  const starsRef = useRef<THREE.Points>(null);
  const cityRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (starsRef.current) starsRef.current.rotation.y += delta * 0.012;
    if (cityRef.current) cityRef.current.rotation.y = Math.sin(performance.now() * 0.00008) * 0.05;
  });

  return (
    <>
      <color attach="background" args={["#06070b"]} />
      <fog attach="fog" args={["#06070b", 14, 48]} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 8, 4]} intensity={0.35} color="#9ec5ff" />

      {/* horizon glow */}
      <mesh position={[0, -2.4, -18]}>
        <planeGeometry args={[80, 6, 1, 1]} />
        <meshBasicMaterial
          color="#7dd3fc"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* starfield */}
      <points ref={starsRef} geometry={starGeo}>
        <pointsMaterial
          size={0.045}
          sizeAttenuation
          color="#dfe6f5"
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>

      {/* wireframe city silhouette */}
      <group ref={cityRef} position={[0, -2, 0]}>
        {city.map((b, i) => (
          <mesh key={i} position={[b.x, b.h / 2 - 0.6, b.z]}>
            <boxGeometry args={[b.w, b.h, b.w]} />
            <meshBasicMaterial
              color="#7dd3fc"
              wireframe
              transparent
              opacity={0.28}
            />
          </mesh>
        ))}
        {/* ground line */}
        <mesh position={[0, -0.6, -14]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[80, 28, 1, 1]} />
          <meshBasicMaterial
            color="#0b1220"
            transparent
            opacity={0.6}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}
