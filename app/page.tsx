"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ThemeMode } from "@/types";
import { Hero } from "@/components/Hero";
import { ContactCards } from "@/components/ContactCards";
import { useLocalTime } from "@/hooks/useLocalTime";

const IMG = {
  architecture:
    "https://hyperagent.com/api/files/usergenerated/threads/cmpowu3uz01mk07ad53082hvc/images/e73c2908-7a20-4a83-a0de-45bdbefe0056.png",
  kokand:
    "https://hyperagent.com/api/files/usergenerated/threads/cmpowu3uz01mk07ad53082hvc/images/e8f9cc87-5866-442d-8eb0-e8745a762834.png",
  desk: "https://hyperagent.com/api/files/usergenerated/threads/cmpowu3uz01mk07ad53082hvc/images/f75d0333-93a6-4cb1-aa8d-c17e2ad08af0.png",
  books:
    "https://hyperagent.com/api/files/usergenerated/threads/cmpowu3uz01mk07ad53082hvc/images/0bb75772-a22d-491e-9ace-e6052756a76a.png",
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HomePage(): JSX.Element {
  const { mode: autoMode, isReady } = useLocalTime();
  // User can override the auto-detected theme.
  const [override, setOverride] = useState<ThemeMode | null>(null);
  const mode: ThemeMode = override ?? autoMode;

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const toggleTheme = (): void => {
    setOverride((prev) => {
      const current = prev ?? autoMode;
      return current === "night" ? "day" : "night";
    });
  };

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden">
      {/* CSS-only atmospheric background — no WebGL */}
      <div className="atmosphere" aria-hidden />
      <div className="grain-overlay" aria-hidden />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-[3] mx-auto max-w-[1040px] px-8 sm:px-16 lg:px-20"
      >
        <Hero mode={mode} onToggle={toggleTheme} />
      </motion.div>

      {/* Architecture image — full-bleed, immediately after hero */}
      <BleedImage
        src={IMG.architecture}
        alt="Brutalist concrete corridor with dramatic raking light"
        caption="Architecture · Light · Geometry"
      />

      {/* ── sections ── */}
      <div className="relative z-[3] mx-auto max-w-[1040px] px-8 sm:px-16 lg:px-20">

        <Section num="01" title="Why this page" eyebrow="Manifesto" delay={0}>
          <Prose>
            <p>This is where I bring together the most important things about myself — without bloated bios or skill lists that mean nothing. One URL, three links, a little text. <Soft>I'm not trying to sell myself with big words; I'm trying to honestly record who I am right now and where I'm headed.</Soft></p>
            <p>I'm Abubakir Tukhliev, sixteen years old, from Kokand, Uzbekistan. I'm running this page as my first serious frontend project and at the same time as a quiet shopfront. If you have something to say, the fastest way is at the bottom. If you just came to look — thanks for the attention.</p>
          </Prose>
        </Section>

        <Section num="02" title="What I'm doing now" eyebrow="Now" delay={0}>
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
            <Prose>
              <p>Learning <Em>Python</Em>. Not by skimming courses, but through problems: writing small utilities, reading other people's code, studying clean architecture. In parallel I'm sharpening the math without which ML is just magic — <Soft>linear algebra, derivatives, foundations of statistics and probability.</Soft></p>
              <p>On weekdays, two to three hours after school and work, like clockwork. Weekends I keep for projects — that's when I can sit down longer and not have to surface every fifteen minutes.</p>
              <p>The next big goal is to build a first real ML project by the end of next year and try applying for an internship. Not <Em>grand</Em>, just honest: a meaningful problem statement, proper validation, and a repository I'd be comfortable showing.</p>
            </Prose>
            <FrameImg src={IMG.desk} alt="A worn wooden desk with an open notebook of handwritten code and a small cup of tea" mark="№ 02 / Desk" />
          </div>
        </Section>

        <Section num="03" title="Where I'm headed" eyebrow="Path" delay={0}>
          <Prose>
            <p>Long-term goal — to become an <Em>ML/AI engineer</Em>. It isn't a passing infatuation, it's a decision I came to knowing what actually pulls me in: the math, the optimization, the idea of teaching a machine to generalize to something new.</p>
            <p>I'm walking, not running. I don't have a hard deadline and I don't have an ambition to ship a grand project by year's end. I have a plan — moving through a handful of deep stages in order: Python fundamentals, data structures and algorithms, classical ML, neural networks, one real project, internship. <Soft>I stay at each stage as long as I need to in order to leave no blind spots behind.</Soft></p>
          </Prose>
          <PullQuote cite="Personal principle / 2026">
            Depth matters more than speed. If at every step you know what and why, the next step falls into place on its own.
          </PullQuote>
        </Section>
      </div>

      <BleedImage
        src={IMG.kokand}
        alt="Kokand at sunset — a narrow old-city street in warm sidelight"
        caption="Kokand / Old city / Golden hour"
      />

      <div className="relative z-[3] mx-auto max-w-[1040px] px-8 sm:px-16 lg:px-20">

        <Section num="04" title="What's shaping me" eyebrow="Reading" delay={0}>
          <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
            <FrameImg src={IMG.books} alt="A small stack of worn books on a windowsill in soft morning light" mark="№ 04 / Shelf" />
            <Prose>
              <p>Books that currently make me want to think rather than scroll a feed: <Em>Fluent Python</Em> (Luciano Ramalho), <Em>Designing Data-Intensive Applications</Em> (Martin Kleppmann), <Em>Hands-On Machine Learning</Em> (Aurélien Géron).</p>
              <p>People I learn from — Andrej Karpathy and his <Em>Neural Networks: Zero to Hero</Em> series, plus occasional deep dives from inside Anthropic and DeepMind.</p>
              <p><Soft>Reading for me isn't a way to kill time — it's a way to fill my head with the kind of thoughts I actually want to spend time with.</Soft></p>
            </Prose>
          </div>
        </Section>

        <Section num="05" title="Get in touch" eyebrow="Contacts" delay={0}>
          <ContactCards />
        </Section>

        <Colophon mode={mode} />
      </div>
    </main>
  );
}

