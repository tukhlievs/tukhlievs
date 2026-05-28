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
    description: "Telegram · быстрая связь",
  },
  {
    id: "threads",
    label: "Threads",
    handle: "@tukhlie.v",
    href: "https://www.threads.net/@tukhlie.v",
    description: "Threads · короткие заметки",
  },
  {
    id: "github",
    label: "GitHub",
    handle: "@tukhlievs",
    href: "https://github.com/tukhlievs",
    description: "GitHub · код и проекты",
  },
];

export function ContactCards(): JSX.Element {
  return (
    <section aria-label="Контакты" className="mt-28 sm:mt-36">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-7 flex items-baseline gap-4"
      >
        <span className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--accent)]">
          05 ━
        </span>
        <h2 className="max-w-[14ch] text-balance font-display text-[clamp(2.2rem,5.8vw,3.4rem)] font-normal italic leading-[1.05] tracking-[-0.015em]">
          Связаться
        </h2>
        <span className="section-rule" aria-hidden />
        <span className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
          Contacts
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="mb-2 max-w-[36em] text-[clamp(1.02rem,1.45vw,1.115rem)] leading-[1.66] text-[color:var(--muted)]"
      >
        Telegram читаю первым. Threads и GitHub — для всего остального.
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
            <span className="c-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="c-name">{p.label}</span>
            <span className="c-handle">{p.handle}</span>
            <ArrowUpRight className="c-arrow" aria-hidden />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
