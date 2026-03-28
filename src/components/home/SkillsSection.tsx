'use client';

import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

import { skills } from '@/constant/skillsData';
import { motion } from 'motion/react';

export default function SkillsSection() {
  return (
    <div
      id="skills"
      className="relative w-full mt-10 min-h-[60vh] flex items-center overflow-hidden scroll-mt-24"
    >
      {/* Special Borders (Matching Hero) */}
      <div className="absolute inset-x-0 top-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
        <div className="absolute right-0 mx-auto h-px w-40 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-60 w-px bg-gradient-to-b from-transparent via-stone-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-full bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-60 w-px bg-gradient-to-b from-transparent via-stone-500 to-transparent" />
      </div>

      <section className="w-full bg-white dark:bg-neutral-950 py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Block */}
          <div className="mb-10 flex flex-col max-w-4xl text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">
              Technical Skills
            </h2>
            <div className="h-1.5 w-20 bg-primary mb-6 rounded-md" />
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              I focus on backend systems and getting them to production
              reliably. Here&apos;s a snapshot of the stack I use most,
              especially APIs, data, and delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
            {skills.map((skill, idx) => (
              <SkillCard
                key={skill.title}
                title={skill.title}
                icon={skill.icon}
                description={skill.description}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const SkillCard = ({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string[];
  icon: React.ComponentType<{ className?: string }>;
  index: number;
}) => {
  // Bento col/row spans logic for a repeating staggered look (handles all 8 skills)
  const pattern = [
    'md:col-span-7',
    'md:col-span-5',
    'md:col-span-5',
    'md:col-span-7',
  ];
  const span = pattern[index % 4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        'group relative rounded-md bg-transparent border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-all duration-300 shadow-sm overflow-hidden flex flex-col p-8 min-h-[200px]',
        span,
      )}
    >
      {/* Subtle Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/50 transition-all z-20" />

      {/* Animated SVG Pattern Background (Hidden on Mobile) */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 hidden md:block">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id={`pattern-${index}`}
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* icon and title header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-flex p-3 rounded-md bg-primary/5 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-neutral-900 dark:text-neutral-50 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        {/* tech badges with drifting animation */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
          {description.map((tech) => (
            <motion.div
              key={tech}
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Badge
                variant="outline"
                className="rounded-md px-3 py-1 text-[11px] font-black uppercase tracking-widest bg-black/5 dark:bg-white/5 border-neutral-200/50 dark:border-neutral-800/50 group-hover:border-primary/20 group-hover:text-primary transition-all duration-300 whitespace-nowrap"
              >
                {tech}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Corner Accent */}
      <div className="absolute top-4 right-4 text-[10px] font-mono font-black text-neutral-200 dark:text-neutral-800 select-none opacity-50 group-hover:opacity-100 transition-opacity">
        0{index + 1}
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />
    </motion.div>
  );
};
