"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { nav } from "@/lib/site";

type Pos = { left: number; width: number; opacity: number };

export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Позиция скользящей пилюли за курсором (десктоп)
  const [pos, setPos] = useState<Pos>({ left: 0, width: 0, opacity: 0 });

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/75 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="shrink-0 font-display font-bold tracking-tight text-base sm:text-lg text-fg hover:text-accent transition-colors"
        >
          tukhlievs
        </Link>

        {/* Десктоп: анимированная пилюля-навигация в цветах бренда */}
        <ul
          onMouseLeave={() => setPos((p) => ({ ...p, opacity: 0 }))}
          className="relative hidden lg:flex items-center rounded-full border border-border bg-white/60 p-1"
        >
          {nav.map((item) => (
            <PillTab
              key={item.href}
              href={item.href}
              active={isActive(item.href)}
              setPos={setPos}
            >
              {item.label}
            </PillTab>
          ))}
          <motion.li
            aria-hidden
            animate={pos}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="absolute z-0 top-1 h-8 rounded-full bg-accent-soft"
          />
        </ul>

        {/* Мобильные: компактные статичные ссылки, без пилюли и анимаций */}
        <nav className="flex lg:hidden items-center gap-0.5 text-sm whitespace-nowrap">
          {nav
            .filter((i) => i.href !== "/" && i.href !== "/about")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-1.5 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "text-accent font-semibold bg-accent-soft"
                    : "text-muted"
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
          className="hidden lg:inline-flex items-center rounded-full bg-accent text-white px-4 py-1.5 text-sm font-semibold shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)] hover:-translate-y-px transition-all"
        >
          Let&apos;s talk
        </a>
      </div>
    </header>
  );
}

function PillTab({
  href,
  active,
  setPos,
  children,
}: {
  href: string;
  active: boolean;
  setPos: (p: Pos) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPos({ left: ref.current.offsetLeft, width, opacity: 1 });
      }}
      className="relative z-10"
    >
      <Link
        href={href}
        className={`block px-4 py-1.5 rounded-full transition-colors ${
          active
            ? "text-accent font-semibold"
            : "text-muted hover:text-fg"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
