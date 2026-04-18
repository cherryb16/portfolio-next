import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { ProjectLinks } from "@/components/project-links";
import {
  capabilityBuckets,
  experience,
  getFeaturedProjects,
  heroMetrics,
  portfolioLinks,
  siteMeta,
} from "@/content/portfolio";

export default function Home() {
  const projects = getFeaturedProjects();
  const featuredExperience = experience.slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-20">
      <section className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="kicker">{siteMeta.heroKicker}</p>
          <h1 className="headline mt-6 text-[clamp(3rem,8vw,6.6rem)] font-semibold">
            {siteMeta.heroTitle}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {siteMeta.heroSummary}
          </p>
          <div className="mt-8">
            <ProjectLinks links={portfolioLinks} />
          </div>
        </div>

        <aside className="border-t border-rule pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <p className="kicker">What recruiters should see fast</p>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-ink-soft">
            <li>Strongest builder story: Trade Insights Pro.</li>
            <li>Strongest analytics story: QB Translation.</li>
            <li>Strongest internal systems story: Ballard Center CRM.</li>
            <li>Strongest business impact story: ShadowRock dashboards.</li>
          </ul>
          <p className="byline mt-6 normal-case tracking-normal text-muted">
            Product judgment, analytics depth, and operating execution are the
            through-line.
          </p>
        </aside>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-4">
        {heroMetrics.map((metric) => (
          <article key={metric.label} className="border border-rule bg-paper-deep/35 p-5">
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

      <section className="mt-24" id="selected-projects">
        <div className="flex flex-col gap-4 border-b border-rule pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Selected projects</p>
            <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
              Four proof points, each solving a different product problem.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-ink-soft">
            The portfolio is intentionally balanced. No single case study has to
            carry the whole argument anymore.
          </p>
        </div>

        <div className="mt-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="flex flex-col gap-4 border-b border-rule pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Experience</p>
            <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
              Built in consulting, internal systems, and operations environments.
            </h2>
          </div>
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 border-b border-ink pb-1 text-sm text-ink transition-colors hover:border-rust hover:text-rust"
          >
            See full experience
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {featuredExperience.map((entry) => (
            <article key={`${entry.company}-${entry.role}`} className="border border-rule bg-paper-deep/30 p-6">
              <p className="kicker">{entry.company}</p>
              <h3 className="mt-3 font-display text-2xl tracking-tight">{entry.role}</h3>
              <p className="byline mt-2 normal-case tracking-normal text-muted">
                {entry.location} · {entry.period}
              </p>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{entry.summary}</p>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{entry.highlights[0]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-8 border-t border-rule pt-10 md:grid-cols-3">
        {capabilityBuckets.map((bucket) => (
          <div key={bucket.title}>
            <p className="kicker">{bucket.title}</p>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-ink-soft">
              {bucket.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-24 border-t border-rule pt-10">
        <p className="kicker">Next step</p>
        <div className="mt-4 grid gap-8 md:grid-cols-[1.6fr_1fr] md:items-end">
          <div>
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">
              If the fit is product, analytics, or operations-heavy PM work, this
              portfolio is the short version of how I think.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              The best follow-up questions are usually about tradeoffs, workflow
              choices, or how I decided what mattered. That is the conversation
              I want this site to start.
            </p>
          </div>
          <ProjectLinks links={portfolioLinks} />
        </div>
      </section>
    </div>
  );
}
