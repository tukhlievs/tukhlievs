"use client";

import { useEffect, useRef, useState } from "react";
import { tiers, orderContact } from "@/lib/services";

// Вертикальная карусель тарифов: слайды едут по Y, точки-навигация справа,
// в фоне два слоя точек с параллаксом за курсором (десктоп).
export function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Автопрокрутка: только десктоп с курсором, без reduced-motion, пауза на ховере
  useEffect(() => {
    const desktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!desktop || reduced || paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % tiers.length),
      4500,
    );
    return () => clearInterval(id);
  }, [paused]);

  // Параллакс: курсор двигает слои точек через CSS-переменные
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
            onClick={() => setIndex(i)}
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
