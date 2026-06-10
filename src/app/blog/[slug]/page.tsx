import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPost, getPosts, formatDate } from "@/lib/posts";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      <Link
        href="/blog"
        className="text-sm font-medium text-accent hover:underline underline-offset-4"
      >
        ← Blog
      </Link>

      <header className="mt-6">
        <h1 className="text-4xl font-bold tracking-tight text-balance">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted">
          <time>{formatDate(post.publishedAt)}</time>
          {post.tag && (
            <span className="text-xs font-medium text-accent bg-accent-soft rounded-full px-2.5 py-1">
              {post.tag}
            </span>
          )}
        </div>
      </header>

      <div className="prose-mini mt-10 text-fg/90">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
