'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import {
  Briefcase,
  FolderGit2,
  Home,
  Mail,
  Newspaper,
  User,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { useUI } from '@/context/ui-context';
import { SECTIONS, type SectionId } from '@/constant/sections';
import { playSound } from '@/lib/sound';

/** Two-by-two grip dots — the standard "draggable" affordance. */
function GripIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="2.5" cy="2.5" r="1.2" />
      <circle cx="7.5" cy="2.5" r="1.2" />
      <circle cx="2.5" cy="7.5" r="1.2" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </svg>
  );
}

const ICONS: Record<SectionId, LucideIcon> = {
  hero: Home,
  about: User,
  skills: Wrench,
  experience: Briefcase,
  projects: FolderGit2,
  blogs: Newspaper,
  contact: Mail,
};

type Edge = 'left' | 'right' | 'top' | 'bottom';
const EDGES: Edge[] = ['left', 'right', 'top', 'bottom'];
const POS_KEY = 'dock-position';
const EDGE_KEY = 'dock-edge';
const DOCK_W = 336; // ~7 buttons + padding
const DOCK_H = 48;
const MARGIN = 12;
const DRAG_THRESHOLD = 6;

const isEdge = (v: unknown): v is Edge => EDGES.includes(v as Edge);

export default function Dock() {
  const { activeSection, navigate, nextSection, prevSection, terminalOpen } =
    useUI();
  const pathname = usePathname();

  // The dock only makes sense where the deck lives.
  const isHome = pathname === '/';

  const [edge, setEdge] = useState<Edge>('left');
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const drag = useRef<{
    startX: number;
    startY: number;
    origLeft: number;
    origTop: number;
  } | null>(null);
  const didDrag = useRef(false);
  // Position along the edge, stored as a fraction (0..1) so it survives resizes.
  const fraction = useRef(0.5);

  const dockSize = edge === 'left' || edge === 'right' ? DOCK_H : DOCK_W;

  // Derive pixel position from edge + fraction of the free axis.
  const toPixels = useCallback(
    (e: Edge, f: number) => {
      const left =
        e === 'left'
          ? MARGIN
          : e === 'right'
            ? window.innerWidth - DOCK_H - MARGIN
            : Math.max(
                MARGIN,
                Math.min(
                  window.innerWidth - DOCK_W - MARGIN,
                  f * (window.innerWidth - DOCK_W),
                ),
              );
      const top =
        e === 'top'
          ? MARGIN
          : e === 'bottom'
            ? window.innerHeight - DOCK_H - MARGIN
            : Math.max(
                MARGIN,
                Math.min(
                  window.innerHeight - DOCK_H - MARGIN,
                  f * (window.innerHeight - dockSize),
                ),
              );
      return { left, top };
    },
    [dockSize],
  );

  // Load saved edge + fraction; default to the left edge, centered.
  useEffect(() => {
    let savedEdge: Edge = 'left';
    let f = 0.5;
    try {
      const e = localStorage.getItem(EDGE_KEY);
      if (isEdge(e)) savedEdge = e;
      const savedF = Number(localStorage.getItem(POS_KEY));
      if (Number.isFinite(savedF) && savedF >= 0 && savedF <= 1) f = savedF;
    } catch {
      // ignore
    }
    setEdge(savedEdge);
    fraction.current = f;
    setPos(toPixels(savedEdge, f));
  }, [toPixels]);

  // Re-derive on viewport changes.
  useEffect(() => {
    const onResize = () => setPos(toPixels(edge, fraction.current));
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [edge, toPixels]);

  // Keyboard: 1-7 jump, arrows step. Ignored while typing in the terminal.
  useEffect(() => {
    if (!isHome) return;
    const onKey = (e: KeyboardEvent) => {
      if (terminalOpen) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const num = Number(e.key);
      if (Number.isInteger(num) && num >= 1 && num <= SECTIONS.length) {
        navigate(SECTIONS[num - 1].id);
        return;
      }
      if (e.key === 'ArrowRight') nextSection();
      if (e.key === 'ArrowLeft') prevSection();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isHome, navigate, nextSection, prevSection, terminalOpen]);

  /** Snap to whichever edge is nearest and keep the along-edge fraction. */
  const snap = useCallback((x: number, y: number) => {
    const dists: Record<Edge, number> = {
      left: x,
      right: window.innerWidth - x,
      top: y,
      bottom: window.innerHeight - y,
    };
    const nearest = EDGES.reduce((a, b) =>
      dists[a] <= dists[b] ? a : b,
    ) as Edge;
    const f =
      nearest === 'left' || nearest === 'right'
        ? (y - DOCK_H / 2) / (window.innerHeight - DOCK_H)
        : (x - DOCK_W / 2) / (window.innerWidth - DOCK_W);
    const clamped = Math.max(0, Math.min(1, Number.isFinite(f) ? f : 0.5));
    return { edge: nearest, fraction: clamped };
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      // Only the dock chrome (not the buttons) starts a drag.
      if ((e.target as HTMLElement).closest('button')) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      const { left, top } = pos ?? { left: 0, top: 0 };
      drag.current = {
        startX: e.clientX,
        startY: e.clientY,
        origLeft: left,
        origTop: top,
      };
      didDrag.current = false;
    },
    [pos],
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
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
    setPos({ left: d.origLeft + dx, top: d.origTop + dy });
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (drag.current && didDrag.current) {
        const { edge: newEdge, fraction: f } = snap(e.clientX, e.clientY);
        playSound('toggle');
        setEdge(newEdge);
        fraction.current = f;
        setPos(toPixels(newEdge, f));
        try {
          localStorage.setItem(EDGE_KEY, newEdge);
          localStorage.setItem(POS_KEY, String(f));
        } catch {
          // ignore
        }
      }
      drag.current = null;
    },
    [snap, toPixels],
  );

  if (!isHome || !pos) return null;

  const isVertical = edge === 'left' || edge === 'right';

  return (
    <nav
      aria-label="Section navigation"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ left: pos.left, top: pos.top, touchAction: 'none' }}
      className="fixed z-50 cursor-grab active:cursor-grabbing"
    >
      <div
        className={`flex items-center gap-1 rounded-full border border-border bg-background/70 p-1.5 shadow-lg backdrop-blur-xl ${
          isVertical ? 'flex-col' : 'flex-row'
        }`}
      >
        {/* Grip handle — signals the dock is draggable */}
        <span
          aria-hidden
          title="Drag to move"
          className={`flex h-4 w-4 shrink-0 cursor-grab items-center justify-center text-muted-foreground/50 active:cursor-grabbing ${
            isVertical ? 'mb-0.5 rotate-90' : 'mr-0.5'
          }`}
        >
          <GripIcon />
        </span>

        {SECTIONS.map((s, i) => {
          const Icon = ICONS[s.id];
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => navigate(s.id)}
              aria-label={`${s.label} (${i + 1})`}
              aria-current={isActive ? 'page' : undefined}
              title={`${s.label} — ${i + 1}`}
              className={`group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ${
                isActive
                  ? 'text-background'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="dock-active-pill"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  className="absolute inset-0 rounded-full bg-foreground"
                />
              )}
              <Icon className="relative z-10 h-4 w-4" strokeWidth={2.2} />

              {/* Tooltip — points toward the screen center (away from the docked edge) */}
              <span
                className={`pointer-events-none absolute whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-xs font-bold uppercase tracking-widest text-foreground opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 ${
                  edge === 'left'
                    ? 'left-full ml-3 top-1/2 -translate-y-1/2'
                    : edge === 'right'
                      ? 'right-full mr-3 top-1/2 -translate-y-1/2'
                      : edge === 'top'
                        ? 'top-full mt-3 left-1/2 -translate-x-1/2'
                        : 'bottom-full mb-3 left-1/2 -translate-x-1/2'
                }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
