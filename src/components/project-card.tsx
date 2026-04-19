import Link from "next/link";
import type { ProjectEntry } from "@/content/portfolio";

type ProjectCardProps = {
  project: ProjectEntry;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group border-t border-rule py-8 first:pt-0">
      <div className="grid gap-5 rounded-[1.75rem] px-1 py-2 transition-colors md:grid-cols-[1.15fr_2fr_auto] md:items-start md:px-4 group-hover:bg-white/70">
        <div>
          <p className="kicker">{project.eyebrow}</p>
          <h3 className="mt-3 section-cap text-[2rem] text-ink md:text-[2.35rem]">
            {project.title}
          </h3>
          <p className="byline mt-3 normal-case tracking-normal text-muted">
            {project.role} · {project.status}
          </p>
        </div>

        <div className="space-y-3">
          <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
            {project.summary}
          </p>
          <p className="text-sm leading-7 text-muted">{project.homeHook}</p>
          <p className="byline normal-case tracking-normal text-ink-soft">
            {project.stack.join(" · ")}
          </p>
        </div>

        <div className="flex items-start md:justify-end">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-rule bg-white/80 px-4 py-2 text-sm text-ink transition-colors hover:border-rust hover:text-rust"
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
