"use client";

import { useMemo, useState } from "react";

export type LeaderRow = {
  qb_name: string;
  draft_year: number;
  draft_pick: number;
  college: string;
  composite: number;
  recruitScaled: number | null;
  components: {
    label: string;
    value: number;
  }[];
};

type SortKey = "composite" | "qb_name" | "draft_pick" | "recruit";
type SortDir = "asc" | "desc";

export function Leaderboard({ rows }: { rows: LeaderRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("composite");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expanded, setExpanded] = useState<string | null>(null);

  const sorted = useMemo(() => {
    const copy = [...rows];
    const dirMul = sortDir === "asc" ? 1 : -1;
    copy.sort((a, b) => {
      if (sortKey === "qb_name") {
        return a.qb_name.localeCompare(b.qb_name) * dirMul;
      }
      if (sortKey === "draft_pick") {
        return (a.draft_pick - b.draft_pick) * dirMul;
      }
      if (sortKey === "recruit") {
        const av = a.recruitScaled ?? -1;
        const bv = b.recruitScaled ?? -1;
        return (av - bv) * dirMul;
      }
      return (a.composite - b.composite) * dirMul;
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  const maxScore = Math.max(...rows.map((r) => r.composite));

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "qb_name" || key === "draft_pick" ? "asc" : "desc");
    }
  };

  const indicator = (key: SortKey) =>
    sortKey === key ? (sortDir === "asc" ? "↑" : "↓") : "";

  return (
    <div className="border border-rule bg-paper">
      <div className="grid grid-cols-12 gap-2 px-4 md:px-6 py-3 text-[11px] rule-b byline">
        <button
          className="col-span-5 md:col-span-4 text-left hover:text-ink"
          onClick={() => toggleSort("qb_name")}
        >
          QB {indicator("qb_name")}
        </button>
        <button
          className="hidden md:block col-span-2 text-left hover:text-ink"
          onClick={() => toggleSort("draft_pick")}
        >
          Pick {indicator("draft_pick")}
        </button>
        <button
          className="hidden md:block col-span-2 text-left hover:text-ink"
          onClick={() => toggleSort("recruit")}
        >
          Recruit {indicator("recruit")}
        </button>
        <button
          className="col-span-7 md:col-span-4 text-right hover:text-ink"
          onClick={() => toggleSort("composite")}
        >
          NFL score {indicator("composite")}
        </button>
      </div>
      <ul>
        {sorted.map((row) => {
          const isOpen = expanded === row.qb_name;
          const barPct = (row.composite / maxScore) * 100;
          return (
            <li key={row.qb_name} className="rule-b last:border-b-0">
              <button
                type="button"
                onClick={() =>
                  setExpanded((prev) =>
                    prev === row.qb_name ? null : row.qb_name
                  )
                }
                className="w-full grid grid-cols-12 gap-2 px-4 md:px-6 py-3 items-center text-left hover:bg-paper-deep/40 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="col-span-5 md:col-span-4 min-w-0">
                  <span className="font-display text-lg truncate block">
                    {row.qb_name}
                  </span>
                  <span className="byline block truncate normal-case tracking-normal">
                    {row.college} · {row.draft_year}
                  </span>
                </span>
                <span className="hidden md:block col-span-2 num text-sm text-ink-soft">
                  #{row.draft_pick}
                </span>
                <span className="hidden md:block col-span-2 num text-sm text-ink-soft">
                  {row.recruitScaled == null
                    ? "—"
                    : row.recruitScaled.toFixed(1)}
                </span>
                <span className="col-span-7 md:col-span-4 flex items-center gap-3 justify-end">
                  <span className="flex-1 h-[6px] bg-paper-deep relative">
                    <span
                      className="absolute inset-y-0 left-0 bg-rust"
                      style={{ width: `${barPct}%` }}
                    />
                  </span>
                  <span className="num text-rust text-base tabular-nums w-14 text-right">
                    {row.composite.toFixed(1)}
                  </span>
                  <span
                    aria-hidden
                    className={`text-muted transition-transform ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  >
                    ›
                  </span>
                </span>
              </button>
              {isOpen && (
                <div className="px-4 md:px-6 pb-6 pt-2 bg-paper-deep/25">
                  <p className="kicker !text-ink-soft">Component breakdown</p>
                  <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {row.components.map((c) => (
                      <li
                        key={c.label}
                        className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-sm"
                      >
                        <span className="text-ink-soft whitespace-nowrap">
                          {c.label}
                        </span>
                        <span className="h-[4px] bg-paper-deep relative">
                          <span
                            className="absolute inset-y-0 left-0 bg-ink/60"
                            style={{
                              width: `${Math.max(0, Math.min(1, c.value)) * 100}%`,
                            }}
                          />
                        </span>
                        <span className="num text-xs text-muted w-10 text-right">
                          {c.value.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
