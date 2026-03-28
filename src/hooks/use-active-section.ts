'use client';

import { useEffect, useState } from 'react';

/**
 * Highlights the nav item for the section that has reached the scroll top
 * (just below the sticky nav). Uses simple getBoundingClientRect logic
 * to determine which section is currently in view.
 */
export function useActiveSection(orderedSectionIds: readonly string[]) {
  const [activeHash, setActiveHash] = useState<string>('');

  useEffect(() => {
    const compute = () => {
      // Trigger when section top is at or slightly above viewport center
      // This ensures the section that's most visible gets highlighted
      const threshold = window.innerHeight * 0.3;

      // Find the last section whose top is above the threshold
      let current = '';
      for (const raw of orderedSectionIds) {
        const id = raw.replace(/^#/, '');
        const section = document.getElementById(id);
        if (!section) continue;
        if (section.getBoundingClientRect().top <= threshold) {
          current = `#${id}`;
        }
      }
      setActiveHash(current);
    };

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [orderedSectionIds]);

  return activeHash;
}
