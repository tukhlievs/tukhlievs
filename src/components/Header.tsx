"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-bg/80 border-b border-border">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-tight text-fg hover:text-accent transition-colors"
        >
          tukhlievs
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex items-center gap-0.5 sm:gap-1 text-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-fg font-medium"
                    : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
