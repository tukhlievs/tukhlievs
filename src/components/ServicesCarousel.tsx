"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { tiers, orderContact } from "@/lib/services";

// Вертикальная карусель тарифов со скролл-управлением:
// колесо мыши (десктоп) и вертикальный свайп (тач) листают слайды;
// на краях карусель не перехватывает жест — страница скроллится дальше.
export function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const coolRef = useRef(false);
  const gestureRef = useRef<{ y: number; x: number; consumed: boolean } | null>(
    null,
  );

  const goTo = useCallback((next: number) => {
    if (next < 0 || next >= tiers.length) return;
    indexRef.current = next;
    setIndex(next);
  }, []);

  // Переход с защитой от дребезга (одно перелистывание за жест/порцию колеса)
  const step = useCallback(
    (dir: 1 | -1): boolean => {
      const next = indexRef.current + dir;
      if (next < 0 || next >= tiers.length) return false;
      if (!coolRef.current) {
        coolRef.current = true;
        goTo(next);
        setTimeout(() => (coolRef.current = false), 800);
      }
      return true; // жест наш, странице не отдаём
    },
    [goTo],
  );

  // Колесо и свайп: React вешает wheel/touchmove пассивно,
  // поэтому слушатели с preventDefault — вручную через ref
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 6) return;
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      const next = indexRef.current + dir;
      if (next < 0 || next >= tiers.length) return; // край — скроллим страницу
      e.preventDefault();
      step(dir);
    };

    const onTouchStart = (e: TouchEvent) => {
      gestureRef.current = {
        y: e.touches[0].clientY,
        x: e.touches[0].clientX,
        consumed: false,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      const g = gestureRef.current;
      if (!g) return;
      if (g.consumed) {
        e.preventDefault(); // жест уже наш — не дёргаем страницу
        return;
      }
      const dy = g.y - e.touches[0].clientY;
      const dx = g.x - e.touches[0].clientX;
      // Ждём явной вертикальной интенции
      if (Math.abs(dy) < 14 || Math.abs(dy) < Math.abs(dx) * 1.2) return;
      const dir: 1 | -1 = dy > 0 ? 1 : -1;
      const next = indexRef.current + dir;
      if (next < 0 || next >= tiers.length) return; // край — отдаём скролл
      e.preventDefault();
      g.consumed = true;
      step(dir);
    };

    const onTouchEnd = () => {
      gestureRef.current = null;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [step]);

  // Автопрокрутка: десктоп, без reduced-motion, пауза на ховере
  useEffect(() => {
    const desktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!desktop || reduced || paused) return;
    const id = setInterval(
      () => goTo((indexRef.current + 1) % tiers.length),
      4500,
    );
    return () => clearInterval(id);
  }, [paused, goTo]);

  // Параллакс точечных слоёв за курсором (десктоп)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty(
        "--px",
        String((e.clientX - r.left) / r.width - 0.5),
      );
      el.style.setProperty(
        "--py",
        String((e.clientY - r.top) / r.height - 0.5),
      );
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="relative rounded-3xl border border-border bg-white overflow-hidden shadow-[0_1px_2px_rgba(11,18,32,0.04),0_12px_32px_rgba(37,99,235,0.07)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Параллакс-слои точек */}
      <div aria-hidden className="dots-layer dots-far" />
      <div aria-hidden className="dots-layer dots-near" />

      {/* Вертикальный трек слайдов */}
      <div className="relative h-[470px] sm:h-[350px] overflow-hidden">
        <div
          className="h-full will-change-transform transition-transform ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: `translateY(-${index * 100}%)`,
            transitionDuration: "650ms",
          }}
        >
          {tiers.map((tier, i) => (
            <article
              key={tier.slug}
              aria-hidden={i !== index}
              className="h-full flex flex-col p-6 sm:p-10 pr-14 sm:pr-20"
            >
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="text-2xl font-bold tracking-tight">
                  {tier.name}
                </h3>
                {tier.highlighted && (
                  <span className="text-xs font-semibold text-white bg-accent rounded-full px-2.5 py-1">
                    Most popular
                  </span>
                )}
                <span className="ml-auto text-3xl font-bold text-accent">
                  {tier.price}
                </span>
              </div>
              <p className="mt-2 text-muted leading-relaxed">{tier.tagline}</p>

              <ul className="mt-5 grid sm:grid-cols-2 gap-x-10 gap-y-2.5 flex-1 content-start">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm leading-relaxed">
                    <svg
                      className="size-4.5 shrink-0 text-accent mt-0.5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    <span className="text-fg/85">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <a
                  href={`${orderContact}?text=${encodeURIComponent(`Hi! I'd like to order the ${tier.name} package (${tier.price}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={i === index ? 0 : -1}
                  className="inline-flex items-center rounded-full bg-accent text-white px-6 py-3 text-sm font-semibold shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 transition-all"
                >
                  Order {tier.name} →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Вертикальные точки-навигация */}
      <div className="absolute right-4 sm:right-7 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 z-10">
        {tiers.map((t, i) => (
          <button
            key={t.slug}
            type="button"
            aria-label={`Show ${t.name} package`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={`w-2.5 rounded-full transition-all duration-300 ${
              i === index
                ? "h-7 bg-accent"
                : "h-2.5 bg-border hover:bg-accent/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
