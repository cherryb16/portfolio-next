import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";

export type Cluster =
  | "Efficient Passers"
  | "Raw Dual-Threats"
  | "Elite Multi-Dimensional"
  | string;

export type QbCompositeRow = {
  qb_name: string;
  draft_year: number;
  draft_round: number;
  draft_pick: number;
  college: string;
  col_conference: string;
  recruit_stars: number | null;
  recruit_rating: number | null;
  composite_nfl_score: number;
  recruit_rating_scaled: number | null;
  recruit_bias: number | null;
  norm_nfl_ontgt_pct: number;
  norm_nfl_badth_pct: number;
  norm_nfl_cmp_pct: number;
  norm_nfl_any_a: number;
  norm_nfl_rate: number;
  norm_nfl_qbr: number;
  norm_nfl_td_pct: number;
  norm_nfl_int_pct: number;
  norm_nfl_prss_pct: number;
  norm_nfl_rush_yds_per_att: number;
};

export type QbClusterRow = {
  qb_name: string;
  draft_year: number;
  draft_round: number;
  college: string;
  col_cmp_pct: number | null;
  col_ppa_pass: number | null;
  col_rush_yds_per_att: number | null;
  col_usage_overall: number | null;
  col_int_rate: number | null;
  col_team_win_pct: number | null;
  cluster_id: number;
  cluster_label: Cluster;
  pc1: number;
  pc2: number;
  pc3: number;
  composite_nfl_score: number;
  recruit_rating_scaled: number | null;
};

export type QbModelRow = {
  qb_name: string;
  draft_year: number;
  draft_round: number;
  draft_pick: number;
  nfl_team: string;
  college: string;
  nfl_ontgt_pct: number;
  nfl_badth_pct: number;
  nfl_cmp_pct: number;
  nfl_any_a: number;
  nfl_rate: number;
  nfl_qbr: number;
  nfl_td_pct: number;
  nfl_int_pct: number;
  nfl_prss_pct: number;
  nfl_g: number;
  nfl_gs: number;
  nfl_att: number;
  nfl_yds: number;
  nfl_td: number;
  nfl_int: number;
  col_cmp_pct: number | null;
  col_yds_per_att: number | null;
  col_td_int_ratio: number | null;
  col_int_rate: number | null;
  col_sack_rate: number | null;
  col_rush_yds_per_att: number | null;
  col_ppa_overall: number | null;
  col_ppa_pass: number | null;
  col_ppa_rush: number | null;
  col_usage_overall: number | null;
  col_usage_pass: number | null;
  col_usage_rush: number | null;
  col_usage_third_down: number | null;
  col_team_win_pct: number | null;
  recruit_rating: number | null;
  recruit_stars: number | null;
  col_conference: string;
};

const DATA_DIR = path.join(process.cwd(), "public", "data", "qb");

function parseCsv<T>(filename: string): T[] {
  const raw = fs.readFileSync(path.join(DATA_DIR, filename), "utf8");
  const parsed = Papa.parse<T>(raw, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transform: (value) => (value === "" ? null : value),
  });
  return parsed.data.filter((row) => row && (row as { qb_name?: string }).qb_name);
}

let _composite: QbCompositeRow[] | null = null;
let _clusters: QbClusterRow[] | null = null;
let _model: QbModelRow[] | null = null;

export function getComposite(): QbCompositeRow[] {
  _composite ??= parseCsv<QbCompositeRow>("qb_composite_scores.csv");
  return _composite;
}

export function getClusters(): QbClusterRow[] {
  _clusters ??= parseCsv<QbClusterRow>("qb_clusters.csv");
  return _clusters;
}

export function getModelTable(): QbModelRow[] {
  _model ??= parseCsv<QbModelRow>("qb_model_table.csv");
  return _model;
}

export function getRankedQbs() {
  return getComposite().filter((r) => r.recruit_rating != null);
}

export function getUnrankedQbs() {
  return getComposite().filter((r) => r.recruit_rating == null);
}

export const CLUSTER_COLORS: Record<string, string> = {
  "Efficient Passers": "#1f3a5f",
  "Raw Dual-Threats": "#b8422c",
  "Elite Multi-Dimensional": "#c88f24",
  "Game Managers": "#5b6f4a",
};

export function pearson(xs: number[], ys: number[]): number {
  const n = xs.length;
  if (n < 2) return 0;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let dx2 = 0;
  let dy2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - mx;
    const dy = ys[i] - my;
    num += dx * dy;
    dx2 += dx * dx;
    dy2 += dy * dy;
  }
  const den = Math.sqrt(dx2 * dy2);
  return den === 0 ? 0 : num / den;
}

export function linreg(
  xs: number[],
  ys: number[]
): { slope: number; intercept: number } {
  const n = xs.length;
  if (n < 2) return { slope: 0, intercept: 0 };
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let dx2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - mx;
    num += dx * (ys[i] - my);
    dx2 += dx * dx;
  }
  const slope = dx2 === 0 ? 0 : num / dx2;
  const intercept = my - slope * mx;
  return { slope, intercept };
}

