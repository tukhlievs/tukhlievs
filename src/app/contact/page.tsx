import type { Metadata } from "next";
import { socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — Telegram is the fastest way.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
      <p className="mt-4 text-lg text-muted leading-relaxed">
        Telegram is the fastest way to reach me. I&apos;m open to interesting
        projects, collaborations and good questions.
      </p>

      <ul className="mt-10 rounded-2xl border border-border bg-white divide-y divide-border overflow-hidden shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_rgba(37,99,235,0.06)]">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-6 py-4 group hover:bg-accent-soft/60 transition-colors"
            >
              <span className="font-medium text-fg group-hover:text-accent transition-colors">
                {s.label}
              </span>
              <span className="text-sm text-muted truncate max-w-[55%] sm:max-w-none">
                {s.href.replace("https://", "")}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
