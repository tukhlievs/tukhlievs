"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { ThemeMode } from "@/types";

interface HeroProps {
  readonly mode: ThemeMode;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ mode }: HeroProps): JSX.Element {
  return (
    <header className="pt-6 sm:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]"
      >
        <span className="inline-block size-1.5 rounded-full bg-[color:var(--accent)]" />
        Personal page · v1
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.9, ease: EASE }}
        className="mt-6 text-balance font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.02em] sm:text-[3.4rem]"
      >
        Привет, меня зовут{" "}
        <span className="relative inline-block">
          <span className="relative z-10">Абубакир</span>
          <span
            aria-hidden
            className="absolute inset-x-0 -bottom-1 -z-0 h-[0.45em] rounded-sm bg-[color:var(--accent)]/25"
          />
        </span>
        <span className="text-[color:var(--muted)]"> (или просто Абу)</span>.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
        className="mt-7 max-w-xl text-pretty text-[1.02rem] leading-[1.65] text-[color:var(--muted)] sm:text-[1.08rem]"
      >
        Мне 16 лет, активно интересуюсь в отраслях ИИ, технологий и
        программирования. В свободное время учу Python. В будущем хочу стать
        Software Engineer либо AI/ML Engineer.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
        className="mt-7 flex flex-wrap items-center gap-2 font-mono text-[12px] text-[color:var(--muted)]"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--stroke)] px-3 py-1">
          <MapPin className="size-3.5" aria-hidden />
          Узбекистан · г. Коканд
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--stroke)] px-3 py-1">
          {mode === "night" ? "Night build" : "Day build"}
        </span>
      </motion.div>
    </header>
  );
}
