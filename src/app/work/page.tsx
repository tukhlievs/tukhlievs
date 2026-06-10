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
    <div className="py-16 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Work</h1>
      <p className="mt-4 text-muted leading-relaxed max-w-prose">
        Things I&apos;ve built and shipped. Most run serverless on Cloudflare,
        store data in Supabase, and live inside Telegram.
      </p>

      <div className="mt-10 grid gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
