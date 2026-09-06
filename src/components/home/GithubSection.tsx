'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  fetchGithubStats,
  GITHUB_STATS_USERNAME,
  GithubStatsData,
} from '@/services/github-service';

// GitHub dark-mode contribution colors, lowest to highest intensity.
const LEVEL_COLORS = [
  'rgba(255,255,255,0.06)',
  '#0e4429',
  '#006d32',
  '#26a641',
  '#39d353',
];

const parseDay = (iso: string | null | undefined): Date | null => {
  if (!iso) return null;
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  return Number.isNaN(d.getTime()) ? null : d;
};

const formatDay = (iso: string | null | undefined): string => {
  const d = parseDay(iso);
  return d
    ? d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : '';
};

const formatMonthYear = (iso: string | null | undefined): string => {
  const d = parseDay(iso);
  return d
    ? d.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : '';
};

const formatRange = (
  start: string | null | undefined,
  end: string | null | undefined,
): string => {
  const s = formatDay(start);
  const e = formatDay(end);
  if (!s && !e) return '';
  if (!s || s === e) return s || e;
  return `${s} – ${e}`;
};

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="text-2xl font-black tabular-nums tracking-tight text-neutral-900 dark:text-neutral-50">
        {value}
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
        {label}
      </div>
      {hint ? (
        <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {hint}
        </div>
      ) : null}
    </div>
  );
}

export default function GithubSection() {
  const [stats, setStats] = useState<GithubStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGithubStats()
      .then((res) => setStats(res.data ?? null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        id="github"
        className="relative w-full min-h-[50vh] flex items-center overflow-hidden"
      >
        <section className="w-full py-10 md:py-12 px-6 md:px-12 lg:px-20">
          <div className="max-w-5xl mx-auto flex flex-col">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
              GitHub Activity
            </h2>
            <div className="h-1.5 w-20 bg-primary mb-4 rounded-md animate-pulse" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400 animate-pulse">
              Loading contribution data...
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (!stats) return null;

  const { summary } = stats;
  const topLangs = stats.languages.slice(0, 6);
  const otherProp = stats.languages
    .slice(6)
    .reduce((sum, lang) => sum + lang.prop, 0);
  const barLanguages = [
    ...topLangs,
    ...(otherProp > 0.1
      ? [{ name: 'Other', prop: otherProp, color: '#6e7681' as string | null }]
      : []),
  ];

  // Aggregate the daily calendar into one bar per week for a compact,
  // responsive "skyline" that never needs horizontal scrolling.
  const weekAggregates = stats.weeks.map((week) => {
    const total = week.reduce((sum, day) => sum + day.count, 0);
    const level = week.reduce((max, day) => Math.max(max, day.level), 0);
    const start = week[0]?.date ?? '';
    const end = week[week.length - 1]?.date ?? '';
    return { total, level, start, end };
  });
  const maxWeekTotal = Math.max(1, ...weekAggregates.map((w) => w.total));
  const heatRangeLabel = `${formatMonthYear(weekAggregates[0]?.start)} – ${formatMonthYear(
    weekAggregates[weekAggregates.length - 1]?.end,
  )}`;

  return (
    <div
      id="github"
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
                GitHub Activity
              </h2>
              <div className="h-1.5 w-20 bg-primary mb-4 rounded-md" />
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-normal">
                Contributions, streaks, and language breakdown from the past
                year of building in the open.
              </p>
            </div>
            <a
              href={`https://github.com/${GITHUB_STATS_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-600 transition-all hover:border-primary/50 hover:text-primary dark:border-neutral-800 dark:text-neutral-300"
            >
              @{GITHUB_STATS_USERNAME}
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col gap-8"
          >
            {/* Contribution skyline — one bar per week, fills any width */}
            <div className="overflow-x-hidden">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
                  {heatRangeLabel}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
                  Past year
                </span>
              </div>

              <div className="mt-2 flex h-20 w-full items-end gap-[2px]">
                {weekAggregates.map((week, weekIndex) => {
                  const heightPct =
                    week.total === 0
                      ? 6
                      : Math.max(10, (week.total / maxWeekTotal) * 100);
                  return (
                    <div
                      key={weekIndex}
                      title={`${formatRange(week.start, week.end)} · ${week.total} contribution${week.total === 1 ? '' : 's'}`}
                      className="min-w-0 flex-1 cursor-default rounded-t-[2px] transition-[height,filter] duration-200 hover:brightness-125"
                      style={{
                        height: `${heightPct}%`,
                        backgroundColor: LEVEL_COLORS[week.level],
                      }}
                    />
                  );
                })}
              </div>

              {/* Month markers, aligned bar-for-bar with the skyline above */}
              <div className="mt-2 hidden w-full gap-[2px] sm:flex">
                {weekAggregates.map((week, weekIndex) => {
                  const month = parseDay(week.start)?.getUTCMonth();
                  const prevMonth =
                    weekIndex > 0
                      ? parseDay(
                          weekAggregates[weekIndex - 1].start,
                        )?.getUTCMonth()
                      : undefined;
                  const showLabel =
                    weekIndex === 0 ||
                    (month !== undefined && month !== prevMonth);
                  return (
                    <div
                      key={weekIndex}
                      className="min-w-0 flex-1 overflow-visible"
                    >
                      {showLabel ? (
                        <span className="whitespace-nowrap text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400/70 dark:text-neutral-600/70">
                          {parseDay(week.start)?.toLocaleDateString('en-US', {
                            month: 'short',
                            timeZone: 'UTC',
                          })}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-2 gap-6 border-y border-neutral-100 py-6 dark:border-neutral-900 sm:grid-cols-4">
              <Stat
                label="Contributions"
                value={summary.total.toLocaleString()}
              />
              <Stat
                label="Current streak"
                value={`${summary.current_streak}d`}
                hint={
                  summary.current_streak_range
                    ? formatRange(
                        summary.current_streak_range[0],
                        summary.current_streak_range[1],
                      )
                    : undefined
                }
              />
              <Stat
                label="Longest streak"
                value={`${summary.longest_streak}d`}
                hint={
                  summary.longest_streak_range
                    ? formatRange(
                        summary.longest_streak_range[0],
                        summary.longest_streak_range[1],
                      )
                    : undefined
                }
              />
              <Stat
                label="Best day"
                value={summary.best_day.count.toLocaleString()}
                hint={
                  summary.best_day.date
                    ? formatDay(summary.best_day.date)
                    : undefined
                }
              />
            </div>

            {/* Language breakdown */}
            {barLanguages.length > 0 && (
              <div className="space-y-3">
                <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                  {barLanguages.map((lang) => (
                    <div
                      key={lang.name}
                      title={`${lang.name} · ${lang.prop.toFixed(1)}%`}
                      style={{
                        width: `${lang.prop}%`,
                        backgroundColor: lang.color ?? '#6e7681',
                      }}
                    />
                  ))}
                </div>
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {topLangs.map((lang) => (
                    <li
                      key={lang.name}
                      className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: lang.color ?? '#6e7681' }}
                      />
                      <span>{lang.name}</span>
                      <span className="opacity-50">
                        {lang.prop.toFixed(1)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Freshness */}
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
              Updated{' '}
              {new Date(stats.generated_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}{' '}
              · refreshed daily
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
