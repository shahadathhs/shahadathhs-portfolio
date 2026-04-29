'use client';

import { Button } from '@/components/ui/button';
import { Check, Copy, FileText, Github } from 'lucide-react'; // Changed Briefcase to Github
import Link from 'next/link';
import { useState } from 'react';
import SocialLinks from './SocialLinks';

import { contactEmail } from '@/constant/contactInfo';
// import { fiverrProfileUrl } from '@/constant/fiverr'; // Commented out
import { heroData } from '@/constant/heroData';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = contactEmail;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Special Borders (Matching Hero/Contact) */}
      <div className="absolute inset-x-0 top-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
        <div className="absolute right-0 mx-auto h-px w-40 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
      </div>

      <div className="w-full pt-16 pb-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-16 xl:gap-24">
            {/* Brand + bio + contact */}
            <div className="space-y-6 max-w-2xl w-full">
              <div className="space-y-4">
                <Link
                  href="/"
                  className="font-black italic text-2xl tracking-tighter text-primary inline-block"
                >
                  {heroData.secondLine}
                </Link>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {heroData.footerDescription}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono font-bold tracking-tight break-all">
                  {email}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyEmail}
                  className="h-8 w-8 shrink-0 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy email</span>
                </Button>
              </div>

              <SocialLinks />
            </div>

            {/* Actions: self-contained panel */}
            <aside className="w-full lg:w-[min(100%,280px)] shrink-0">
              <div className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/40 p-6 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
                  Elsewhere
                </p>
                <div className="flex flex-col gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="h-10 w-full justify-center rounded-md border-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-300 font-black tracking-widest uppercase text-[10px]"
                  >
                    <Link
                      target="_blank"
                      href={heroData.resumeLink}
                      rel="noopener noreferrer"
                    >
                      <FileText className="mr-2 h-3.5 w-3.5 shrink-0" />
                      View Resume
                    </Link>
                  </Button>

                  {/* Fiverr button commented out */}
                  {/* <Button
                    asChild
                    variant="outline"
                    className="h-10 w-full justify-center rounded-md border-2 border-[#1DBF73]/30 bg-[#1DBF73]/5 text-[#1a9e5f] dark:text-[#1DBF73] hover:bg-[#1DBF73]/10 hover:border-[#1DBF73]/50 transition-all duration-300 font-black tracking-widest uppercase text-[10px]"
                  >
                    <Link
                      href={fiverrProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Briefcase className="mr-2 h-3.5 w-3.5 shrink-0" />
                      Fiverr profile
                    </Link>
                  </Button> */}
                  <Button
                    asChild
                    variant="outline"
                    className="h-10 w-full justify-center rounded-md border-2 border-neutral-900/20 dark:border-white/20 bg-neutral-900/5 dark:bg-white/5 text-neutral-900 dark:text-white hover:bg-neutral-900/10 dark:hover:bg-white/10 hover:border-neutral-900/30 dark:hover:border-white/30 transition-all duration-300 font-black tracking-widest uppercase text-[10px]"
                  >
                    <Link
                      href="https://github.com/shahadathhs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-3.5 w-3.5 shrink-0" />
                      GitHub
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>

          {/* Copyright */}
          <div className="relative mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="absolute inset-x-0 top-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
              <div className="absolute mx-auto h-px w-full bg-gradient-to-r from-transparent via-stone-500/50 to-transparent" />
            </div>
            <p className="text-xs font-bold text-neutral-500 dark:text-neutral-500 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} {heroData.secondLine}. All
              rights reserved.
            </p>
            <p className="text-[10px] font-medium text-neutral-400 dark:text-neutral-600 italic">
              Built with Next.js, React & Heart
            </p>
          </div>
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
    </footer>
  );
}
