"use client";

import { RecruitBiasScatter, type ScatterPoint } from "@/components/charts/recruit-bias-scatter";
import { TopPredictors, type PredictorPanel } from "@/components/charts/top-predictors";
import { ArchetypeMap, type ArchetypePoint } from "@/components/charts/archetype-map";
import { Leaderboard, type LeaderRow } from "@/components/charts/leaderboard";

type ClusterLegendItem = {
  label: string;
  color: string;
  count: number;
  blurb: string;
};

type QbCaseChartsProps = {
  points: ScatterPoint[];
  labeledNames: string[];
  meanX: number;
  meanY: number;
  unrankedRows: { qb_name: string; composite_nfl_score: number }[];
  predictorPanels: PredictorPanel[];
  archetypePoints: ArchetypePoint[];
  clusters: ClusterLegendItem[];
  leaderboard: LeaderRow[];
};

export function QbCaseCharts({
  points,
  labeledNames,
  meanX,
  meanY,
  unrankedRows,
  predictorPanels,
  archetypePoints,
  clusters,
  leaderboard,
}: QbCaseChartsProps) {
  return (
    <div className="space-y-24">
      <section>
        <div className="rule-t pt-10">
          <p className="kicker">Evidence 01</p>
          <h2 className="headline mt-4 text-[clamp(1.8rem,4vw,3.2rem)] font-semibold">
            Recruit buzz is a weak decision signal.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">
            The point is not that recruiting rankings are useless. The point is
            that teams overvalue a signal that does far less decision work than
            efficiency and production once the player reaches the league.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <div className="border border-rule bg-paper-deep/30 p-4 md:p-6">
              <RecruitBiasScatter
                points={points}
                labeledNames={labeledNames}
                meanX={meanX}
                meanY={meanY}
              />
            </div>
            <p className="byline mt-4 normal-case tracking-normal text-muted">
              Labeled points highlight the biggest gaps between recruiting reputation
              and early NFL results.
            </p>
          </div>

          <aside className="border-t border-rule pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="kicker">Unranked standouts</p>
            <ul className="mt-4 divide-y divide-rule">
              {unrankedRows.map((row) => (
                <li key={row.qb_name} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-display text-lg">{row.qb_name}</span>
                  <span className="num text-rust">{row.composite_nfl_score.toFixed(1)}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section>
        <div className="rule-t pt-10">
          <p className="kicker">Evidence 02</p>
          <h2 className="headline mt-4 text-[clamp(1.8rem,4vw,3.2rem)] font-semibold">
            Efficiency at volume does more predictive work.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">
            These panels are the clearest explanation of the project: better
            signal selection changes better decisions. The surface is analytical,
            but the product move is helping the user see what deserves trust.
          </p>
        </div>

        <div className="mt-10">
          <TopPredictors panels={predictorPanels} />
        </div>
      </section>

      <section>
        <div className="rule-t pt-10">
          <p className="kicker">Evidence 03</p>
          <h2 className="headline mt-4 text-[clamp(1.8rem,4vw,3.2rem)] font-semibold">
            Archetypes make the result easier to use.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">
            The clustering layer matters because it turns a raw model output into
            a faster decision aid. Instead of reading every stat in isolation,
            the user can understand what kind of quarterback profile they are
            looking at.
          </p>
        </div>

        <div className="mt-10">
          <ArchetypeMap points={archetypePoints} clusters={clusters} />
        </div>
      </section>

      <section>
        <div className="rule-t pt-10">
          <p className="kicker">Evidence 04</p>
          <h2 className="headline mt-4 text-[clamp(1.8rem,4vw,3.2rem)] font-semibold">
            The full board supports deeper inspection.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">
            The leaderboard is where the case study becomes a reusable artifact
            rather than a one-time narrative. A reader can sort, compare, and
            inspect the composite logic instead of taking the summary on faith.
          </p>
        </div>

        <div className="mt-10">
          <Leaderboard rows={leaderboard} />
        </div>
      </section>
    </div>
  );
}
