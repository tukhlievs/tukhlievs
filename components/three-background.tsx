"use client";

import { useEffect, useRef } from "react";

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    async function init() {
      const THREE = await import("three");
      const mount = mountRef.current;
      if (!mount) return;

      const w = mount.clientWidth;
      const h = mount.clientHeight;

      // --- Renderer ---
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // --- Scene & Camera ---
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 200);
      camera.position.set(0, 5, 9);
      camera.lookAt(0, 0, 0);

      // --- Materials ---
      const gridMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 0.045,
        transparent: true,
      });
      const buildingMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 0.07,
        transparent: true,
      });
      const accentMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 0.12,
        transparent: true,
      });

      // --- Floor Grid ---
      const gridSize = 20;
      const gridDivisions = 20;
      const step = gridSize / gridDivisions;
      const gridPositions: number[] = [];

      for (let i = 0; i <= gridDivisions; i++) {
        const x = -gridSize / 2 + i * step;
        gridPositions.push(x, 0, -gridSize / 2, x, 0, gridSize / 2);
      }
      for (let i = 0; i <= gridDivisions; i++) {
        const z = -gridSize / 2 + i * step;
        gridPositions.push(-gridSize / 2, 0, z, gridSize / 2, 0, z);
      }

      const gridGeom = new THREE.BufferGeometry();
      gridGeom.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(gridPositions, 3)
      );
      const grid = new THREE.LineSegments(gridGeom, gridMat);
      scene.add(grid);

      // --- Buildings (wireframe boxes) ---
      const buildings = [
        { x: -3.5, z: -3.5, w: 0.8, d: 0.8, h: 3.5, accent: true },
        { x: 2.5,  z: -4,   w: 0.6, d: 0.6, h: 2.2, accent: false },
        { x: -1,   z: -2,   w: 1.0, d: 0.7, h: 4.5, accent: true },
        { x: 4,    z: -1,   w: 0.7, d: 0.7, h: 1.8, accent: false },
        { x: -4.5, z: 1,    w: 0.6, d: 0.6, h: 2.8, accent: false },
        { x: 1.5,  z: 2,    w: 0.8, d: 1.0, h: 3.0, accent: false },
        { x: -2,   z: 3.5,  w: 0.6, d: 0.6, h: 1.6, accent: false },
        { x: 3.5,  z: 3,    w: 0.7, d: 0.8, h: 2.4, accent: false },
        { x: 0,    z: -5,   w: 0.5, d: 0.5, h: 3.2, accent: false },
        { x: -6,   z: -2,   w: 0.5, d: 0.5, h: 2.0, accent: false },
        { x: 6,    z: 2,    w: 0.5, d: 0.5, h: 1.5, accent: false },
        { x: 0.5,  z: -0.5, w: 0.9, d: 0.6, h: 5.5, accent: true },
      ];

      buildings.forEach((b) => {
        const boxGeom = new THREE.EdgesGeometry(
          new THREE.BoxGeometry(b.w, b.h, b.d)
        );
        const box = new THREE.LineSegments(
          boxGeom,
          b.accent ? accentMat : buildingMat
        );
        box.position.set(b.x, b.h / 2, b.z);
        scene.add(box);
      });

      // --- Floating wireframe sphere (focal point) ---
      const sphereGeom = new THREE.EdgesGeometry(
        new THREE.IcosahedronGeometry(0.6, 1)
      );
      const sphere = new THREE.LineSegments(sphereGeom, accentMat);
      sphere.position.set(0, 4, -1);
      scene.add(sphere);

      // --- Animation ---
      let animId: number;
      let t = 0;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.003;

        // Slow camera drift (architectural survey)
        camera.position.x = Math.sin(t * 0.25) * 1.5;
        camera.position.z = 9 + Math.cos(t * 0.18) * 0.8;
        camera.position.y = 5 + Math.sin(t * 0.12) * 0.3;
        camera.lookAt(0, 1, 0);

        // Sphere rotation
        sphere.rotation.y += 0.006;
        sphere.rotation.x += 0.003;

        renderer.render(scene, camera);
      };
      animate();

      // --- Resize ---
      const handleResize = () => {
        if (!mount) return;
        const nw = mount.clientWidth;
        const nh = mount.clientHeight;
        renderer.setSize(nw, nh);
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", handleResize);

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    }

    init();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
}
