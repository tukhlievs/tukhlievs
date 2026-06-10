import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Short notes on building things and learning in public.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
      <p className="mt-4 text-lg text-muted leading-relaxed">
        Short notes on what I&apos;m building and learning. Mostly written so
        future me remembers how things clicked.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted">Nothing here yet.</p>
      ) : (
        <ul className="mt-10 space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border border-border bg-white p-6 group hover:border-accent/30 hover:shadow-[0_8px_24px_rgba(37,99,235,0.1)] transition-[box-shadow,border-color]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-lg font-semibold text-fg group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
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
      )}
    </div>
  );
}
