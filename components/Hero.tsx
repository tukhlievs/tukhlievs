"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase } from "lucide-react";
import type { ThemeMode } from "@/types";

interface HeroProps {
  readonly mode: ThemeMode;
}

const EASE = [0.22, 1, 0.36, 1] as const;

function useClockText(): string {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const paint = (): void => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setT(`${hh}:${mm}`);
    };
    paint();
    const id = window.setInterval(paint, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return t;
}

export function Hero({ mode }: HeroProps): JSX.Element {
  const clock = useClockText();
  const year = new Date().getFullYear();

  return (
    <header className="pt-24 pb-6 sm:pt-32 sm:pb-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="inline-flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--muted)]"
      >
        <span aria-hidden className="inline-block h-px w-7 bg-[color:var(--rule)]" />
        Uzbekistan · Kokand · {year}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        className="mt-8 text-balance font-display text-[clamp(3rem,9.2vw,6.2rem)] font-normal leading-[0.96] tracking-[-0.022em]"
      >
        Abubakir
        <br />
        <span className="italic text-[color:var(--muted)]">Tukhliev</span>{" "}
        <span className="text-[color:var(--accent)]">/ Abu</span>.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        className="mt-8 max-w-[36em] text-[clamp(1.05rem,1.6vw,1.18rem)] leading-[1.62]"
      >
        Sixteen years old. Learning{" "}
        <em className="not-italic text-[color:var(--accent)]">Python</em> with
        my sights set on becoming an ML/AI engineer. This page is where I bring
        together the most important things about myself{" "}
        <span className="text-[color:var(--muted)]">
          — without bloated bios, badges, or boilerplate skill lists that mean
          nothing.
        </span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
        className="mt-9 flex flex-wrap gap-2.5"
      >
        <span className="pill">
          <MapPin />
          Kokand, UZ
        </span>
        <span className="pill">{mode === "night" ? "Night build" : "Day build"}</span>
        <span className="pill">
          <Clock />
          {clock} local
        </span>
        <span className="pill">
          <Briefcase />
          Open to opportunities
        </span>
      </motion.div>
    </header>
  );
}
