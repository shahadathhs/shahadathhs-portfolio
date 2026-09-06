'use client';

import { motion } from 'motion/react';
import {
  aboutCards,
  aboutMeSubtitle,
  aboutParagraphs,
} from '@/constant/aboutMe';
import type { AboutHighlightCard } from '@/constant/aboutMe';

/**
 * FeatureCard styled as a systemd unit — SajibOS runs these services.
 * Status dot pulses green; header reads like `systemctl status` output.
 */
function FeatureCard({
  feature,
  index,
}: {
  feature: AboutHighlightCard;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative h-full overflow-hidden rounded-md border border-neutral-200 bg-transparent p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg dark:border-neutral-800"
    >
      <div className="absolute top-0 left-0 h-full w-1 bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200">
          {feature.service}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          active
        </span>
      </div>
      <div className="mb-1 flex items-center gap-2">
        <feature.icon className="h-4 w-4 shrink-0 text-primary" />
        <h3 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          {feature.title}
        </h3>
      </div>
      <p className="text-sm leading-normal text-neutral-500 dark:text-neutral-400">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function AboutMeSection() {
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
              whoami
            </h2>
            <div className="h-1.5 w-20 bg-primary mb-4 rounded-md" />
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-normal">
              {aboutMeSubtitle}
            </p>
          </div>

          {/* Bio — man-page style, full section width */}
          <div className="mb-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              aria-hidden
              className="mb-3 font-mono text-xs text-neutral-700 dark:text-neutral-300"
            >
              <span className="font-bold text-primary">$</span> man sajib
            </motion.p>
            <div className="flex flex-col gap-4 border-l-2 border-neutral-200 pl-4 dark:border-neutral-800">
              {aboutParagraphs.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-sm md:text-base leading-normal text-neutral-600 dark:text-neutral-400"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Services — systemctl status output, 2x2 grid */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              aria-hidden
              className="mb-3 font-mono text-xs text-neutral-700 dark:text-neutral-300"
            >
              <span className="font-bold text-primary">$</span> systemctl status
              sajib
            </motion.p>
            <div className="grid gap-4 sm:grid-cols-2">
              {aboutCards.map((card, i) => (
                <FeatureCard key={card.service} feature={card} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
