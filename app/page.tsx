"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { ContactCards } from "@/components/ContactCards";
import { useLocalTime } from "@/hooks/useLocalTime";

// Three.js canvas is deferred — keeps the LCP path light and avoids SSR.
const SceneCanvas = dynamic(
  () => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas),
  { ssr: false }
);

export default function HomePage(): JSX.Element {
  const { mode, isReady } = useLocalTime();

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <SceneCanvas mode={mode} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-between px-6 py-10 sm:px-10 sm:py-16"
      >
        <Hero mode={mode} />
        <ContactCards mode={mode} />
        <Footer mode={mode} />
      </motion.div>
    </main>
  );
}

function Footer({ mode }: { mode: "day" | "night" }): JSX.Element {
  const label = mode === "night" ? "Сейчас у меня ночь" : "Сейчас у меня день";
  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]"
    >
      <span>© {new Date().getFullYear()} · tukhlievs</span>
      <span className="flex items-center gap-2">
        <span className="inline-block size-1.5 animate-pulse rounded-full bg-[color:var(--accent)]" />
        {label}
      </span>
    </motion.footer>
  );
}
