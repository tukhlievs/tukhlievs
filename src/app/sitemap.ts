import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/work", "/services", "/blog", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const posts = getPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
  }));

  return [...pages, ...posts];
}
