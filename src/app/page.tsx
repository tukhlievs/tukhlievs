import Link from "next/link";
import { site, socials } from "@/lib/site";
import { Layers, Database, Bot, GitBranch, ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { getPosts, formatDate } from "@/lib/posts";
import activity from "@/data/activity.json";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { ServicesCarousel } from "@/components/ServicesCarousel";

const capabilities = [
  {
    title: "Web apps",
    text: "Next.js and React frontends with real backends — auth, databases, dashboards, SEO-ready rendering.",
  },
  {
    title: "Telegram bots & Mini Apps",
    text: "Bots that feel like products and Mini Apps that feel native — payments, storage, webhooks, the whole loop.",
  },
  {
    title: "APIs & integrations",
    text: "REST APIs, third-party integrations and data pipelines that connect services never meant to talk.",
  },
  {
    title: "Automation & AI agents",
    text: "Scripts, cron jobs and autonomous agents that quietly do the boring work around the clock.",
  },
];

const steps = [
  {
    title: "Describe the task",
    text: "One message on Telegram with what you need. Screenshots and examples help.",
  },
  {
    title: "Fixed scope & price",
    text: "I reply with exactly what will be done, for how much and by when. No surprises later.",
  },
  {
    title: "Build",
    text: "Short iterations, progress you can click, changes while they are still cheap.",
  },
  {
    title: "Deploy & support",
    text: "Live on your domain with everything wired. I stay around to fix what wobbles.",
  },
];

const skillGroups = [
  {
    label: "Frontend & interfaces",
    title: "React, Next.js, TypeScript, Tailwind",
    Icon: Layers,
    pattern: "wave" as const,
    tone: "accent" as const,
  },
  {
    label: "Backend & edge",
    title: "Cloudflare Workers, Supabase, PostgreSQL",
    Icon: Database,
    pattern: "zigzag" as const,
    tone: "deep" as const,
  },
  {
    label: "Bots & automation",
    title: "Python, Pyrogram, automation",
    Icon: Bot,
    pattern: "zigzag" as const,
    tone: "deep" as const,
  },
  {
    label: "Tooling & delivery",
    title: "Git, Linux, Docker",
    Icon: GitBranch,
    pattern: "wave" as const,
    tone: "accent" as const,
  },
];

// Декоративные линии поверх заливки: мягкие волны или угловатые зигзаги
function CardLines({ variant }: { variant: "wave" | "zigzag" }) {
  const rows = [0, 1, 2, 3, 4];
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 240"
      preserveAspectRatio="none"
      fill="none"
      className="absolute inset-0 h-full w-full"
    >
      {rows.map((r) => {
        const y = 8 + r * 56;
        const d =
          variant === "wave"
            ? `M-20 ${y} C 60 ${y - 30}, 140 ${y + 30}, 220 ${y} S 380 ${y - 30}, 460 ${y}`
            : `M-20 ${y} L 70 ${y - 36} L 160 ${y + 36} L 250 ${y - 36} L 340 ${y + 36} L 460 ${y - 8}`;
        return (
          <path
            key={r}
            d={d}
            stroke="white"
            strokeOpacity="0.16"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}

const stats = [
  { value: `${activity.total}+`, label: "commits · 12 weeks" },
  { value: String((activity as { repos?: number }).repos ?? 5), label: "public repos" },
  { value: "3", label: "service packages" },
  { value: "1", label: "product live" },
];

export default function HomePage() {
  const posts = getPosts().slice(0, 3);
  const featured = projects.slice(0, 2);
  const gridCols = featured.length > 1 ? "sm:grid-cols-2" : "";

  return (
    <div>
      {/* Hero: типографический стейтмент на всю ширину */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-24 sm:pt-40 pb-20 sm:pb-28">
          <div className="relative z-10">
            <p className="fade-up inline-flex items-center gap-2 text-sm font-medium text-accent bg-accent-soft border border-accent/15 rounded-full px-3.5 py-1.5">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              {site.location} · open to projects
            </p>
            {/* Имя и роль проявляются из блюра по очереди */}
            <h1 className="mt-7 max-w-4xl text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] text-balance">
              <span className="fade-up d1 inline-block">
                Abubakir Tukhliev —
              </span>{" "}
              <span className="fade-up d2 inline-block text-gradient pb-1">
                Fullstack Developer
              </span>
            </h1>
            <p className="fade-up d3 mt-6 text-lg text-muted leading-relaxed max-w-xl">
              Building resilient products end to end — web apps, bots, APIs
              and automation. Whatever the problem needs, from database to
              interface. Always shipping something new.
            </p>
            <div className="fade-up d4 mt-8 flex flex-wrap gap-3">
              <Link
                href="/work"
                className="inline-flex items-center rounded-full bg-accent text-white px-6 py-3 text-sm font-semibold shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 transition-all"
              >
                View work
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-fg hover:border-accent/40 hover:text-accent transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>

        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Живые цифры */}
        <Reveal>
          <section className="flex flex-wrap items-end gap-x-14 gap-y-8">
            {stats.map((s) => (
              <div key={s.label}>
                <span
                  aria-hidden
                  className="block h-1 w-8 rounded-full bg-accent/80"
                />
                <div className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </section>
        </Reveal>

        {/* Что я строю */}
        <Reveal>
          <section className="mt-28 sm:mt-36">
            <h2 className="text-3xl font-bold tracking-tight">What I build</h2>
            <p className="mt-3 text-lg text-muted leading-relaxed max-w-2xl">
              Four things I do well — and ship end to end, from the first
              database table to the deployed interface.
            </p>
            <div className="mt-10 border-b border-border">
              {capabilities.map((c, i) => (
                <div
                  key={c.title}
                  className="group grid grid-cols-1 sm:grid-cols-[72px_1fr] lg:grid-cols-[72px_1fr_1.6fr] gap-x-8 gap-y-2 items-baseline border-t border-border py-7 sm:py-9"
                >
                  <span className="font-display text-sm font-semibold text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight group-hover:text-accent transition-colors">
                    {c.title}
                  </h3>
                  <p className="sm:col-start-2 lg:col-start-auto text-muted leading-relaxed">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Featured projects */}
        <Reveal>
          <section className="mt-28 sm:mt-36">
            <div className="flex items-baseline justify-between">
              <h2 className="text-3xl font-bold tracking-tight">
                Selected work
              </h2>
              <Link
                href="/work"
                className="text-sm font-medium text-accent hover:underline underline-offset-4"
              >
                All projects →
              </Link>
            </div>
            <div className={`mt-6 grid ${gridCols} gap-5 max-w-xl`}>
              {featured.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        </Reveal>

        {/* Услуги: компактная версия трёх тарифов, полная — на /services */}
        <Reveal>
          <section className="mt-28 sm:mt-36">
            <div className="flex items-baseline justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Services</h2>
              <Link
                href="/services"
                className="text-sm font-medium text-accent hover:underline underline-offset-4"
              >
                Full details →
              </Link>
            </div>
            <div className="mt-6">
              <ServicesCarousel />
            </div>
          </section>
        </Reveal>

        {/* Как проходит заказ */}
        <Reveal>
          <section className="mt-28 sm:mt-36">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <div className="relative mt-12">
              {/* Линия процесса: вертикальная на мобильных, горизонтальная на десктопе */}
              <div
                aria-hidden
                className="absolute left-4 top-2 bottom-2 w-px bg-border lg:left-0 lg:right-0 lg:top-4 lg:bottom-auto lg:h-px lg:w-auto"
              />
              <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
                {steps.map((st, i) => (
                  <li key={st.title} className="relative pl-14 lg:pl-0">
                    <span className="absolute left-0 top-0 lg:relative lg:left-auto lg:top-auto inline-flex size-8 items-center justify-center rounded-full bg-accent text-white font-bold text-sm shadow-[0_4px_12px_rgba(37,99,235,0.35)] ring-4 ring-white">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-lg lg:mt-5">{st.title}</h3>
                    <p className="mt-1.5 text-sm text-muted leading-relaxed">
                      {st.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </Reveal>

        {/* Stack */}
        <Reveal>
          <section className="mt-28 sm:mt-36">
            <h2 className="text-3xl font-bold tracking-tight">Stack</h2>
            <p className="mt-3 text-lg text-muted leading-relaxed max-w-2xl">
              What I work with, grouped by where it lives.
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {skillGroups.map((g) => (
                <Link
                  key={g.label}
                  href="/work"
                  className={`group relative overflow-hidden rounded-3xl p-7 sm:p-8 min-h-52 flex flex-col text-white shadow-[0_12px_40px_rgba(37,99,235,0.18)] transition-transform duration-300 hover:-translate-y-1 ${
                    g.tone === "accent" ? "bg-accent" : "bg-[#1e3a8a]"
                  }`}
                >
                  <CardLines variant={g.pattern} />
                  <div className="relative z-10 flex h-full flex-col">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/40">
                      <g.Icon className="size-5" />
                    </span>
                    <div className="mt-auto flex items-end justify-between gap-4 pt-12">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                          {g.label}
                        </p>
                        <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold uppercase leading-tight">
                          {g.title}
                        </h3>
                      </div>
                      <span className="shrink-0 inline-flex size-11 items-center justify-center rounded-xl border border-white/40 group-hover:bg-white/15 transition-colors">
                        <ArrowRight className="size-5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Latest posts */}
        {posts.length > 0 && (
          <Reveal>
            <section className="mt-28 sm:mt-36">
              <div className="flex items-baseline justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Writing</h2>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-accent hover:underline underline-offset-4"
                >
                  All posts →
                </Link>
              </div>
              <ul className="mt-6 rounded-2xl border border-border bg-white divide-y divide-border overflow-hidden">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-baseline justify-between gap-4 px-6 py-4.5 group hover:bg-accent-soft/60 transition-colors"
                    >
                      <span className="font-medium text-fg group-hover:text-accent transition-colors">
                        {post.title}
                      </span>
                      <time className="text-sm text-muted shrink-0">
                        {formatDate(post.publishedAt)}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}

        {/* Socials */}
        <Reveal>
          <section className="mt-28 sm:mt-36 mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold tracking-tight">Elsewhere</h2>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-muted hover:text-accent transition-colors"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
