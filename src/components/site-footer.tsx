export function SiteFooter() {
  return (
    <footer className="rule-t mt-24 bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <p className="font-display text-2xl leading-tight tracking-tight">
              Let&rsquo;s compare notes.
            </p>
            <p className="byline mt-2">
              braydenmcherry@gmail.com · Utah · {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex gap-5 text-sm">
            <a
              className="text-ink-soft hover:text-rust transition-colors"
              href="mailto:braydenmcherry@gmail.com"
            >
              Email
            </a>
            <a
              className="text-ink-soft hover:text-rust transition-colors"
              href="https://linkedin.com/in/braydencherry"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="text-ink-soft hover:text-rust transition-colors"
              href="https://github.com/cherryb16"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
