export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
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

const setCache = (key: string, data: unknown) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

const stripTags = (html: string) =>
  html
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tagValue = (item: string, tag: string): string => {
  const re = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))</${tag}>`,
    'i',
  );
  const m = item.match(re);
  return (m?.[1] ?? m?.[2] ?? '').trim();
};

const tagValues = (item: string, tag: string): string[] => {
  const re = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))</${tag}>`,
    'gi',
  );
  return [...item.matchAll(re)]
    .map((m) => (m[1] ?? m[2] ?? '').trim())
    .filter(Boolean);
};

const EXCERPT_LEN = 350;

const excerptFromHtml = (html: string): string => {
  const cleaned = html
    .replace(/<figure[\s\S]*?<\/figure>/gi, ' ')
    .replace(/<img[^>]*>/gi, ' ');

  const parts: string[] = [];
  const blockquote = cleaned.match(
    /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i,
  );
  if (blockquote) parts.push(stripTags(blockquote[1]));

  const paragraphs = [...cleaned.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripTags(m[1]))
    .filter((t) => t.length > 40);

  for (const paragraph of paragraphs) {
    parts.push(paragraph);
    if (parts.join(' ').length >= EXCERPT_LEN) break;
  }

  const excerpt = (parts.join(' ') || stripTags(cleaned))
    .replace(/\d+\s*min read\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  return excerpt.substring(0, EXCERPT_LEN);
};

/** First real cover image — skip rss2json empties and Medium 1×1 tracking pixels. */
export const thumbnailFromHtml = (html: string, fallback = ''): string => {
  const srcs = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(
    (m) => m[1],
  );
  const cover = srcs.find((src) => {
    if (!src || src.includes('/_/stat') || src.includes('pixel')) return false;
    return (
      src.includes('cdn-images') ||
      src.includes('miro.medium.com') ||
      /\.(png|jpe?g|webp|gif)(\?|$)/i.test(src)
    );
  });
  return cover || fallback || '';
};

export const parseMediumRss = (xml: string): MediumPost[] => {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((match) => {
    const item = match[1];
    const html =
      tagValue(item, 'content:encoded') || tagValue(item, 'description') || '';

    return {
      title: tagValue(item, 'title'),
      link: tagValue(item, 'link').split('?')[0],
      pubDate: tagValue(item, 'pubDate'),
      author: tagValue(item, 'dc:creator') || tagValue(item, 'author'),
      contentSnippet: excerptFromHtml(html),
      categories: tagValues(item, 'category'),
      thumbnail: thumbnailFromHtml(html),
    };
  });
};

export const fetchMediumPosts = async (
  username: string = 'shahadathhs',
): Promise<MediumPost[]> => {
  const cacheKey = `medium_feed_${username}`;
  const cachedData = getCache<MediumPost[]>(cacheKey);
  if (cachedData) return cachedData;

  try {
    const response = await fetch(
      `/api/medium?username=${encodeURIComponent(username)}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Medium posts: ${response.statusText}`);
    }

    const data = await response.json();
    const posts: MediumPost[] = Array.isArray(data.posts) ? data.posts : [];

    setCache(cacheKey, posts);
    return posts;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error fetching Medium posts:', message);
    return [];
  }
};
