import Link from "next/link";
import { getComposite } from "@/lib/qb-data";

export function FeaturedCase() {
  const composite = getComposite();
  const n = composite.length;
  const top = [...composite]
    .sort((a, b) => b.composite_nfl_score - a.composite_nfl_score)
    .slice(0, 5);

  return (
    <section className="mt-16 grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-8">
      <div className="col-span-12 md:col-span-8">
        <p className="kicker">Featured case · STRAT 412</p>
        <h2 className="headline mt-4 text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.98]">
          QB Translation:
          <br />
          <span className="headline-italic text-rust">
            Which college traits
          </span>{" "}
          actually predict NFL success?
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft leading-relaxed">
          I built a composite NFL success score for every QB drafted between
          2018 and 2024 who logged at least 16 games and 8 starts in their first
          two seasons, then stress-tested it against college production,
          efficiency, usage, and recruiting pedigree. The conclusion is less
          polite than the scouting reports suggest.
        </p>

        <Link
          href="/qb-translation"
          className="mt-8 inline-flex items-center gap-2 text-rust hover:text-rust-deep border-b border-rust hover:border-rust-deep transition-colors pb-1"
        >
          Read the full case study
          <span aria-hidden>→</span>
        </Link>
      </div>

      <aside className="col-span-12 md:col-span-4 md:pl-10 md:border-l border-rule">
        <p className="kicker">The board, top five</p>
        <ol className="mt-6 space-y-4">
          {top.map((q, i) => (
            <li
              key={q.qb_name}
              className="flex items-baseline justify-between gap-4"
            >
              <span className="flex items-baseline gap-3 min-w-0">
                <span className="num text-muted w-5 text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg truncate">
                  {q.qb_name}
                </span>
              </span>
              <span className="num text-rust text-sm">
                {q.composite_nfl_score.toFixed(1)}
              </span>
            </li>
          ))}
        </ol>
        <p className="byline mt-6">
          Composite score, 0–100. Cohort n = {n}.
        </p>
      </aside>
    </section>
  );
}
