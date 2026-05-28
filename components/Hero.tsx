"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase } from "lucide-react";
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
        className="flex items-center justify-between py-8 sm:py-10 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--muted)]"
      >
        <div className="flex items-center gap-3">
          <span className="live-dot" />
          Personal page · v3 · {year}
        </div>
        <button
          onClick={onToggle}
          type="button"
          aria-label="Toggle theme"
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stroke)] px-3.5 py-1.5 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors duration-300"
        >
          <span className="size-1.5 rounded-full bg-[color:var(--accent)] flex-shrink-0" />
          {mode === "night" ? "Night" : "Day"}
          <span className="text-[color:var(--muted)]">·</span>
          {clock}
        </button>
      </motion.header>

      {/* hero */}
      <section className="flex min-h-[80vh] flex-col justify-center pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.26em] text-[color:var(--muted)]"
        >
          <span aria-hidden className="inline-block h-px w-7 bg-[color:var(--accent)]" />
          Uzbekistan · Kokand · {year}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.15, ease: EASE }}
          className="mt-8 font-display leading-[0.92] tracking-[-0.02em]"
          style={{ fontSize: "clamp(3.4rem, 10.5vw, 9.5rem)" }}
        >
          <span className="block font-bold text-[color:var(--fg)]">Abubakir</span>
          <span
            className="block font-normal italic ml-[0.1em]"
            style={{ color: "var(--accent)" }}
          >
            Tukhliev
          </span>
          <span
            className="block font-normal italic text-[color:var(--muted)] ml-[0.5em] mt-3"
            style={{ fontSize: "0.28em" }}
          >
            / Abu.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
          className="mt-10 max-w-[36em] text-[clamp(1.04rem,1.55vw,1.18rem)] leading-[1.64] font-light"
        >
          Sixteen years old. Learning{" "}
          <strong className="font-medium">Python</strong> with my sights set on
          becoming an ML/AI engineer. This page is where I bring together the
          most important things about myself{" "}
          <span className="text-[color:var(--muted)]">
            — without bloated bios, badges, or boilerplate skill lists that mean
            nothing.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.48, ease: EASE }}
          className="mt-9 flex flex-wrap gap-2.5"
        >
          <span className="pill">
            <MapPin />
            Kokand, UZ
          </span>
          <span className="pill">
            {mode === "night" ? "Night build" : "Day build"}
          </span>
          <span className="pill">
            <Clock />
            {clock} local
          </span>
          <span className="pill">
            <Briefcase />
            Open to opportunities
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.65, ease: EASE }}
          className="mt-16 inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--muted)]"
          style={{ animation: "scroll-hint 2s ease-in-out infinite" }}
        >
          Scroll
          <span
            aria-hidden
            className="inline-block w-px h-10"
            style={{
              background:
                "linear-gradient(to bottom, var(--muted), transparent)",
            }}
          />
        </motion.div>
      </section>
    </>
  );
}
