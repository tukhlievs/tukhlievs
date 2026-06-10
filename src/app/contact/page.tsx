import type { Metadata } from "next";
import { socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — Telegram is the fastest way.",
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 text-muted leading-relaxed max-w-prose">
        Telegram is the fastest way to reach me. I&apos;m open to interesting
        projects, collaborations and good questions.
      </p>

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-4 group"
            >
              <span className="text-fg group-hover:text-accent transition-colors">
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
