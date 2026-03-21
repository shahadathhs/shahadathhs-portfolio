'use client';

import { Button } from '@/components/ui/button';
import { socialLinks } from '@/constant/socialLinks';
import { contactEmail } from '@/constant/contactInfo';
import { heroData } from '@/constant/heroData';
import { CheckCircle, Copy, FileText, Mail, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { TypingAnimation } from '../magicui/typing-animation';
import { BorderBeam } from '../magicui/border-beam';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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
              <TypingAnimation
                startOnView
                duration={50}
                className="text-4xl leading-tight text-left"
              >
                Get in touch
              </TypingAnimation>
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

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
                  <div className="w-full sm:w-auto flex items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 flex-1">
                    <span className="font-mono text-sm md:text-base text-black dark:text-white truncate">
                      {email}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      className="shrink-0 hover:bg-neutral-100 dark:hover:bg-neutral-900"
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
                    size="lg"
                    className="w-full sm:w-auto rounded-xl font-bold px-8"
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
                <p className="text-neutral-500 dark:text-neutral-400 mb-8">
                  Check out my professional journey and technical stack in
                  detail.
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="mt-auto w-full rounded-xl font-bold border-2"
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
          <div className="mt-12">
            <p className="text-center text-sm font-medium text-neutral-400 dark:text-neutral-600 uppercase tracking-widest mb-8">
              Connect with me on Socials
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
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
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-transparent border border-neutral-100 dark:border-neutral-800 hover:bg-white dark:hover:bg-neutral-800/80 transition-all duration-300"
                >
                  <div
                    className={cn(
                      'p-2 rounded-xl bg-white dark:bg-neutral-800 shadow-sm transition-transform',
                      link.color,
                    )}
                  >
                    <link.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    {link.name}
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
