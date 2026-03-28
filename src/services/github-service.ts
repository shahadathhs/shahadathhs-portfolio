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

/**
 * Per-repo flow: read localStorage first (`github_repo_{owner}_{repo}`).
 * Cache hit → return immediately (no network call, no rate-limit flag).
 * Cache miss → GET repo; on 403 → `{ data: null, isRateLimited: true }` (nothing cached).
 * `fetchMultipleRepos` sets `isRateLimited` if any individual fetch hit 403, even when
 * other repos succeeded from cache or a fresh 200.
 */

const getCache = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
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
