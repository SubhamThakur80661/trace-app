import { Terminal } from 'lucide-react';
import { Magnetic } from '../lib/motion';

export function Navbar() {
  return (
    <header className="nav-intro glass-nav sticky top-0 z-50 w-full">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5" aria-label="Trace home">
          <span className="flex h-7 w-7 items-center justify-center bg-accent text-accent-ink">
            <Terminal className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="font-mono text-sm font-bold tracking-tight text-foreground">
            trace<span className="text-accent">.log</span>
          </span>
        </a>

        <nav className="flex items-center gap-2 sm:gap-3" aria-label="Main">
          <a
            href="#how-it-works"
            className="hidden rounded-sm px-2 py-1 font-mono text-[11px] tracking-wide text-muted transition-colors hover:text-foreground md:inline"
          >
            HOW IT WORKS
          </a>
          <a
            href="https://github.com/SubhamThakur80661/trace-app"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-sm px-2 py-1 font-mono text-[11px] tracking-wide text-muted transition-colors hover:text-foreground"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">SOURCE</span>
          </a>
          <Magnetic strength={4}>
            <a
              href="#demo"
              className="inline-block bg-accent px-3.5 py-1.5 font-mono text-[11px] font-bold tracking-wide text-accent-ink transition-colors hover:bg-accent-strong"
            >
              LIVE DEMO
            </a>
          </Magnetic>
        </nav>
      </div>
    </header>
  );
}
