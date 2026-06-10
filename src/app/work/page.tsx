import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects: minisound (Telegram music Mini App with a private CDN), AI news bots, experiments.",
};

const shots = [
  {
    src: "/projects/minisound/home.webp",
    alt: "minisound — library screen with recently added tracks and full track list",
    caption: "Library",
  },
  {
    src: "/projects/minisound/player.webp",
    alt: "minisound — full-screen player with cover art, progress bar and controls",
    caption: "Player",
  },
  {
    src: "/projects/minisound/playing.webp",
    alt: "minisound — mini player docked above the bottom navigation while browsing",
    caption: "Now playing",
  },
];

const facts = [
  {
    title: "Telegram channel as storage",
    text: "Tracks and cover art live in a private Telegram channel. A grammY bot parses every upload and syncs metadata to Supabase — no file server, no S3 bucket, no upload pipeline to maintain.",
  },
  {
    title: "Streaming proxy on Cloudflare Workers",
    text: "The player never talks to Telegram directly. A Worker fetches audio bytes and streams them through, passing Range headers so seeking is instant — and the bot token never reaches the client.",
  },
  {
    title: "Edge caching with KV",
    text: "Telegram file paths are cached in Workers KV, so repeated plays and seeks don't burn getFile calls. Thumbnails are cached immutable at the edge for a year.",
  },
  {
    title: "Deletion sync without webhooks",
    text: "Telegram sends no event when a channel post is deleted. An hourly cron probes stored messages and removes orphaned tracks from Supabase, so the library never shows dead entries.",
  },
];

export default function WorkPage() {
  const rest = projects.filter((p) => p.slug !== "minisound");

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight">Work</h1>
      <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
        Things I&apos;ve built and shipped. Most run serverless on Cloudflare,
        store data in Supabase, and live inside Telegram.
      </p>

      {/* Featured: minisound */}
      <section className="mt-12 rounded-3xl border border-border bg-white shadow-[0_1px_2px_rgba(11,18,32,0.04),0_12px_32px_rgba(37,99,235,0.07)] overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              minisound
            </h2>
            <span className="text-xs font-medium text-accent bg-accent-soft rounded-full px-2.5 py-1">
              Active · 2026
            </span>
          </div>

          <p className="mt-4 text-muted leading-relaxed max-w-3xl">
            A music streaming platform that lives entirely inside Telegram —
            search the library, hit play, and audio streams instantly into a
            custom player. No accounts, no app store, no servers to babysit.
            Under the hood it&apos;s an exercise in using managed platforms as
            infrastructure: Telegram is the CDN, Cloudflare is the compute,
            Supabase is the database.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {facts.map((f) => (
              <div key={f.title}>
                <h3 className="font-semibold text-fg">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">
                  {f.text}
                </p>
              </div>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-1.5">
            {[
              "TypeScript",
              "Cloudflare Workers",
              "Workers KV",
              "Supabase",
              "Telegram Bot API",
              "grammY",
              "Next.js",
              "Tailwind CSS",
            ].map((t) => (
              <li
                key={t}
                className="text-xs text-muted border border-border rounded-md px-2 py-0.5 bg-white"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://minisound.abutukhliev.workers.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-accent text-white px-5 py-2.5 text-sm font-semibold shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 transition-all"
            >
              Open web app ↗
            </a>
            <a
              href="https://t.me/minisound"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-fg hover:border-accent/40 hover:text-accent transition-colors"
            >
              Open in Telegram ↗
            </a>
          </div>
        </div>

        {/* Screenshots */}
        <div className="border-t border-border bg-accent-soft/40 px-6 sm:px-10 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {shots.map((s) => (
              <figure key={s.src} className="text-center">
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={390}
                  height={844}
                  className="rounded-2xl border border-border shadow-[0_8px_24px_rgba(11,18,32,0.12)] w-full h-auto"
                />
                <figcaption className="mt-3 text-xs font-medium text-muted">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Other projects */}
      <h2 className="mt-16 text-2xl font-bold tracking-tight">
        More projects
      </h2>
      <div className="mt-6 grid sm:grid-cols-2 gap-5">
        {rest.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
