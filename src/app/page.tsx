import Link from "next/link";
import { site, socials, stack } from "@/lib/site";
import { projects } from "@/lib/projects";
import { getPosts, formatDate } from "@/lib/posts";
import { ProjectCard } from "@/components/ProjectCard";

export default function HomePage() {
  const posts = getPosts().slice(0, 3);
  const featured = projects.slice(0, 2);

  return (
    <div className="py-16 sm:py-24">
      {/* Hero */}
      <section>
        <p className="text-sm text-muted">{site.location}</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
          {site.name} — Fullstack Developer
        </h1>
        <p className="mt-4 text-muted leading-relaxed max-w-prose">
          Building resilient Telegram Mini Apps, bots and SaaS in the
          Cloudflare + Supabase ecosystem. Focused on music streaming{" "}
          <a
            href="https://t.me/minisound"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
          >
            (minisound)
          </a>{" "}
          and practical products.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/work"
            className="inline-flex items-center rounded-lg bg-fg text-bg px-4 py-2 text-sm font-medium hover:opacity-85 transition-opacity"
          >
            View work
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm text-fg hover:border-fg/30 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
            Selected work
          </h2>
          <Link href="/work" className="text-sm text-muted hover:text-fg transition-colors">
            All projects →
          </Link>
        </div>
        <div className="mt-5 grid gap-4">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="mt-20">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
          Stack
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {stack.map((item) => (
            <li
              key={item}
              className="text-sm text-fg/80 border border-border rounded-lg px-3 py-1.5"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Latest posts */}
      {posts.length > 0 && (
        <section className="mt-20">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
              Writing
            </h2>
            <Link href="/blog" className="text-sm text-muted hover:text-fg transition-colors">
              All posts →
            </Link>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-baseline justify-between gap-4 py-3.5 group"
                >
                  <span className="text-fg group-hover:text-accent transition-colors">
                    {post.title}
                  </span>
                  <time className="text-sm text-muted shrink-0">
                    {formatDate(post.publishedAt)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Socials */}
      <section className="mt-20">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
          Elsewhere
        </h2>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-fg transition-colors"
              >
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
