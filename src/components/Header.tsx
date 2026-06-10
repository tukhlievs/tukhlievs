"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/75 border-b border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold tracking-tight text-lg text-fg hover:text-accent transition-colors"
        >
          tukhlievs
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="flex items-center gap-0.5 sm:gap-1 text-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "text-accent font-semibold bg-accent-soft"
                    : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href="https://t.me/tukhlievs"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center rounded-full bg-accent text-white px-4 py-1.5 text-sm font-semibold shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)] hover:-translate-y-px transition-all"
          >
            Let&apos;s talk
          </a>
        </div>
      </div>
    </header>
  );
}
