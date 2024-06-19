'use client'

import Image from 'next/image';
import React, { ReactNode } from 'react';
import { RiMenuFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

interface ContentLayoutProps {
  children: ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  const links = <>
    <motion.li 
    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 300 }}
    ><a href="#aboutMe">About Me</a></motion.li>

    <motion.li 
    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 300 }}
    ><a href="#skills">Skills</a></motion.li>

    <motion.li 
    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 300 }}
    ><a href="#projects">Projects</a></motion.li>

    <motion.li 
    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 300 }}
    ><a href="#education">Education</a></motion.li>

    <motion.li 
    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 300 }}
    ><a href="#contact">Contact</a></motion.li>
  </>

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar fixed h-20 flex justify-between items-center">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost text-3xl">
              <RiMenuFill />
            </label>
          </div> 
          {/* logo */}
          <div className="flex-1 px-2 mx-2">
            <Image src="/image.png" alt="Logo image" width={80} height={70} className='rounded-lg shadow-md' />
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal text-xl">
              {/* Navbar menu content here */}
              {links}
              <ThemeToggle />
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <div>
          {children}
        </div>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-60 h-screen flex items-center justify-center bg-blue-500 text-white text-2xl">
          {/* Sidebar content here */}
          <ThemeToggle />
          {links}
        </ul>
      </div>
    </div>
  );
}
