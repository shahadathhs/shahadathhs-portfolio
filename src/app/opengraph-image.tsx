import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Shahadath Hossen Sajib — Backend Engineer Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background:
          'radial-gradient(circle at 20% 0%, rgba(16, 185, 129, 0.18) 0%, transparent 50%), radial-gradient(circle at 80% 100%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), #0a0a0a',
        padding: 80,
        color: '#fafafa',
        fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
        position: 'relative',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 22,
          color: '#10b981',
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              background: '#10b981',
              color: '#0a0a0a',
              borderRadius: 10,
              fontSize: 22,
              fontWeight: 900,
            }}
          >
            {'</>'}
          </span>
          shahadathhs.vercel.app
        </span>
        <span style={{ color: '#737373', fontSize: 20 }}>
          Dhaka, Bangladesh
        </span>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          Shahadath Hossen Sajib
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            color: '#10b981',
            letterSpacing: -1,
          }}
        >
          Backend Engineer
        </div>
        <div
          style={{
            fontSize: 26,
            color: '#a3a3a3',
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Scalable APIs · Distributed Systems · AI-Powered Backend Services
        </div>
      </div>

      {/* Bottom stack chips */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          fontSize: 22,
          fontWeight: 600,
        }}
      >
        {[
          'Node.js',
          'NestJS',
          'TypeScript',
          'Python',
          'FastAPI',
          'PostgreSQL',
          'Redis',
          'Docker',
          'AWS',
          'AI / RAG',
        ].map((tech) => (
          <span
            key={tech}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 18px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid #262626',
              borderRadius: 999,
              color: '#e5e5e5',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
