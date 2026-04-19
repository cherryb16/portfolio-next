import type { ProjectEntry } from "@/content/portfolio";
import { ProjectLinks } from "@/components/project-links";
import { ProjectSections } from "@/components/project-sections";

type StandardProjectPageProps = {
  project: ProjectEntry;
};

export function StandardProjectPage({ project }: StandardProjectPageProps) {
  return (
    <article className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 md:py-16">
      <header className="grid gap-8 border-b border-rule pb-10 md:grid-cols-[1.8fr_1fr] md:items-end">
        <div>
          <p className="kicker">{project.eyebrow}</p>
          <h1 className="headline mt-5 text-[clamp(2.6rem,7vw,5.2rem)] font-semibold">
            {project.heroTitle}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft">
            {project.heroSummary}
          </p>
        </div>

        <aside className="space-y-5 md:border-l md:border-rule md:pl-8">
          <div>
            <p className="byline">Role</p>
            <p className="mt-2 font-display text-xl">{project.role}</p>
          </div>
          <div>
            <p className="byline">Impact</p>
            <p className="mt-2 leading-7 text-ink-soft">{project.impact}</p>
          </div>
          <div>
            <p className="byline">Stack</p>
            <p className="mt-2 leading-7 text-ink-soft">{project.stack.join(" · ")}</p>
          </div>
        </aside>
      </header>

      <section className="mt-10 grid gap-5 border-b border-rule py-8 md:grid-cols-3">
        {project.metrics.map((metric) => (
          <article
            key={metric.label}
            className="border-l border-rule pl-5 first:border-l-0 first:pl-0"
          >
            <p className="font-display text-4xl leading-none text-rust">{metric.value}</p>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{metric.label}</p>
            {metric.detail ? (
              <p className="byline mt-3 normal-case tracking-normal text-muted">
                {metric.detail}
              </p>
            ) : null}
          </article>
        ))}
      </section>

      <ProjectSections sections={project.sections} />

      <section className="mt-10">
        <p className="kicker mb-4">Links</p>
        <ProjectLinks links={project.links} />
      </section>
    </article>
  );
}
