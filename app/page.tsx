"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { ThemeMode } from "@/types";
import { Hero } from "@/components/Hero";
import { ContactCards } from "@/components/ContactCards";
import { useLocalTime } from "@/hooks/useLocalTime";

const SceneCanvas = dynamic(
  () => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas),
  { ssr: false }
);

const IMG = {
  kokand:
    "https://hyperagent.com/api/files/usergenerated/threads/cmpowu3uz01mk07ad53082hvc/images/e8f9cc87-5866-442d-8eb0-e8745a762834.png",
  desk: "https://hyperagent.com/api/files/usergenerated/threads/cmpowu3uz01mk07ad53082hvc/images/f75d0333-93a6-4cb1-aa8d-c17e2ad08af0.png",
  books:
    "https://hyperagent.com/api/files/usergenerated/threads/cmpowu3uz01mk07ad53082hvc/images/0bb75772-a22d-491e-9ace-e6052756a76a.png",
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HomePage(): JSX.Element {
  const { mode, isReady } = useLocalTime();

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-90">
        <SceneCanvas mode={mode} />
      </div>
      <div className="grain-overlay" aria-hidden />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-[3] mx-auto max-w-[920px] px-7 py-9 sm:px-14 sm:py-14 lg:px-20 lg:py-[72px]"
      >
        <TopStrip mode={mode} />
        <Hero mode={mode} />
        <Manifesto />
        <BleedImage
          src={IMG.kokand}
          alt="Kokand at sunset — a narrow old-city street in warm sidelight"
          caption="Kokand / Old city / Golden hour"
        />
        <Now imgSrc={IMG.desk} />
        <Path />
        <Reading imgSrc={IMG.books} />
        <ContactCards />
        <Colophon mode={mode} />
      </motion.div>
    </main>
  );
}

/* ────────────────────────────────────────────────────────────────── */

function TopStrip({ mode }: { mode: ThemeMode }): JSX.Element {
  return (
    <header className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex items-center gap-3"
      >
        <span className="pulse-dot" />
        <span>Personal page · v2 · {new Date().getFullYear()}</span>
      </motion.div>
      <motion.span
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stroke)] px-3.5 py-1.5"
      >
        <span className="size-1.5 rounded-full bg-[color:var(--accent)]" />
        {mode === "night" ? "Night" : "Day"}
      </motion.span>
    </header>
  );
}

interface SectionHeadProps {
  readonly num: string;
  readonly title: string;
  readonly eyebrow: string;
}

function SectionHead({ num, title, eyebrow }: SectionHeadProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mb-7 flex items-baseline gap-4"
    >
      <span className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--accent)]">
        {num}
      </span>
      <h2 className="max-w-[16ch] text-balance font-display text-[clamp(2.2rem,5.8vw,3.4rem)] font-normal italic leading-[1.05] tracking-[-0.015em]">
        {title}
      </h2>
      <span className="section-rule" aria-hidden />
      <span className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
        {eyebrow}
      </span>
    </motion.div>
  );
}

function Manifesto(): JSX.Element {
  return (
    <section className="mt-28 sm:mt-36">
      <SectionHead num="01 ━" title="Why this page" eyebrow="Manifesto" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="prose-content max-w-[36em] text-[clamp(1.02rem,1.45vw,1.115rem)] leading-[1.66]"
      >
        <p>
          This is where I bring together the most important things about
          myself — without bloated bios or skill lists that mean nothing. One
          URL, three links, a little text.{" "}
          <span className="text-[color:var(--muted)]">
            I'm not trying to sell myself with big words; I'm trying to
            honestly record who I am right now and where I'm headed.
          </span>
        </p>
        <p>
          I'm Abubakir Tukhliev, sixteen years old, from Kokand, Uzbekistan.
          I'm running this page as my first serious frontend project and at
          the same time as a quiet shopfront. If you have something to say,
          the fastest way is at the bottom. If you just came to look — thanks
          for the attention.
        </p>
      </motion.div>
    </section>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="bleed mt-14"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full"
        style={{ filter: "saturate(0.92) contrast(1.02)" }}
      />
      <figcaption className="mx-auto mt-3.5 flex max-w-[920px] items-center gap-3 px-7 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[color:var(--muted)] sm:px-14 lg:px-20">
        <span aria-hidden className="text-[9px] text-[color:var(--accent)]">▢</span>
        {caption}
      </figcaption>
    </motion.figure>
  );
}

function Now({ imgSrc }: { imgSrc: string }): JSX.Element {
  return (
    <section className="mt-28 sm:mt-36">
      <SectionHead num="02 ━" title="What I'm doing now" eyebrow="Now" />
      <div className="grid gap-10 sm:grid-cols-[1.2fr_0.85fr] sm:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="prose-content max-w-[36em] text-[clamp(1.02rem,1.45vw,1.115rem)] leading-[1.66]"
        >
          <p>
            Learning <em className="k">Python</em>. Not by skimming courses,
            but through problems: writing small utilities, reading other
            people's code, studying clean architecture. In parallel I'm
            sharpening the math without which ML is just magic —{" "}
            <span className="text-[color:var(--muted)]">
              linear algebra, derivatives, foundations of statistics and
              probability.
            </span>
          </p>
          <p>
            On weekdays, two to three hours after school and work, like
            clockwork. Weekends I keep for projects — that's when I can sit
            down longer and not have to surface every fifteen minutes.
          </p>
          <p>
            The next big goal is to build a first real ML project by the end
            of next year and try applying for an internship. Not{" "}
            <em className="k">grand</em>, just honest: a meaningful problem
            statement, proper validation, and a repository I'd be comfortable
            showing.
          </p>
        </motion.div>
        <FrameImage
          src={imgSrc}
          alt="A worn wooden desk with an open notebook of handwritten code and a small cup of tea"
          mark="№ 02 / Desk"
        />
      </div>
    </section>
  );
}

