'use client';

import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: {
      name: string;
      level: string;
    }[];
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle className="text-xl font-bold text-white">{item.title}</CardTitle>
            <CardDescription className="grid grid-cols-1 gap-3">
              {item.description.map((skill, idx) => (
                <motion.span 
                  key={idx} 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }} 
                  transition={{ type: 'spring', stiffness: 300 }}
                  className='border-2 p-3 rounded-md shadow-sm text-center flex flex-col items-center'
                >
                  <span className="text-lg font-semibold text-white">{skill.name}</span>
                  <span className="text-md text-white">({skill.level})</span>
                </motion.span>
              ))}
            </CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-gradient-to-r from-indigo-400 to-purple-400 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-0",
        className
      )}
    >
      <div className="relative z-0">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-black text-xl font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-black tracking-wide leading-relaxed text-md",
        className
      )}
    >
      {children}
    </p>
  );
};