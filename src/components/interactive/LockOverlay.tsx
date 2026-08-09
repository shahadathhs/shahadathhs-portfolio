'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronUp, Github, Lock, Newspaper, Terminal } from 'lucide-react';
import { useUI } from '@/context/ui-context';
import { heroData } from '@/constant/heroData';
import {
  fetchGithubLatestCommit,
  GITHUB_STATS_USERNAME,
  type GithubCommit,
} from '@/services/github-service';
import { fetchMediumPosts, type MediumPost } from '@/services/medium-service';

const UNLOCK_THRESHOLD = 110;

const timeAgo = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diff) || diff < 0) return '';
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
};

type NotificationCardProps = {
  icon: React.ReactNode;
  app: string;
  time: string;
  title: string;
  sub?: string;
  href: string;
};

function NotificationCard({
  icon,
  app,
  time,
  title,
  sub,
  href,
}: NotificationCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={(e) => e.stopPropagation()}
      className="flex w-full items-start gap-3 rounded-2xl border border-border bg-background/50 px-4 py-3 text-left backdrop-blur-md transition-colors hover:bg-background/70"
    >
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
            {app}
          </span>
          <span className="text-[10px] opacity-40">{time}</span>
        </div>
        <p className="mt-0.5 truncate text-sm">{title}</p>
        {sub ? (
          <p className="truncate text-[11px] text-muted-foreground">{sub}</p>
        ) : null}
      </div>
    </a>
  );
}

export default function LockOverlay() {
  const { locked, unlock, openTerminal } = useUI();
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [pull, setPull] = useState(0);
  const [commit, setCommit] = useState<GithubCommit | null>(null);
  const [post, setPost] = useState<MediumPost | null>(null);
  const pullRef = useRef(0);
  const drag = useRef<{ startY: number } | null>(null);

  // Live clock — render null until mounted to avoid hydration mismatch.
  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // Lock-screen notifications: latest commit + latest post (cached upstream).
  useEffect(() => {
    let alive = true;
    Promise.allSettled([
      fetchGithubLatestCommit(GITHUB_STATS_USERNAME),
      fetchMediumPosts(GITHUB_STATS_USERNAME),
    ]).then(([c, p]) => {
      if (!alive) return;
      if (c.status === 'fulfilled' && c.value) setCommit(c.value);
      if (p.status === 'fulfilled' && p.value?.length) setPost(p.value[0]);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Lock the body scroll while the screen is locked.
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { startY: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const up = drag.current.startY - e.clientY; // positive when dragging up
    const clamped = Math.max(0, Math.min(up, 260));
    pullRef.current = clamped;
    setPull(clamped);
  };

  const onPointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    if (pullRef.current >= UNLOCK_THRESHOLD) {
      unlock();
    }
    pullRef.current = 0;
    setPull(0);
  };

  const time = now?.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  const date = now?.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  if (!mounted) return null;

  return (
    <div
      aria-hidden={!locked}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ touchAction: 'none' }}
      className={`fixed inset-0 z-[10000] select-none overflow-hidden transition-opacity duration-300 ${
        locked ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Background video */}
      <video
        aria-hidden
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/lock-bg.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/lock-bg.mp4" type="video/mp4" />
      </video>
      {/* Dark frosted overlay so text stays legible */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background/85"
      />
      <div
        className="relative flex h-full flex-col items-center justify-between px-6 py-20 transition-transform duration-150 ease-out"
        style={{ transform: `translateY(${-pull * 0.4}px)` }}
      >
        <div className="flex flex-col items-center gap-4">
          <Lock className="h-7 w-7 text-muted-foreground" />
          <div className="text-center">
            <div className="font-mono text-6xl font-bold tabular-nums sm:text-7xl">
              {time}
            </div>
            {date ? (
              <div className="mt-2 text-sm text-muted-foreground">{date}</div>
            ) : null}
          </div>
        </div>

        {commit || post ? (
          <div className="flex w-full max-w-sm flex-col gap-2">
            {commit ? (
              <NotificationCard
                icon={<Github className="h-4 w-4" />}
                app="GitHub"
                time={timeAgo(commit.date)}
                title={commit.message}
                sub={commit.repo}
                href={commit.url}
              />
            ) : null}
            {post ? (
              <NotificationCard
                icon={<Newspaper className="h-4 w-4" />}
                app="Medium"
                time={timeAgo(post.pubDate)}
                title={post.title}
                sub="New post"
                href={post.link}
              />
            ) : null}
          </div>
        ) : null}

        <div className="text-center">
          <div className="text-xl font-bold">{heroData.name}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            {heroData.role} · {heroData.location}
          </div>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-3 text-muted-foreground">
          <ChevronUp className="h-5 w-5 animate-bounce" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
            Slide up to unlock
          </span>
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              openTerminal();
            }}
            aria-label="Open terminal"
            title="Terminal"
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md transition-colors hover:text-foreground"
          >
            <Terminal className="h-3.5 w-3.5" />
            Terminal
          </button>
        </div>
      </div>
    </div>
  );
}
