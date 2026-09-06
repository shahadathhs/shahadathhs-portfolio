'use client';

import { motion } from 'motion/react';
import { MapPinIcon } from 'lucide-react';
import { experienceData } from '@/constant/experienceData';

export default function ExperienceSection() {
  return (
    <div
      id="experience"
      className="relative w-full min-h-[60vh] flex items-center overflow-hidden"
    >
      {/* Special Borders (Matching Hero) - Preserved */}
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
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col">
          {/* Header Block */}
          <div className="flex flex-col mb-8 text-left items-start">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
              uptime --log
            </h2>
            <div className="h-1.5 w-20 bg-primary mb-4 rounded-md" />
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-normal">
              three shops, a lot of shipped services. The uptime log.
            </p>
          </div>

          {/* Roles — all three, original design */}
          <div className="relative flex-1 flex flex-col gap-10">
            {experienceData.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col gap-6"
              >
                {/* Role Header */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-neutral-100 dark:border-neutral-900 pb-6">
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-neutral-50 tracking-tight leading-none">
                      {exp.designation}
                    </h3>
                    <div className="flex items-center gap-3 text-sm md:text-base font-bold text-neutral-700 dark:text-neutral-300 opacity-80">
                      <span>{exp.company}</span>
                      <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                    {exp.title}
                  </div>
                </div>

                {/* Responsibilities — single column for readability */}
                <ul className="flex flex-col gap-3.5">
                  {exp.responsibilities.map((resp, i) => (
                    <li
                      key={i}
                      className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed flex items-start gap-4"
                    >
                      <span className="mt-2.5 h-1 w-1 rounded-full bg-primary/30 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
