'use client';

import { useEffect, useRef, useState } from 'react';

/** Ambient background videos — rotate in order, each plays one full cycle. */
const BG_VIDEOS = ['/bg-1.mp4', '/bg-2.mp4', '/bg-3.mp4'];

/** Crossfade between outgoing and incoming video. */
const FADE_MS = 1200;

export default function SectionBackground() {
  const [idx, setIdx] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const idxRef = useRef(0);

  // Play the active video; when it ends, advance and crossfade.
  useEffect(() => {
    const current = videoRefs.current[idx];
    if (!current) return;

    current.currentTime = 0;
    const p = current.play();
    if (p) p.catch(() => undefined); // autoplay guard

    const onEnded = () => {
      const n = (idxRef.current + 1) % BG_VIDEOS.length;
      idxRef.current = n;
      setIdx(n);
    };
    current.addEventListener('ended', onEnded);
    return () => current.removeEventListener('ended', onEnded);
  }, [idx]);

  // Pause+hide every video that isn't active, after its fade-out window.
  useEffect(() => {
    const t = window.setTimeout(() => {
      videoRefs.current.forEach((v, i) => {
        if (!v) return;
        if (i !== idx) v.pause();
      });
    }, FADE_MS);
    return () => window.clearTimeout(t);
  }, [idx]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {BG_VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={src}
          muted
          playsInline
          preload={i === 0 ? 'auto' : 'metadata'}
          className="absolute inset-0 h-full w-full object-cover transition-opacity"
          style={{
            opacity: i === idx ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        />
      ))}
      {/* Dim overlay — keeps content legible while letting the video read through */}
      <div className="absolute inset-0 bg-background/70" />
    </div>
  );
}
