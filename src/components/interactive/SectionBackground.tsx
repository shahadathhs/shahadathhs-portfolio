'use client';

import { useEffect, useState } from 'react';
import { useUI } from '@/context/ui-context';
import { sectionBg } from '@/constant/sections';

export default function SectionBackground() {
  const { activeSection } = useUI();
  const src = sectionBg(activeSection);
  const [ready, setReady] = useState(false);

  // New video starts hidden; fades in once it can actually play.
  useEffect(() => {
    setReady(false);
  }, [src]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <video
        key={src}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setReady(true)}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      />
      {/* Dim overlay — keeps every section's content legible over the video */}
      <div className="absolute inset-0 bg-background/80" />
    </div>
  );
}
