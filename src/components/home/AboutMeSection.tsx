'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { aboutBands, aboutMeSubtitle } from '@/constant/aboutMe';
import type { AboutHighlightCard } from '@/constant/aboutMe';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

function FeatureCard({ feature }: { feature: AboutHighlightCard }) {
  return (
    <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 bg-transparent border-neutral-200 dark:border-neutral-800 rounded-md group overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="pb-2">
        <div className="p-2.5 rounded-md bg-primary/10 text-primary w-fit mb-2 group-hover:scale-110 transition-transform">
          <feature.icon className="w-5 h-5" />
        </div>
        <CardTitle className="text-base font-bold text-neutral-800 dark:text-neutral-100">
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-neutral-500 dark:text-neutral-400">
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default function AboutMeSection() {
  const [active, setActive] = useState(0);
  const total = aboutBands.length;
  const band = aboutBands[active];

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  return (
    <div
      id="about"
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
          {/* Header + subheader */}
          <div className="mb-8 flex flex-col max-w-2xl text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
              About Me
            </h2>
            <div className="h-1.5 w-20 bg-primary mb-4 rounded-md" />
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-normal">
              {aboutMeSubtitle}
            </p>
          </div>

          {/* Band slider — one message per slide */}
          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12"
              >
                {/* Cards swap sides each slide — even: right, odd: left */}
                {active % 2 === 1 && (
                  <div className="grid gap-4 min-w-0 sm:grid-cols-2 lg:order-first">
                    {band.cards.map((card) => (
                      <FeatureCard key={card.title} feature={card} />
                    ))}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-primary tabular-nums">
                      {String(active + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-primary/40 to-transparent" />
                  </div>
                  <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-normal">
                    {band.paragraph}
                  </p>
                </div>

                {active % 2 === 0 && (
                  <div className="grid gap-4 min-w-0 sm:grid-cols-2">
                    {band.cards.map((card) => (
                      <FeatureCard key={card.title} feature={card} />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls — click only (arrows/swipe belong to the deck) */}
          <div className="mt-8 flex items-center justify-between border-t border-neutral-200/80 dark:border-neutral-800/80 pt-4">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {aboutBands.map((b, i) => (
                <button
                  key={b.paragraph}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show band ${i + 1}`}
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
                  aria-label="Previous"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
