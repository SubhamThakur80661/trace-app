import { ArrowDown, ArrowRight } from 'lucide-react';
import { LogViewer } from './LogViewer';
import { Magnetic } from '../lib/motion';

const HEADLINE_LINES = ['See it', 'as it', 'happens.'];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <div className="page-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <p
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-40 hidden origin-top-right rotate-90 font-mono text-[11px] tracking-[0.35em] text-muted/50 xl:block"
      >
        TAIL EVERY SERVICE AT ONCE
      </p>

      <div className="relative mx-auto max-w-7xl">
        <p className="hero-fade glass-chip mb-6 inline-flex items-center gap-2 border border-white/15 px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          LOCAL LOG VIEWER
          <span className="text-muted/40">/</span>
          <span className="text-accent">STREAMING BELOW</span>
        </p>

        <h1 className="text-[clamp(3.4rem,11.5vw,10.5rem)] font-bold leading-[0.88] tracking-[-0.04em] text-foreground">
          {HEADLINE_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span
                className={`hero-line-inner block will-change-transform ${
                  i === HEADLINE_LINES.length - 1 ? 'text-accent' : ''
                }`}
              >
                {line}
                {i === HEADLINE_LINES.length - 1 && (
                  <span className="block-cursor ml-3 inline-block h-[0.62em] w-[0.42em] translate-y-[0.08em] bg-accent" aria-hidden="true" />
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="hero-fade max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Trace tails every service in one window, live. Filter by level, search the
            text, pause when something catches your eye. Nothing leaves your machine.
          </p>

          <div className="hero-fade flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-3.5 text-sm font-bold text-accent-ink transition-colors hover:bg-accent-strong"
              >
                See it running
                <ArrowDown className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#how-it-works"
                className="glass-chip inline-flex items-center justify-center gap-2 border border-white/15 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-accent/60"
              >
                How it works
                <ArrowRight className="h-4 w-4" />
              </a>
            </Magnetic>
          </div>
        </div>

        <dl className="hero-fade mt-10 grid grid-cols-2 gap-px border border-white/15 bg-white/15 sm:grid-cols-4">
          {[
            ['Reads', 'local log files'],
            ['Sends', 'nothing anywhere'],
            ['Keeps', 'last 60 lines'],
            ['Runs on', 'macOS and Linux'],
          ].map(([term, value]) => (
            <div key={term} className="glass-chip px-4 py-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
                {term}
              </dt>
              <dd className="mt-1 font-mono text-xs text-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="hero-fade mt-6 font-mono text-[11px] text-muted/70">
          The viewer below is a live demo. It streams sample logs so you can try the
          filters, the search, and the pause button.
        </p>

        <div className="console-reveal mt-6">
          <LogViewer />
        </div>
      </div>
    </section>
  );
}
