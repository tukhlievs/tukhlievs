"use client";

import { useEffect, useRef } from "react";

// Three.js сцена: синяя wireframe-икосфера с внутренним ядром,
// медленное вращение + параллакс за курсором. Грузится динамически,
// чтобы не попадать в основной бандл (bundle-dynamic-imports).
export function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // На мобильных и планшетах сцена скрыта (lg:block) — не качаем three.js вовсе
    const isDesktop = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    ).matches;
    if (!isDesktop) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      if (disposed || !mount) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        mount.clientWidth / mount.clientHeight,
        0.1,
        100,
      );
      camera.position.z = 7;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      // Внешняя wireframe-сфера
      const wireGeo = new THREE.IcosahedronGeometry(2.6, 1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x2563eb,
        wireframe: true,
        transparent: true,
        opacity: 0.38,
      });
      const wire = new THREE.Mesh(wireGeo, wireMat);
      scene.add(wire);

      // Внутреннее ядро
      const coreGeo = new THREE.IcosahedronGeometry(1.45, 2);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        roughness: 0.25,
        metalness: 0.55,
        flatShading: true,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      scene.add(core);

      // Точки на вершинах внешней сферы
      const dotsMat = new THREE.PointsMaterial({
        color: 0x2563eb,
        size: 0.06,
        transparent: true,
        opacity: 0.85,
      });
      const dots = new THREE.Points(wireGeo, dotsMat);
      scene.add(dots);

      const ambient = new THREE.AmbientLight(0xffffff, 1.15);
      scene.add(ambient);
      const key = new THREE.DirectionalLight(0xbfdbfe, 2.2);
      key.position.set(4, 5, 6);
      scene.add(key);

      // Параллакс за курсором (легко затухающий)
      let targetX = 0;
      let targetY = 0;
      const onPointer = (e: PointerEvent) => {
        const r = mount.getBoundingClientRect();
        targetX = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
        targetY = ((e.clientY - r.top) / r.height - 0.5) * 0.45;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const onResize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", onResize);

      let raf = 0;
      const clock = new THREE.Clock();
      const animate = () => {
        raf = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        wire.rotation.y = t * 0.12 + targetX;
        wire.rotation.x = t * 0.05 + targetY;
        dots.rotation.copy(wire.rotation);
        core.rotation.y = -t * 0.18;
        core.rotation.x = Math.sin(t * 0.4) * 0.18;
        core.position.y = Math.sin(t * 0.8) * 0.12;
        renderer.render(scene, camera);
      };

      if (reduced) {
        // Один статичный кадр без анимации
        renderer.render(scene, camera);
      } else {
        animate();
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        wireGeo.dispose();
        wireMat.dispose();
        coreGeo.dispose();
        coreMat.dispose();
        dotsMat.dispose();
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
      className="absolute inset-0 pointer-events-none select-none"
    />
  );
}
