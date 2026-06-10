import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, formatDate } from "@/lib/posts";
import { getTgPosts, splitPost, tgChannel } from "@/lib/telegram";
import { basePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on building things — plus the live feed from my Telegram channel.",
};

// Telegram-HTML ограничен тегами b/i/a (см. scripts/fetch-telegram.mjs),
// поэтому dangerouslySetInnerHTML здесь безопасен.
function TgBody({ html }: { html: string }) {
  return (
    <div
      className="mt-2 text-sm text-muted leading-relaxed whitespace-pre-line [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 line-clamp-6"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function BlogPage() {
  const posts = getPosts();
  const tg = getTgPosts();

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
      <p className="mt-4 text-lg text-muted leading-relaxed">
        Longer write-ups below — and the live feed from{" "}
        <a
          href={`https://t.me/${tgChannel}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
        >
          @{tgChannel}
        </a>
        , my Telegram channel, updated on every deploy.
      </p>

      {/* Длинные MDX-посты */}
      {posts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
            Write-ups
          </h2>
          <ul className="mt-4 space-y-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-2xl border border-border bg-white p-6 group hover:border-accent/30 hover:shadow-[0_8px_24px_rgba(37,99,235,0.1)] transition-[box-shadow,border-color]"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-semibold text-fg group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <time className="text-sm text-muted shrink-0">
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                  {post.summary && (
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {post.summary}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Лента Telegram */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
            From the channel
          </h2>
          <a
            href={`https://t.me/${tgChannel}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline underline-offset-4"
          >
            Open @{tgChannel} →
          </a>
        </div>

        {tg.length === 0 ? (
          <p className="mt-4 text-muted text-sm">
            Feed is empty right now — check the channel directly.
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {tg.map((post) => {
              const { title, body } = splitPost(post.html);
              return (
                <li key={post.id}>
                  <article className="rounded-2xl border border-border bg-white overflow-hidden shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_rgba(37,99,235,0.06)]">
                    {post.image && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={`${basePath}${post.image}`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="w-full max-h-80 object-cover border-b border-border"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-semibold text-fg leading-snug">
                          {title}
                        </h3>
                        <time className="text-xs text-muted shrink-0">
                          {formatDate(post.date)}
                        </time>
                      </div>
                      {body && <TgBody html={body} />}
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm font-medium text-accent hover:underline underline-offset-4"
                      >
                        Open in Telegram →
                      </a>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
