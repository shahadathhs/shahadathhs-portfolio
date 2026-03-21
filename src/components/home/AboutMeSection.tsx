'use client';

import { aboutMeBio, features } from '@/constant/aboutMe';
import { motion } from 'motion/react';
import { BorderBeam } from '../magicui/border-beam';
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
      className="relative w-full mt-10 border rounded overflow-clip scroll-mt-24"
    >
      <section className="w-full bg-white dark:bg-neutral-950 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Block */}
          <div className="mb-10 flex flex-col">
            <h2 className="text-4xl mb-4 font-bold dark:text-white text-black">
              About Me
            </h2>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-justify text-base">
              {aboutMeBio}
            </p>
          </div>

          {/* Text & Features */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.2 } },
                }}
              >
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5 },
                      },
                    }}
                  >
                    <Card className="hover:shadow-xl transform hover:-translate-y-1 transition bg-transparent border-neutral-100 dark:border-neutral-800 rounded-xl">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <feature.icon className="w-6 h-6 text-blue-500" />
                        <CardTitle className="text-lg font-semibold">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <BorderBeam duration={200} size={250} />
    </div>
  );
}
