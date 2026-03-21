'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  fetchGithubRepos,
  fetchMultipleRepos,
  GithubRepo,
} from '@/services/github-service';
import ProjectCard from '../card/ProjectCard';
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';

import ProjectSkeleton from '../skeleton/ProjectSkeleton';

import { PINNED_REPOS } from '@/constant/projectConfig';

export default function ProjectSection() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const loadRepos = async () => {
      const response = await fetchMultipleRepos('shahadathhs', PINNED_REPOS);

      if (response.isRateLimited) {
        setIsRateLimited(true);
      }

      // If no data returned and rate limited, use PINNED_REPOS as fallback
      if (response.data.length === 0 && response.isRateLimited) {
        const fallbackRepos: GithubRepo[] = PINNED_REPOS.map((name, index) => ({
          id: index,
          name,
          description:
            'API rate limit exceeded. View repository directly on GitHub.',
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
            .slice(0, 5),
        );
        setIsRateLimited(!!fallbackResponse.isRateLimited);
        setError(fallbackResponse.error || null);
      } else {
        setRepos(response.data);
        setError(response.error || null);
      }
      setLoading(false);
    };
    loadRepos();
  }, []);

  if (error) {
    console.error(error, 'error in project section');
  }

  return (
    <div
      id="projects"
      className="relative w-full mt-10 min-h-[60vh] flex items-center overflow-hidden scroll-mt-24"
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
              Open Source Projects
            </h2>
            <div className="h-1.5 w-20 bg-primary mb-6 rounded-md" />
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              A collection of my recent backend tools, infrastructure templates,
              and full-stack experiments.
            </p>
          </div>

          {isRateLimited && (
            <div className="mb-10 p-6 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-4">
              <div className="p-2 rounded-md bg-amber-100 dark:bg-amber-900/50">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100">
                  GitHub API Rate Limit Reached
                </h3>
                <p className="mt-1 text-amber-800 dark:text-amber-200 text-sm">
                  The projects below are currently being served from cache. New
                  updates will be visible once the rate limit resets (usually in
                  less than an hour). This happens because unauthenticated
                  requests are limited by GitHub.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProjectSkeleton key={i} />
                ))
              : repos.map((repo, idx) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <ProjectCard
                      name={repo.name}
                      description={repo.description}
                      url={repo.html_url}
                      stars={repo.stargazers_count}
                      forks={repo.forks_count}
                      language={repo.language}
                    />
                  </motion.div>
                ))}
          </div>

          <div className="flex justify-center mt-16">
            <Button
              asChild
              variant="outline"
              className="rounded-md h-12 px-8 font-bold border-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-300"
            >
              <Link
                href="https://github.com/shahadathhs?tab=repositories"
                target="_blank"
              >
                View All Repositories
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
