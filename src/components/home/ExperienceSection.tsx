'use client';

import { experienceData } from '@/constant/experienceData';
import { BorderBeam } from '../magicui/border-beam';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function ExperienceSection() {
  return (
    <div
      id="experience"
      className="relative w-full mt-10 border rounded overflow-clip scroll-mt-24"
    >
      <section className="w-full bg-white dark:bg-neutral-950 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Block */}
          <div className="mb-16">
            <h2 className="text-4xl mb-4 font-bold text-black dark:text-white max-w-4xl">
              My Tech Journey
            </h2>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-base text-justify max-w-2xl">
              Over the past 2 years, I&apos;ve grown through hands-on experience
              and real-world projects. Here&apos;s a look at some key milestones
              that shaped my path so far. Always open to exciting opportunities.
              Let&apos;s connect!
            </p>
          </div>

          <div className="space-y-0">
            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className="relative flex gap-6 pb-12 border-l-2 border-neutral-100 dark:border-neutral-800 pl-8 last:border-l-transparent last:pb-0"
              >
                {/* Dot */}
                <div className="absolute left-[-13px] top-0 h-6 w-6 rounded-full bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                  <div className="h-2.5 w-2.5 rounded-full bg-white dark:bg-neutral-950" />
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex-1 p-6 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-transparent hover:border-primary/30 transition-all duration-300 shadow-sm group border-l-4 border-l-primary/40"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-black dark:text-white group-hover:text-primary transition-colors">
                          {exp.designation}
                        </h3>
                        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 font-medium">
                          <span>{exp.company}</span>
                          <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                          <div className="flex items-center gap-1 text-sm font-normal">
                            <MapPinIcon className="h-3.5 w-3.5" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary self-start">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          {exp.title}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 pt-2">
                      {exp.responsibilities.map((resp, i) => (
                        <li
                          key={i}
                          className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 flex items-start gap-3"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BorderBeam duration={200} size={250} />
    </div>
  );
}
