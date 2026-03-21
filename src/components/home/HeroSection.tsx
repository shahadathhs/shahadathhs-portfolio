'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';
import SocialLinks from '../shared/SocialLinks';
import { Button } from '../ui/button';

import { heroData } from '@/constant/heroData';

export default function HeroSection() {
  const firstLine = heroData.firstLine.split(' ');
  const secondLine = heroData.secondLine.split(' ');
  const stagger = 0.2; // seconds between each word
  const duration = 0.6; // each word’s animation duration
  const firstTotal = firstLine.length * stagger + duration;

  return (
    <div
      id="hero"
      className="relative mx-auto my-10 flex flex-col items-center justify-center"
    >
      {/* top */}
      <div className="absolute inset-x-0 top-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
        <div className="absolute right-0 mx-auto h-px w-40 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
      </div>

      {/* left */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-60 w-px bg-gradient-to-b from-transparent via-stone-500 to-transparent" />
      </div>

      {/* bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-full bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
      </div>

      {/* right */}
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-60 w-px bg-gradient-to-b from-transparent via-stone-500 to-transparent" />
      </div>

      {/* content */}
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-6xl dark:text-slate-300">
          {firstLine.map((word, i) => (
            <motion.span
              key={`f-${i}`}
              initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                duration,
                delay: i * stagger,
                ease: 'easeInOut',
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
          <br />
          {secondLine.map((word, i) => (
            <motion.span
              key={`s-${i}`}
              initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                duration,
                delay: firstTotal + i * stagger,
                ease: 'easeInOut',
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-xl md:text-3xl font-normal text-slate-700 dark:text-slate-300"
        >
          <Typewriter
            words={heroData.typewriterWords}
            loop={Infinity}
            cursor
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </motion.p>

        {/* cta buttons */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium dark:text-white text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black  dark:hover:bg-gray-900">
            <Link href="#projects">See My Work</Link>
          </button>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium dark:text-white text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black  dark:hover:bg-gray-900">
            <Link href="#contact">Contact Me</Link>
          </button>
        </motion.div>

        {/* Resume */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="hover:scale-120 transition-transform duration-500"
          >
            <Link
              target="_blank"
              href={heroData.resumeLink}
              rel="noopener noreferrer"
            >
              View My Resume
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1.5,
          }}
          className="flex items-center justify-center"
        >
          <SocialLinks className="mt-8" />
        </motion.div>
      </div>
    </div>
  );
}
