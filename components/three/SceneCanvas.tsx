"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import type { ThemeMode } from "@/types";
import { NightScene } from "./NightScene";
import { DayScene } from "./DayScene";

interface SceneCanvasProps {
  readonly mode: ThemeMode;
}

/**
 * Three.js root. Mounts on the client only (see `dynamic({ ssr: false })` at
 * the call site) and switches between night and day scenes without
 * remounting the WebGL context.
 */
export function SceneCanvas({ mode }: SceneCanvasProps): JSX.Element {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.4, 6], fov: 55 }}
      style={{ width: "100%", height: "100%" }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Suspense fallback={null}>
        {mode === "night" ? <NightScene /> : <DayScene />}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
