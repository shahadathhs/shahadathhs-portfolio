"use client";
import React, { useState } from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/utils/cn";
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';
import IconCloud from "@/components/magicui/icon-cloud";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("shahadathhossensajib732@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-10 relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes className="z-0" />

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-background px-20 pb-20 pt-8">
          <IconCloud iconSlugs={slugs} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1,
              ease: "easeInOut",
            }}
            className="mt-6 flex justify-center z-0"
          >
            <a
              href="https://www.linkedin.com/in/shahadathhs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-400 to-purple-400 px-6 py-3 font-semibold text-white text-2xl transition-all duration-300 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <FaLinkedin className="mr-2" /> LinkedIn
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="mt-6 flex justify-center z-0"
          >
            <a
              href="https://github.com/shahadathhs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-400 to-purple-400 px-6 py-3 font-semibold text-white text-2xl transition-all duration-300 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
              duration: 2,
              ease: "easeInOut",
            }}
            className="mt-6 flex justify-center z-0"
          >
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-400 to-purple-400 px-6 py-3 font-semibold text-white text-2xl transition-all duration-300 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <FaEnvelope className="mr-2" />
              <span className="ml-2 text-sm">shahadathhossensajib732@gmail.com</span>
              <FiCopy className="ml-2" />
            </button>
            {copied && <span className="text-green-500 ml-2">Copied!</span>}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
