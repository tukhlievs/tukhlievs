import type { Project } from "@/lib/projects";

const statusLabel: Record<Project["status"], string> = {
  active: "Active",
  shipped: "Shipped",
  experiment: "Experiment",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-fg/25">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-medium text-fg">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {project.title}
              <span aria-hidden className="inline-block ml-1 text-muted group-hover:text-accent transition-colors">
                ↗
              </span>
            </a>
          ) : (
            project.title
          )}
        </h3>
        <span className="text-xs text-muted shrink-0">
          {statusLabel[project.status]} · {project.year}
        </span>
      </div>

      <p className="mt-2 text-sm text-muted leading-relaxed">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <li
            key={t}
            className="text-xs text-muted border border-border rounded-md px-2 py-0.5"
          >
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}
