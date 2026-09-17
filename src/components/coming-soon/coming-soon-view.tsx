import { SiteLogo } from "@/components/layout";
import { comingSoonCopy } from "@/content/coming-soon";
import { LaunchCountdown } from "./launch-countdown";

export function ComingSoonView() {
  return (
    <main
      id="main-content"
      className="relative isolate min-h-[100dvh] overflow-hidden bg-surface-primary text-text-primary"
    >
      <a
        href="#coming-soon-copy"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-[var(--radius-button)] focus:bg-accent focus:px-4 focus:py-2 focus:text-text-inverse"
      >
        Skip to content
      </a>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -right-32 h-[34rem] w-[34rem] rounded-full bg-brand-lavender/55 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 -left-40 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[var(--container-max)] flex-col px-5 pb-8 sm:px-8 lg:px-10">
        <header className="flex min-h-[var(--header-height-mobile)] items-center justify-between gap-6 border-b border-transparent md:min-h-[var(--header-height)]">
          <SiteLogo priority density="header" />
          <p className="hidden text-xs font-semibold tracking-[0.14em] text-text-secondary uppercase sm:block">
            Douala · Cameroon
          </p>
        </header>

        <section className="grid flex-1 content-center gap-10 py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-end lg:gap-16 lg:py-8">
          <div id="coming-soon-copy" className="max-w-xl">
            <p className="text-sm font-semibold tracking-[0.12em] text-accent uppercase">
              {comingSoonCopy.eyebrow}
            </p>
            <h1 className="mt-4 text-[2rem] leading-[1.12] font-bold tracking-tight text-text-primary sm:text-4xl md:text-[3.15rem]">
              {comingSoonCopy.heading}
            </h1>
            <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-text-secondary">
              {comingSoonCopy.supporting}
            </p>
          </div>

          <div>
            <LaunchCountdown />
          </div>
        </section>

        <section className="border-t border-border-soft pt-7 pb-2">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {comingSoonCopy.divisions.map((division) => (
              <li key={division.name}>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-accent uppercase">
                  {division.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {division.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-5">
            <a
              href={comingSoonCopy.contactHref}
              className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-button)] bg-accent px-4 py-2.5 text-[0.95rem] font-semibold text-text-inverse transition-colors hover:bg-accent-hover"
            >
              {comingSoonCopy.contactEmail}
            </a>
            <a
              href={comingSoonCopy.phoneHref}
              className="text-sm font-medium text-text-primary transition-colors hover:text-accent"
            >
              {comingSoonCopy.phone}
            </a>
            <p className="text-sm text-text-secondary">
              {comingSoonCopy.location}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
