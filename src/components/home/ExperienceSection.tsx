'use client';

import { experienceData } from '@/constant/experienceData';
import { MapPinIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function ExperienceSection() {
  return (
    <div
      id="experience"
      className="relative w-full mt-10 min-h-[60vh] flex items-center overflow-hidden"
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

      <section className="w-full bg-white dark:bg-neutral-950 py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Block */}
          <div className="flex flex-col mb-20 text-left items-start">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">
              Tech Journey
            </h2>
            <div className="h-1.5 w-20 bg-primary mb-6 rounded-full" />
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              My professional progression through backend engineering, system
              architecture, and technical leadership.
            </p>
          </div>

          <div className="relative">
            <div className="space-y-16">
              {experienceData.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative group"
                >
                  <div className="flex flex-col gap-6">
                    {/* Role Header */}
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-neutral-100 dark:border-neutral-900 pb-6">
                      <div className="space-y-1">
                        <h3 className="text-2xl md:text-4xl font-black text-neutral-900 dark:text-neutral-50 tracking-tight leading-none group-hover:text-primary transition-colors">
                          {exp.designation}
                        </h3>
                        <div className="flex items-center gap-3 text-lg md:text-xl font-bold text-neutral-700 dark:text-neutral-300 opacity-80 group-hover:opacity-100 transition-opacity">
                          <span>{exp.company}</span>
                          <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                            <MapPinIcon className="h-4 w-4" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600 whitespace-nowrap">
                        {exp.title}
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="max-w-5xl">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {exp.responsibilities.map((resp, i) => (
                          <li
                            key={i}
                            className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed flex items-start gap-4 group/item"
                          >
                            <span className="mt-2.5 h-1 w-1 rounded-full bg-primary/30 shrink-0 group-hover/item:bg-primary transition-colors" />
                            <span className="group-hover/item:text-neutral-900 dark:group-hover/item:text-neutral-100 transition-colors">
                              {resp}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