export type PredictorKey =
  | "col_cmp_pct"
  | "col_yds_per_att"
  | "col_td_int_ratio"
  | "col_int_rate"
  | "col_rush_yds_per_att"
  | "col_ppa_overall"
  | "col_ppa_pass"
  | "col_ppa_rush"
  | "col_usage_overall"
  | "col_usage_pass"
  | "col_usage_third_down"
  | "col_team_win_pct";

export const PREDICTOR_META: Record<
  PredictorKey,
  { label: string; unit: string }
> = {
  col_cmp_pct: { label: "Completion %", unit: "college passing" },
  col_yds_per_att: { label: "Yards per attempt", unit: "college passing" },
  col_td_int_ratio: { label: "TD/INT ratio", unit: "college passing" },
  col_int_rate: { label: "Interception rate", unit: "college passing" },
  col_rush_yds_per_att: { label: "Rush yds/att", unit: "college mobility" },
  col_ppa_overall: { label: "PPA overall", unit: "predicted points added" },
  col_ppa_pass: { label: "PPA passing", unit: "predicted points added" },
  col_ppa_rush: { label: "PPA rushing", unit: "predicted points added" },
  col_usage_overall: { label: "Usage share", unit: "offensive involvement" },
  col_usage_pass: { label: "Pass usage", unit: "offensive involvement" },
  col_usage_third_down: {
    label: "3rd-down usage",
    unit: "offensive involvement",
  },
  col_team_win_pct: { label: "Team win %", unit: "college success" },
};

export function computeTopPredictors(limit = 4) {
  const composite = getComposite();
  const model = getModelTable();
  const scoreByName = new Map(
    composite.map((r) => [r.qb_name, r.composite_nfl_score])
  );

  const keys = Object.keys(PREDICTOR_META) as PredictorKey[];
  const panels = keys
    .map((key) => {
      const xs: number[] = [];
      const ys: number[] = [];
      const points: { x: number; y: number; qb_name: string }[] = [];
      for (const row of model) {
        const xv = row[key];
        const yv = scoreByName.get(row.qb_name);
        if (xv == null || yv == null || Number.isNaN(xv)) continue;
        xs.push(xv as number);
        ys.push(yv);
        points.push({ x: xv as number, y: yv, qb_name: row.qb_name });
      }
      if (xs.length < 5) return null;
      const r = pearson(xs, ys);
      const { slope, intercept } = linreg(xs, ys);
      const xMin = Math.min(...xs);
      const xMax = Math.max(...xs);
      const pad = (xMax - xMin) * 0.05 || 0.1;
      return {
        key,
        label: PREDICTOR_META[key].label,
        unit: PREDICTOR_META[key].unit,
        r,
        slope,
        intercept,
        xDomain: [xMin - pad, xMax + pad] as [number, number],
        points,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => Math.abs(b.r) - Math.abs(a.r))
    .slice(0, limit);

  return panels;
}

export function computeArchetypes() {
  const clusters = getClusters();
  const valid = clusters.filter(
    (r) =>
      Number.isFinite(r.pc1) &&
      Number.isFinite(r.pc2) &&
      !!r.cluster_label
  );
  const byLabel = new Map<string, number>();
  for (const r of valid) {
    byLabel.set(r.cluster_label, (byLabel.get(r.cluster_label) ?? 0) + 1);
  }
  return {
    points: valid.map((r) => ({
      x: r.pc1,
      y: r.pc2,
      composite: r.composite_nfl_score,
      qb_name: r.qb_name,
      draft_year: r.draft_year,
      college: r.college,
      cluster_label: r.cluster_label,
    })),
    counts: byLabel,
  };
}

export function computeLeaderboard() {
  const composite = getComposite();
  const rows = composite.map((r) => ({
    qb_name: r.qb_name,
    draft_year: r.draft_year,
    draft_pick: r.draft_pick,
    college: r.college,
    composite: r.composite_nfl_score,
    recruitScaled: r.recruit_rating_scaled ?? null,
    components: [
      { label: "On-target %", value: r.norm_nfl_ontgt_pct },
      { label: "Bad throw % (inv.)", value: r.norm_nfl_badth_pct },
      { label: "Completion %", value: r.norm_nfl_cmp_pct },
      { label: "ANY/A", value: r.norm_nfl_any_a },
      { label: "Passer rating", value: r.norm_nfl_rate },
      { label: "ESPN QBR", value: r.norm_nfl_qbr },
      { label: "TD %", value: r.norm_nfl_td_pct },
      { label: "INT % (inv.)", value: r.norm_nfl_int_pct },
      { label: "Pressure % (inv.)", value: r.norm_nfl_prss_pct },
      { label: "Rush yds/att", value: r.norm_nfl_rush_yds_per_att },
    ],
  }));
  return rows;
}
