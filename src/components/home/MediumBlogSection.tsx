'use client';

import { useEffect, useState } from 'react';
import { fetchMediumPosts, type MediumPost } from '@/services/medium-service';
import { AnimatePresence, motion } from 'motion/react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

import BlogSkeleton from '../skeleton/BlogSkeleton';

const PER_SLIDE = 2;

export default function MediumBlogSection() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchMediumPosts('shahadathhs');
      setPosts(data.slice(0, 4));
      setLoading(false);
    };
    loadPosts();
  }, []);

  const total = Math.ceil(posts.length / PER_SLIDE);
  const slide = posts.slice(active * PER_SLIDE, active * PER_SLIDE + PER_SLIDE);

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  if (posts.length === 0 && !loading) {
    return null;
  }

  return (
    <div
      id="blogs"
      className="relative w-full min-h-[50vh] flex items-center overflow-hidden"
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

      <section className="w-full py-10 md:py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col">
          {/* Header Block */}
          <div className="flex flex-col mb-8 text-left items-start">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
              Latest Blogs
            </h2>
            <div className="h-1.5 w-20 bg-primary mb-4 rounded-md" />
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-normal">
              Insights on backend architecture, API design, and modern web
              development.
            </p>
          </div>

          {/* Blog slider — two cards per slide */}
          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {loading
                  ? Array.from({ length: PER_SLIDE }).map((_, i) => (
                      <BlogSkeleton key={i} />
                    ))
                  : slide.map((post) => (
                      <div key={post.link} className="group h-full">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col h-full p-6 rounded-md bg-transparent border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-all duration-300 shadow-sm relative overflow-hidden"
                        >
                          {/* Subtle Gradient Accent */}
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/50 transition-all" />

                          <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between gap-4">
                              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                <Calendar className="h-3.5 w-3.5" />
                                {new Date(post.pubDate).toLocaleDateString(
                                  'en-US',
                                  {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  },
                                )}
                              </span>
                              <div className="flex flex-wrap gap-2 justify-end">
                                {post.categories.slice(0, 1).map((category) => (
                                  <span
                                    key={category}
                                    className="px-2 py-0.5 bg-primary/5 text-primary border border-primary/10 rounded-md text-[10px] font-bold uppercase tracking-tighter"
                                  >
                                    {category}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <h3 className="text-xl font-black text-neutral-900 dark:text-neutral-50 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                              {post.title}
                            </h3>

                            <p className="text-neutral-500 dark:text-neutral-400 line-clamp-3 text-sm leading-relaxed italic">
                              {post.contentSnippet ||
                                'Read the full deep dive on Medium for more technical insights...'}
                            </p>
                          </div>

                          <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
                            <div className="flex items-center text-primary font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                              Read Story
                              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                            </div>
                          </div>

                          {/* Background Glow */}
                          <div className="absolute -bottom-10 -right-10 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
                        </a>
                      </div>
                    ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls — click only (arrows/swipe belong to the deck) */}
          {!loading && total > 1 && (
            <div className="mt-8 flex flex-col gap-3 border-t border-neutral-200/80 dark:border-neutral-800/80 sm:flex-row sm:items-center sm:justify-between sm:gap-4 pt-4">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: total }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show blogs ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active
                        ? 'w-5 bg-primary'
                        : 'w-1.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600'
                    }`}
                  />
                ))}
              </div>

              {/* Counter + arrows + medium link */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] font-bold tabular-nums tracking-widest text-neutral-500 dark:text-neutral-400">
                  {String(active + 1).padStart(2, '0')} /{' '}
                  {String(total).padStart(2, '0')}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous blogs"
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next blogs"
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <a
                  href="https://medium.com/@shahadathhs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300 sm:w-auto"
                >
                  All on Medium
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Single-slide fallback: just the Medium link */}
          {!loading && total <= 1 && (
            <div className="mt-8 flex justify-center border-t border-neutral-200/80 dark:border-neutral-800/80 pt-4">
              <a
                href="https://medium.com/@shahadathhs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
              >
                All on Medium
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
