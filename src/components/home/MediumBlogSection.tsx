'use client';

import { useEffect, useState } from 'react';
import { fetchMediumPosts, type MediumPost } from '@/services/medium-service';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

import BlogSkeleton from '../skeleton/BlogSkeleton';

export default function MediumBlogSection() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchMediumPosts('shahadathhs');
      setPosts(data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  const total = posts.length;
  const safeIdx = Math.min(active, Math.max(total - 1, 0));
  const post = posts[safeIdx];

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
          {/* Header + action */}
          <div className="mb-8 flex flex-col gap-4 text-left sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-start">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
                Latest Blogs
              </h2>
              <div className="h-1.5 w-20 bg-primary mb-4 rounded-md" />
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-normal">
                Insights on backend architecture, API design, and modern web
                development.
              </p>
            </div>
            <a
              href="https://medium.com/@shahadathhs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
            >
              All on Medium
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Blog slider — one post per slide, flat like Experience */}
          <div className="relative flex-1">
            {loading ? (
              <BlogSkeleton />
            ) : (
              post && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={post.link}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="group flex flex-col gap-6"
                  >
                    {/* Post header — meta row */}
                    <div className="flex flex-col justify-between gap-2 border-b border-neutral-100 pb-6 dark:border-neutral-900 md:flex-row md:items-baseline">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                          <span className="font-bold tracking-[0.2em] text-primary tabular-nums">
                            {String(safeIdx + 1).padStart(2, '0')}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
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
                        </div>
                        <h3 className="max-w-2xl pl-8 text-xl font-black leading-tight tracking-tight text-neutral-900 transition-colors group-hover:text-primary md:text-2xl dark:text-neutral-50">
                          {post.title}
                        </h3>
                      </div>

                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 self-start text-[10px] font-bold uppercase tracking-widest text-primary transition-opacity hover:opacity-80 md:self-auto"
                      >
                        Read
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>

                    {/* Excerpt + tags */}
                    <div className="flex flex-col gap-4">
                      <p className="max-w-3xl text-sm leading-normal text-neutral-600 dark:text-neutral-400 md:text-base">
                        {post.contentSnippet}
                        {'… '}
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-primary transition-opacity hover:opacity-80"
                        >
                          read full story
                          <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5" />
                        </a>
                      </p>
                      {post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.categories.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border border-neutral-200/60 bg-black/5 px-2.5 py-1 text-xs font-bold tracking-wide text-neutral-700 dark:border-neutral-800/60 dark:bg-white/5 dark:text-neutral-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )
            )}
          </div>

          {/* Slider controls — click only (arrows/swipe belong to the deck) */}
          {!loading && total > 1 && (
            <div className="mt-8 flex items-center justify-between border-t border-neutral-200/80 dark:border-neutral-800/80 pt-4">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {posts.map((p, i) => (
                  <button
                    key={p.link}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show post ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === safeIdx
                        ? 'w-5 bg-primary'
                        : 'w-1.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600'
                    }`}
                  />
                ))}
              </div>

              {/* Counter + arrows */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] font-bold tabular-nums tracking-widest text-neutral-500 dark:text-neutral-400">
                  {String(safeIdx + 1).padStart(2, '0')} /{' '}
                  {String(total).padStart(2, '0')}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous post"
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next post"
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
