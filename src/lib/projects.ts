export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  description: string;
  tech: string[];
  link?: string;
  status: "active" | "shipped" | "experiment";
};

export const projects: Project[] = [
  {
    slug: "minisound",
    title: "minisound",
    year: "2026",
    summary: "Telegram music Mini App with a private CDN.",
    description:
      "A music streaming platform that lives entirely inside Telegram. A private channel acts as storage, a Cloudflare Worker proxies audio bytes with Range support so the bot token never leaks to the client, and metadata syncs to Supabase. Custom audio player, instant seeking, zero servers to maintain.",
    tech: ["TypeScript", "Cloudflare Workers", "Supabase", "Telegram Bot API", "Next.js"],
    link: "https://t.me/minisound",
    status: "active",
  },
  {
    slug: "ai-news-bots",
    title: "AI news bots",
    year: "2025",
    summary: "Bots that collect, summarize and deliver AI news to Telegram.",
    description:
      "A set of Telegram bots that watch sources, deduplicate stories and post short digests to channels. Built to learn pipelines: fetching, parsing, summarization and scheduled delivery on serverless cron.",
    tech: ["Python", "Pyrogram", "Cloudflare Workers"],
    status: "shipped",
  },
  {
    slug: "experiments",
    title: "Experiments",
    year: "ongoing",
    summary: "Small tools and prototypes on the way to ML/AI engineering.",
    description:
      "Throwaway-but-instructive builds: scrapers, automation scripts, tiny SaaS prototypes. Each one exists to make a concept stick — depth over speed.",
    tech: ["Python", "TypeScript"],
    status: "experiment",
  },
];
