"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import React from "react";
import { LampDemo } from "./ui/lamp";

export default function About() {
  return (
    <div>
      {/* first section */}
      <LampDemo />
      {/* second section */}
      <HeroHighlight className="space-y-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-2xl px-4 md:text-2xl lg:text-4xl font-bold text-white leading-relaxed lg:leading-snug text-center mx-auto"
        >
          I build intuitive, dynamic web applications
          <br />
          <Highlight className="text-black">focused on user experience.</Highlight>
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-2xl px-4 md:text-2xl lg:text-4xl font-bold text-white  leading-relaxed lg:leading-snug text-center mx-auto"
        >
          Proficient in the MERN stack,
          <br />
          <Highlight className="text-black">I create seamless digital experiences.</Highlight>
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-2xl px-4 md:text-2xl lg:text-4xl font-bold text-white  leading-relaxed lg:leading-snug text-center mx-auto"
        >
          I innovate with each project,
          <br />
          <Highlight className="text-black">utilizing modern technologies for impactful solutions.</Highlight>
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-2xl px-4 md:text-2xl lg:text-4xl font-bold text-white  leading-relaxed lg:leading-snug text-center mx-auto"
        >
          Driven by a passion for technology,
          <br />
          <Highlight className="text-black">I embrace challenges and continuous improvement.</Highlight>
        </motion.h1>
      </HeroHighlight>
    </div>
  );
}