"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ThemeMode } from "@/types";
import { Hero } from "@/components/Hero";
import { ContactCards } from "@/components/ContactCards";
import { useLocalTime } from "@/hooks/useLocalTime";

const IMG = {
  architecture:
    "https://hyperagent.com/api/files/usergenerated/threads/cmpowu3uz01mk07ad53082hvc/images/e73c2908-7a20-4a83-a0de-45bdbefe0056.png",
  kokand:
    "https://hyperagent.com/api/files/usergenerated/threads/cmpowu3uz01mk07ad53082hvc/images/e8f9cc87-5866-442d-8eb0-e8745a762834.png",
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PhotoBand({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}): JSX.Element {
  return (
    <motion.figure
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="photo-band"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </motion.figure>
  );
}

function ContentSection({
  num,
  title,
  eyebrow,
  children,
}: {
  num: string;
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Reveal>
      <article className="csect">
        <div className="csect-head">
          <span className="csect-num">{num}</span>
          <h2 className="csect-title">{title}</h2>
          <span className="csect-ew">{eyebrow}</span>
        </div>
        {children}
      </article>
    </Reveal>
  );
}

export default function HomePage(): JSX.Element {
  const { mode: autoMode, isReady } = useLocalTime();
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
    <main className="relative isolate min-h-screen overflow-x-clip">
      {/* CSS-only atmospheric background */}
      <div className="atm" aria-hidden />
      <div className="grain-overlay" aria-hidden />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {/* ── primary content: hero + social links ── */}
        <div className="wrap">
          <Hero mode={mode} onToggle={toggleTheme} />
          {/* ContactCards are the MAIN element — links to social profiles */}
          <ContactCards />
        </div>

        {/* ── first photo band — outside wrap, full-width ── */}
        <PhotoBand
          src={IMG.architecture}
          alt="Brutalist concrete corridor with dramatic raking light"
          caption="Architecture · Light · Geometry"
        />

        {/* ── secondary content: about + path ── */}
        <div className="wrap">
          <div className="content-divider" />

          <ContentSection num="01" title="About" eyebrow="Manifesto">
            <div className="prose">
              <p>
                I'm Abubakir Tukhliev, sixteen years old, from Kokand,
                Uzbekistan. This page is where I bring together the most
                important things about myself{" "}
                <span className="text-[color:var(--muted)]">
                  — without bloated bios or skill lists that mean nothing.
                </span>
              </p>
              <p>
                I'm running this page as my first serious frontend project and
                at the same time as a quiet shopfront.{" "}
                <span className="text-[color:var(--muted)]">
                  If you have something to say, the fastest way is the Telegram
                  card above.
                </span>
              </p>
            </div>
          </ContentSection>

          <ContentSection num="02" title="Where I'm headed" eyebrow="Path">
            <div className="prose">
              <p>
                Long-term goal — to become an{" "}
                <em className="not-italic font-medium text-[color:var(--accent)]">
                  ML/AI engineer
                </em>
                . Not a passing trend, a decision I came to knowing what pulls
                me in: the math, the optimization, the idea of teaching a
                machine to generalize to something new.
              </p>
              <p>
                I'm walking, not running. Two to three hours a day after school
                and work, moving through stages in order: Python fundamentals,
                data structures, classical ML, neural networks, one real
                project, internship.{" "}
                <span className="text-[color:var(--muted)]">
                  I stay at each stage as long as needed — no blind spots.
                </span>
              </p>
            </div>
            <blockquote className="pull">
              Depth matters more than speed. If at every step you know what and
              why, the next step falls into place on its own.
              <cite>Personal principle / 2026</cite>
            </blockquote>
          </ContentSection>
        </div>

        {/* ── second photo band ── */}
        <PhotoBand
          src={IMG.kokand}
          alt="Kokand at sunset — a narrow old-city street in warm sidelight"
          caption="Kokand / Old city / Golden hour"
        />

        {/* ── reading + colophon ── */}
        <div className="wrap">
          <div className="content-divider" />

          <ContentSection num="03" title="Reading" eyebrow="Shaping me">
            <div className="prose">
              <p>
                <em className="not-italic font-medium text-[color:var(--accent)]">
                  Fluent Python
                </em>{" "}
                (Luciano Ramalho),{" "}
                <em className="not-italic font-medium text-[color:var(--accent)]">
                  Designing Data-Intensive Applications
                </em>{" "}
                (Martin Kleppmann),{" "}
                <em className="not-italic font-medium text-[color:var(--accent)]">
                  Hands-On Machine Learning
                </em>{" "}
                (Aurélien Géron).
              </p>
              <p>
                Andrej Karpathy's{" "}
                <em className="not-italic font-medium text-[color:var(--accent)]">
                  Neural Networks: Zero to Hero
                </em>{" "}
                and occasional deep dives from Anthropic or DeepMind.{" "}
                <span className="text-[color:var(--muted)]">
                  Reading is how I fill my head with the kind of thoughts I
                  actually want to spend time with.
                </span>
              </p>
            </div>
          </ContentSection>

          <Colophon mode={mode} />
        </div>
      </motion.div>
    </main>
  );
}

function Colophon({ mode }: { mode: ThemeMode }): JSX.Element {
  return (
    <Reveal>
      <footer className="colophon">
        <div>
          <h3>Set in</h3>
          <p>Playfair Display</p>
          <p>Figtree</p>
          <p>JetBrains Mono</p>
        </div>
        <div>
          <h3>Built with</h3>
          <p>Next.js 14 · TS</p>
          <p>Tailwind · CSS</p>
          <p>GH Pages</p>
        </div>
        <div>
          <h3>Colophon</h3>
          <p>© {new Date().getFullYear()} A. Tukhliev</p>
          <p>
            <a
              href="https://github.com/tukhlievs/tukhlievs"
              target="_blank"
              rel="noopener noreferrer"
            >
              source ↗
            </a>
          </p>
          <p>{mode === "night" ? "Night" : "Day"} build</p>
        </div>
      </footer>
    </Reveal>
  );
}
