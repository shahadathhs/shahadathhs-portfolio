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
            <div className="h-1.5 w-20 bg-primary mb-6 rounded-full" />
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Insights on backend architecture, API design, and modern web
              development.
            </p>
          </div>

          <div className="flex flex-col max-w-7xl mx-auto border-t border-border/50">
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
                    className="group"
                  >
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-border/50 hover:bg-muted/30 transition-all px-4 -mx-4 rounded-lg"
                    >
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-1">
                          <span className="flex items-center gap-1.5 uppercase tracking-wider">
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
                          <div className="flex gap-2">
                            {post.categories.slice(0, 2).map((category) => (
                              <span
                                key={category}
                                className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-tighter"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground line-clamp-2 text-sm md:text-base leading-relaxed italic max-w-3xl">
                          {post.contentSnippet ||
                            'Read the full deep dive on Medium for more technical insights...'}
                        </p>
                      </div>

                      <div className="mt-4 md:mt-0 md:ml-8 flex items-center text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                        Read Story
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </div>
                    </a>
                  </motion.div>
                ))}
          </div>

          {!loading && (
            <div className="flex justify-center mt-16">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 font-bold"
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
