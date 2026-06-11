"use client";

import { useEffect, useRef } from "react";

// Тонкий фоновый слой three.js: сетка синих точек волной во весь экран,
// реагирует на скролл (сдвиг + поворот) и медленно дышит во времени.
// Грузится динамически и только на десктопе — на тач-устройствах не
// инициализируется вовсе, чтобы UI оставался статичным и не жёг батарею.
export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const desktop = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    ).matches;
    if (!desktop) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      if (disposed || !mount) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        mount.clientWidth / mount.clientHeight,
        0.1,
        100,
      );
      camera.position.set(0, 0, 9);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      // Сетка точек
      const COLS = 72;
      const ROWS = 48;
      const GAP = 0.42;
      const count = COLS * ROWS;
      const positions = new Float32Array(count * 3);
      let p = 0;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          positions[p++] = (x - COLS / 2) * GAP;
          positions[p++] = (y - ROWS / 2) * GAP;
          positions[p++] = 0;
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: 0x2563eb,
        size: 0.045,
        transparent: true,
        opacity: 0.42,
      });
      const points = new THREE.Points(geo, mat);
      points.rotation.x = -0.92; // наклон плоскости в перспективу
      scene.add(points);

      // Скролл-таргет со сглаживанием
      let scrollT = 0;
      let scrollS = 0;
      const onScroll = () => {
        scrollT = window.scrollY / Math.max(window.innerHeight, 1);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      const onResize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", onResize);

      // Структурный каст без THREE в типовой позиции (THREE здесь — рантайм-значение)
      const pos = geo.getAttribute("position") as unknown as {
        array: Float32Array;
        needsUpdate: boolean;
      };
      const clock = new THREE.Clock();
      let raf = 0;

      const renderFrame = () => {
        const t = clock.getElapsedTime();
        scrollS += (scrollT - scrollS) * 0.06;

        let i = 0;
        for (let y = 0; y < ROWS; y++) {
          for (let x = 0; x < COLS; x++) {
            const px = (x - COLS / 2) * GAP;
            const py = (y - ROWS / 2) * GAP;
            const z =
              Math.sin(px * 0.5 + t * 0.6 + scrollS * 3) * 0.5 +
              Math.cos(py * 0.5 + t * 0.4) * 0.4;
            pos.array[i * 3 + 2] = z;
            i++;
          }
        }
        pos.needsUpdate = true;

        points.rotation.z = scrollS * 0.25;
        points.position.y = scrollS * 2.0;
        camera.position.x = Math.sin(t * 0.1) * 0.3;

        renderer.render(scene, camera);
      };

      const animate = () => {
        raf = requestAnimationFrame(animate);
        renderFrame();
      };

      if (reduced) renderFrame();
      else animate();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        geo.dispose();
        mat.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
