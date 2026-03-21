import { Github, Globe, Cloud, ShieldCheck } from 'lucide-react';

export const otherVersions = [
  {
    name: 'GitHub Pages',
    url: 'https://shahadathhs.github.io',
    icon: Github,
    color: 'hover:border-neutral-800 dark:hover:border-white/50',
  },
  {
    name: 'Surge',
    url: 'https://shahadathhs.surge.sh',
    icon: Globe,
    color: 'hover:border-sky-500',
  },
  {
    name: 'Netlify',
    url: 'https://shahadathhs.netlify.app',
    icon: Cloud,
    color: 'hover:border-teal-500',
  },
  {
    name: 'Vercel',
    url: 'https://shahadathhs.vercel.app',
    icon: Globe,
    color: 'hover:border-black dark:hover:border-white',
  },
  {
    name: 'Cloudflare Pages',
    url: 'https://shahadathhs.pages.dev',
    icon: ShieldCheck,
    color: 'hover:border-orange-500',
  },
];
