"use client";

import { useEffect, useRef } from "react";

/**
 * Background atmosphere: a lazily-loaded Three.js particle field with a
 * subtle cursor parallax, plus a cursor-following glow. Everything here is
 * decorative and non-blocking:
 *  - three is imported dynamically *inside* useEffect, so it is never part of
 *    the initial bundle and never evaluated during static export.
 *  - honours prefers-reduced-motion and pauses when the tab is hidden.
 */
export default function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  // Cursor-following glow (CSS variables, rAF-throttled, passive listener)
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.32;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    apply();
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Three.js particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import("three").then((THREE: any) => {
      if (disposed || !canvas) return;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      let w = window.innerWidth;
      let h = window.innerHeight;
      renderer.setSize(w, h, false);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(62, w / h, 0.1, 100);
      camera.position.z = 30;

      // Soft circular sprite so points read as glow, not squares
      const sprite = (() => {
        const s = 64;
        const c = document.createElement("canvas");
        c.width = c.height = s;
        const ctx = c.getContext("2d")!;
        const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.35, "rgba(255,255,255,0.55)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s, s);
        return new THREE.CanvasTexture(c);
      })();

      const COUNT = w < 640 ? 70 : 130;
      const positions = new Float32Array(COUNT * 3);
      const speeds = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 72;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 46;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 28;
        speeds[i] = 0.25 + Math.random() * 0.7;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.62,
        map: sprite,
        transparent: true,
        opacity: 0.72,
        color: new THREE.Color("#d97757"),
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      let mx = 0;
      let my = 0;
      let cx = 0;
      let cy = 0;
      const onMove = (e: PointerEvent) => {
        mx = e.clientX / window.innerWidth - 0.5;
        my = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const onResize = () => {
        w = window.innerWidth;
        h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };
      window.addEventListener("resize", onResize, { passive: true });

      const pos = geo.attributes.position;
      let raf = 0;
      let t = 0;
      const animate = () => {
        raf = requestAnimationFrame(animate);
        t += 0.005;
        for (let i = 0; i < COUNT; i++) {
          let y = pos.getY(i) + speeds[i] * 0.012;
          if (y > 24) y = -24;
          pos.setY(i, y);
        }
        pos.needsUpdate = true;
        points.rotation.y = t * 0.4;
        // ease camera toward cursor for a gentle parallax
        cx += (mx * 4 - cx) * 0.045;
        cy += (-my * 3 - cy) * 0.045;
        camera.position.x = cx;
        camera.position.y = cy;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      animate();

      const onVis = () => {
        if (document.hidden) {
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
        } else if (!raf) {
          animate();
        }
      };
      document.addEventListener("visibilitychange", onVis);

      cleanup = () => {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVis);
        geo.dispose();
        mat.dispose();
        sprite.dispose();
        renderer.dispose();
      };
    }).catch(() => {
      /* three failed to load — the static gradient + grain still carry the look */
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="mesh" />
      <canvas ref={canvasRef} className="constellation" />
      <div ref={glowRef} className="cursor-glow" />
      <div className="grain" />
    </div>
  );
}
