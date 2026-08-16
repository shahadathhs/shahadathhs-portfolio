import { NextResponse } from 'next/server';

import { parseMediumRss } from '@/services/medium-service';

export const revalidate = 3600;

export async function GET(request: Request) {
  const username =
    new URL(request.url).searchParams.get('username') ?? 'shahadathhs';

  if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
    return NextResponse.json({ error: 'Invalid username' }, { status: 400 });
  }

  try {
    const rssRes = await fetch(`https://medium.com/feed/@${username}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/rss+xml, application/xml, text/xml',
        'User-Agent':
          'Mozilla/5.0 (compatible; portfolio-feed/1.0; +https://shahadathhs.vercel.app)',
      },
    });

    if (!rssRes.ok) {
      return NextResponse.json(
        { error: `Medium RSS failed: ${rssRes.status}` },
        { status: 502 },
      );
    }

    const xml = await rssRes.text();
    const posts = parseMediumRss(xml);

    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json(
      { error: 'Failed to load Medium feed' },
      { status: 502 },
    );
  }
}
