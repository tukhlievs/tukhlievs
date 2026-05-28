// Single source of truth — parsed from github.com/tukhlievs/tukhlievs README.md

export type Social = {
  name: string;
  handle: string;
  href: string;
  note?: string;
  icon: "telegram" | "github" | "threads" | "x" | "substack";
};

export const site = {
  name: "Abubakir Tukhliev",
  firstName: "Abubakir",
  handle: "tukhlievs",
  greeting: "Salam",
  age: 16,
  location: "Kokand, Uzbekistan",
  locationShort: "Kokand, UZ",
  timeZone: "Asia/Tashkent",
  goal: "Fullstack Software Engineer",

  // Rotating display roles (animated text)
  roles: [
    "Python developer",
    "AI tinkerer",
    "future fullstack engineer",
    "building from Uzbekistan",
  ],

  // Short about — first person, drawn from the README
  bio: "A 16-year-old developer from Kokand, Uzbekistan. I spend my free time learning Python and AI, and I'm working toward becoming a Fullstack Software Engineer.",

  // The stuff I work with
  stack: {
    ai: ["Claude", "DeepSeek", "Gemini", "Hugging Face"],
    tools: ["Git", "GitHub", "Linux", "GCP", "Docker", "AWS"],
  },

  // Quick links to socials — order = priority. Telegram first (most active).
  socials: [
    {
      name: "Telegram",
      handle: "@tukhlievs",
      href: "https://t.me/tukhlievs",
      note: "most active here",
      icon: "telegram",
    },
    {
      name: "GitHub",
      handle: "@tukhlievs",
      href: "https://github.com/tukhlievs",
      icon: "github",
    },
    {
      name: "Threads",
      handle: "@tukhlie.v",
      href: "https://www.threads.com/@tukhlie.v",
      note: "active here",
      icon: "threads",
    },
    {
      name: "X",
      handle: "@tukhlievs",
      href: "https://x.com/tukhlievs",
      icon: "x",
    },
    {
      name: "Substack",
      handle: "/tkhv",
      href: "https://open.substack.com/pub/tkhv",
      icon: "substack",
    },
  ] as Social[],

  avatar: "https://github.com/tukhlievs.png",
} as const;
