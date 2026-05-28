"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteData } from "@/lib/site-data";

export function SiteNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border/30 backdrop-blur-md bg-background/60"
    >
      <Link
        href="/"
        className="text-xs font-mono text-muted-foreground tracking-[0.15em] uppercase hover:text-foreground transition-colors"
      >
        {siteData.handle}
      </Link>

      <div className="flex items-center gap-6">
        <a
          href="#about"
          className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors tracking-wider uppercase"
        >
          about
        </a>
        <a
          href="#connect"
          className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors tracking-wider uppercase"
        >
          connect
        </a>
        <a
          href={`https://github.com/${siteData.handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors tracking-wider uppercase"
        >
          github ↗
        </a>
      </div>
    </motion.nav>
  );
}
