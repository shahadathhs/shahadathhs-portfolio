import { Github, Star, GitFork, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
}

export default function ProjectCard({
  name,
  description,
  url,
  stars,
  forks,
  language,
}: ProjectCardProps) {
  return (
    <div className="group h-full flex flex-col p-6 rounded-md bg-transparent border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-all duration-300 shadow-sm relative overflow-hidden">
      {/* Subtle Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/50 transition-all" />

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col h-full gap-4"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="p-2.5 rounded-md bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <Github className="h-5 w-5" />
          </div>
          {language && (
            <span className="px-2 py-0.5 bg-primary/5 text-primary border border-primary/10 rounded-md text-[10px] font-bold uppercase tracking-tighter">
              {language}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-neutral-900 dark:text-neutral-50 group-hover:text-primary transition-colors leading-tight">
            {name}
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 line-clamp-3 text-sm leading-relaxed italic">
            {description ||
              'Explore the source code on GitHub for more details...'}
          </p>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-900">
          <div className="flex items-center gap-4 text-neutral-500 text-xs font-bold">
            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <Star className="h-3 w-3 text-amber-500" />
              {stars}
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <GitFork className="h-3 w-3 text-primary" />
              {forks}
            </span>
          </div>

          <div className="flex items-center text-primary font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
            View
            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </div>
        </div>
      </a>

      {/* Background Glow */}
      <div className="absolute -bottom-10 -right-10 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
    </div>
  );
}
