import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Abubakir",
  lastName: "Tukhliev",
  name: `Abubakir Tukhliev`,
  role: "Python & AI Developer",
  avatar: "https://github.com/tukhlievs.png",
  email: "",
  location: "Asia/Tashkent", // IANA time zone — drives the clock in the header
  languages: ["Uzbek", "Russian", "English"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>I write about learning to code, Python, and AI.</>,
};

const social: Social = [
  {
    name: "Telegram",
    icon: "telegram",
    link: "https://t.me/tukhlievs",
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/tukhlievs",
    essential: true,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@tukhlie.v",
    essential: true,
  },
  {
    name: "X",
    icon: "x",
    link: "https://x.com/tukhlievs",
    essential: true,
  },
  {
    name: "Substack",
    icon: "substack",
    link: "https://open.substack.com/pub/tkhv",
    essential: false,
  },
];

const home: Home = {
  path: "/",
  image: "https://github.com/tukhlievs.png",
  label: "Home",
  title: `${person.name} — Python & AI`,
  description: `Personal site and blog of ${person.name}, a 16-year-old developer from Uzbekistan learning Python and AI.`,
  headline: <>Salam — I'm Abubakir</>,
  featured: {
    display: false,
    title: <></>,
    href: "",
  },
  subline: (
    <>
      A 16-year-old developer from Kokand, Uzbekistan. I spend my free time learning{" "}
      <Text as="span" weight="strong">
        Python
      </Text>{" "}
      and{" "}
      <Text as="span" weight="strong">
        AI
      </Text>
      , and writing about what I figure out along the way.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, a developer from Kokand, Uzbekistan.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm Abubakir, a 16-year-old developer from Kokand, Uzbekistan. I'm teaching myself Python
        and the foundations of AI in my free time, following a roadmap I keep and improve as I go.
        I prefer understanding things deeply over rushing, and I use this site to share what I learn.
      </>
    ),
  },
  work: {
    display: false,
    title: "Work Experience",
    experiences: [],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "School — Kokand, Uzbekistan",
        description: <>High-school student, balancing classes and a job with coding in parallel.</>,
      },
      {
        name: "Self-taught",
        description: (
          <>Learning Python and AI/ML fundamentals from a personal roadmap, one project at a time.</>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "What I work with",
    skills: [
      {
        title: "Python",
        description: (
          <>
            My main language. Building strong fundamentals, writing small projects, and getting
            comfortable with the standard library.
          </>
        ),
        tags: [{ name: "Python", icon: "python" }],
        images: [],
      },
      {
        title: "Tooling",
        description: <>The everyday tools I use to build, version, and run things.</>,
        tags: [
          { name: "Git", icon: "git" },
          { name: "GitHub", icon: "github" },
          { name: "Linux", icon: "linux" },
          { name: "Docker", icon: "docker" },
        ],
        images: [],
      },
      {
        title: "Cloud",
        description: <>Getting familiar with the major cloud platforms.</>,
        tags: [
          { name: "GCP", icon: "googlecloud" },
          { name: "AWS", icon: "aws" },
        ],
        images: [],
      },
      {
        title: "AI",
        description: (
          <>
            I work with modern AI tools every day — Claude, DeepSeek, Gemini, and Hugging Face — to
            learn faster and to build.
          </>
        ),
        tags: [],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Notes on learning to code",
  description: `Read what ${person.name} has been working on and thinking about.`,
  // Create new blog posts by adding a new .mdx file to src/app/blog/posts
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to src/app/work/projects
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
