import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { finePointer, motionAllowed } from '../lib/motion';

/* Dual-layer cursor that follows the native pointer: instant dot, lagging ring.
   Desktop with a fine pointer only. The native cursor is never hidden. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || !motionAllowed() || !finePointer()) return;

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, input, [data-cursor="hover"]');
      ring.classList.toggle('is-hover', Boolean(interactive));
    };

    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const onEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <div aria-hidden="true" className="max-md:hidden">
      <div ref={dotRef} className="trace-cursor-dot" />
      <div ref={ringRef} className="trace-cursor-ring" />
    </div>
  );
}
