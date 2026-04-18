"use client";

import {
  CartesianGrid,
  Label,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ScatterPoint = {
  x: number;
  y: number;
  qb_name: string;
  draft_year: number;
  draft_pick: number;
  college: string;
  bias: number;
};

type Props = {
  points: ScatterPoint[];
  labeledNames: string[];
  meanX: number;
  meanY: number;
};

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ScatterPoint }>;
}) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="border border-ink bg-paper text-ink px-4 py-3 shadow-[4px_4px_0_0] shadow-ink/10">
      <p className="font-display text-lg leading-tight">{p.qb_name}</p>
      <p className="byline mt-1">
        {p.college} · {p.draft_year} · pick {p.draft_pick}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <span className="text-muted">Recruit</span>
        <span className="num text-right">{p.x.toFixed(1)}</span>
        <span className="text-muted">NFL score</span>
        <span className="num text-right">{p.y.toFixed(1)}</span>
        <span className="text-muted">Bias</span>
        <span
          className={`num text-right ${
            p.bias > 0 ? "text-rust" : "text-sage"
          }`}
        >
          {p.bias > 0 ? "+" : ""}
          {p.bias.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

function AnnotationLabel(labeledNames: string[]) {
  return function Rendered(props: {
    cx?: number;
    cy?: number;
    payload?: ScatterPoint;
  }) {
    const { cx, cy, payload } = props;
    if (cx == null || cy == null || !payload) return null;
    if (!labeledNames.includes(payload.qb_name)) return null;
    const underperformer = payload.bias > 0;
    const dx = underperformer ? 10 : -10;
    const anchor = underperformer ? "start" : "end";
    return (
      <g>
        <line
          x1={cx}
          y1={cy}
          x2={cx + dx}
          y2={cy}
          stroke="var(--color-ink)"
          strokeWidth={0.75}
        />
        <text
          x={cx + dx + (underperformer ? 3 : -3)}
          y={cy + 3}
          textAnchor={anchor}
          className="font-mono"
          fontSize={10}
          fill="var(--color-ink)"
        >
          {payload.qb_name}
        </text>
      </g>
    );
  };
}

export function RecruitBiasScatter({
  points,
  labeledNames,
  meanX,
  meanY,
}: Props) {
  return (
    <ResponsiveContainer width="100%" height={520}>
      <ScatterChart margin={{ top: 20, right: 80, bottom: 60, left: 40 }}>
        <CartesianGrid
          stroke="var(--color-rule)"
          strokeDasharray="2 4"
          vertical={false}
        />
        <XAxis
          type="number"
          dataKey="x"
          domain={[70, 100]}
          ticks={[70, 75, 80, 85, 90, 95, 100]}
          tick={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fill: "var(--color-muted)",
          }}
          stroke="var(--color-rule)"
          tickLine={false}
        >
          <Label
            value="COLLEGE RECRUIT RATING (×100)"
            offset={30}
            position="bottom"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              fill: "var(--color-muted)",
            }}
          />
        </XAxis>
        <YAxis
          type="number"
          dataKey="y"
          domain={[0, 100]}
          ticks={[0, 20, 40, 60, 80, 100]}
          tick={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fill: "var(--color-muted)",
          }}
          stroke="var(--color-rule)"
          tickLine={false}
          width={50}
        >
          <Label
            value="NFL COMPOSITE SCORE"
            angle={-90}
            offset={10}
            position="left"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              fill: "var(--color-muted)",
              textAnchor: "middle",
            }}
          />
        </YAxis>
        <ReferenceLine
          y={meanY}
          stroke="var(--color-muted)"
          strokeDasharray="1 3"
          opacity={0.5}
        />
        <ReferenceLine
          x={meanX}
          stroke="var(--color-muted)"
          strokeDasharray="1 3"
          opacity={0.5}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "var(--color-rust)", strokeDasharray: "2 2" }}
        />
        <Scatter
          data={points}
          fill="var(--color-rust)"
          fillOpacity={0.85}
          stroke="var(--color-ink)"
          strokeWidth={0.5}
          shape="circle"
          r={6}
          isAnimationActive={false}
        />
        <Scatter
          data={points}
          shape={AnnotationLabel(labeledNames)}
          legendType="none"
          isAnimationActive={false}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
