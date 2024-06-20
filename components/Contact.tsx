"use client";
import React from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/utils/cn";
import { motion } from 'framer-motion';

export function Contact() {
  return (
    <div className="h-96 mt-10 relative w-full overflow-hidden  flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full  z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes className="z-0" />
      
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="mt-6 flex justify-center z-0"
      >
        <a
          href="https://www.linkedin.com/in/shahadathhs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white text-2xl transition-all duration-300 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          My LinkedIn Profile
        </a>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 2.5,
          ease: "easeInOut",
        }}
        className="mt-6 flex justify-center z-0"
      >
        <a
          href="https://github.com/shahadathhs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white text-2xl transition-all duration-300 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          My GitHub Profile
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2,
          duration: 3.5,
          ease: "easeInOut",
        }}
        className="mt-2 py-4 text-center md:text-3xl font-medium tracking-tight text-white z-0"
      >
        Mail me at: <span className='text-blue-500 font-bold'>shahadathhossensajib732@gmail.com</span>
      </motion.div>
    </div>
  );
}
