"use client";

import React from "react";
import { FadeText } from "@/components/magicui/fade-text";
import { motion } from 'framer-motion';

export async function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col space-y-8 text-center py-5 bg-gray-800">
      <FadeText
        className="text-lg text-gray-300"
        direction="up"
        framerProps={{
          show: { transition: { delay: 0.2 } },
        }}
        text="© 2024 Shahadath Hossen Sajib. All rights reserved."
      />
      <FadeText
        className="text-lg text-gray-300"
        direction="right"
        framerProps={{
          show: { transition: { delay: 0.4 } },
        }}
        text="Built with Next.js and Tailwind CSS"
      />
      <FadeText
        className="text-lg text-gray-300"
        direction="down"
        framerProps={{
          show: { transition: { delay: 0.6 } },
        }}
        text="Designed by Shahadath Hossen Sajib"
      />
      <div className="text-lg text-gray-300">
        With the help of 
        <a href="https://ui.aceternity.com" target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline px-2">Aceternity UI</a> and 
        <a href="https://magicui.design" target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline px-2">Magic UI</a>
      </div>
      <div className="flex justify-center">
        <button
          onClick={scrollToTop}
          className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-400 to-purple-400 px-6 py-3 font-semibold text-white text-lg transition-all duration-300 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Back to Top
        </button>
      </div>
    </div>
  );
}
