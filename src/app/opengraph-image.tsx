import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import { heroData } from '@/constant/heroData';

export const alt = `${heroData.name} — ${heroData.role} Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Ambient nature background — same source as the lock screen / page bg.
const bgDataUrl = (() => {
  try {
    const buf = fs.readFileSync(process.cwd() + '/public/lock-bg.jpg');
    return `data:image/jpeg;base64,${buf.toString('base64')}`;
  } catch {
    return '';
  }
})();

// Highlight reel of the actual stack (see src/constant/skillsData.ts).
const techChips = [
  'TypeScript',
  'Node.js',
  'NestJS',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'AWS',
  'RAG',
];

const HAIRLINE = 'rgba(255,255,255,0.10)';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        backgroundColor: '#0a0a0a',
      }}
    >
      {/* Nature background */}
      {bgDataUrl ? (
        <img
          src={bgDataUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : null}
      {/* Dim overlay — matches the site's bg-background/80 over the video */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(10,10,10,0.78)',
        }}
      />

      {/* Signature hairline border frame with gradient accents */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 2,
          background: HAIRLINE,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 240,
          height: 2,
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 2,
          background: HAIRLINE,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 240,
          height: 2,
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 2,
          height: '100%',
          background: HAIRLINE,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 2,
          height: '100%',
          background: HAIRLINE,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: 80,
          color: '#fafafa',
          fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            color: '#d4d4d4',
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
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 10,
                fontSize: 20,
                color: '#fafafa',
              }}
            >
              {'</>'}
            </span>
            shahadathhs.vercel.app
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: '#a3a3a3',
              fontSize: 18,
              letterSpacing: 1,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 99,
                background: '#10b981',
              }}
            />
            Available for work
          </span>
        </div>

        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 1,
              color: '#fafafa',
            }}
          >
            {heroData.name}
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 600,
              letterSpacing: -1,
              color: '#d4d4d4',
            }}
          >
            {heroData.role}
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#a3a3a3',
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Scalable APIs · Distributed Systems · AI-Powered Backend Services
          </div>
        </div>

        {/* Chips */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            fontSize: 21,
            fontWeight: 600,
          }}
        >
          {techChips.map((tech) => (
            <span
              key={tech}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 99,
                color: '#e5e5e5',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
