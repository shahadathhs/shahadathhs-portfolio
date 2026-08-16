'use client';

import { useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useUI } from '@/context/ui-context';
import { SECTIONS } from '@/constant/sections';

import HeroSection from '@/components/home/HeroSection';
import AboutMeSection from '@/components/home/AboutMeSection';
import SkillsSection from '@/components/home/SkillsSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import ProjectSection from '@/components/home/ProjectSection';
import MediumBlogSection from '@/components/home/MediumBlogSection';
import ContactSection from '@/components/home/ContactSection';

const SECTION_COMPONENTS = {
  hero: HeroSection,
  about: AboutMeSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  projects: ProjectSection,
  blogs: MediumBlogSection,
  contact: ContactSection,
} as const;

export default function Home() {
  const { activeSection, nextSection, prevSection } = useUI();
  const ActiveSection = SECTION_COMPONENTS[activeSection];

  // Horizontal swipe changes sections; vertical swipes scroll the section.
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) < 64 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) nextSection();
    else prevSection();
  };

  return (
    <div
      className="h-dvh overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-dvh overflow-y-auto"
        >
          {/* Global slide gap — sections never touch the viewport edges.
              Bottom clears the fixed dock (48px + 16px margin). */}
          <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col px-2 pb-20 pt-4 sm:px-4 md:pb-20 md:pt-10">
            <div className="my-auto w-full">
              <ActiveSection />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {SECTIONS.find((s) => s.id === activeSection)?.label} section
      </span>
    </div>
  );
}
