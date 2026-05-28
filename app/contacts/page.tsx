"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const blurIn = (delay = 0) => ({
  initial: { opacity: 0, filter: "blur(10px)", y: 10 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  transition: { duration: 0.85, delay, ease: EASE },
});

const CONTACTS = [
  {
    num: "01",
    platform: "Telegram",
    handle: "tukhlievs",
    href: "https://t.me/tukhlievs",
    hreftag: "t.me/tukhlievs",
    desc: "The fastest way to reach me. I'm most active here — direct messages, quick replies, open to conversations about tech, learning, or anything else.",
  },
  {
    num: "02",
    platform: "Threads",
    handle: "tukhlie.v",
    href: "https://www.threads.net/@tukhlie.v",
    hreftag: "threads.net/@tukhlie.v",
    desc: "Short notes as I learn Python and explore AI. Thoughts on studying, books I'm reading, things I find interesting in tech and engineering.",
  },
  {
    num: "03",
    platform: "GitHub",
    handle: "tukhlievs",
    href: "https://github.com/tukhlievs",
    hreftag: "github.com/tukhlievs",
    desc: "Repositories and commits. My development activity as I work through Python, data structures, and eventually ML projects.",
  },
];

export default function ContactsPage() {
  return (
    <main className="relative isolate min-h-screen">
      <div className="atm" aria-hidden />
      <div className="grain-overlay" aria-hidden />

      <div className="wrap">
        <div className="pt-14 pb-4 sm:pt-16">
          <motion.h1
            {...blurIn(0.06)}
            className="font-display font-bold leading-[0.93] tracking-[-0.022em] m-0 mb-10"
            style={{ fontSize: "clamp(2.4rem, 8vw, 4.5rem)" }}
          >
            Con
            <span
              className="font-normal italic"
              style={{ color: "var(--accent)" }}
            >
              tacts.
            </span>
          </motion.h1>

          {CONTACTS.map((c, i) => (
            <motion.div
              key={c.platform}
              {...blurIn(0.10 + i * 0.10)}
              className="contact-item"
            >
              <span className="contact-num">{c.num}</span>
              <h2 className="contact-platform">{c.platform}</h2>
              <div className="contact-handle">{c.handle}</div>
              <p className="contact-desc">{c.desc}</p>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                {c.hreftag}
                <ArrowUpRight className="size-[11px]" aria-hidden />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
