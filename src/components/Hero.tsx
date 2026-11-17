import { Terminal, ArrowRight } from 'lucide-react';
import { LogViewer } from './LogViewer';

export function Hero() {
  return (
    <section className="relative px-4 pt-14 pb-16 sm:px-6 lg:px-8">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
            <Terminal className="h-3.5 w-3.5 text-accent" />
            Local-first log viewer — macOS &amp; Linux
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your local logs, <br />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">
              finally readable.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Trace tails every service in one window, live. Filter by level, search the text,
            pause when something catches your eye. Nothing leaves your machine.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#demo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-strong sm:w-auto"
            >
              See it running
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#architecture"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-border/40 sm:w-auto"
            >
              How it works
            </a>
          </div>

          <p className="mt-4 text-xs text-muted/70">
            The viewer below is a live demo — it streams sample logs so you can try the filters.
          </p>
        </div>

        <LogViewer />
      </div>
    </section>
  );
}
