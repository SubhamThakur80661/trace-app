import { Activity, Shield, ListFilter, ScanLine } from 'lucide-react';

export function Features() {
  return (
    <section id="architecture" className="mx-auto max-w-7xl border-t border-border/60 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Made for the way you actually debug
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          No setup, no subscription. Four things it does well, and nothing it doesn&apos;t.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-border bg-surface/50 p-6 transition-colors hover:border-accent/40">
          <Activity className="mb-4 h-5 w-5 text-accent" />
          <h3 className="mb-2 text-sm font-semibold text-foreground">Streams as it happens</h3>
          <p className="text-xs leading-relaxed text-muted">
            New lines arrive as they&apos;re written. Pause the stream when you need to read one
            properly, then pick up where you left off.
          </p>
          <p className="mt-4 overflow-x-auto whitespace-nowrap rounded-md border border-border/60 bg-background px-3 py-2 font-mono text-[11px] text-muted">
            <span className="text-muted/60">21:44:02.401</span>
            <span className="ml-2 text-sky-300">INFO</span>
            <span className="ml-2 text-accent/80">[api-router]</span>
            <span className="ml-2 text-foreground/80">GET /v1/telemetry 200 OK · 18ms</span>
          </p>
        </article>

        <article className="rounded-xl border border-border bg-surface/50 p-6 transition-colors hover:border-accent/40">
          <Shield className="mb-4 h-5 w-5 text-accent" />
          <h3 className="mb-2 text-sm font-semibold text-foreground">Stays on your machine</h3>
          <p className="text-xs leading-relaxed text-muted">
            No account, no telemetry, no cloud round-trip. Your logs and your environment
            variables never leave your hardware.
          </p>
        </article>

        <article className="rounded-xl border border-border bg-surface/50 p-6 transition-colors hover:border-accent/40">
          <ListFilter className="mb-4 h-5 w-5 text-accent" />
          <h3 className="mb-2 text-sm font-semibold text-foreground">Find the line you need</h3>
          <p className="text-xs leading-relaxed text-muted">
            Filter by level, search by service or message. The chatty services stop drowning
            out the one you actually care about.
          </p>
          <p className="mt-4 flex flex-wrap gap-1.5">
            <span className="rounded border border-red-400/25 bg-red-400/10 px-2 py-0.5 font-mono text-[11px] text-red-300">ERROR</span>
            <span className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted">db-pool</span>
            <span className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted">timeout</span>
          </p>
        </article>

        <article className="rounded-xl border border-border bg-surface/50 p-6 transition-colors hover:border-accent/40">
          <ScanLine className="mb-4 h-5 w-5 text-accent" />
          <h3 className="mb-2 text-sm font-semibold text-foreground">Easy to scan</h3>
          <p className="text-xs leading-relaxed text-muted">
            Every level has its own colour, slow requests stand out, and rows stay put while
            the stream moves. Your eyes do less work.
          </p>
        </article>
      </div>
    </section>
  );
}
