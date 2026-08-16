export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
  contentSnippet: string;
  categories: string[];
  /** Medium CDN preview image, when the post has one. */
  thumbnail: string;
}

const CACHE_DURATION = 3600 * 1000; // 1 hour

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

export const fetchMediumPosts = async (
  username: string = 'shahadathhs',
): Promise<MediumPost[]> => {
  const cacheKey = `medium_posts_${username}`;
  const cachedData = getCache<MediumPost[]>(cacheKey);
  if (cachedData) return cachedData;

  try {
    const rssUrl = `https://medium.com/feed/@${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch from rss2json: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(`rss2json error: ${data.message}`);
    }

    // Map to MediumPost interface
    const posts: MediumPost[] = data.items.map((item: any) => {
      const stripTags = (html: string) =>
        html
          .replace(/<[^>]*>?/gm, ' ')
          .replace(/\s+/g, ' ')
          .trim();

      // Excerpt: prefer the first editorial lead block in the description
      // (h4 subheading, blockquote, or figcaption); fall back to its text.
      const desc: string = item.description ?? '';
      const lead =
        desc.match(/<h4[^>]*>([\s\S]*?)<\/h4>/) ??
        desc.match(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/) ??
        desc.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/);
      // Strip nested tags inside the lead (e.g. <em>), remove "N min read".
      const excerpt = lead
        ? stripTags(lead[1])
            .replace(/\d+\s*min read\s*/i, '')
            .trim()
        : stripTags(desc).substring(0, 260);

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        author: item.author,
        content: item.content,
        contentSnippet: excerpt.substring(0, 260),
        categories: item.categories ?? [],
        thumbnail: item.thumbnail ?? '',
      };
    });

    setCache(cacheKey, posts);
    return posts;
  } catch (error: any) {
    console.error('Error fetching Medium posts:', error.message || error);
    return [];
  }
};
