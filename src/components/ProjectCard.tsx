import type { Project } from "@/lib/projects";
import { TiltCard } from "./TiltCard";

const statusLabel: Record<Project["status"], string> = {
  active: "Active",
  shipped: "Shipped",
  experiment: "Experiment",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard className="h-full">
      <article className="group h-full rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_rgba(37,99,235,0.06)] hover:shadow-[0_2px_4px_rgba(11,18,32,0.05),0_16px_40px_rgba(37,99,235,0.12)] hover:border-accent/30 transition-[box-shadow,border-color]">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold text-fg">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {project.title}
                <span
                  aria-hidden
                  className="inline-block ml-1 text-muted group-hover:text-accent transition-colors"
                >
                  ↗
                </span>
              </a>
            ) : (
              project.title
            )}
          </h3>
          <span className="text-xs font-medium text-accent bg-accent-soft rounded-full px-2.5 py-1 shrink-0">
            {statusLabel[project.status]} · {project.year}
          </span>
        </div>

        <p className="mt-3 text-sm text-muted leading-relaxed">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="text-xs text-muted border border-border rounded-md px-2 py-0.5 bg-white"
            >
              {t}
            </li>
          ))}
        </ul>
      </article>
    </TiltCard>
  );
}
