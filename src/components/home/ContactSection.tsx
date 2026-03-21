'use client';

import { Button } from '@/components/ui/button';
import { socialLinks } from '@/constant/socialLinks';
import { contactEmail } from '@/constant/contactInfo';
import { heroData } from '@/constant/heroData';
import { CheckCircle, Copy, FileText, Mail, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { BorderBeam } from '../magicui/border-beam';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { otherVersions } from '@/constant/otherVersions';

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
      className="relative w-full mt-10 border rounded overflow-clip scroll-mt-24 mb-10"
    >
      <section className="w-full bg-white dark:bg-neutral-950 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Block */}
          <div className="flex flex-col mb-10">
            <h2 className="text-4xl mb-4 font-bold dark:text-white text-black">
              Get in touch
            </h2>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-base max-w-2xl">
              Whether you have a question about backend architecture, want to
              discuss a new project, or just want to say hi, I&apos;m always
              open to connecting.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Contact Card - Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2 group relative p-8 rounded-xl bg-transparent border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-all duration-300 shadow-sm"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-6">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">
                    Drop me an email
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-md">
                    Send me a message for collaborations, inquiries, or just a
                    friendly chat.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch gap-4 mt-auto">
                  <div className="w-full sm:w-auto h-12 flex items-center justify-between gap-4 px-4 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 flex-1">
                    <span className="font-mono text-sm md:text-base text-black dark:text-white truncate">
                      {email}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      className="shrink-0 h-8 w-8 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-900"
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
                    className="w-full sm:w-auto h-12 rounded-xl font-bold px-8 shadow-sm"
                  >
                    <a href={`mailto:${email}`}>
                      Send Email
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Resume Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-xl bg-transparent border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-all duration-300 shadow-sm"
            >
              <div className="flex flex-col h-full items-center text-center">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-6">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">
                  Resume
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-8 text-sm">
                  Check out my professional journey and technical stack in
                  detail.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-auto w-full h-12 rounded-xl font-bold border-2 hover:bg-primary/5 transition-colors"
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
            </motion.div>
          </div>

          {/* Social Grid */}
          <div className="mt-16">
            <p className="text-center text-xs font-bold text-neutral-400 dark:text-neutral-600 uppercase tracking-[0.2em] mb-10">
              Connect with me on Socials
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                    'flex flex-row items-center gap-3 p-3 rounded-xl bg-transparent border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-300 shadow-sm',
                    idx === 4 &&
                      'max-md:col-span-2 max-md:mx-auto max-md:w-[calc(50%-8px)] md:w-full',
                  )}
                >
                  <div
                    className={cn(
                      'p-2 rounded-lg bg-white dark:bg-neutral-900 shadow-sm transition-transform shrink-0',
                      link.color,
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 truncate">
                    {link.name}
                  </span>
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
                    'flex flex-row items-center gap-3 p-3 rounded-xl bg-transparent border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-300 shadow-sm',
                    idx === 4 &&
                      'max-md:col-span-2 max-md:mx-auto max-md:w-[calc(50%-8px)] md:w-full',
                  )}
                >
                  <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 shadow-sm text-neutral-500 group-hover:text-primary transition-colors shrink-0">
                    <version.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 truncate">
                    {version.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <BorderBeam duration={200} size={250} />
    </div>
  );
}
