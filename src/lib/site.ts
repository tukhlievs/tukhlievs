// Должен совпадать с basePath в next.config.mjs.
// next/image в static export не префиксует src, поэтому пути к
// статике из public/ собираем через эту константу.
export const basePath = "/tukhlievs";

export const site = {
  name: "Abubakir Tukhliev",
  handle: "tukhlievs",
  url: "https://tukhlievs.github.io/tukhlievs",
  title: "Abubakir Tukhliev — Fullstack Developer",
  description:
    "Fullstack developer building resilient products end to end — web apps, bots, APIs and automation. Always shipping something new.",
  location: "Kokand, Uzbekistan",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const socials = [
  { label: "Telegram", href: "https://t.me/tukhlievs" },
  { label: "X", href: "https://x.com/tukhlievs" },
  { label: "Threads", href: "https://www.threads.com/@tukhlie.v" },
  { label: "Substack", href: "https://open.substack.com/pub/tkhv" },
  { label: "GitHub", href: "https://github.com/tukhlievs" },
] as const;

export const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Cloudflare Workers",
  "Supabase",
  "PostgreSQL",
  "Python",
  "Pyrogram",
  "Tailwind CSS",
  "Git / Linux / Docker",
] as const;
