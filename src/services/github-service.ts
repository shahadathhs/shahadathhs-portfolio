export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  fork: boolean;
}

export interface GithubResponse {
  data: GithubRepo[];
  error?: string;
  isRateLimited?: boolean;
}

const CACHE_DURATION = 3600 * 1000; // 1 hour
const STATS_CACHE_DURATION = 24 * 3600 * 1000; // 1 day

/**
 * Per-repo flow: read localStorage first (`github_repo_{owner}_{repo}`).
 * Cache hit → return immediately (no network call, no rate-limit flag).
 * Cache miss → GET repo; on 403 → `{ data: null, isRateLimited: true }` (nothing cached).
 * `fetchMultipleRepos` sets `isRateLimited` if any individual fetch hit 403, even when
 * other repos succeeded from cache or a fresh 200.
 */

const getCache = <T>(key: string, duration = CACHE_DURATION): T | null => {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > duration) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

const setCache = (key: string, data: any) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

export const fetchGithubRepos = async (
  username: string,
): Promise<GithubResponse> => {
  const cacheKey = `github_repos_${username}`;
  const cachedData = getCache<GithubRepo[]>(cacheKey);
  if (cachedData) return { data: cachedData };

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
    );

    if (response.status === 403) {
      return { data: [], isRateLimited: true, error: 'Rate limit exceeded' };
    }

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }

    const data: GithubRepo[] = await response.json();
    const filteredData = data.filter((repo) => !repo.fork);
    setCache(cacheKey, filteredData);
    return { data: filteredData };
  } catch (error: any) {
    console.error('Error fetching GitHub repos:', error.message || error);
    return { data: [], error: error.message };
  }
};

export const fetchRepoDetails = async (
  owner: string,
  repo: string,
): Promise<{ data: GithubRepo | null; isRateLimited?: boolean }> => {
  const cacheKey = `github_repo_${owner}_${repo}`;
  const cachedData = getCache<GithubRepo>(cacheKey);
  if (cachedData) return { data: cachedData };

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
    );

    if (response.status === 403) {
      return { data: null, isRateLimited: true };
    }

    if (!response.ok) {
      return { data: null };
    }

    const data = await response.json();
    setCache(cacheKey, data);
    return { data };
  } catch (error: any) {
    console.error(
      `Error fetching repo details for ${owner}/${repo}:`,
      error.message || error,
    );
    return { data: null };
  }
};

export const fetchMultipleRepos = async (
  owner: string,
  repoNames: string[],
): Promise<GithubResponse> => {
  try {
    const promises = repoNames.map((repo) => fetchRepoDetails(owner, repo));
    const results = await Promise.all(promises);

    const isRateLimited = results.some((r) => r.isRateLimited);
    const data = results
      .map((r) => r.data)
      .filter((repo): repo is GithubRepo => repo !== null);

    return {
      data,
      isRateLimited,
      error: isRateLimited ? 'Rate limit exceeded' : undefined,
    };
  } catch (error: any) {
    console.error(
      `Error fetching multiple repos for ${owner}:`,
      error.message || error,
    );
    return { data: [], error: error.message };
  }
};

export const GITHUB_STATS_USERNAME = 'shahadathhs';

/**
 * Aggregate stats are pre-generated daily by the github-stats Action and
 * published as a static JSON file, so reading them here never hits the GitHub
 * API rate limit. Cached for a day to avoid refetching on every page load; the
 * `generated_at` field is shown to the user as the data's freshness.
 */

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface StatsDay {
  date: string;
  count: number;
  level: ContributionLevel;
}

export interface GithubStatsData {
  generated_at: string;
  username: string;
  name: string;
  summary: {
    total: number;
    current_streak: number;
    current_streak_range?: [string | null, string | null];
    longest_streak: number;
    longest_streak_range?: [string | null, string | null];
    best_day: { date: string | null; count: number };
  };
  weeks: StatsDay[][];
  languages: { name: string; prop: number; color: string | null }[];
}

export interface GithubStatsResponse {
  data: GithubStatsData | null;
  error?: string;
}

export const GITHUB_STATS_URL = `https://raw.githubusercontent.com/${GITHUB_STATS_USERNAME}/github-stats/main/generated/stats.json`;

export const fetchGithubStats = async (): Promise<GithubStatsResponse> => {
  const cacheKey = `github_stats_${GITHUB_STATS_USERNAME}`;
  const cachedData = getCache<GithubStatsData>(cacheKey, STATS_CACHE_DURATION);
  if (cachedData) return { data: cachedData };

  try {
    const response = await fetch(GITHUB_STATS_URL, { cache: 'no-store' });
    if (!response.ok) {
      return { data: null, error: `HTTP ${response.status}` };
    }
    const data = (await response.json()) as GithubStatsData;
    setCache(cacheKey, data);
    return { data };
  } catch (error: any) {
    console.error('Error fetching GitHub stats:', error.message || error);
    return { data: null, error: error.message };
  }
};

export interface GithubCommit {
  repo: string;
  message: string;
  sha: string;
  date: string;
  url: string;
}

/**
 * Latest public push (most recent commit) for the lock-screen notification.
 * Uses the unauthenticated events endpoint, cached for a day.
 */
export const fetchGithubLatestCommit = async (
  username: string,
): Promise<GithubCommit | null> => {
  const cacheKey = `github_commit_v2_${username}`;
  const cached = getCache<GithubCommit>(cacheKey, STATS_CACHE_DURATION);
  if (cached) return cached;

  try {
    // The public events feed omits commit messages, but gives us the repo,
    // the head SHA, and the time of each push.
    const eventsRes = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=30`,
    );
    if (!eventsRes.ok) return null; // 403 = rate limited, etc.
    const events = await eventsRes.json();
    const pushes = (events as any[]).filter(
      (event) => event.type === 'PushEvent',
    );

    // Walk the most recent pushes and return the first commit actually
    // authored by the user — skips github-actions[bot] and other bots.
    for (const push of pushes.slice(0, 6)) {
      const repo: string = push.repo?.name ?? '';
      const sha: string = push.payload?.head ?? '';
      if (!repo || !sha) continue;
      try {
        const commitRes = await fetch(
          `https://api.github.com/repos/${repo}/commits/${sha}`,
        );
        if (!commitRes.ok) continue;
        const commit = await commitRes.json();
        if (commit?.author?.login !== username) continue; // bot / someone else

        const message: string | undefined = commit?.commit?.message;
        const data: GithubCommit = {
          repo,
          message: message ? message.split('\n')[0] : `Pushed to ${repo}`,
          sha,
          date: push.created_at,
          url: `https://github.com/${repo}/commit/${sha}`,
        };
        setCache(cacheKey, data);
        return data;
      } catch {
        // try the next push
      }
    }
    return null;
  } catch (error: any) {
    console.error('Error fetching latest commit:', error.message || error);
    return null;
  }
};
