import { basePath } from "@/lib/site";
import type { Project } from "@/lib/projects";
import { TiltCard } from "./TiltCard";

export function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <article className="group relative h-full min-h-36 rounded-2xl border border-border bg-card overflow-hidden shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_rgba(37,99,235,0.06)] hover:shadow-[0_2px_4px_rgba(11,18,32,0.05),0_16px_40px_rgba(37,99,235,0.12)] hover:border-accent/30 transition-[box-shadow,border-color]">
      {/* Полупрозрачный скриншот, мягко вырезанный маской справа */}
      {project.screenshot && (
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-2/5 opacity-55 group-hover:opacity-75 transition-opacity"
          style={{
            backgroundImage: `url(${basePath}${project.screenshot})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            maskImage:
              "linear-gradient(to left, rgba(0,0,0,1) 45%, rgba(0,0,0,0))",
            WebkitMaskImage:
              "linear-gradient(to left, rgba(0,0,0,1) 45%, rgba(0,0,0,0))",
          }}
        />
      )}

      <div className="relative z-10 p-5 pr-[38%]">
        <h3 className="font-semibold text-fg group-hover:text-accent transition-colors">
          {project.title}
          {project.link && (
            <span aria-hidden className="ml-1 text-muted group-hover:text-accent transition-colors">
              ↗
            </span>
          )}
        </h3>
        <p className="mt-1.5 text-sm text-muted leading-relaxed">
          {project.summary}
        </p>
        <p className="mt-3 text-xs text-muted/80">
          {project.tech.slice(0, 3).join(" · ")}
        </p>
      </div>
    </article>
  );

  return (
    <TiltCard className="h-full">
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </TiltCard>
  );
}
