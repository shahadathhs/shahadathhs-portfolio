export type SectionId =
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'github'
  | 'blogs'
  | 'contact';

export type SectionMeta = {
  id: SectionId;
  label: string;
};

/** Ordered deck sections, also drives the dock and keyboard shortcuts (1-8). */
export const SECTIONS: SectionMeta[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'blogs', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];
