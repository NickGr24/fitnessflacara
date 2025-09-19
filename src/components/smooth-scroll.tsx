'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Defer smooth scroll init to next tick to avoid hiding first fold on mount
    let frame: number | null = null;
    const start = () => {
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 0.8,
        smoothTouch: false,
        touchMultiplier: 1.5,
        infinite: false,
        wrapper: window,
        content: document.documentElement,
      });

      function raf(time: number) {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      }
      frame = requestAnimationFrame(raf);

      return () => {
        if (frame) cancelAnimationFrame(frame);
        lenis.destroy();
      };
    };

    const timeout = window.setTimeout(start, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  return <>{children}</>;
}