"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ThemeMode } from "@/types";

interface HeroProps {
  readonly mode: ThemeMode;
  readonly onToggle: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

function useClockText(): string {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const paint = (): void => {
      const d = new Date();
      setT(
        String(d.getHours()).padStart(2, "0") +
          ":" +
          String(d.getMinutes()).padStart(2, "0"),
      );
    };
    paint();
    const id = window.setInterval(paint, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return t;
}

export function Hero({ mode, onToggle }: HeroProps): JSX.Element {
  const clock = useClockText();
  const year = new Date().getFullYear();

  return (
    <>
      {/* top strip */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="flex items-center justify-between py-6 sm:py-8 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[color:var(--muted)]"
      >
        <div className="flex items-center gap-2.5">
          <span className="live-dot" />
          Personal page · {year}
        </div>
        <button
          onClick={onToggle}
          type="button"
          aria-label="Toggle theme"
          className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--stroke)] px-3 py-1.5 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors duration-300"
        >
          <span className="size-1.5 rounded-full bg-[color:var(--accent)] flex-shrink-0" />
          {mode === "night" ? "Night" : "Day"}
          <span className="opacity-40">·</span>
          {clock}
        </button>
      </motion.header>

      {/* name block — compact, not full-viewport */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        className="pt-8 pb-4 sm:pt-10"
      >
        <h1
          className="font-display leading-[0.93] tracking-[-0.02em] m-0"
          style={{ fontSize: "clamp(2.8rem, 9vw, 5.4rem)" }}
        >
          <span className="block font-bold text-[color:var(--fg)]">Abubakir</span>
          <span
            className="block font-normal italic ml-[0.08em]"
            style={{ color: "var(--accent)" }}
          >
            Tukhliev
          </span>
          <span
            className="block font-normal italic text-[color:var(--muted)] ml-[0.4em] mt-2 letter-spacing-[0]"
            style={{ fontSize: "0.3em", letterSpacing: "0" }}
          >
            / Abu.
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
          className="mt-4 text-[clamp(0.95rem,1.8vw,1.05rem)] leading-[1.62] text-[color:var(--muted)] font-light max-w-[32em]"
        >
          Sixteen. Learning{" "}
          <strong className="font-medium text-[color:var(--fg)]">Python</strong>{" "}
          — aimed at AI/ML engineering. Kokand, Uzbekistan.
        </motion.p>
      </motion.div>
    </>
  );
}
