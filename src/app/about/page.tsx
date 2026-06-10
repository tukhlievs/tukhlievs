import type { Metadata } from "next";
import { stack } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fullstack developer from Kokand, Uzbekistan. Building products end to end.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight">About</h1>

      <div className="mt-8 space-y-5 text-muted leading-relaxed">
        <p>
          I&apos;m Abubakir Tukhliev, a fullstack developer from Kokand,
          Uzbekistan. I build products end to end — web apps, bots, APIs,
          automation — picking whatever stack the problem actually needs,
          from the database up to the interface.
        </p>
        <p>
          One shipped example is{" "}
          <a
            href="https://t.me/minisound"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
          >
            minisound
          </a>
          , a music streaming app living inside Telegram. It taught me more
          about HTTP, caching and API design than any course could — and then
          I moved on to the next thing.
        </p>
        <p>
          I care about resilient systems: things that keep working without a
          server to babysit, fail loudly when they break, and stay simple
          enough to fix in one sitting. Depth over speed.
        </p>
        <p>
          Right now I&apos;m deepening my Python and working toward ML/AI
          engineering — one concept at a time, with projects on weekends.
        </p>
      </div>

      <section className="mt-14">
        <h2 className="text-xl font-bold tracking-tight">
          Technologies I use
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {stack.map((item) => (
            <li
              key={item}
              className="text-sm font-medium text-fg/80 border border-border bg-white rounded-full px-4 py-2"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-bold tracking-tight">Now</h2>
        <ul className="mt-5 space-y-2 text-muted text-sm leading-relaxed">
          <li>— Shipping minisound improvements</li>
          <li>— Python fundamentals → ML/AI engineering roadmap</li>
          <li>— Writing short notes about what finally clicked</li>
        </ul>
      </section>
    </div>
  );
}
