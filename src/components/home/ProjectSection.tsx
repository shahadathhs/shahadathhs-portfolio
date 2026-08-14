'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  GitFork,
  Star,
} from 'lucide-react';
import {
  fetchGithubRepos,
  fetchMultipleRepos,
  GithubRepo,
} from '@/services/github-service';
import { PINNED_REPOS, projectHighlights } from '@/constant/projectConfig';

export default function ProjectSection() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  /** True only when every pinned repo failed and we show placeholder data (no API metadata). */
  const [usedSyntheticFallback, setUsedSyntheticFallback] = useState(false);
  const [active, setActive] = useState(0);

  const total = PINNED_REPOS.length;

  useEffect(() => {
    const loadRepos = async () => {
      const response = await fetchMultipleRepos(
        'shahadathhs',
        PINNED_REPOS as unknown as string[],
      );

      // No successful repo payloads and GitHub said 403: no cache to use → placeholders
      if (response.data.length === 0 && response.isRateLimited) {
        setUsedSyntheticFallback(true);
        const fallbackRepos: GithubRepo[] = PINNED_REPOS.map((name, index) => ({
          id: index,
          name,
          description: 'View repository directly on GitHub.',
          html_url: `https://github.com/shahadathhs/${name}`,
          stargazers_count: 0,
          forks_count: 0,
          language: '',
          updated_at: new Date().toISOString(),
          fork: false,
        }));
        setRepos(fallbackRepos);
      }
      // If no pinned repos found (fallback to all), fetch latest
      else if (response.data.length === 0 && !response.isRateLimited) {
        const fallbackResponse = await fetchGithubRepos('shahadathhs');
        setRepos(
          fallbackResponse.data
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, total),
        );
      } else {
        setRepos(response.data);
      }
      setLoading(false);
    };
    loadRepos();
  }, [total]);

  const repoByName = useMemo(
    () => new Map(repos.map((r) => [r.name, r])),
    [repos],
  );

  const safeIdx = Math.min(active, total - 1);
  const name = PINNED_REPOS[safeIdx];
  const repo = repoByName.get(name);
  const highlights = projectHighlights[name] ?? [];
  const url = repo?.html_url ?? `https://github.com/shahadathhs/${name}`;

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  return (
    <div
      id="projects"
      className="relative w-full min-h-[60vh] flex items-center overflow-hidden"
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
              Open Source Projects
            </h2>
            <div className="h-1.5 w-20 bg-primary mb-4 rounded-md" />
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-normal">
              Microservices, self-hosted infrastructure, and platforms I&apos;ve
              designed and shipped in the open.
            </p>
          </div>

          {/* Rate-limit notice */}
          {usedSyntheticFallback && !loading && (
            <p className="mb-6 rounded-md border border-amber-200/80 bg-amber-50/80 px-4 py-2.5 text-xs text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200">
              GitHub API rate limit hit — live stats unavailable. Links still
              work; metadata returns after the limit resets.
            </p>
          )}

          {/* Project slider — one project per slide */}
          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={name}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group relative border border-neutral-200/80 dark:border-neutral-800/80 hover:border-primary/50 transition-all duration-300"
              >
                {/* Gradient accent — matching Contact/Blogs cards */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/50 transition-all" />

                {/* Identity row — p-6/p-8 rhythm, matching Contact/Blogs cards */}
                <div className="flex flex-col gap-3 border-b border-neutral-200/80 px-6 py-6 dark:border-neutral-800/80 sm:flex-row sm:items-center sm:justify-between md:px-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-primary tabular-nums">
                      {String(safeIdx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-2xl">
                      {name}
                    </h3>
                    {repo?.language && (
                      <span className="rounded-sm bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                        {repo.language}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                    {loading ? (
                      <span className="animate-pulse">loading…</span>
                    ) : (
                      <>
                        <span className="inline-flex items-center gap-1.5">
                          <Star className="h-3.5 w-3.5" />
                          {repo?.stargazers_count ?? 0}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <GitFork className="h-3.5 w-3.5" />
                          {repo?.forks_count ?? 0}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Description + highlights */}
                <div className="px-6 py-6 md:px-8">
                  {repo?.description && (
                    <p className="mb-5 text-sm leading-normal text-neutral-600 dark:text-neutral-400 md:text-base">
                      {repo.description}
                    </p>
                  )}
                  <ul className="flex flex-col gap-3">
                    {highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 bg-primary/40" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-neutral-200/80 px-6 py-4 dark:border-neutral-800/80 md:px-8">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary transition-opacity hover:opacity-80"
                  >
                    View on GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls — click only (arrows/swipe belong to the deck) */}
          <div className="mt-8 flex items-center justify-between border-t border-neutral-200/80 dark:border-neutral-800/80 pt-4">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {PINNED_REPOS.map((r, i) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${r}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === safeIdx
                      ? 'w-5 bg-primary'
                      : 'w-1.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600'
                  }`}
                />
              ))}
            </div>

            {/* Counter + arrows + all-repos */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] font-bold tabular-nums tracking-widest text-neutral-500 dark:text-neutral-400">
                {String(safeIdx + 1).padStart(2, '0')} /{' '}
                {String(total).padStart(2, '0')}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous project"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next project"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <a
                href="https://github.com/shahadathhs?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
              >
                All Repos
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
