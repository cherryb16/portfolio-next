"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import { QbCaseCharts } from "@/components/projects/qb-case-charts";

type QbCaseChartsShellProps = ComponentProps<typeof QbCaseCharts>;

const ClientOnlyQbCaseCharts = dynamic(
  () =>
    import("@/components/projects/qb-case-charts").then((mod) => mod.QbCaseCharts),
  {
    ssr: false,
    loading: () => (
      <div className="mt-10 border border-rule bg-paper-deep/30 p-8 text-sm text-ink-soft">
        Interactive charts load on the client to keep the production build stable.
      </div>
    ),
  }
);

export function QbCaseChartsShell(props: QbCaseChartsShellProps) {
  return <ClientOnlyQbCaseCharts {...props} />;
}
