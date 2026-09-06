'use client';

import { useEffect } from 'react';
import { useUI } from '@/context/ui-context';
import { SECTIONS } from '@/constant/sections';

import HeroSection from '@/components/home/HeroSection';
import AboutMeSection from '@/components/home/AboutMeSection';
import SkillsSection from '@/components/home/SkillsSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import ProjectSection from '@/components/home/ProjectSection';
import GithubSection from '@/components/home/GithubSection';
import MediumBlogSection from '@/components/home/MediumBlogSection';
import ContactSection from '@/components/home/ContactSection';

const SECTION_COMPONENTS = {
  hero: HeroSection,
  about: AboutMeSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  projects: ProjectSection,
  github: GithubSection,
  blogs: MediumBlogSection,
  contact: ContactSection,
} as const;

/** Bottom clearance so the fixed dock never covers section content. */
const DOCK_CLEARANCE = 'pb-28 md:pb-24';

export default function Home() {
  const { syncSectionFromScroll } = useUI();

  // Scroll-spy: report which section owns the viewport's upper half so the
  // dock pill, hash, and terminal `open <section>` all follow the scroll.
  useEffect(() => {
    syncSectionFromScroll();
    const onScroll = () => syncSectionFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [syncSectionFromScroll]);

  return (
    <div className={DOCK_CLEARANCE}>
      {/* Same max-width shell the deck used — sections never touch the
          viewport edges; vertical gap replaces the old slide break. */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-2 pt-4 sm:px-4 md:gap-24 md:pt-10">
        {SECTIONS.map(({ id }) => {
          const Section = SECTION_COMPONENTS[id];
          return <Section key={id} />;
        })}
      </div>
    </div>
  );
}
