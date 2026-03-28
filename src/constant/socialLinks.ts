import { Briefcase, Github, Linkedin, Globe } from 'lucide-react';
import { IconBrandMedium, IconBrandX } from '@tabler/icons-react';

import { fiverrProfileUrl } from '@/constant/fiverr';

export const socialLinks = [
  {
    name: 'Fiverr',
    href: fiverrProfileUrl,
    icon: Briefcase,
    color: 'text-[#1DBF73]',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shahadathhs/',
    icon: Linkedin,
    color: 'text-blue-600',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/shahadathhs',
    icon: Github,
    color: 'text-neutral-900 dark:text-white',
  },
  {
    name: 'Twitter (X)',
    href: 'https://x.com/shahadathhs',
    icon: IconBrandX,
    color: 'text-black dark:text-white',
  },
  {
    name: 'Medium',
    href: 'https://medium.com/@shahadathhs',
    icon: IconBrandMedium,
    color: 'text-black dark:text-white',
  },
  {
    name: 'Substack',
    href: 'https://shahadathhs.substack.com',
    icon: Globe,
    color: 'text-orange-500',
  },
];
