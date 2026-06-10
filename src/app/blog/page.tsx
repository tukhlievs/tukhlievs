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
    <div className="py-16 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-4 text-muted leading-relaxed max-w-prose">
        Short notes on what I&apos;m building and learning. Mostly written so
        future me remembers how things clicked.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted">Nothing here yet.</p>
      ) : (
        <ul className="mt-10 divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block py-5 group">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-medium text-fg group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <time className="text-sm text-muted shrink-0">
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
                {post.summary && (
                  <p className="mt-1.5 text-sm text-muted leading-relaxed">
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
