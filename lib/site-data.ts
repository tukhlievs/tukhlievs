export const siteData = {
  name: "Abubakir Tukhliev",
  handle: "tukhlievs",
  location: "Kokand, Uzbekistan",
  age: 16,
  shortBio:
    "16-year-old developer from Kokand. Learning Python and exploring the AI space — working toward ML engineering.",
  longBio:
    "I'm 16, based in Kokand, Uzbekistan. My focus is Python and AI — building intuition for how systems learn from data. Currently studying ML fundamentals while shipping small projects on weekends. Goal: Junior ML/AI Engineer.",
  taglines: [
    "Python Developer",
    "AI Learner",
    "Future ML Engineer",
    "Building in Uzbekistan",
  ],
  skills: ["Python", "AI", "Machine Learning", "Deep Learning"],
  socials: [
    {
      id: "telegram",
      label: "Telegram",
      description: "Most active here",
      handle: "@tukhlievs",
      url: "https://t.me/tukhlievs",
      primary: true,
    },
    {
      id: "github",
      label: "GitHub",
      description: "Code & projects",
      handle: "tukhlievs",
      url: "https://github.com/tukhlievs",
      primary: true,
    },
    {
      id: "threads",
      label: "Threads",
      description: "Active here too",
      handle: "@tukhlie.v",
      url: "https://www.threads.com/@tukhlie.v",
      primary: false,
    },
    {
      id: "x",
      label: "X",
      description: "Thoughts & updates",
      handle: "@tukhlievs",
      url: "https://x.com/tukhlievs",
      primary: false,
    },
    {
      id: "substack",
      label: "Substack",
      description: "Writing",
      handle: "tkhv",
      url: "https://open.substack.com/pub/tkhv",
      primary: false,
    },
  ],
} as const;
