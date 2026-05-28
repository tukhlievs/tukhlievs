"use client";

import { ContactCard } from "./ContactCard";
import type { ContactPlatform, ThemeMode } from "@/types";

interface ContactCardsProps {
  readonly mode: ThemeMode;
}

const PLATFORMS: readonly ContactPlatform[] = [
  {
    id: "telegram",
    label: "Telegram",
    handle: "@tukhlievs",
    href: "https://t.me/tukhlievs",
    description: "Telegram · быстрая связь",
  },
  {
    id: "threads",
    label: "Threads",
    handle: "@tukhlie.v",
    href: "https://www.threads.net/@tukhlie.v",
    description: "Threads · короткие заметки",
  },
  {
    id: "github",
    label: "GitHub",
    handle: "@tukhlievs",
    href: "https://github.com/tukhlievs",
    description: "GitHub · код и проекты",
  },
];

const ACCENT: Record<ContactPlatform["id"], string> = {
  telegram: "#38bdf8",
  threads: "#e5e7eb",
  github: "#a78bfa",
};

const GLOW: Record<ContactPlatform["id"], string> = {
  telegram: "glow-tg",
  threads: "glow-th",
  github: "glow-gh",
};

export function ContactCards({ mode }: ContactCardsProps): JSX.Element {
  return (
    <section aria-label="Контакты" className="mt-14">
      <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
        / contacts
      </h2>
      <div className="flex flex-col gap-3.5">
        {PLATFORMS.map((p, i) => (
          <ContactCard
            key={p.id}
            platform={p}
            mode={mode}
            index={i}
            icon={renderIcon(p.id)}
            accent={ACCENT[p.id]}
            glowClass={GLOW[p.id]}
          />
        ))}
      </div>
    </section>
  );
}

function renderIcon(id: ContactPlatform["id"]): JSX.Element {
  switch (id) {
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <path
            fill="currentColor"
            d="M21.94 4.51 18.7 19.78c-.24 1.07-.88 1.34-1.78.83l-4.92-3.63-2.37 2.28c-.26.26-.48.48-.99.48l.35-5.02 9.12-8.24c.4-.35-.09-.55-.61-.2L6.21 12.91l-4.85-1.51c-1.05-.33-1.07-1.05.22-1.55L20.32 3.1c.88-.32 1.65.21 1.62 1.41Z"
          />
        </svg>
      );
    case "threads":
      return (
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <path
            fill="currentColor"
            d="M17.04 11.16c-.05-.02-.1-.04-.16-.07-.1-1.79-1.07-2.81-2.71-2.83-1.43 0-2.47.6-3.13 1.85l1.43.99c.49-.74 1.08-1.06 1.74-1.06.81.01 1.41.31 1.76.86.13.21.23.45.31.71-.69-.12-1.43-.16-2.22-.12-2.21.12-3.62 1.41-3.52 3.21.05.91.5 1.69 1.27 2.21.65.44 1.49.66 2.36.61 1.15-.06 2.05-.5 2.68-1.31.48-.61.78-1.4.92-2.4.55.33.96.78 1.19 1.32.39.92.41 2.41-.81 3.62-1.06 1.06-2.34 1.52-4.27 1.53-2.15-.02-3.77-.71-4.81-2.05C7.13 16.95 6.6 15.18 6.58 12.99 6.6 10.81 7.13 9.04 8.06 7.74c1.04-1.34 2.66-2.03 4.81-2.05 2.17.02 3.81.71 4.88 2.07.53.66.92 1.49 1.18 2.45l1.7-.45c-.31-1.19-.81-2.21-1.49-3.05C17.74 4.94 15.66 4 12.88 3.99H12.86c-2.77 0-4.84.94-6.16 2.78C5.5 8.38 4.84 10.48 4.83 13v.01c.01 2.52.67 4.62 1.87 6.23 1.32 1.85 3.39 2.78 6.16 2.78h.02c2.46-.02 4.2-.66 5.62-2.08 1.87-1.87 1.82-4.22 1.2-5.66-.45-1.04-1.3-1.88-2.47-2.42Zm-2.79 3.97c-.96.05-1.96-.38-2-1.32-.04-.7.49-1.48 2.06-1.57.18-.01.36-.01.53-.01.57 0 1.1.06 1.59.16-.18 2.27-1.25 2.69-2.18 2.74Z"
          />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <path
            fill="currentColor"
            d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.41.35.78 1.04.78 2.1v3.11c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"
          />
        </svg>
      );
  }
}
