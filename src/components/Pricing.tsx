"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Check, Star } from "lucide-react";
import { tiers, orderContact } from "@/lib/services";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

function toNumber(price: string): number {
  return Number(price.replace(/[^0-9]/g, "")) || 0;
}

// Анимированный счёт цены при появлении в зоне видимости.
// На тач/reduced-motion показываем сразу финальное значение (статичный UI).
function AnimatedPrice({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    if (reduce || touch) {
      setN(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>${n}</span>;
}

export function Pricing() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
      {tiers.map((tier, i) => (
        <motion.div
          key={tier.slug}
          initial={{ y: 28, opacity: 0 }}
          whileInView={{
            y: tier.highlighted && isDesktop ? -12 : 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.08 * i,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn(
            "relative flex flex-col rounded-2xl bg-white p-7",
            tier.highlighted
              ? "border-2 border-accent shadow-[0_2px_4px_rgba(11,18,32,0.05),0_18px_48px_rgba(37,99,235,0.16)]"
              : "border border-border shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_rgba(37,99,235,0.05)]",
          )}
        >
          {tier.highlighted && (
            <div className="absolute top-0 right-6 -translate-y-1/2 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)]">
              <Star className="size-3.5 fill-current" />
              Popular
            </div>
          )}

          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            {tier.name}
          </p>

          <div className="mt-4 flex items-end gap-1.5">
            <span className="font-display text-5xl font-bold tracking-tight text-fg">
              <AnimatedPrice value={toNumber(tier.price)} />
            </span>
            <span className="mb-1.5 text-sm text-muted">one-off</span>
          </div>

          <p className="mt-2 text-sm text-muted leading-relaxed">
            {tier.tagline}
          </p>

          <ul className="mt-6 space-y-3 flex-1">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm leading-relaxed">
                <Check className="size-4.5 shrink-0 text-accent mt-0.5" />
                <span className="text-fg/85">{f}</span>
              </li>
            ))}
          </ul>

          <a
            href={`${orderContact}?text=${encodeURIComponent(`Hi! I'd like to order the ${tier.name} package (${tier.price}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-7 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all",
              tier.highlighted
                ? "bg-accent text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] hover:-translate-y-0.5"
                : "border border-border bg-white text-fg hover:border-accent/40 hover:text-accent",
            )}
          >
            Order {tier.name} →
          </a>
        </motion.div>
      ))}
    </div>
  );
}
