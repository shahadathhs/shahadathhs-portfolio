'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';
import SocialLinks from '../shared/SocialLinks';
import { Button } from '../ui/button';

import { heroData } from '@/constant/heroData';
import { ArrowUpRight, Github, FileText } from 'lucide-react';

const segmentColor: Record<string, string> = {
  default: 'text-neutral-600 dark:text-neutral-400',
  key: 'text-sky-500',
  string: 'text-yellow-500',
  punct: 'text-neutral-500',
};

export default function HeroSection() {
  return (
    <div id="hero" className="relative w-full min-h-[60vh] flex items-center">
      {/* Special Borders (Kept as requested) */}
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

      {/* Main Content Area */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-20 relative z-10 flex flex-col md:flex-row items-center gap-12">
        {/* Left Side: Text Content */}
        <div className="w-full md:w-3/5 flex flex-col items-start gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-block px-4 py-1.5 rounded-md bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase">
              {heroData.greeting}
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for work
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
            {heroData.name.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <div className="h-10 md:h-12 flex items-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xl md:text-2xl font-medium text-neutral-600 dark:text-neutral-400"
            >
              <Typewriter
                words={heroData.typewriterWords}
                loop={Infinity}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-lg text-neutral-500 dark:text-neutral-400 max-w-lg leading-normal"
          >
            {heroData.tagline}
          </motion.p>

          {/* Focus stats — Microservices & AI/LLM share one row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {heroData.quickStats.slice(1).map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-extrabold text-primary">
                  {stat.value}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            <Button
              asChild
              size="lg"
              className="rounded-md h-12 px-8 font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-lg shadow-neutral-900/20 dark:shadow-white/20 hover:shadow-neutral-900/30 dark:hover:shadow-white/30 transition-all duration-300"
            >
              <Link
                href={heroData.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub Profile
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-md h-12 px-8 font-bold border-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-300"
            >
              <Link
                href={heroData.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-2 h-4 w-4" />
                View Resume
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-8"
          >
            <SocialLinks className="justify-start scale-110 origin-left" />
          </motion.div>
        </div>

        {/* Right Side: experience + code window (visible on all sizes) */}
        <div className="relative flex w-full flex-col items-start justify-center gap-5 lg:w-2/5">
          {/* Experience — About-card style left accent bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="relative w-full max-w-sm overflow-hidden border border-neutral-200 bg-transparent py-2 pl-5 pr-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 dark:border-neutral-800 group"
          >
            <div className="absolute top-0 left-0 h-full w-1 bg-primary transition-opacity group-hover:opacity-100" />
            <span className="text-2xl font-extrabold leading-none text-primary md:text-3xl">
              {heroData.quickStats[0].value}
            </span>
            <span className="ml-3 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {heroData.quickStats[0].label}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full max-w-sm p-5 border border-neutral-200 dark:border-neutral-800 bg-white/10 dark:bg-black/30 backdrop-blur-md shadow-2xl overflow-hidden relative group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="space-y-3 font-mono text-xs">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>
              <div className="space-y-1">
                <p className="whitespace-nowrap text-primary">
                  class {heroData.codeSnippet.className} {'{'}
                </p>
                {heroData.codeSnippet.lines.map((line, idx) => (
                  <p
                    key={idx}
                    className="whitespace-nowrap text-neutral-600 dark:text-neutral-400"
                    style={{ paddingLeft: `${(line.indent ?? 0) * 12}px` }}
                  >
                    {line.segments.map((seg, i) => (
                      <span
                        key={i}
                        className={segmentColor[seg.variant ?? 'default']}
                      >
                        {seg.text}
                      </span>
                    ))}
                  </p>
                ))}
                <p className="whitespace-nowrap text-primary">{'}'}</p>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
