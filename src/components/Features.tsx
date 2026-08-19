import { Zap, Shield, Cpu, Sliders } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Sub-millisecond Parsing',
    description: 'Built in Rust to handle high-throughput log streams without dropping frames or freezing your terminal environment.'
  },
  {
    icon: Shield,
    title: '100% Local Processing',
    description: 'Zero telemetry, zero cloud backends. Your sensitive environment variables and system payloads never leave your hardware.'
  },
  {
    icon: Sliders,
    title: 'Pattern Auto-detection',
    description: 'Automatically formats JSON, stack traces, and HTTP request logs into clean, readable key-value columns.'
  },
  {
    icon: Cpu,
    title: 'Minimal Memory Overhead',
    description: 'Consumes less than 35MB RAM, even when buffering up to one million log lines in ring memory.'
  }
];

export function Features() {
  return (
    <section id="architecture" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border/60">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
          Engineered for developer workflows
        </h2>
        <p className="mt-3 text-sm text-muted">
          No cloud setup, no API keys, no subscription tiers. Just run `trace` in your local project root.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feat) => (
          <div key={feat.title} className="p-6 rounded-xl border border-border bg-surface/50 hover:border-accent/40 transition-colors">
            <feat.icon className="h-5 w-5 text-accent mb-4" />
            <h3 className="text-sm font-semibold text-foreground mb-2">{feat.title}</h3>
            <p className="text-xs text-muted leading-relaxed">{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}