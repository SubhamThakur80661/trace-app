import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-accent selection:text-white">
      <div>
        <Navbar />
        <main>
          <Hero />
          <Features />
        </main>
      </div>

      <footer className="border-t border-border py-8 text-center text-xs text-muted">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Trace App. Designed for local developer tooling.</p>
          <p className="text-muted/60">Acdyon Technical Assessment — Part 2</p>
        </div>
      </footer>
    </div>
  );
}