/* ── reusable primitives ─────────────────────────────────── */

interface SectionProps {
  readonly num: string;
  readonly title: string;
  readonly eyebrow: string;
  readonly delay: number;
  readonly children: React.ReactNode;
}

function Section({ num, title, eyebrow, children }: SectionProps): JSX.Element {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: EASE }}
      className="border-t border-[color:var(--rule)] py-18 sm:py-24"
      style={{ paddingTop: "clamp(64px,8vw,96px)", paddingBottom: "clamp(64px,8vw,96px)" }}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[72px_1fr] md:gap-0 md:[column-gap:56px]">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] md:text-right md:pt-[0.45em]">
          {num}
        </div>
        <div>
          <div className="mb-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2
              className="text-balance font-display font-semibold leading-[1.04] tracking-[-0.015em] text-[color:var(--fg)]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
            >
              {title}
            </h2>
            <span className="section-rule-line" aria-hidden />
            <span className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--muted)] whitespace-nowrap">
              {eyebrow}
            </span>
          </div>
          {children}
        </div>
      </div>
    </motion.section>
  );
}

function Prose({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="max-w-[38em] text-[clamp(1rem,1.4vw,1.1rem)] leading-[1.68] font-light [&_p]:mb-[1.1em] [&_p:last-child]:mb-0">
      {children}
    </div>
  );
}

function Soft({ children }: { children: React.ReactNode }): JSX.Element {
  return <span className="text-[color:var(--muted)]">{children}</span>;
}

function Em({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <em className="not-italic font-medium" style={{ color: "var(--accent)" }}>
      {children}
    </em>
  );
}

function PullQuote({
  children,
  cite,
}: {
  children: React.ReactNode;
  cite: string;
}): JSX.Element {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
      className="mt-14 max-w-[28em] py-5 pl-7 border-l-2 border-[color:var(--accent)] font-display italic font-normal leading-[1.35] text-[color:var(--fg)]"
      style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.75rem)" }}
    >
      {children}
      <cite className="mt-4 block font-mono not-italic text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
        {cite}
      </cite>
    </motion.blockquote>
  );
}

interface BleedImageProps {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
}

function BleedImage({ src, alt, caption }: BleedImageProps): JSX.Element {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="bleed relative z-[3]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </motion.figure>
  );
}

function FrameImg({
  src,
  alt,
  mark,
}: {
  src: string;
  alt: string;
  mark: string;
}): JSX.Element {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
      className="frame-img"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
      <span className="mark">{mark}</span>
    </motion.figure>
  );
}

function Colophon({ mode }: { mode: ThemeMode }): JSX.Element {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mt-0 border-t border-[color:var(--rule)] py-12 sm:py-16 grid grid-cols-1 gap-8 sm:grid-cols-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--muted)]"
    >
      <div>
        <h3 className="mb-3 font-medium text-[color:var(--muted-2)]">Set in</h3>
        <p className="mb-1 text-[color:var(--fg)]">Playfair Display</p>
        <p className="mb-1 text-[color:var(--fg)]">Figtree</p>
        <p className="text-[color:var(--fg)]">JetBrains Mono</p>
      </div>
      <div>
        <h3 className="mb-3 font-medium text-[color:var(--muted-2)]">Built with</h3>
        <p className="mb-1 text-[color:var(--fg)]">Next.js 14 · TS</p>
        <p className="mb-1 text-[color:var(--fg)]">Tailwind · CSS</p>
        <p className="text-[color:var(--fg)]">GH Pages</p>
      </div>
      <div>
        <h3 className="mb-3 font-medium text-[color:var(--muted-2)]">Colophon</h3>
        <p className="mb-1 text-[color:var(--fg)]">© {new Date().getFullYear()} A. Tukhliev</p>
        <p className="mb-1">
          <a
            href="https://github.com/tukhlievs/tukhlievs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--fg)] border-b border-[color:var(--rule)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors duration-300"
          >
            source ↗
          </a>
        </p>
        <p className="text-[color:var(--fg)]">{mode === "night" ? "Night" : "Day"} build</p>
      </div>
    </motion.footer>
  );
}
