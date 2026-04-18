"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

export type ArchetypePoint = {
  x: number;
  y: number;
  composite: number;
  qb_name: string;
  draft_year: number;
  college: string;
  cluster_label: string;
};

type Props = {
  points: ArchetypePoint[];
  clusters: { label: string; color: string; count: number; blurb: string }[];
};

export function ArchetypeMap({ points, clusters }: Props) {
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const grouped = useMemo(() => {
    const map = new Map<string, ArchetypePoint[]>();
    for (const p of points) {
      if (!map.has(p.cluster_label)) map.set(p.cluster_label, []);
      map.get(p.cluster_label)!.push(p);
    }
    return map;
  }, [points]);

  const toggle = (label: string) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const xDomain: [number, number] = [
    Math.floor(Math.min(...xs) - 0.5),
    Math.ceil(Math.max(...xs) + 0.5),
  ];
  const yDomain: [number, number] = [
    Math.floor(Math.min(...ys) - 0.5),
    Math.ceil(Math.max(...ys) + 0.5),
  ];

  return (
    <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-6 items-start">
      <div className="col-span-12 md:col-span-8">
        <div className="border border-rule p-4 md:p-6 bg-paper-deep/30 grain">
          <ResponsiveContainer width="100%" height={460}>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 50, left: 30 }}>
              <CartesianGrid
                stroke="var(--color-rule)"
                strokeDasharray="2 4"
              />
              <XAxis
                type="number"
                dataKey="x"
                domain={xDomain}
                tick={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fill: "var(--color-muted)",
                }}
                stroke="var(--color-rule)"
                tickLine={false}
                label={{
                  value: "PC1 (production × efficiency)",
                  position: "bottom",
                  offset: 20,
                  style: {
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    fill: "var(--color-muted)",
                    textTransform: "uppercase",
                  },
                }}
              />
              <YAxis
                type="number"
                dataKey="y"
                domain={yDomain}
                tick={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fill: "var(--color-muted)",
                }}
                stroke="var(--color-rule)"
                tickLine={false}
                width={44}
                label={{
                  value: "PC2 (rushing × usage)",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  style: {
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    fill: "var(--color-muted)",
                    textAnchor: "middle",
                    textTransform: "uppercase",
                  },
                }}
              />
              <ZAxis type="number" dataKey="composite" range={[30, 240]} />
              <Tooltip
                cursor={{ stroke: "var(--color-rust)", strokeDasharray: "2 2" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as ArchetypePoint;
                  return (
                    <div className="border border-ink bg-paper px-4 py-3 shadow-[4px_4px_0_0] shadow-ink/10">
                      <p className="font-display text-lg leading-tight">
                        {p.qb_name}
                      </p>
                      <p className="byline mt-1">
                        {p.college} · {p.draft_year}
                      </p>
                      <p className="num text-xs text-muted mt-2">
                        {p.cluster_label.toUpperCase()}
                      </p>
                      <p className="num text-rust text-sm mt-2">
                        {p.composite.toFixed(1)} nfl score
                      </p>
                    </div>
                  );
                }}
              />
              {clusters.map((c) =>
                hidden.has(c.label) ? null : (
                  <Scatter
                    key={c.label}
                    name={c.label}
                    data={grouped.get(c.label) ?? []}
                    fill={c.color}
                    fillOpacity={0.8}
                    stroke="var(--color-ink)"
                    strokeWidth={0.5}
                    isAnimationActive={false}
                  />
                )
              )}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="byline mt-4">
          Dot size encodes NFL composite score · click a cluster legend to
          toggle · n = {points.length}
        </p>
      </div>

      <aside className="col-span-12 md:col-span-4 md:pl-8 md:border-l border-rule">
        <p className="kicker">Archetypes</p>
        <ul className="mt-6 space-y-5">
          {clusters.map((c) => {
            const isHidden = hidden.has(c.label);
            return (
              <li key={c.label}>
                <button
                  type="button"
                  onClick={() => toggle(c.label)}
                  className={`group w-full text-left flex items-start gap-3 ${
                    isHidden ? "opacity-40" : ""
                  }`}
                  aria-pressed={!isHidden}
                >
                  <span
                    className="mt-[7px] inline-block w-3 h-3 rounded-full flex-none"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-lg leading-tight group-hover:text-rust transition-colors">
                        {c.label}
                      </span>
                      <span className="num text-xs text-muted">
                        n={c.count}
                      </span>
                    </span>
                    <span className="block mt-1 text-sm text-ink-soft leading-relaxed">
                      {c.blurb}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
