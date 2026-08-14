'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useUI } from '@/context/ui-context';
import { playSound } from '@/lib/sound';
import { PetSprite } from './PetSprite';

const SIZE = 72;
const POS_KEY = 'pet-pos';
const DRAG_THRESHOLD = 4;

const IDLE_MESSAGES = [
  'Hey!',
  'Hi there 👋',
  'Pet me!',
  'Notice me 🥺',
  'What’s up?',
  'psst…',
];
const HAPPY_MESSAGES = ['Yay!', 'Hehe!', '❤️', 'Purrr~', 'Wheee!', 'More!'];
const PARTICLES = ['✨', '❤️', '⭐', '💫', '🌟'];

type Particle = { id: string; symbol: string; dx: number };

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function Pet() {
  const { petVisible, selectedPet } = useUI();
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const fraction = useRef({ fx: 0.8, fy: 0.7 });
  const latest = useRef({ left: 0, top: 0 });
  const drag = useRef<{
    startX: number;
    startY: number;
    origLeft: number;
    origTop: number;
  } | null>(null);
  const didDrag = useRef(false);

  // Interaction state
  const [hovered, setHovered] = useState(false);
  const [reacting, setReacting] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  const toPixels = useCallback((fx: number, fy: number) => {
    const left = Math.max(
      8,
      Math.min(window.innerWidth - SIZE - 8, fx * window.innerWidth),
    );
    const top = Math.max(
      8,
      Math.min(window.innerHeight - SIZE - 8, fy * window.innerHeight),
    );
    return { left, top };
  }, []);

  useEffect(() => {
    // Default bottom-right, raised clear of the bottom dock.
    let fx = 0.8;
    let fy = 0.7;
    try {
      const saved = localStorage.getItem(POS_KEY);
      if (saved) {
        const p = JSON.parse(saved);
        if (
          typeof p?.fx === 'number' &&
          typeof p?.fy === 'number' &&
          p.fx >= 0 &&
          p.fx <= 1 &&
          p.fy >= 0 &&
          p.fy <= 1
        ) {
          fx = p.fx;
          fy = p.fy;
        }
      }
    } catch {
      // ignore
    }
    fraction.current = { fx, fy };
    const initial = toPixels(fx, fy);
    latest.current = initial;
    setPos(initial);
  }, [toPixels]);

  useEffect(() => {
    const onResize = () => {
      const p = toPixels(fraction.current.fx, fraction.current.fy);
      latest.current = p;
      setPos(p);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [toPixels]);

  const react = useCallback(() => {
    playSound('pet');
    setBubble(pick(HAPPY_MESSAGES));
    setReacting(true);
    window.setTimeout(() => setReacting(false), 240);

    const baseId = Date.now();
    const burst: Particle[] = Array.from({ length: 4 }, (_, i) => ({
      id: `${baseId}-${i}`,
      symbol: pick(PARTICLES),
      dx: (i - 1.5) * 16 + (Math.random() * 10 - 5),
    }));
    setParticles((prev) => [...prev, ...burst]);
    window.setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !burst.some((b) => b.id === p.id)),
      );
    }, 1000);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const { left, top } = latest.current;
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      origLeft: left,
      origTop: top,
    };
    didDrag.current = false;
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (!d) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      if (
        !didDrag.current &&
        Math.abs(dx) <= DRAG_THRESHOLD &&
        Math.abs(dy) <= DRAG_THRESHOLD
      ) {
        return;
      }
      didDrag.current = true;
      const next = toPixels(
        (d.origLeft + dx) / window.innerWidth,
        (d.origTop + dy) / window.innerHeight,
      );
      fraction.current = {
        fx: next.left / window.innerWidth,
        fy: next.top / window.innerHeight,
      };
      latest.current = next;
      setPos(next);
    },
    [toPixels],
  );

  const onPointerUp = useCallback(() => {
    const dragged = didDrag.current;
    drag.current = null;
    if (dragged) {
      try {
        localStorage.setItem(POS_KEY, JSON.stringify(fraction.current));
      } catch {
        // ignore
      }
    } else {
      react();
    }
  }, [react]);

  const onMouseEnter = useCallback(() => {
    setHovered(true);
    if (!reacting) setBubble(pick(IDLE_MESSAGES));
  }, [reacting]);

  const onMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  if (!petVisible || !pos) return null;

  const showBubble = (hovered || reacting) && bubble !== null;

  return (
    <div
      className="fixed z-[60] select-none"
      style={{ left: pos.left, top: pos.top, touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Speech bubble */}
      {showBubble ? (
        <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium shadow-lg">
          {bubble}
        </div>
      ) : null}

      {/* Reaction particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="pet-particle pointer-events-none absolute left-1/2 top-1/3 text-lg"
          style={{ marginLeft: p.dx }}
        >
          {p.symbol}
        </span>
      ))}

      {/* Pet */}
      <div
        className="pet-bob cursor-grab active:cursor-grabbing"
        title="Pet me"
      >
        <div
          style={{
            transform: reacting ? 'scale(1.15)' : 'scale(1)',
            transition: 'transform 180ms ease-out',
          }}
        >
          <PetSprite
            kind={selectedPet}
            className="h-[72px] w-[72px] text-foreground drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
    </div>
  );
}
