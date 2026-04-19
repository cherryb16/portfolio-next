import Link from "next/link";
import type { LinkSet } from "@/content/portfolio";

type ProjectLinksProps = {
  links: LinkSet[];
};

export function ProjectLinks({ links }: ProjectLinksProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => {
        const className =
          link.emphasis === "primary"
            ? "inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-paper transition-colors hover:bg-rust"
            : "inline-flex items-center gap-2 rounded-full border border-rule bg-white/70 px-5 py-3 text-sm text-ink-soft transition-colors hover:border-rust hover:bg-paper-deep/60 hover:text-rust";

        if (link.external || link.href.startsWith("mailto:") || link.href.endsWith(".pdf")) {
          return (
            <a
              key={link.label}
              href={link.href}
              className={className}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          );
        }

        return (
          <Link key={link.label} href={link.href} className={className}>
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
