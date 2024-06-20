"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Typewriter } from "react-simple-typewriter";
import ButtonWrapper from "../sub/SpotlightButton";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="mt-4 bg-gradient-to-br from-slate-300 to-slate-500 
        py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-white md:text-5xl"
      >
        Hi, This is
      </motion.h1>
      
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 2.5,
          ease: "easeInOut",
        }}
        className="mt-2 bg-gradient-to-br from-slate-300 to-slate-500 
        py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-white md:text-5xl"
      >
        Shahadath Hossen Sajib
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2,
          duration: 3.5,
          ease: "easeInOut",
        }}
        className="mt-2 py-4 text-center text-3xl font-medium tracking-tight text-white md:text-5xl"
      >
        <Typewriter
          words={['A MERN Stack Developer', 'A Front-End Developer']}
          loop={Infinity}
          cursor
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 3,
          duration: 4.5,
          ease: "easeInOut",
        }}
        className="mt-6 flex justify-center"
      >
        <a
          href="https://drive.google.com/file/d/1W-zqL_skTthSrsRyP5-t0RfcDWnrgLVX/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-bold text-white text-xl transition-all duration-300 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          View My Resume
        </a>
      </motion.div>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative mt-52 flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400 "
        ></motion.div>
 
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 "></div>
      </div>
 
      <div className="relative z-50 flex -translate-y-40 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};