import Link from "next/link";
import { site, socials, stack } from "@/lib/site";
import { projects } from "@/lib/projects";
import { getPosts, formatDate } from "@/lib/posts";
import { ProjectCard } from "@/components/ProjectCard";
import { Hero3D } from "@/components/Hero3D";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  const posts = getPosts().slice(0, 3);
  const featured = projects.slice(0, 2);

  return (
    <div>
      {/* Hero: крупный заголовок слева, Three.js сцена справа */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="relative z-10">
            <p className="fade-up inline-flex items-center gap-2 text-sm font-medium text-accent bg-accent-soft border border-accent/15 rounded-full px-3.5 py-1.5">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              {site.location} · open to projects
            </p>
            <h1 className="fade-up d1 mt-6 text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
              Abubakir Tukhliev —{" "}
              <span className="text-gradient">Fullstack Developer</span>
            </h1>
            <p className="fade-up d2 mt-6 text-lg text-muted leading-relaxed max-w-xl">
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
            <div className="fade-up d3 mt-8 flex flex-wrap gap-3">
              <Link
                href="/work"
                className="inline-flex items-center rounded-full bg-accent text-white px-6 py-3 text-sm font-semibold shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 transition-all"
              >
                View work
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-fg hover:border-accent/40 hover:text-accent transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>

          {/* 3D-сцена; на мобильных скрыта, чтобы не грузить WebGL */}
          <div className="relative hidden lg:block h-[460px]">
            <Hero3D />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Featured projects */}
        <Reveal>
          <section className="mt-8">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-bold tracking-tight">
                Selected work
              </h2>
              <Link
                href="/work"
                className="text-sm font-medium text-accent hover:underline underline-offset-4"
              >
                All projects →
              </Link>
            </div>
            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              {featured.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        </Reveal>

        {/* Stack */}
        <Reveal>
          <section className="mt-24">
            <h2 className="text-2xl font-bold tracking-tight">Stack</h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {stack.map((item) => (
                <li
                  key={item}
                  className="text-sm font-medium text-fg/80 border border-border bg-white rounded-full px-4 py-2 hover:border-accent/40 hover:text-accent transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Latest posts */}
        {posts.length > 0 && (
          <Reveal>
            <section className="mt-24">
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Writing</h2>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-accent hover:underline underline-offset-4"
                >
                  All posts →
                </Link>
              </div>
              <ul className="mt-6 rounded-2xl border border-border bg-white divide-y divide-border overflow-hidden">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-baseline justify-between gap-4 px-6 py-4.5 group hover:bg-accent-soft/60 transition-colors"
                    >
                      <span className="font-medium text-fg group-hover:text-accent transition-colors">
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
          </Reveal>
        )}

        {/* Socials */}
        <Reveal>
          <section className="mt-24 mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Elsewhere</h2>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-muted hover:text-accent transition-colors"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
