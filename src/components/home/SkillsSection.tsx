'use client';

import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

import { skills } from '@/constant/skillsData';

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
            <div className="h-1.5 w-20 bg-primary mb-6 rounded-full" />
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              I always look forward to continuous learning and improving myself.
              Here&apos;s a snapshot of the tools and technologies I work with.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
            {skills.map((skill, idx) => (
              <Skill
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

type SkillProps = {
  title: string;
  description: string[];
  icon: React.ComponentType<{ className?: string }>;
  index: number;
};

const Skill = ({ title, description, icon: Icon, index }: SkillProps) => (
  <div
    className={cn(
      'flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800',
      (index === 0 || index === 4) && 'lg:border-l',
      index < 4 && 'lg:border-b lg:border-t',
      index >= 4 && 'lg:border-b',
      index === 4 && 'lg:border-t-0', // Avoid double border if it wraps weirdly, but grid-cols-4 handles it
    )}
  >
    {/* hover overlay */}
    <div
      className={cn(
        'absolute inset-0 h-full w-full transition duration-200 pointer-events-none',
        index < 4
          ? 'bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent opacity-0 group-hover/feature:opacity-100'
          : 'bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent opacity-0 group-hover/feature:opacity-100',
      )}
    />

    {/* icon */}
    <div className="mb-4 px-10 text-neutral-600 dark:text-neutral-400 relative z-10">
      <Icon className="h-8 w-8" />
    </div>

    {/* title */}
    <div className="relative z-10 mb-2 px-10 text-lg font-bold">
      <div className="absolute left-0 inset-y-0 h-6 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 transition-all duration-200 origin-center group-hover/feature:h-8 group-hover/feature:bg-blue-500" />
      <span className="inline-block transition-transform duration-200 group-hover/feature:translate-x-2 text-neutral-800 dark:text-neutral-100">
        {title}
      </span>
    </div>

    {/* render each description item as a badge */}
    <div className="flex flex-wrap gap-2 px-10 relative z-10">
      {description.map((tech) => (
        <Badge key={tech} variant={'outline'}>
          {tech}
        </Badge>
      ))}
    </div>
  </div>
);
