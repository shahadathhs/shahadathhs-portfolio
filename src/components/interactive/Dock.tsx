'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import {
  Briefcase,
  FolderGit2,
  Github,
  Home,
  Mail,
  Newspaper,
  User,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { useUI } from '@/context/ui-context';
import { SECTIONS, type SectionId } from '@/constant/sections';

const ICONS: Record<SectionId, LucideIcon> = {
  hero: Home,
  about: User,
  skills: Wrench,
  experience: Briefcase,
  projects: FolderGit2,
  github: Github,
  blogs: Newspaper,
  contact: Mail,
};

export default function Dock() {
  const { activeSection, navigate, nextSection, prevSection, terminalOpen } =
    useUI();
  const pathname = usePathname();

  // The dock only makes sense where the deck lives.
  const isHome = pathname === '/';

  // Keyboard: 1-8 jump, arrows step. Ignored while typing in the terminal.
  useEffect(() => {
    if (!isHome) return;
    const onKey = (e: KeyboardEvent) => {
      if (terminalOpen) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const num = Number(e.key);
      if (Number.isInteger(num) && num >= 1 && num <= SECTIONS.length) {
        navigate(SECTIONS[num - 1].id);
        return;
      }
      if (e.key === 'ArrowRight') nextSection();
      if (e.key === 'ArrowLeft') prevSection();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isHome, navigate, nextSection, prevSection, terminalOpen]);

  if (!isHome) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
    >
      <div className="flex items-center gap-0.5 rounded-full border border-border bg-background/70 p-1 shadow-lg backdrop-blur-xl sm:gap-1 sm:p-1.5">
        {SECTIONS.map((s, i) => {
          const Icon = ICONS[s.id];
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => navigate(s.id)}
              aria-label={`${s.label} (${i + 1})`}
              aria-current={isActive ? 'page' : undefined}
              title={`${s.label} — ${i + 1}`}
              className={`group relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 sm:h-9 sm:w-9 ${
                isActive
                  ? 'text-background'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="dock-active-pill"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  className="absolute inset-0 rounded-full bg-foreground"
                />
              )}
              <Icon
                className="relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4"
                strokeWidth={2.2}
              />

              {/* Tooltip — dock is bottom-fixed, so it always opens upward */}
              <span className="pointer-events-none absolute bottom-full mb-3 whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-xs font-bold uppercase tracking-widest text-foreground opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
