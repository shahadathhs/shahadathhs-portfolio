'use client';

import { useEffect, useRef } from 'react';

export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Only track on devices that actually have a pointer (skip touch).
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    el.style.setProperty('--spot-x', `${window.innerWidth / 2}px`);
    el.style.setProperty('--spot-y', `${window.innerHeight / 2}px`);

    let frame = 0;
    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty('--spot-x', `${e.clientX}px`);
        el.style.setProperty('--spot-y', `${e.clientY}px`);
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[5]"
      style={{
        background:
          'radial-gradient(550px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.06), transparent 70%)',
      }}
    />
  );
}
