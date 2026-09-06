'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { skills } from '@/constant/skillsData';

const PER_SLIDE = 4;

export default function SkillsSection() {
  const [active, setActive] = useState(0);
  const total = Math.ceil(skills.length / PER_SLIDE);
  const slide = skills.slice(
    active * PER_SLIDE,
    active * PER_SLIDE + PER_SLIDE,
  );

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

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

          {/* Rows slider — 4 categories per slide */}
          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex flex-col divide-y divide-neutral-200/80 dark:divide-neutral-800/80 border-y border-neutral-200/80 dark:border-neutral-800/80"
              >
                {slide.map((skill) => {
                  const idx = skills.indexOf(skill);
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.title}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      className="group flex flex-col gap-2.5 py-4 sm:py-3.5"
                    >
                      {/* Category + tech — one full-width row */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                        <div className="flex items-center gap-3 sm:w-52 sm:shrink-0">
                          <span className="font-mono text-[11px] font-bold tabular-nums text-primary/70">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="inline-flex p-2 rounded-md bg-primary/5 text-primary transition-all duration-300 group-hover:bg-primary/10">
                            <Icon className="h-4 w-4" />
                          </span>
                          <h3 className="text-xs font-black uppercase tracking-[0.18em] text-neutral-900 dark:text-neutral-50 transition-colors group-hover:text-primary">
                            {skill.title}
                          </h3>
                        </div>

                        <div className="flex flex-wrap gap-2 pl-8 sm:pl-0">
                          {skill.description.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-neutral-200/60 bg-black/5 px-2.5 py-1 text-xs font-bold tracking-wide text-neutral-700 transition-colors duration-200 hover:border-primary/40 hover:text-primary dark:border-neutral-800/60 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-primary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Description — full row width */}
                      <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                        {skill.summary}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls — click only (arrows/swipe belong to the deck) */}
          {total > 1 && (
            <div className="mt-8 flex items-center justify-between border-t border-neutral-200/80 dark:border-neutral-800/80 pt-4">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: total }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show skills ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active
                        ? 'w-5 bg-primary'
                        : 'w-1.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600'
                    }`}
                  />
                ))}
              </div>

              {/* Counter + arrows */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] font-bold tabular-nums tracking-widest text-neutral-500 dark:text-neutral-400">
                  {String(active + 1).padStart(2, '0')} /{' '}
                  {String(total).padStart(2, '0')}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous skills"
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next skills"
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
