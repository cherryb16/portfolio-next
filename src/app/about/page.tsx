import Link from "next/link";

export const metadata = {
  title: "About — Brayden Cherry",
  description:
    "Background, strengths, and working style for Brayden Cherry's product and analytics portfolio.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-[1100px] px-6 md:px-10 py-12 md:py-16">
      <header className="grid grid-cols-12 gap-8 md:gap-10">
        <div className="col-span-12 md:col-span-8">
          <p className="kicker">About</p>
          <h1 className="headline mt-5 text-[clamp(2.25rem,6vw,4.5rem)] font-semibold">
            I build the
            <span className="headline-italic text-rust"> decision layer </span>
            between raw data and real product moves.
          </h1>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-2xl">
            I care about problems where teams have strong opinions, weak signal,
            and expensive consequences. My work usually sits at the seam between
            product strategy, analytics, and operational execution.
          </p>
        </div>
        <aside className="col-span-12 md:col-span-4 md:pl-8 md:border-l border-rule">
          <p className="kicker">At a glance</p>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            <li className="flex justify-between gap-6 border-b border-rule pb-2">
              <span>Focus</span>
              <span className="num">Product × Analytics</span>
            </li>
            <li className="flex justify-between gap-6 border-b border-rule pb-2">
              <span>Stack</span>
              <span className="num">Python · SQL · Next.js</span>
            </li>
            <li className="flex justify-between gap-6 border-b border-rule pb-2">
              <span>Based in</span>
              <span className="num">Utah</span>
            </li>
          </ul>
        </aside>
      </header>

      <section className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            title: "How I work",
            body: "Frame decisions clearly, instrument quickly, then make tradeoffs visible enough for teams to commit.",
          },
          {
            title: "What I ship",
            body: "Decision support tools, analytics products, and process redesigns that teams can actually operate.",
          },
          {
            title: "What I value",
            body: "Clear writing, measurable outcomes, and respectful debate over dashboards that nobody trusts.",
          },
        ].map((card) => (
          <article
            key={card.title}
            className="border border-rule bg-paper-deep/35 p-6"
          >
            <p className="font-display text-2xl leading-tight tracking-tight">
              {card.title}
            </p>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              {card.body}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-16 rule-t pt-10">
        <p className="kicker">Next step</p>
        <p className="mt-4 font-display text-3xl tracking-tight">
          Best place to start: QB Translation.
        </p>
        <p className="mt-4 text-ink-soft max-w-2xl leading-relaxed">
          It shows my full working style end-to-end: framing the problem,
          building the dataset, testing assumptions, and translating findings
          into recommendations.
        </p>
        <Link
          href="/qb-translation"
          className="mt-6 inline-flex items-center gap-2 text-rust hover:text-rust-deep transition-colors"
        >
          Read the case study
          <span aria-hidden>→</span>
        </Link>
      </section>
    </article>
  );
}