function Path(): JSX.Element {
  return (
    <section className="mt-28 sm:mt-36">
      <SectionHead num="03 ━" title="Where I'm headed" eyebrow="Path" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="prose-content max-w-[36em] text-[clamp(1.02rem,1.45vw,1.115rem)] leading-[1.66]"
      >
        <p>
          Long-term goal — to become an{" "}
          <em className="k">ML/AI engineer</em>. It isn't a passing
          infatuation, it's a decision I came to knowing what actually pulls
          me in: the math, the optimization, the idea of teaching a machine
          to generalize to something new.
        </p>
        <p>
          I'm walking, not running. I don't have a hard deadline and I don't
          have an ambition to ship a grand project by year's end. I have a
          plan — moving through a handful of deep stages in order: Python
          fundamentals, data structures and algorithms, classical ML, neural
          networks, one real project, internship.{" "}
          <span className="text-[color:var(--muted)]">
            I stay at each stage as long as I need to in order to leave no
            blind spots behind.
          </span>
        </p>
      </motion.div>

      <motion.blockquote
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        className="mt-16 max-w-[28em] border-l border-[color:var(--rule)] py-8 pl-9 font-display text-[clamp(1.35rem,2.8vw,1.8rem)] italic leading-[1.32]"
      >
        Depth matters more than speed. If at every step you know what and
        why, the next step falls into place on its own.
        <cite className="mt-4 block font-mono text-[10.5px] not-italic uppercase tracking-[0.22em] text-[color:var(--muted)]">
          Personal principle / 2026
        </cite>
      </motion.blockquote>
    </section>
  );
}

function Reading({ imgSrc }: { imgSrc: string }): JSX.Element {
  return (
    <section className="mt-28 sm:mt-36">
      <SectionHead num="04 ━" title="What's shaping me" eyebrow="Reading" />
      <div className="grid gap-10 sm:grid-cols-[0.85fr_1.2fr] sm:gap-16">
        <FrameImage
          src={imgSrc}
          alt="A small stack of worn books on a windowsill in soft morning light"
          mark="№ 04 / Shelf"
        />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="prose-content max-w-[36em] text-[clamp(1.02rem,1.45vw,1.115rem)] leading-[1.66]"
        >
          <p>
            Books that currently make me want to think rather than scroll a
            feed: <em className="k">Fluent Python</em> (Luciano Ramalho),{" "}
            <em className="k">Designing Data-Intensive Applications</em>{" "}
            (Martin Kleppmann),{" "}
            <em className="k">Hands-On Machine Learning</em> (Aurélien
            Géron).
          </p>
          <p>
            People I learn from — Andrej Karpathy and his{" "}
            <em className="k">Neural Networks: Zero to Hero</em> series, plus
            occasional deep dives from inside Anthropic and DeepMind.
          </p>
          <p className="text-[color:var(--muted)]">
            Reading for me isn't a way to kill time — it's a way to fill my
            head with the kind of thoughts I actually want to spend time
            with.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FrameImage({
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
      className="relative m-0"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full rounded-sm"
        style={{ filter: "saturate(0.92) contrast(1.02)" }}
      />
      <span className="absolute -bottom-2.5 -left-2.5 border border-[color:var(--stroke)] bg-[color:var(--bg)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
        {mark}
      </span>
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
      className="mt-32 grid grid-cols-1 gap-6 border-t border-[color:var(--rule)] pt-8 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--muted)] sm:grid-cols-3 sm:gap-8"
    >
      <div>
        <h3 className="mb-2.5 font-medium text-[color:var(--muted-2)]">Set in</h3>
        <p className="mb-1 text-[color:var(--fg)]">Fraunces</p>
        <p className="mb-1 text-[color:var(--fg)]">Onest</p>
        <p className="text-[color:var(--fg)]">JetBrains Mono</p>
      </div>
      <div>
        <h3 className="mb-2.5 font-medium text-[color:var(--muted-2)]">Built with</h3>
        <p className="mb-1 text-[color:var(--fg)]">Next.js 14 · TS</p>
        <p className="mb-1 text-[color:var(--fg)]">Tailwind · Three.js</p>
        <p className="text-[color:var(--fg)]">Deployed to GH Pages</p>
      </div>
      <div>
        <h3 className="mb-2.5 font-medium text-[color:var(--muted-2)]">Colophon</h3>
        <p className="mb-1 text-[color:var(--fg)]">© {new Date().getFullYear()} A. Tukhliev</p>
        <p className="mb-1 text-[color:var(--fg)]">
          <a
            href="https://github.com/tukhlievs/tukhlievs"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-[color:var(--rule)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          >
            source ↗
          </a>
        </p>
        <p className="text-[color:var(--fg)]">{mode === "night" ? "Night" : "Day"} build</p>
      </div>
    </motion.footer>
  );
}
