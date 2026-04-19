import { portfolioLinks, siteMeta } from "@/content/portfolio";

export function SiteFooter() {
  return (
    <footer className="rule-t mt-24 bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr] md:items-end">
          <div className="max-w-2xl">
            <p className="kicker">Portfolio footer</p>
            <p className="mt-4 font-display text-2xl leading-tight tracking-tight">
              Recruiter-friendly, product-minded, and built to hold up under follow-up questions.
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              Based in {siteMeta.location}. Best initial proof set: Trade Insights Pro,
              QB Translation, Ballard Center CRM, and ShadowRock analytics work.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm md:justify-end">
            {portfolioLinks.map((link) => (
              <a
                key={link.label}
                className="text-ink-soft transition-colors hover:text-rust"
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
