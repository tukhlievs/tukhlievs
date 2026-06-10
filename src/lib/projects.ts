export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  description: string;
  tech: string[];
  link?: string;
  screenshot?: string;
  status: "active" | "shipped" | "experiment";
};

export const projects: Project[] = [
  {
    slug: "minisound",
    title: "minisound",
    year: "2026",
    summary: "Telegram music Mini App with a private CDN.",
    description:
      "Music streaming inside Telegram — a private channel as storage, a Cloudflare Worker as the streaming proxy, Supabase for metadata.",
    tech: ["TypeScript", "Cloudflare Workers", "Supabase", "Telegram Bot API"],
    link: "https://minisound.abutukhliev.workers.dev",
    screenshot: "/projects/minisound/home.webp",
    status: "active",
  },
];
