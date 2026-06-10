import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects: minisound (Telegram music Mini App), AI news bots, experiments.",
};

export default function WorkPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight">Work</h1>
      <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
        Things I&apos;ve built and shipped. Most run serverless on Cloudflare,
        store data in Supabase, and live inside Telegram.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
