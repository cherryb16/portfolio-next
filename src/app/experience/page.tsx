import type { Metadata } from "next";
import { ExperienceList } from "@/components/experience-list";
import { ProjectLinks } from "@/components/project-links";
import {
  capabilityBuckets,
  education,
  experience,
  portfolioLinks,
  siteMeta,
} from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Experience, education, and operating highlights for Brayden Cherry's product and analytics portfolio.",
};

export default function ExperiencePage() {
  return (
    <article className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 md:py-16">
      <header className="grid gap-8 border-b border-rule pb-10 md:grid-cols-[1.7fr_1fr] md:items-end">
        <div>
          <p className="kicker">Experience</p>
          <h1 className="headline mt-5 text-[clamp(2.7rem,7vw,5.4rem)] font-semibold">
            A PM-oriented track record built through consulting, systems work, and operations.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft">
            My resume leans consulting because that is where much of the work
            happened. The through-line is still product: define the problem,
            build a system people will actually use, and make the tradeoffs clear.
          </p>
        </div>

        <aside className="space-y-5 md:border-l md:border-rule md:pl-8">
          <div>
            <p className="byline">Based in</p>
            <p className="mt-2 font-display text-xl">{siteMeta.location}</p>
          </div>
          <div>
            <p className="byline">Focus</p>
            <p className="mt-2 leading-7 text-ink-soft">
              Product strategy, analytics systems, internal tools, and operating
              workflows that reduce ambiguity.
            </p>
          </div>
          <div>
            <p className="byline">Direct links</p>
            <div className="mt-3">
              <ProjectLinks links={portfolioLinks} />
            </div>
          </div>
        </aside>
      </header>

      <section className="mt-12">
        <ExperienceList entries={experience} />
      </section>

      <section className="mt-16 grid gap-12 border-t border-rule pt-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="kicker">Education</p>
          {education.map((entry) => (
            <div key={entry.school} className="mt-5 border-t border-rule pt-5">
              <h2 className="section-cap text-[2rem]">{entry.school}</h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                {entry.credential} · {entry.location} · {entry.period}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-ink-soft">
                {entry.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {capabilityBuckets.map((bucket) => (
          <div key={bucket.title}>
            <p className="kicker">{bucket.title}</p>
            <div className="mt-5 border-t border-rule pt-5">
              <ul className="space-y-2 text-sm leading-7 text-ink-soft">
                {bucket.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
