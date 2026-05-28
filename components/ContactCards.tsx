"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ContactPlatform } from "@/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const PLATFORMS: readonly ContactPlatform[] = [
  {
    id: "telegram",
    label: "Telegram",
    handle: "@tukhlievs",
    href: "https://t.me/tukhlievs",
    description: "Telegram · fastest way to reach me",
  },
  {
    id: "threads",
    label: "Threads",
    handle: "@tukhlie.v",
    href: "https://www.threads.net/@tukhlie.v",
    description: "Threads · short notes",
  },
  {
    id: "github",
    label: "GitHub",
    handle: "@tukhlievs",
    href: "https://github.com/tukhlievs",
    description: "GitHub · code and projects",
  },
];

export function ContactCards(): JSX.Element {
  return (
    <section aria-label="Contacts">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-7 flex flex-wrap items-baseline gap-4"
      >
        <span className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--accent)]">
          05
        </span>
        <h2 className="max-w-[16ch] text-balance font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.015em] text-[color:var(--fg)]">
          Get in touch
        </h2>
        <span className="section-rule-line" aria-hidden />
        <span className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--muted)] ml-auto">
          Contacts
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="mb-2 max-w-[36em] text-[clamp(1rem,1.4vw,1.1rem)] leading-[1.68] font-light text-[color:var(--muted)]"
      >
        I check Telegram first. Threads and GitHub — for everything else.
      </motion.p>

      <div className="mt-6" role="list">
        {PLATFORMS.map((p, i) => (
          <motion.a
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.05 + i * 0.07, ease: EASE }}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label={`${p.label}: ${p.handle}`}
            className="contact-row"
          >
            <span className="c-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="c-p">{p.label}</span>
            <span className="c-h">{p.handle}</span>
            <ArrowUpRight className="c-a" aria-hidden />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
