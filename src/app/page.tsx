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
      <section className="relative overflow-hidden border-b border-rule pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(39,84,74,0.1),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(36,51,73,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.62),rgba(255,255,255,0))]" />
        <div className="grid gap-12 md:grid-cols-[1.65fr_0.9fr] md:items-end">
          <div className="max-w-4xl">
            <p className="kicker">{siteMeta.heroKicker}</p>
            <h1 className="headline mt-6 text-[clamp(3.4rem,9vw,7.8rem)] font-semibold">
              {siteMeta.heroTitle}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {siteMeta.heroSummary}
            </p>
            <div className="mt-10">
              <ProjectLinks links={portfolioLinks} />
            </div>
          </div>

          <aside className="md:border-l md:border-rule md:pl-8">
            <p className="kicker">Where I’m strongest</p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-ink-soft">
              <li>Trade Insights Pro proves product-builder instincts.</li>
              <li>QB Translation proves analytical decision framing.</li>
              <li>Ballard Center shows internal systems thinking.</li>
              <li>ShadowRock shows business impact and stakeholder traction.</li>
            </ul>
            <p className="byline mt-7 normal-case tracking-normal text-muted">
              Product judgment, analytics depth, and operating execution are the
              through-line.
            </p>
          </aside>
        </div>
      </section>

      <section className="mt-12 grid gap-5 border-b border-rule py-8 md:grid-cols-4">
        {heroMetrics.map((metric) => (
          <article key={metric.label} className="border-l border-rule pl-5 first:border-l-0 first:pl-0">
            <p className="font-display text-[2.85rem] leading-none text-rust">{metric.value}</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-ink-soft">{metric.label}</p>
            {metric.detail ? (
              <p className="byline mt-3 normal-case tracking-normal text-muted">
                {metric.detail}
              </p>
            ) : null}
          </article>
        ))}
      </section>

      <section className="mt-24" id="selected-projects">
        <div className="flex flex-col gap-4 border-b border-rule pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Selected projects</p>
            <h2 className="section-cap mt-3 text-4xl md:text-[4.5rem]">
              Four proof points, each solving a different product problem.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-ink-soft md:pb-2">
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
        <div className="flex flex-col gap-4 border-b border-rule pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Experience</p>
            <h2 className="section-cap mt-3 text-4xl md:text-[4.3rem]">
              Built in consulting, internal systems, and operations environments.
            </h2>
          </div>
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 rounded-full border border-rule bg-white/70 px-4 py-2 text-sm text-ink transition-colors hover:border-rust hover:text-rust"
          >
            See full experience
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-0 border-t border-rule md:grid-cols-2">
          {featuredExperience.map((entry) => (
            <article
              key={`${entry.company}-${entry.role}`}
              className="border-b border-rule py-7 md:pr-8 md:[&:nth-child(odd)]:border-r md:[&:nth-child(even)]:pl-8"
            >
              <p className="kicker">{entry.company}</p>
              <h3 className="mt-3 section-cap text-[2rem]">{entry.role}</h3>
              <p className="byline mt-2 normal-case tracking-normal text-muted">
                {entry.location} · {entry.period}
              </p>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{entry.summary}</p>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{entry.highlights[0]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-8 border-t border-rule pt-12 md:grid-cols-3">
        {capabilityBuckets.map((bucket) => (
          <div key={bucket.title}>
            <p className="kicker">{bucket.title}</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-ink-soft">
              {bucket.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-24 border-y border-rule py-12">
        <p className="kicker">Next step</p>
        <div className="mt-4 grid gap-8 md:grid-cols-[1.6fr_1fr] md:items-end">
          <div>
            <h2 className="section-cap text-4xl md:text-[4.5rem]">
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
