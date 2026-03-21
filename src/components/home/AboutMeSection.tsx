'use client';

import { aboutMeBio, features } from '@/constant/aboutMe';
import { motion } from 'motion/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

export default function AboutMeSection() {
  return (
    <div
      id="about"
      className="relative w-full mt-10 min-h-[60vh] flex items-center overflow-hidden"
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

      <section className="w-full bg-white dark:bg-neutral-950 py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left Side: Bio Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-start gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
                  About Me
                </h2>
                <div className="h-1.5 w-20 bg-primary mt-4 rounded-md" />
              </motion.div>

              <div className="space-y-6">
                {aboutMeBio.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed text-justify"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Right Side: Features Grid */}
            <div className="w-full lg:w-1/2">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      show: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.4 },
                      },
                    }}
                  >
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
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
