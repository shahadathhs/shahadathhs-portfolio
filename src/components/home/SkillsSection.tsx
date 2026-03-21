'use client';

import { cn } from '@/lib/utils';
import { BorderBeam } from '../magicui/border-beam';
import { Badge } from '../ui/badge';

import { skills } from '@/constant/skillsData';

export default function SkillsSection() {
  return (
    <div
      id="skills"
      className="relative w-full mt-10 border rounded overflow-clip scroll-mt-24"
    >
      <section className="w-full bg-white dark:bg-neutral-950 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Block */}
          <div className="mb-10 flex flex-col max-w-4xl">
            <h2 className="text-4xl mb-4 font-bold dark:text-white text-black">
              Technical Skills
            </h2>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300 max-w-2xl text-base">
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
      <BorderBeam duration={200} size={250} />
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
