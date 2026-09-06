'use client';

import { motion } from 'motion/react';
import { skills } from '@/constant/skillsData';

/**
 * dpkg-style manifest — terminal table, no decoration. Category in the left
 * column, package names in mono, summary as the description line beneath.
 */
export default function SkillsSection() {
  return (
    <div
      id="skills"
      className="relative w-full min-h-[60vh] flex items-center overflow-hidden"
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

      <section className="w-full py-10 md:py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto flex flex-col">
          {/* Header */}
          <div className="mb-8 flex flex-col max-w-2xl text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
              stack --list
            </h2>
            <div className="h-1.5 w-20 bg-primary mb-4 rounded-md" />
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-normal">
              Installed packages, refreshed often. Backend systems that reach
              production: languages, frameworks, data layers, AI tooling, and
              the delivery pipeline that carries them.
            </p>
          </div>

          {/* Manifest table — two cards per row */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: (idx % 2) * 0.05 }}
                className="group relative cursor-default rounded-md border-b border-neutral-200/60 px-4 py-5 transition-colors duration-200 first:pt-5 dark:border-neutral-800/60"
              >
                {/* Cell hover — full-cell tint */}
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-md bg-black/[0.03] opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-white/[0.03]"
                />
                <div className="relative">
                  {/* Icon + category — one line */}
                  <div className="flex items-center gap-2.5">
                    <skill.icon className="h-4 w-4 shrink-0 text-primary/80 transition-colors duration-200 group-hover:text-primary" />
                    <h3 className="font-mono text-sm font-bold leading-5 text-neutral-900 transition-colors duration-200 group-hover:text-primary dark:text-neutral-100">
                      {skill.title.toLowerCase()}
                    </h3>
                  </div>

                  {/* Packages */}
                  <p className="mt-2 font-mono text-xs leading-5 text-neutral-800 dark:text-neutral-200">
                    {skill.description.map((tech, i) => (
                      <span key={tech}>
                        {i > 0 && (
                          <span className="mx-1.5 select-none text-neutral-400 dark:text-neutral-600">
                            ·
                          </span>
                        )}
                        {tech}
                      </span>
                    ))}
                  </p>

                  {/* Summary */}
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {skill.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
