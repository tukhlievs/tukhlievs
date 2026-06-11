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
  { label: "Services", href: "/services" },
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

// Навыки с фирменными цветами технологий — для карточек на главной.
// color используется в волнистой линии, точке и подсветке рамки на ховере.
export type Skill = { name: string; category: string; color: string };

export const skills: Skill[] = [
  { name: "TypeScript", category: "Language", color: "#3178C6" },
  { name: "React", category: "Library", color: "#22A7D0" },
  { name: "Next.js", category: "Framework", color: "#0B1220" },
  { name: "Cloudflare Workers", category: "Platform", color: "#F38020" },
  { name: "Supabase", category: "Platform", color: "#3ECF8E" },
  { name: "PostgreSQL", category: "Database", color: "#336791" },
  { name: "Python", category: "Language", color: "#3776AB" },
  { name: "Pyrogram", category: "Library", color: "#229ED9" },
  { name: "Tailwind CSS", category: "Styling", color: "#06B6D4" },
  { name: "Git / Linux / Docker", category: "Tooling", color: "#2496ED" },
];
