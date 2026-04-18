import Link from "next/link";

export function SiteNav() {
  return (
    <header className="rule-b bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center justify-between py-5">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="font-display text-[1.35rem] font-semibold tracking-tight leading-none">
              Brayden Cherry
            </span>
            <span className="byline hidden md:inline">Product · Analytics</span>
          </Link>
          <nav className="flex items-center gap-7 text-sm">
            <Link
              href="/"
              className="text-ink-soft hover:text-rust transition-colors"
            >
              Work
            </Link>
            <Link
              href="/about"
              className="text-ink-soft hover:text-rust transition-colors"
            >
              About
            </Link>
            <a
              href="https://github.com/cherryb16"
              target="_blank"
              rel="noreferrer"
              className="text-ink-soft hover:text-rust transition-colors"
            >
              GitHub ↗
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
