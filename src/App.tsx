import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Ticker } from './components/Ticker';
import { Cursor } from './components/Cursor';
import { motionAllowed } from './lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motionAllowed()) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
      intro
        .from('.nav-intro', { y: -16, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from(
          '.hero-line-inner',
          { yPercent: 115, duration: 1.15, stagger: 0.09 },
          '-=0.25',
        )
        .from(
          '.hero-fade',
          { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
          '-=0.7',
        )
        .from(
          '.console-reveal',
          { clipPath: 'inset(0 0 100% 0)', y: 40, duration: 1.2 },
          '-=0.5',
        );

      gsap.from('.feature-heading', {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.feature-heading', start: 'top 88%' },
      });

      gsap.utils.toArray<HTMLElement>('.feature-row').forEach((row, i) => {
        gsap.from(row, {
          y: 36,
          opacity: 0,
          duration: 0.8,
          delay: Math.min(i * 0.06, 0.18),
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 90%' },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="ambient-page flex min-h-screen flex-col bg-background text-foreground">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Features />
      </main>

      <footer className="overflow-hidden border-t border-border pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p
            aria-hidden="true"
            className="outline-word select-none whitespace-nowrap text-[clamp(4rem,14.5vw,13rem)] font-bold leading-none tracking-[-0.04em]"
          >
            trace.log
          </p>
          <div className="glass mb-6 flex flex-col gap-2 border border-white/15 px-4 py-6 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Trace. A local log viewer. The demo streams sample logs.</p>
            <p className="text-muted/60">Acdyon Technical Assessment, Part 2</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
