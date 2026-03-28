'use client';

import { Button } from '@/components/ui/button';
import { socialLinks } from '@/constant/socialLinks';
import { contactEmail } from '@/constant/contactInfo';
import { heroData } from '@/constant/heroData';
import {
  ArrowUpRight,
  CheckCircle,
  Copy,
  FileText,
  LucideIcon,
  Mail,
  Server,
  Terminal,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { otherVersions } from '@/constant/otherVersions';
import { fiverrGigs, fiverrProfileUrl } from '@/constant/fiverr';

const fiverrGigIcons: LucideIcon[] = [Server, Terminal];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = contactEmail;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success('Email copied to clipboard', {
      icon: '📋',
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="contact"
      className="relative w-full mt-10 min-h-[60vh] flex items-center overflow-hidden mb-10"
    >
      {/* Special Borders (Matching Hero) */}
      <div className="absolute inset-x-0 top-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
        <div className="absolute right-0 mx-auto h-px w-40 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-60 w-px bg-gradient-to-b from-transparent via-stone-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-full bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-60 w-px bg-gradient-to-b from-transparent via-stone-500 to-transparent" />
      </div>

      <section className="w-full bg-white dark:bg-neutral-950 py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Block */}
          <div className="flex flex-col mb-12 text-left items-start">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">
              Get in touch
            </h2>
            <div className="h-1.5 w-20 bg-primary mb-6 rounded-md" />
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Email works great for a direct line. Prefer a scoped gig? I&apos;m
              on Fiverr for DevOps and backend API work. Profile and gigs are
              below. I&apos;m always open to a thoughtful message either way.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2 group relative p-8 rounded-md bg-transparent border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-all duration-300 shadow-sm overflow-hidden"
            >
              {/* Subtle Gradient Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/50 transition-all" />

              <div className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <div className="inline-flex p-3 rounded-md bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-black dark:text-white">
                    Drop me an email
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-md italic text-sm">
                    Send me a message for collaborations, inquiries, or just a
                    friendly chat. I typically respond within 24 hours.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch gap-4 mt-auto">
                  <div className="w-full sm:w-auto h-12 flex items-center justify-between gap-4 px-4 rounded-md bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 flex-1 backdrop-blur-sm group-hover:border-primary/20 transition-colors">
                    <span className="font-mono text-sm md:text-base text-neutral-800 dark:text-neutral-200 truncate font-bold">
                      {email}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      className="shrink-0 h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    asChild
                    className="w-full sm:w-auto h-12 rounded-md font-black px-8 shadow-sm tracking-widest uppercase text-xs"
                  >
                    <a href={`mailto:${email}`}>
                      Send Email
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-md bg-transparent border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-all duration-300 shadow-sm overflow-hidden"
            >
              {/* Subtle Gradient Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/50 transition-all" />

              <div className="flex flex-col h-full items-center text-center relative z-10">
                <div className="inline-flex p-3 rounded-md bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black mb-2 text-black dark:text-white">
                  Resume
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-8 text-sm italic">
                  Check out my professional journey and technical stack in
                  detail.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-auto w-full h-12 rounded-md font-black border-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-300 tracking-widest uppercase text-xs"
                >
                  <Link
                    href={heroData.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Background Glow */}
              <div className="absolute -bottom-10 -right-10 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
            </motion.div>
          </div>

          {/* Fiverr */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 group relative p-8 rounded-md bg-transparent border border-neutral-200 dark:border-neutral-800 hover:border-[#1DBF73]/40 transition-all duration-300 shadow-sm overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1DBF73]/30 to-transparent group-hover:via-[#1DBF73]/50 transition-all" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-xl">
                <p className="text-xs font-bold text-[#1DBF73] uppercase tracking-[0.2em] mb-3">
                  Freelance
                </p>
                <h3 className="text-2xl font-black text-neutral-900 dark:text-neutral-50 mb-2">
                  Hire me on Fiverr
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  DevOps and backend API gigs: server setup, deploys, CI/CD, and
                  production-ready APIs. View my profile or open a specific
                  service below.
                </p>
                <Button
                  asChild
                  className="mt-6 h-11 rounded-md font-bold bg-[#1DBF73] text-white hover:bg-[#19a866] shadow-sm"
                >
                  <a
                    href={fiverrProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fiverr profile
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:shrink-0 lg:max-w-sm w-full">
                {fiverrGigs.map((gig, i) => {
                  const Icon = fiverrGigIcons[i] ?? Server;
                  return (
                    <a
                      key={gig.href}
                      href={gig.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid grid-cols-1 gap-3 p-5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-black/[0.02] dark:bg-white/[0.02] hover:border-[#1DBF73]/35 hover:bg-[#1DBF73]/5 transition-all duration-300 w-full"
                    >
                      <div className="p-2.5 rounded-md bg-primary/10 text-primary w-fit">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1">
                          {gig.label}
                        </p>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                          {gig.description}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-[#1DBF73]">
                          View gig
                          <ArrowUpRight className="h-3 w-3" />
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-[#1DBF73]/5 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* Social Grid */}
          <div className="mt-16">
            <p className="text-center text-xs font-bold text-neutral-400 dark:text-neutral-600 uppercase tracking-[0.2em] mb-10">
              Connect with me on Socials
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className={cn(
                    'group/social flex flex-row items-center gap-3 p-3 rounded-md bg-transparent border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/50 transition-all duration-300 shadow-sm relative overflow-hidden',
                  )}
                >
                  <div
                    className={cn(
                      'p-2 rounded-md bg-white dark:bg-neutral-900 shadow-sm transition-transform shrink-0 group-hover/social:scale-110 group-hover/social:bg-primary/5 group-hover/social:text-primary',
                      link.color,
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-black text-neutral-800 dark:text-neutral-200 truncate uppercase tracking-widest transition-colors group-hover/social:text-primary">
                    {link.name}
                  </span>

                  {/* Tiny background glow on hover */}
                  <div className="absolute -bottom-4 -right-4 h-8 w-8 bg-primary/5 rounded-full blur-xl group-hover/social:bg-primary/10 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Other Portfolio Versions Grid - Aligned with Social Grid */}
          <div className="mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-center text-xs font-bold text-neutral-400 dark:text-neutral-600 uppercase tracking-[0.2em] mb-10">
              Visit All Versions of My Portfolio
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {otherVersions.map((version, idx) => (
                <motion.a
                  key={version.name}
                  href={version.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className={cn(
                    'group/version flex flex-row items-center gap-3 p-3 rounded-md bg-transparent border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/50 transition-all duration-300 shadow-sm relative overflow-hidden',
                    idx === 4 &&
                      'max-md:col-span-2 max-md:mx-auto max-md:w-[calc(50%-8px)] md:w-full',
                  )}
                >
                  <div className="p-2 rounded-md bg-white dark:bg-neutral-900 shadow-sm text-neutral-500 group-hover/version:text-primary transition-colors shrink-0 group-hover/version:scale-110 group-hover/version:bg-primary/5">
                    <version.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-black text-neutral-800 dark:text-neutral-200 truncate uppercase tracking-widest group-hover/version:text-primary transition-colors">
                    {version.name}
                  </span>
                  {/* Tiny background glow on hover */}
                  <div className="absolute -bottom-4 -right-4 h-8 w-8 bg-primary/5 rounded-full blur-xl group-hover/version:bg-primary/10 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
