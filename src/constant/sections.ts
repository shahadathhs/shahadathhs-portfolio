export type SectionId =
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'blogs'
  | 'contact';

export type SectionMeta = {
  id: SectionId;
  label: string;
  /** Background video in public/section-bg/ */
  bg: string;
};

/** Ordered deck sections — also drives the dock and keyboard shortcuts (1-7). */
export const SECTIONS: SectionMeta[] = [
  { id: 'hero', label: 'Home', bg: '/section-bg/hero.mp4' },
  { id: 'about', label: 'About', bg: '/section-bg/about.mp4' },
  { id: 'skills', label: 'Skills', bg: '/section-bg/skills.mp4' },
  { id: 'experience', label: 'Experience', bg: '/section-bg/experience.mp4' },
  { id: 'projects', label: 'Projects', bg: '/section-bg/projects.mp4' },
  { id: 'blogs', label: 'Writing', bg: '/section-bg/blogs.mp4' },
  { id: 'contact', label: 'Contact', bg: '/section-bg/contact.mp4' },
];

export const sectionBg = (id: SectionId): string =>
  SECTIONS.find((s) => s.id === id)?.bg ?? SECTIONS[0].bg;
