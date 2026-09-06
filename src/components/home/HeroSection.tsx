'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';
import SocialLinks from '../shared/SocialLinks';
import { Button } from '../ui/button';

import { heroData } from '@/constant/heroData';
import { ArrowUpRight, Github, FileText } from 'lucide-react';

export default function HeroSection() {
  return (
    <div id="hero" className="relative w-full min-h-[85vh] flex items-center">
      {/* Special Borders — all four edges, same as every other section */}
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

      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10 relative z-10 flex flex-col items-center text-center gap-7">
        {/* Boot lines — SajibOS login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-1.5 font-mono text-xs md:text-sm"
        >
          <p className="text-neutral-700 dark:text-neutral-300">
            <span className="text-primary font-bold">$</span> ssh
            sajib@portfolio
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">
            Welcome to <span className="text-primary font-bold">SajibOS</span>:
            backend engineering environment
          </p>
        </motion.div>

        {/* Name — the one big anchor */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight break-words">
          {heroData.name.split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              className="inline-block mr-4 last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Role — the only live motion line */}
        <div className="h-9 flex items-center justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl font-bold text-primary"
          >
            <Typewriter
              words={heroData.typewriterWords}
              loop={Infinity}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1600}
            />
          </motion.p>
        </div>

        {/* Tagline — one tight paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="max-w-2xl text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed"
        >
          {heroData.tagline}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.95 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-1"
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

        {/* Socials — quiet inline row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex justify-center pt-1"
        >
          <SocialLinks className="justify-center scale-110" />
        </motion.div>
      </div>
    </div>
  );
}
