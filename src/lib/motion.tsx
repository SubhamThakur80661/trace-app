import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react';
import gsap from 'gsap';

export function motionAllowed(): boolean {
  if (typeof window === 'undefined') return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function finePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: fine)').matches;
}

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/* Element leans toward the cursor and springs back on leave. Desktop only. */
export function Magnetic({ children, strength = 6, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed() || !finePointer()) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    const onMove = (e: globalThis.MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(gsap.utils.clamp(-strength, strength, relX * 0.35));
      yTo(gsap.utils.clamp(-strength, strength, relY * 0.35));
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ display: 'inline-block', willChange: 'transform' }}>
      {children}
    </div>
  );
}

/* Shared spotlight handler: feeds cursor position into --mx/--my CSS vars. */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const setters = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed() || !finePointer()) return;
    setters.current = {
      x: gsap.quickTo(el, '--mx', { duration: 0.5, ease: 'power3.out' }) as unknown as (v: number) => void,
      y: gsap.quickTo(el, '--my', { duration: 0.5, ease: 'power3.out' }) as unknown as (v: number) => void,
    };
  }, []);

  const onMove = (e: MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    if (setters.current) {
      setters.current.x(px);
      setters.current.y(py);
    } else {
      el.style.setProperty('--mx', `${px}%`);
      el.style.setProperty('--my', `${py}%`);
    }
  };

  return { ref, onMove };
}
