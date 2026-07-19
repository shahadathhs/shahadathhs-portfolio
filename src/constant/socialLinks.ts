import { Github, Linkedin } from 'lucide-react';
import { IconBrandMedium, IconBrandX } from '@tabler/icons-react';
import { LeetCodeIcon } from '@/components/shared/icons/LeetCodeIcon';

// Fiverr import commented out
// import { fiverrProfileUrl } from '@/constant/fiverr';

export const socialLinks = [
  // Fiverr entry commented out
  // {
  //   name: 'Fiverr',
  //   href: fiverrProfileUrl,
  //   icon: Briefcase,
  //   color: 'text-[#1DBF73]',
  // },
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
    name: 'LeetCode',
    href: 'https://leetcode.com/u/shahadathhs/',
    icon: LeetCodeIcon,
    color: 'text-orange-500',
  },
];
