const OTHER_WORK: {
  title: string;
  blurb: string;
  tag: string;
  status: string;
}[] = [
  {
    title: "Trade Insights Pro",
    blurb:
      "Next.js + Firebase trading journal that grounds every entry in live brokerage data.",
    tag: "Fintech · Genkit · SnapTrade",
    status: "Closed beta",
  },
  {
    title: "ShadowRock Analytics Platform",
    blurb:
      "Reusable BigQuery pipelines and Salesforce dashboards powering anonymized client engagements.",
    tag: "BigQuery · Salesforce",
    status: "In production",
  },
  {
    title: "Storage Scholars Operations",
    blurb:
      "Process redesign for peak-season college storage: $20K+ revenue, 30% efficiency gains.",
    tag: "Operations · Team lead",
    status: "Complete",
  },
  {
    title: "Rags to Robes",
    blurb:
      "Resource navigator helping community leaders connect families with faith-based services.",
    tag: "Social impact · Ballard Center",
    status: "Piloting",
  },
];

export function WorkList() {
  return (
    <ul className="mt-10 divide-y divide-rule">
      {OTHER_WORK.map((item) => (
        <li
          key={item.title}
          className="group grid grid-cols-12 gap-4 py-6 items-baseline"
        >
          <div className="col-span-12 md:col-span-4">
            <p className="font-display text-2xl tracking-tight">
              {item.title}
            </p>
            <p className="byline mt-1">{item.tag}</p>
          </div>
          <p className="col-span-12 md:col-span-6 text-ink-soft leading-relaxed">
            {item.blurb}
          </p>
          <p className="col-span-12 md:col-span-2 md:text-right byline">
            {item.status}
          </p>
        </li>
      ))}
    </ul>
  );
}
