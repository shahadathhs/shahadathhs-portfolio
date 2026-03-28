export const navLinks = [
  { title: 'About', link: '#about' },
  { title: 'Experience', link: '#experience' },
  { title: 'Skills', link: '#skills' },
  { title: 'Projects', link: '#projects' },
  { title: 'Contact', link: '#contact' },
  { title: 'Blogs', link: '#blogs' },
];

/** DOM order for scroll spy (hero first: no nav item, so nothing highlights on hero). */
export const NAV_SECTION_IDS_ORDERED = [
  'hero',
  ...navLinks.map((l) => l.link.replace(/^#/, '')),
] as const;

export const authLinks = [];

// * Dashboard side bar links based on role
export const adminLinks = [];
