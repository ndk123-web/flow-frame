import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mx-auto mt-8 w-full max-w-6xl border-t border-[var(--border)] px-6 py-7 text-sm text-[color:var(--foreground)]/70">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-medium tracking-wide">FlowFrame</p>
        <div className="flex items-center gap-5">
          <Link href="/">Home</Link>
          <Link href="/scenarios/simple-load-balancer">Scenario</Link>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
