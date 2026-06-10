import { site, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24 bg-white/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
