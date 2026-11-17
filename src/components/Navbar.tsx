import { Terminal } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5" aria-label="Trace home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
            <Terminal className="h-4 w-4" />
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
            trace<span className="text-accent">.log</span>
          </span>
        </a>

        <nav className="flex items-center gap-4 sm:gap-6" aria-label="Main">
          <a
            href="https://github.com/SubhamThakur80661/trace-app"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-foreground"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">Source</span>
          </a>
          <a
            href="#demo"
            className="rounded-md bg-foreground px-3.5 py-1.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Live demo
          </a>
        </nav>
      </div>
    </header>
  );
}
