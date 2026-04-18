import Link from "next/link";
import {
  CLUSTER_COLORS,
  computeArchetypes,
  computeLeaderboard,
  computeTopPredictors,
  getComposite,
  getRankedQbs,
  getUnrankedQbs,
} from "@/lib/qb-data";
import { RecruitBiasScatter, type ScatterPoint } from "@/components/charts/recruit-bias-scatter";
import { TopPredictors } from "@/components/charts/top-predictors";
import { ArchetypeMap } from "@/components/charts/archetype-map";
import { Leaderboard } from "@/components/charts/leaderboard";

export const metadata = {
  title: "QB Translation — Brayden Cherry",
  description:
    "Which college quarterback traits actually predict early NFL success? Composite scoring, PCA archetypes, and a hard look at what scouts measure.",
};

export default function QbTranslation() {
  const composite = getComposite();
  const ranked = getRankedQbs();
  const unranked = getUnrankedQbs().sort(
    (a, b) => b.composite_nfl_score - a.composite_nfl_score
  );

  const points: ScatterPoint[] = ranked.map((q) => ({
    x: q.recruit_rating_scaled ?? 0,
    y: q.composite_nfl_score,
    qb_name: q.qb_name,
    draft_year: q.draft_year,
    draft_pick: q.draft_pick,
    college: q.college,
    bias: q.recruit_bias ?? 0,
  }));

  const meanX =
    points.reduce((acc, p) => acc + p.x, 0) / Math.max(points.length, 1);
  const meanY =
    points.reduce((acc, p) => acc + p.y, 0) / Math.max(points.length, 1);

  const mostUnderrated = [...points]
    .sort((a, b) => a.bias - b.bias)
    .slice(0, 3)
    .map((p) => p.qb_name);
  const mostOverrated = [...points]
    .sort((a, b) => b.bias - a.bias)
    .slice(0, 3)
    .map((p) => p.qb_name);
  const topScorers = [...points]
    .sort((a, b) => b.y - a.y)
    .slice(0, 2)
    .map((p) => p.qb_name);

  const labeled = Array.from(
    new Set([...mostUnderrated, ...mostOverrated, ...topScorers])
  );

  const n = composite.length;
  const span = {
    min: Math.min(...composite.map((q) => q.draft_year)),
    max: Math.max(...composite.map((q) => q.draft_year)),
  };

  const predictorPanels = computeTopPredictors(4);
  const archetypes = computeArchetypes();
  const leaderboard = computeLeaderboard();

  const clusterBlurbs: Record<string, string> = {
    "Efficient Passers":
      "Accurate, low-risk, pass-first. Think Purdy, Daniels, Stroud.",
    "Raw Dual-Threats":
      "High production, mobility, occasionally wild. The Mayfield/Lawrence corner.",
    "Elite Multi-Dimensional":
      "Top-of-chart on both passing and rushing PPA. Scarce.",
    "Game Managers":
      "Solid accuracy and team context, modest ceilings in early NFL years.",
  };

  const clusterLegend = Array.from(archetypes.counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({
      label,
      color: CLUSTER_COLORS[label] ?? "#8a827a",
      count,
      blurb: clusterBlurbs[label] ?? "",
    }));

  return (
    <article className="mx-auto max-w-[1400px] px-6 md:px-10 py-12 md:py-16">
      <header className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-6">
        <div className="col-span-12 md:col-span-8">
          <p className="kicker">
            Feature · STRAT 412 Capstone · {span.min}–{span.max} cohort
          </p>
          <h1 className="headline mt-6 text-[clamp(2.5rem,7vw,5.5rem)] font-semibold">
            If I&rsquo;m an NFL GM,{" "}
            <span className="headline-italic text-rust">
              which college stat
            </span>{" "}
            do I actually trust?
          </h1>
        </div>
        <div className="col-span-12 md:col-span-4 md:pl-10 md:border-l border-rule">
          <dl className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-4 text-sm">
            <div>
              <dt className="byline">Cohort</dt>
              <dd className="font-display text-xl mt-1">
                <span className="num">{n}</span> QBs · 2018–24
              </dd>
            </div>
            <div>
              <dt className="byline">Stack</dt>
              <dd className="font-display text-xl mt-1">
                Python · SQL · Next.js
              </dd>
            </div>
            <div>
              <dt className="byline">Sources</dt>
              <dd className="font-display text-xl mt-1">
                PFR · CFBD · Sportradar
              </dd>
            </div>
            <div>
              <dt className="byline">Repo</dt>
              <dd className="font-display text-xl mt-1">
                <a
                  className="text-rust hover:text-rust-deep underline-offset-4 hover:underline"
                  href="https://github.com/cherryb16"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <section className="mt-16 grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-10">
        <div className="col-span-12 md:col-span-7 dropcap text-lg leading-[1.75] text-ink-soft">
          <p>
            Every April, franchises spend first-round picks on quarterbacks
            because a scout liked the arm, the frame, or the five-star pedigree
            that landed the kid at a blue-blood program. For the cohort of
            QBs drafted between 2018 and 2024 who played at least sixteen NFL
            games and started eight in their first two seasons, I built a
            composite NFL success score on a 0&ndash;100 scale, then asked a
            simple question: which college signals actually translate?
          </p>
          <p className="mt-6">
            Recruit rating &mdash; the headline metric that dictates blue-chip
            rosters and scholarship budgets &mdash; correlates with NFL
            pressure rate at{" "}
            <span className="num text-ink">r = &minus;0.05</span>. College
            PPA, the play-level efficiency measure nobody outside analytics
            Twitter has heard of, correlates at{" "}
            <span className="num text-ink">r = &minus;0.45</span>. That&rsquo;s
            not a rounding error. That&rsquo;s the entire scouting apparatus
            aiming at the wrong signal.
          </p>
        </div>

        <aside className="col-span-12 md:col-span-5 md:pl-10 md:border-l border-rule">
          <p className="kicker">What&rsquo;s in the score</p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              ["On-target %", "×1.5"],
              ["Bad throw % (inv.)", "×2.0"],
              ["Completion %", "×1.5"],
              ["ANY/A", "×1.0"],
              ["Passer rating", "×1.0"],
              ["ESPN QBR", "×1.0"],
              ["TD %", "×1.0"],
              ["INT % (inv.)", "×1.0"],
              ["Pressure % (inv.)", "×1.0"],
              ["Rush yds/att", "×0.5"],
            ].map(([label, w]) => (
              <li
                key={label}
                className="flex items-baseline justify-between border-b border-rule pb-2"
              >
                <span>{label}</span>
                <span className="num text-muted text-xs">{w}</span>
              </li>
            ))}
          </ul>
          <p className="byline mt-5">
            Normalized min-max, weighted, rescaled to 0&ndash;100.
          </p>
        </aside>
      </section>

      <section className="mt-24">
        <div className="rule-t pt-10">
          <p className="kicker">Figure 01 · Recruit rating vs. NFL outcome</p>
          <h2 className="headline mt-4 text-[clamp(1.75rem,4vw,3rem)] font-semibold">
            The stars{" "}
            <span className="headline-italic text-rust">
              don&rsquo;t show up
            </span>{" "}
            on Sundays.
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-ink-soft leading-relaxed">
            Each dot is a drafted QB. Horizontal axis: the recruit rating
            247Sports gave them coming out of high school, scaled to 0&ndash;100.
            Vertical axis: their NFL composite score after two seasons. If
            scouts had signal, you&rsquo;d see a diagonal climb from bottom-left
            to top-right. You don&rsquo;t.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-10 items-start">
          <div className="col-span-12 md:col-span-9">
            <div className="border border-rule bg-paper-deep/30 p-4 md:p-6 grain">
              <RecruitBiasScatter
                points={points}
                labeledNames={labeled}
                meanX={meanX}
                meanY={meanY}
              />
            </div>
            <p className="byline mt-4">
              n = {points.length} ranked QBs · dashed lines mark cohort means ·
              labels call out the most underrated and overrated relative to
              recruit score.
            </p>
          </div>

          <aside className="col-span-12 md:col-span-3 md:pl-8 md:border-l border-rule">
            <p className="kicker">Off the chart</p>
            <p className="mt-4 text-sm text-ink-soft leading-relaxed">
              Six QBs in the cohort were unranked out of high school. Among
              them:
            </p>
            <ul className="mt-4 divide-y divide-rule">
              {unranked.map((q) => (
                <li
                  key={q.qb_name}
                  className="flex items-baseline justify-between py-2 gap-4"
                >
                  <span className="font-display text-lg truncate">
                    {q.qb_name}
                  </span>
                  <span className="num text-rust">
                    {q.composite_nfl_score.toFixed(1)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="byline mt-4">
              Mayfield and Allen outscore half the five-stars. That&rsquo;s
              the chart&rsquo;s loudest row.
            </p>
          </aside>
        </div>
      </section>

      <section className="mt-24">
        <div className="rule-t pt-10">
          <p className="kicker">Figure 02 · Top college predictors</p>
          <h2 className="headline mt-4 text-[clamp(1.75rem,4vw,3rem)] font-semibold">
            What{" "}
            <span className="headline-italic text-rust">does</span> translate.
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-ink-soft leading-relaxed">
            Pearson correlation of every college stat against NFL composite
            score. The four with the strongest signal, below. Negative
            correlations mean more of the college trait tracks with{" "}
            <em>lower</em> NFL composite &mdash; usually because the trait is
            itself a pressure-inducer (high usage, high INT rate) rather than a
            pure-good.
          </p>
        </div>
        <div className="mt-10">
          <TopPredictors panels={predictorPanels} />
        </div>
        <p className="byline mt-4">
          Trend line is OLS through each panel&rsquo;s points · panels may drop
          QBs with missing college data for that specific stat.
        </p>
      </section>

      <section className="mt-24">
        <div className="rule-t pt-10">
          <p className="kicker">Figure 03 · PCA archetypes</p>
          <h2 className="headline mt-4 text-[clamp(1.75rem,4vw,3rem)] font-semibold">
            Four{" "}
            <span className="headline-italic text-rust">kinds of QB</span>, one
            map.
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-ink-soft leading-relaxed">
            Principal components reduce twelve college features into two axes.
            PC1 separates production-and-efficiency QBs (right) from
            lower-volume ones (left). PC2 isolates the mobility-and-usage axis.
            K-Means then groups the cohort into four archetypes &mdash; click a
            legend item to isolate a cluster.
          </p>
        </div>
        <div className="mt-10">
          <ArchetypeMap
            points={archetypes.points}
            clusters={clusterLegend}
          />
        </div>
      </section>

      <section className="mt-24">
        <div className="rule-t pt-10">
          <p className="kicker">Figure 04 · The full board</p>
          <h2 className="headline mt-4 text-[clamp(1.75rem,4vw,3rem)] font-semibold">
            Every QB,{" "}
            <span className="headline-italic text-rust">
              every component
            </span>
            .
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-ink-soft leading-relaxed">
            Sortable composite leaderboard. Click any row to see the
            0&ndash;1 normalized component scores that roll up into the 0&ndash;100
            composite.
          </p>
        </div>
        <div className="mt-10">
          <Leaderboard rows={leaderboard} />
        </div>
      </section>

      <section className="mt-24 rule-t pt-10 grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-8">
        <div className="col-span-12 md:col-span-7">
          <p className="kicker">Takeaways</p>
          <h2 className="headline mt-4 text-[clamp(1.75rem,4vw,3rem)] font-semibold">
            If I&rsquo;m a GM,{" "}
            <span className="headline-italic text-rust">
              here&rsquo;s what I&rsquo;m reading
            </span>
            .
          </h2>
        </div>
        <ol className="col-span-12 md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-ink-soft mt-2">
          {[
            [
              "Downweight recruit rating.",
              "Five-star pedigree predicts almost nothing two years into the league. The Mayfield/Allen row of the scatter is the tell: two of the cohort\u2019s best were unranked.",
            ],
            [
              "Trust efficiency-at-volume.",
              "PPA and yards-per-attempt beat any single counting stat. Usage plus efficiency separates real translators from stat-padders.",
            ],
            [
              "Use archetypes as a shortcut.",
              "Once a prospect lands in a cluster, you know which NFL comps are fair and which components need to carry. It\u2019s faster than regression reports.",
            ],
          ].map(([title, body]) => (
            <li key={title} className="border border-rule p-6 bg-paper-deep/30">
              <p className="font-display text-2xl leading-tight">{title}</p>
              <p className="mt-3 text-sm leading-relaxed">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <footer className="mt-20 rule-t pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Link
          href="/"
          className="text-ink-soft hover:text-rust transition-colors"
        >
          ← Back to the front page
        </Link>
        <a
          href="https://github.com/cherryb16"
          target="_blank"
          rel="noreferrer"
          className="text-ink-soft hover:text-rust transition-colors"
        >
          View the pipeline on GitHub ↗
        </a>
      </footer>
    </article>
  );
}
