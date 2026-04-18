import Link from "next/link";
import type { ProjectEntry } from "@/content/portfolio";

type ProjectCardProps = {
  project: ProjectEntry;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group border-t border-rule py-7 first:pt-0">
      <div className="grid gap-4 md:grid-cols-[1.2fr_2fr_auto] md:items-start">
        <div>
          <p className="kicker">{project.eyebrow}</p>
          <h3 className="mt-3 font-display text-3xl tracking-tight text-ink">
            {project.title}
          </h3>
          <p className="byline mt-2 normal-case tracking-normal text-muted">
            {project.role} · {project.status}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-lg leading-relaxed text-ink-soft">
            {project.summary}
          </p>
          <p className="text-sm leading-relaxed text-muted">{project.homeHook}</p>
          <p className="byline normal-case tracking-normal text-ink-soft">
            {project.stack.join(" · ")}
          </p>
        </div>

        <div className="flex items-start md:justify-end">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 border-b border-ink pb-1 text-sm text-ink transition-colors hover:border-rust hover:text-rust"
          >
            Open project
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
