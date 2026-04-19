import {
  CLUSTER_COLORS,
  computeArchetypes,
  computeLeaderboard,
  computeTopPredictors,
  getComposite,
  getRankedQbs,
  getUnrankedQbs,
} from "@/lib/qb-data";
import type { ProjectEntry } from "@/content/portfolio";
import { ProjectLinks } from "@/components/project-links";
import { ProjectSections } from "@/components/project-sections";
import { QbCaseChartsShell } from "@/components/projects/qb-case-charts-shell";

type QbTranslationPageProps = {
  project: ProjectEntry;
};

export function QbTranslationPage({ project }: QbTranslationPageProps) {
  const composite = getComposite();
  const ranked = getRankedQbs();
  const unrankedRows = getUnrankedQbs()
    .sort((a, b) => b.composite_nfl_score - a.composite_nfl_score)
    .slice(0, 6)
    .map((row) => ({
      qb_name: row.qb_name,
      composite_nfl_score: row.composite_nfl_score,
    }));

  const points = ranked.map((row) => ({
    x: row.recruit_rating_scaled ?? 0,
    y: row.composite_nfl_score,
    qb_name: row.qb_name,
    draft_year: row.draft_year,
    draft_pick: row.draft_pick,
    college: row.college,
    bias: row.recruit_bias ?? 0,
  }));

  const meanX =
    points.reduce((sum, point) => sum + point.x, 0) / Math.max(points.length, 1);
  const meanY =
    points.reduce((sum, point) => sum + point.y, 0) / Math.max(points.length, 1);

  const mostUnderrated = [...points]
    .sort((a, b) => a.bias - b.bias)
    .slice(0, 3)
    .map((point) => point.qb_name);
  const mostOverrated = [...points]
    .sort((a, b) => b.bias - a.bias)
    .slice(0, 3)
    .map((point) => point.qb_name);
  const topScorers = [...points]
    .sort((a, b) => b.y - a.y)
    .slice(0, 2)
    .map((point) => point.qb_name);
  const labeledNames = Array.from(
    new Set([...mostUnderrated, ...mostOverrated, ...topScorers])
  );

  const predictorPanels = computeTopPredictors(4);
  const archetypes = computeArchetypes();
  const leaderboard = computeLeaderboard();

  const clusterBlurbs: Record<string, string> = {
    "Efficient Passers":
      "Accurate, lower-risk passers who create value without forcing chaos.",
    "Raw Dual-Threats":
      "High-variance athletes with strong mobility and noisier passing profiles.",
    "Elite Multi-Dimensional":
      "Rare quarterbacks who score well across both passing and rushing dimensions.",
    "Game Managers":
      "Lower-ceiling profiles with steadier accuracy and context-driven production.",
  };

  const clusterLegend = Array.from(archetypes.counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({
      label,
      color: CLUSTER_COLORS[label] ?? "#8a827a",
      count,
      blurb: clusterBlurbs[label] ?? "",
    }));

  const topFive = [...composite]
    .sort((a, b) => b.composite_nfl_score - a.composite_nfl_score)
    .slice(0, 5)
    .map((row) => row.qb_name)
    .join(", ");

  return (
    <article className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-16">
      <header className="grid gap-8 border-b border-rule pb-10 md:grid-cols-[1.8fr_1fr] md:items-end">
        <div>
          <p className="kicker">{project.eyebrow}</p>
          <h1 className="headline mt-5 text-[clamp(2.8rem,7vw,5.6rem)] font-semibold">
            {project.heroTitle}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft">
            {project.heroSummary}
          </p>
        </div>

        <aside className="space-y-5 md:border-l md:border-rule md:pl-8">
          <div>
            <p className="byline">Project role</p>
            <p className="mt-2 font-display text-xl">{project.role}</p>
          </div>
          <div>
            <p className="byline">Why it matters</p>
            <p className="mt-2 leading-7 text-ink-soft">{project.impact}</p>
          </div>
          <div>
            <p className="byline">Top five by score</p>
            <p className="mt-2 leading-7 text-ink-soft">{topFive}</p>
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
          </article>
        ))}
      </section>

      <ProjectSections sections={project.sections} />

      <QbCaseChartsShell
        points={points}
        labeledNames={labeledNames}
        meanX={meanX}
        meanY={meanY}
        unrankedRows={unrankedRows}
        predictorPanels={predictorPanels}
        archetypePoints={archetypes.points}
        clusters={clusterLegend}
        leaderboard={leaderboard}
      />

      <section className="mt-10">
        <p className="kicker mb-4">Links</p>
        <ProjectLinks links={project.links} />
      </section>
    </article>
  );
}
