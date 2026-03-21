'use client';

import { useEffect, useState } from 'react';
import { fetchMediumPosts, type MediumPost } from '@/services/medium-service';
import { Button } from '../ui/button';
import { Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

import BlogSkeleton from '../skeleton/BlogSkeleton';

export default function MediumBlogSection() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchMediumPosts('shahadathhs');
      setPosts(data.slice(0, 3));
      setLoading(false);
    };
    loadPosts();
  }, []);

  if (posts.length === 0 && !loading) {
    return null;
  }

  return (
    <div
      id="blogs"
      className="relative w-full mt-10 min-h-[50vh] flex items-center overflow-hidden scroll-mt-24"
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
              Latest Blogs
            </h2>
            <div className="h-1.5 w-20 bg-primary mb-6 rounded-md" />
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Insights on backend architecture, API design, and modern web
              development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <BlogSkeleton key={i} />
                ))
              : posts.map((post, idx) => (
                  <motion.div
                    key={post.link}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group h-full"
                  >
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
                  </motion.div>
                ))}
          </div>

          {!loading && (
            <div className="flex justify-center mt-16">
              <Button
                asChild
                variant="outline"
                className="rounded-md h-12 px-8 font-bold border-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-300"
              >
                <a
                  href="https://medium.com/@shahadathhs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Explore all on Medium
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
