import { Activity, Shield, ListFilter, ScanLine, ArrowUpRight } from 'lucide-react';

const ROWS = [
  {
    n: '01',
    icon: Activity,
    title: 'Streams as it happens',
    body: 'New lines arrive as they are written. Pause the stream when you need to read one properly, then pick up where you left off.',
    sample: (
      <p className="mt-4 overflow-x-auto whitespace-nowrap border border-border/60 bg-background px-3 py-2 font-mono text-[11px] text-muted">
        <span className="text-muted/60">21:44:02.401</span>
        <span className="ml-2 text-sky-300">INFO</span>
        <span className="ml-2 text-accent/80">[api-router]</span>
        <span className="ml-2 text-foreground/80">GET /v1/telemetry 200 OK · 18ms</span>
      </p>
    ),
  },
  {
    n: '02',
    icon: Shield,
    title: 'Stays on your machine',
    body: 'No account, no telemetry, no cloud round-trip. Your logs and your environment variables never leave your hardware.',
    sample: null,
  },
  {
    n: '03',
    icon: ListFilter,
    title: 'Find the line you need',
    body: 'Filter by level, search by service or message. The chatty services stop drowning out the one you actually care about.',
    sample: (
      <p className="mt-4 flex flex-wrap gap-1.5">
        <span className="border border-red-400/25 bg-red-400/10 px-2 py-0.5 font-mono text-[11px] text-red-300">ERROR</span>
        <span className="border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted">db-pool</span>
        <span className="border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted">timeout</span>
      </p>
    ),
  },
  {
    n: '04',
    icon: ScanLine,
    title: 'Easy to scan',
    body: 'Every level has its own colour, slow requests stand out, and rows stay put while the stream moves. Your eyes do less work.',
    sample: null,
  },
];

export function Features() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-7xl scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="feature-heading mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-xl text-4xl font-bold leading-[0.95] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
          Made for the way you actually debug
        </h2>
        <p className="max-w-xs font-mono text-xs leading-relaxed text-muted">
          No setup, no subscription. Four things it does well, and nothing it does not.
        </p>
      </div>

      <div className="border-t border-border">
        {ROWS.map((row) => (
          <article
            key={row.n}
            data-cursor="hover"
            className="feature-row group relative overflow-hidden border-b border-border"
          >
            <div className="row-sweep absolute inset-0 bg-accent" aria-hidden="true" />
            <div className="relative grid grid-cols-[auto_1fr_auto] items-start gap-4 px-1 py-7 transition-colors duration-300 group-hover:text-accent-ink sm:grid-cols-[64px_1fr_1.2fr_auto] sm:gap-6 sm:px-4 sm:py-8">
              <span className="font-mono text-xs font-bold text-accent transition-colors duration-300 group-hover:text-accent-ink/60">
                {row.n}
              </span>
              <div>
                <h3 className="flex items-center gap-3 text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent-ink sm:text-2xl">
                  <row.icon className="h-5 w-5 shrink-0 text-accent transition-colors duration-300 group-hover:text-accent-ink" />
                  {row.title}
                </h3>
              </div>
              <div className="col-span-3 sm:col-span-1 sm:col-start-3">
                <p className="text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-accent-ink/80">
                  {row.body}
                </p>
                {row.sample}
              </div>
              <ArrowUpRight className="row-arrow hidden h-6 w-6 text-muted transition-colors duration-300 group-hover:text-accent-ink sm:block" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
