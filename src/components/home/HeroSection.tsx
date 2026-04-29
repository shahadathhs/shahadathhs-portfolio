'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';
import SocialLinks from '../shared/SocialLinks';
import { Button } from '../ui/button';

// import { fiverrProfileUrl } from '@/constant/fiverr'; // Commented out
import { heroData } from '@/constant/heroData';
import { ArrowUpRight, Github, FileText } from 'lucide-react'; // Changed Briefcase to Github

export default function HeroSection() {
  return (
    <div
      id="hero"
      className="relative w-full my-10 min-h-[70vh] flex items-center"
    >
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
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 relative z-10 flex flex-col md:flex-row items-center gap-12">
        {/* Left Side: Text Content */}
        <div className="w-full md:w-3/5 flex flex-col items-start gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-md bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase mb-2">
              {heroData.firstLine}
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
            {heroData.secondLine.split(' ').map((word, i) => (
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
            className="text-lg text-neutral-500 dark:text-neutral-400 max-w-lg leading-relaxed"
          >
            {heroData.footerDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            {/* Fiverr button commented out */}
            {/* <Button
              asChild
              size="lg"
              className="rounded-md h-12 px-8 font-bold bg-[#1DBF73] text-white hover:bg-[#19a866] shadow-lg shadow-[#1DBF73]/25 hover:shadow-[#1DBF73]/40 transition-all duration-300"
            >
              <Link
                href={fiverrProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Fiverr profile
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button> */}
            <Button
              asChild
              size="lg"
              className="rounded-md h-12 px-8 font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-lg shadow-neutral-900/20 dark:shadow-white/20 hover:shadow-neutral-900/30 dark:hover:shadow-white/30 transition-all duration-300"
            >
              <Link
                href="https://github.com/shahadathhs"
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

        {/* Right Side: Visual Element */}
        <div className="hidden md:flex w-full md:w-2/5 justify-center items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute h-80 w-80 bg-primary/20 rounded-full blur-[100px] -z-10"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="p-8 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm shadow-2xl overflow-hidden relative group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="space-y-4 font-mono text-sm">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-2">
                <p className="text-primary">class BackendDeveloper {'{'}</p>
                <p className="pl-4 text-neutral-600 dark:text-neutral-400">
                  name ={' '}
                  <span className="text-yellow-500">&apos;SAJIB&apos;</span>;
                </p>
                <p className="pl-4 text-neutral-600 dark:text-neutral-400">
                  focus ={' '}
                  <span className="text-yellow-500">
                    &apos;Scalability&apos;
                  </span>
                  ;
                </p>
                <p className="pl-4 text-neutral-600 dark:text-neutral-400">
                  stack = [
                  <span className="text-yellow-500">
                    &apos;Node.js&apos;, &apos;Python&apos;
                  </span>
                  ];
                </p>
                <p className="pl-4 text-neutral-600 dark:text-neutral-400">
                  freelance ={' '}
                  <span className="text-yellow-500">
                    &apos;Open Source&apos;
                  </span>
                  ;
                </p>
                <p className="pl-4 text-neutral-600 dark:text-neutral-400">
                  apis = [
                  <span className="text-yellow-500">
                    &apos;FastAPI&apos;, &apos;NestJS&apos;
                  </span>
                  ];
                </p>
                <p className="pl-4 text-neutral-600 dark:text-neutral-400">
                  devops = [
                  <span className="text-yellow-500">
                    &apos;Docker&apos;, &apos;CI/CD&apos;
                  </span>
                  ];
                </p>
                <p className="text-primary">{'}'}</p>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
