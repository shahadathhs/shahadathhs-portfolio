'use client';

import { Button } from '@/components/ui/button';
import { quickLinks } from '@/constant/navigationLinks';
import { ArrowUp, Check, Copy, FileText } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import SocialLinks from './SocialLinks';

import { contactEmail } from '@/constant/contactInfo';
import { heroData } from '@/constant/heroData';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = contactEmail;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Special Borders (Matching Hero/Contact) */}
      <div className="absolute inset-x-0 top-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
        <div className="absolute right-0 mx-auto h-px w-40 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
      </div>

      <div className="container mx-auto pt-16 pb-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 lg:gap-24">
          {/* info */}
          <div className="space-y-6 max-w-md">
            {/* Logo and Description */}
            <div className="space-y-4">
              <Link
                href="/"
                className="font-black italic text-2xl tracking-tighter text-primary"
              >
                {heroData.secondLine}
              </Link>
              <p className="text-sm pt-2 text-neutral-600 dark:text-neutral-400 leading-relaxed italic">
                {heroData.footerDescription}
              </p>
            </div>

            {/* email - Glassmorphic Style (Above Socials) */}
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm w-fit max-w-[200px] md:max-w-xs group hover:border-primary/30 transition-all">
              <p className="text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400 truncate font-mono font-bold tracking-tight">
                {email}
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyEmail}
                className="h-7 w-7 shrink-0 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span className="sr-only">Copy email</span>
              </Button>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <SocialLinks />
            </div>
          </div>

          <div className="flex flex-row justify-between gap-12 lg:gap-24">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.link}
                      className="text-neutral-500 dark:text-neutral-400 text-sm hover:text-primary transition-colors group flex items-center gap-2"
                    >
                      <span className="h-px w-0 bg-primary group-hover:w-3 transition-all duration-300" />
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
                Actions
              </h3>
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="h-10 rounded-md border-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-300 font-black tracking-widest uppercase text-[10px]"
                >
                  <Link
                    target="_blank"
                    href={heroData.resumeLink}
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-2 h-3.5 w-3.5" />
                    View Resume
                  </Link>
                </Button>

                <Button
                  className="hover:cursor-pointer h-10 rounded-md font-black tracking-widest uppercase text-[10px] shadow-sm"
                  onClick={scrollToTop}
                >
                  <ArrowUp className="mr-2 h-3.5 w-3.5" />
                  Back to Top
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="relative mt-20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="absolute inset-x-0 top-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
            <div className="absolute mx-auto h-px w-full bg-gradient-to-r from-transparent via-stone-500/50 to-transparent" />
          </div>
          <p className="text-xs font-bold text-neutral-500 dark:text-neutral-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {heroData.secondLine}. All rights
            reserved.
          </p>
          <p className="text-[10px] font-medium text-neutral-400 dark:text-neutral-600 italic">
            Built with Next.js, React & Heart
          </p>
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
    </footer>
  );
}
