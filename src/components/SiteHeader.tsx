"use client";

import Image from "next/image";
import Link from "next/link";

type Theme = "light" | "dark";

type SiteHeaderProps = {
  theme: Theme;
  onToggleTheme: () => void;
  showHomeLink?: boolean;
  badgeText?: string;
};

export default function SiteHeader({
  theme,
  onToggleTheme,
  showHomeLink = false,
  badgeText = "Distributed Systems Simulator",
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)]/78 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/75 to-transparent" />

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="FlowFrame Home">
          <div className="rounded-full bg-gradient-to-br from-cyan-500/35 via-sky-500/20 to-blue-500/35 p-[2px] shadow-[0_10px_35px_-18px_var(--glow)]">
            <div className="relative h-11 w-11 overflow-hidden rounded-full bg-[var(--surface-muted)] ring-1 ring-[var(--border)]/90">
              <Image
                src={theme === "dark" ? "/logo/flow-frame-dark.png" : "/logo/flow-frame-light.png"}
                alt="FlowFrame"
                width={44}
                height={44}
                priority
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="leading-tight">
            <p className="text-base font-semibold tracking-tight text-[color:var(--foreground)]">FlowFrame</p>
            <p className="hidden text-[10px] uppercase tracking-[0.2em] text-[color:var(--foreground)]/55 sm:block">
              {badgeText}
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {showHomeLink && (
            <Link
              href="/"
              className="rounded-full border border-[var(--border)] bg-[var(--surface)]/85 px-3.5 py-1.5 text-sm font-medium text-[color:var(--foreground)] transition hover:-translate-y-0.5"
            >
              Home
            </Link>
          )}
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-full border border-[var(--border)] bg-[var(--surface)]/85 px-3.5 py-1.5 text-sm font-medium text-[color:var(--foreground)] transition hover:-translate-y-0.5"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
}
