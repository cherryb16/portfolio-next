import Link from "next/link";
import { FeaturedCase } from "@/components/featured-case";
import { WorkList } from "@/components/work-list";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-12 md:py-20">
      <section className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-10">
        <div className="col-span-12 md:col-span-7">
          <p className="kicker">Vol. 01 · Product × Analytics · {new Date().getFullYear()}</p>
          <h1 className="headline mt-6 text-[clamp(2.75rem,8vw,6.5rem)] font-semibold">
            A portfolio that{" "}
            <span className="headline-italic text-rust">reads like</span> the
            analysis, not the brochure.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink-soft leading-relaxed">
            I&rsquo;m Brayden Cherry — a product strategist who builds the
            dashboards, data pipelines, and decision tooling that turn messy
            inputs into calls you can stand behind. This site is where the
            receipts live.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link
              href="/qb-translation"
              className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 hover:bg-rust transition-colors"
            >
              Read the featured case
              <span aria-hidden>→</span>
            </Link>
            <a
              href="mailto:braydenmcherry@gmail.com"
              className="inline-flex items-center gap-2 border border-ink px-5 py-3 hover:border-rust hover:text-rust transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>

        <aside className="col-span-12 md:col-span-5 md:pl-10 md:border-l border-rule">
          <p className="kicker">Editor&rsquo;s note</p>
          <p className="font-display text-2xl md:text-[1.75rem] leading-[1.15] mt-6 tracking-tight">
            &ldquo;A five-star recruit rating correlates with NFL pressure rate
            at{" "}
            <span className="num text-rust">r = &minus;0.05</span>. College PPA
            correlates at <span className="num text-rust">&minus;0.45</span>.
            The scouts are looking at the wrong page of the program.&rdquo;
          </p>
          <p className="byline mt-6">From &ldquo;QB Translation,&rdquo; below ↓</p>
        </aside>
      </section>

      <div className="mt-24 rule-b" />

      <FeaturedCase />

      <div className="mt-24 rule-b" />

      <section className="mt-16">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="kicker">On the desk</p>
            <h2 className="font-display text-3xl md:text-4xl mt-3 tracking-tight">
              Other work in rotation
            </h2>
          </div>
          <p className="byline hidden md:block">Migrating from the old site</p>
        </div>

        <WorkList />
      </section>
    </div>
  );
}
