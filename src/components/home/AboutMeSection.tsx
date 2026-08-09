'use client';

import { type AboutHighlightCard, aboutBands } from '@/constant/aboutMe';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
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
  return (
    <div id="about" className="relative w-full mt-10 overflow-hidden">
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

      <section className="w-full py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
              About Me
            </h2>
            <div className="h-1.5 w-20 bg-primary mt-4 rounded-md" />
          </motion.div>

          <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
            {aboutBands.map((band, rowIdx) => {
              const flip = rowIdx % 2 === 1;
              return (
                <motion.div
                  key={rowIdx}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: 0.05 }}
                  className={cn(
                    'relative flex flex-col gap-8 lg:gap-12 lg:items-stretch',
                    flip ? 'lg:flex-row-reverse' : 'lg:flex-row',
                    rowIdx > 0 &&
                      'pt-16 md:pt-20 border-t border-neutral-200/90 dark:border-neutral-800/90',
                  )}
                >
                  <div className="w-full lg:w-1/2 flex flex-col justify-center min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-primary tabular-nums">
                        {String(rowIdx + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-primary/40 to-transparent" />
                    </div>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {band.paragraph}
                    </p>
                  </div>

                  <div
                    className={cn(
                      'w-full lg:w-1/2 grid gap-4 min-w-0',
                      band.cards.length > 1
                        ? 'grid-cols-1 sm:grid-cols-2'
                        : 'grid-cols-1 sm:max-w-md',
                    )}
                  >
                    {band.cards.map((card, i) => (
                      <motion.div
                        key={`${rowIdx}-${card.title}`}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{
                          duration: 0.45,
                          delay: 0.08 + i * 0.06,
                        }}
                      >
                        <FeatureCard feature={card} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
