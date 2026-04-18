import type { ProjectSection } from "@/content/portfolio";

type ProjectSectionsProps = {
  sections: ProjectSection[];
};

export function ProjectSections({ sections }: ProjectSectionsProps) {
  return (
    <div className="mt-16 border-t border-rule">
      {sections.map((section) => (
        <section
          key={section.title}
          className="grid gap-4 border-b border-rule py-8 md:grid-cols-[220px_1fr]"
        >
          <div>
            <p className="kicker">{section.title}</p>
          </div>
          <div className="space-y-4">
            <p className="text-base leading-8 text-ink-soft">{section.body}</p>
            {section.bullets ? (
              <ul className="space-y-2 text-sm leading-7 text-ink-soft">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span aria-hidden="true" className="text-rust">
                      •
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  );
}
