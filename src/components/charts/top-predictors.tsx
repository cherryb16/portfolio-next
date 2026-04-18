"use client";

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";

export type PredictorPoint = {
  x: number;
  y: number;
  qb_name: string;
};

export type PredictorPanel = {
  key: string;
  label: string;
  unit: string;
  r: number;
  slope: number;
  intercept: number;
  xDomain: [number, number];
  points: PredictorPoint[];
};

function Panel({ panel }: { panel: PredictorPanel }) {
  const rDisplay = `${panel.r >= 0 ? "+" : "−"}${Math.abs(panel.r).toFixed(2)}`;
  const line = [
    {
      x: panel.xDomain[0],
      y: panel.intercept + panel.slope * panel.xDomain[0],
    },
    {
      x: panel.xDomain[1],
      y: panel.intercept + panel.slope * panel.xDomain[1],
    },
  ];

  return (
    <div className="border border-rule p-5 md:p-6 bg-paper">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="kicker !text-ink-soft">{panel.label}</p>
          <p className="byline mt-1 normal-case tracking-normal">
            {panel.unit}
          </p>
        </div>
        <div className="text-right">
          <p className="byline">pearson r</p>
          <p className="num font-display text-4xl md:text-5xl leading-none text-rust mt-1">
            {rDisplay}
          </p>
        </div>
      </div>

      <div className="mt-5 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 26, left: 36 }}>
            <CartesianGrid
              stroke="var(--color-rule)"
              strokeDasharray="2 4"
              vertical={false}
            />
            <XAxis
              type="number"
              dataKey="x"
              domain={panel.xDomain}
              tick={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fill: "var(--color-muted)",
              }}
              stroke="var(--color-rule)"
              tickLine={false}
              label={{
                value: panel.label,
                position: "bottom",
                offset: 6,
                style: {
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  fill: "var(--color-muted)",
                  textTransform: "uppercase",
                },
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fill: "var(--color-muted)",
              }}
              stroke="var(--color-rule)"
              tickLine={false}
              width={32}
              label={{
                value: "NFL SCORE",
                angle: -90,
                position: "insideLeft",
                offset: 18,
                style: {
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  fill: "var(--color-muted)",
                  textAnchor: "middle",
                },
              }}
            />
            <Tooltip
              cursor={{ stroke: "var(--color-rust)", strokeDasharray: "2 2" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const p = payload[0].payload as PredictorPoint;
                return (
                  <div className="border border-ink bg-paper px-3 py-2 text-xs">
                    <p className="font-display text-sm">{p.qb_name}</p>
                    <p className="num text-muted mt-1">
                      {p.x.toFixed(2)} → {p.y.toFixed(1)}
                    </p>
                  </div>
                );
              }}
            />
            <ReferenceLine
              segment={[
                { x: line[0].x, y: line[0].y },
                { x: line[1].x, y: line[1].y },
              ]}
              stroke="var(--color-ink)"
              strokeOpacity={0.6}
              strokeWidth={1.25}
              ifOverflow="extendDomain"
            />
            <Scatter
              data={panel.points}
              fill="var(--color-ink)"
              fillOpacity={0.55}
              isAnimationActive={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TopPredictors({ panels }: { panels: PredictorPanel[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {panels.map((p) => (
        <Panel key={p.key} panel={p} />
      ))}
    </div>
  );
}
