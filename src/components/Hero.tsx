import { Terminal, ArrowRight, Download } from 'lucide-react';
import { LogViewer } from './LogViewer';

export function Hero() {
  return (
    <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-xs text-muted mb-6">
          <Terminal className="h-3.5 w-3.5 text-accent" />
          <span>Native macOS & Linux Build Available</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight">
          Your local logs, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
            finally readable.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Stop piping terminal output into chaotic text files. Trace parses microservice console output locally in real time with instant filtering and structural highlighting.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Download className="h-4 w-4" />
            Download for macOS
          </a>
          <a
            href="#architecture"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground hover:bg-border/40 transition-all"
          >
            How it Works
            <ArrowRight className="h-4 w-4 text-muted" />
          </a>
        </div>
      </div>

      <LogViewer />
    </section>
  );
}