"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { portfolioLinks, siteMeta } from "@/content/portfolio";

const NAV_ITEMS = [
  { href: "/", label: "Work", match: (pathname: string) => pathname === "/" || pathname.startsWith("/projects") },
  { href: "/experience", label: "Experience", match: (pathname: string) => pathname.startsWith("/experience") },
];

export function SiteNav() {
  const pathname = usePathname();
  const resumeLink = portfolioLinks[0];

  return (
    <header className="rule-b bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="font-display text-[1.45rem] font-semibold tracking-tight leading-none">
              {siteMeta.name}
            </span>
            <span className="byline hidden md:inline">{siteMeta.title}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 md:gap-7">
            <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
              {NAV_ITEMS.map((item) => {
                const active = item.match(pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`transition-colors ${
                      active ? "text-ink" : "text-ink-soft hover:text-rust"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={siteMeta.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-ink-soft transition-colors hover:text-rust"
              >
                GitHub ↗
              </a>
              <a
                href={resumeLink.href}
                className="inline-flex items-center gap-2 bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-rust"
              >
                {resumeLink.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
