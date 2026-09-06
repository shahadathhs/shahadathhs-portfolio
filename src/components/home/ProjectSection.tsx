'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, GitFork, Star } from 'lucide-react';
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
          {/* Header + action */}
          <div className="mb-8 flex flex-col gap-4 text-left sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-start">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
                ls ~/deployed
              </h2>
              <div className="h-1.5 w-20 bg-primary mb-4 rounded-md" />
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-normal">
                Things running in production, not just sitting in repos.
              </p>
            </div>
            <a
              href="https://github.com/shahadathhs?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
            >
              All Repos
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Rate-limit notice */}
          {usedSyntheticFallback && !loading && (
            <p className="mb-6 rounded-md border border-amber-200/80 bg-amber-50/80 px-4 py-2.5 text-xs text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200">
              GitHub API rate limit hit, live stats unavailable. Links still
              work; metadata returns after the limit resets.
            </p>
          )}

          {/* Projects — all pinned repos, original per-project design */}
          <div className="flex flex-col gap-12">
            {PINNED_REPOS.map((name, idx) => {
              const repo = repoByName.get(name);
              const highlights = projectHighlights[name] ?? [];
              const url =
                repo?.html_url ?? `https://github.com/shahadathhs/${name}`;

              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                  className="group flex flex-col gap-6"
                >
                  {/* Project header — title + meta, like the role header */}
                  <div className="flex flex-col justify-between gap-2 border-b border-neutral-100 pb-6 dark:border-neutral-900 md:flex-row md:items-baseline">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-primary tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-xl font-black tracking-tight text-neutral-900 transition-colors group-hover:text-primary md:text-2xl dark:text-neutral-50">
                          {name}
                        </h3>
                        {repo?.language && (
                          <span className="bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                            {repo.language}
                          </span>
                        )}
                      </div>
                      {repo?.description && (
                        <p className="max-w-2xl pl-8 text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                          {repo.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 font-mono text-xs text-neutral-500 dark:text-neutral-400 md:justify-end">
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
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary transition-opacity hover:opacity-80"
                          >
                            GitHub
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Highlights — single column bullets */}
                  <ul className="flex flex-col gap-3.5">
                    {highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400 md:text-base"
                      >
                        <span className="mt-2.5 h-1 w-1 shrink-0 bg-primary/30" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
