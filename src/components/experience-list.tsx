import type { ExperienceEntry } from "@/content/portfolio";

type ExperienceListProps = {
  entries: ExperienceEntry[];
};

export function ExperienceList({ entries }: ExperienceListProps) {
  return (
    <div className="border-t border-rule">
      {entries.map((entry) => (
        <section
          key={`${entry.company}-${entry.role}`}
          className="grid gap-5 border-b border-rule py-8 md:grid-cols-[1.1fr_2fr]"
        >
          <div>
            <p className="kicker">{entry.company}</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight">{entry.role}</h2>
            <p className="byline mt-3 normal-case tracking-normal text-muted">
              {entry.location} · {entry.period}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-base leading-8 text-ink-soft">{entry.summary}</p>
            <ul className="space-y-2 text-sm leading-7 text-ink-soft">
              {entry.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span aria-hidden="true" className="text-rust">
                    •
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
