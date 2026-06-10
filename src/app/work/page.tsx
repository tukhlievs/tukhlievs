import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ActivityGraph } from "@/components/ActivityGraph";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects and commit activity: minisound — a Telegram music Mini App with a private CDN.",
};

export default function WorkPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight">Work</h1>
      <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
        Things I&apos;ve built and shipped — serverless on Cloudflare, data in
        Supabase, distribution through Telegram.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">Activity</h2>
        <p className="mt-2 text-sm text-muted">
          Commits across all public repositories, refreshed on every deploy.
        </p>
        <div className="mt-6">
          <ActivityGraph />
        </div>
      </section>
    </div>
  );
}
