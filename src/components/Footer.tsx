import { site, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-fg transition-colors"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
