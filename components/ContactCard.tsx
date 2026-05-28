"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ContactPlatform, ThemeMode } from "@/types";

interface ContactCardProps {
  readonly platform: ContactPlatform;
  readonly mode: ThemeMode;
  readonly index: number;
  readonly icon: JSX.Element;
  readonly accent: string;
  readonly glowClass: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactCard({
  platform,
  mode,
  index,
  icon,
  accent,
  glowClass,
}: ContactCardProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.08, duration: 0.7, ease: EASE }}
    >
      <Link
        href={platform.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${platform.label}: ${platform.handle}`}
        className={[
          "group relative flex items-center justify-between gap-5 overflow-hidden rounded-2xl px-5 py-5 sm:px-6 sm:py-6",
          "card-surface transition-transform duration-500 ease-smooth will-change-transform",
          "hover:-translate-y-0.5 hover:scale-[1.015]",
          glowClass,
        ].join(" ")}
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-px"
          style={{ background: accent, opacity: 0.6 }}
        />

        <div className="flex min-w-0 items-center gap-5">
          <span
            aria-hidden
            className="grid size-12 shrink-0 place-items-center rounded-xl border border-[color:var(--stroke)] bg-[color:var(--bg)]/40 transition-colors duration-500 group-hover:bg-[color:var(--bg)]/70"
            style={{ color: accent }}
          >
            {icon}
          </span>

          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
              {platform.description}
            </div>
            <div className="mt-1 truncate text-lg font-medium tracking-tight text-[color:var(--fg)] sm:text-xl">
              {platform.handle}
            </div>
          </div>
        </div>

        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-full border border-[color:var(--stroke)] text-[color:var(--muted)] transition-all duration-500 group-hover:rotate-[-12deg] group-hover:text-[color:var(--fg)]"
        >
          <ArrowUpRight className="size-4" />
        </span>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-px rounded-[calc(1.25rem-1px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              mode === "night"
                ? `radial-gradient(120% 80% at 100% 0%, ${accent}1f 0%, transparent 60%)`
                : `radial-gradient(120% 80% at 100% 0%, ${accent}18 0%, transparent 65%)`,
          }}
        />
      </Link>
    </motion.div>
  );
}
