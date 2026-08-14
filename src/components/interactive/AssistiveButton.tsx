'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FileText,
  Plus,
  Terminal as TerminalIcon,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { useUI } from '@/context/ui-context';
import { heroData } from '@/constant/heroData';
import { isSoundEnabled, playSound, toggleSound } from '@/lib/sound';
import { PetSprite } from './PetSprite';

const SIZE = 48; // h-12 w-12
const RADIUS = 72; // distance option centers sit from the main button center
const DRAG_THRESHOLD = 5;
const POS_KEY = 'assistive-pos';

export default function AssistiveButton() {
  const { openTerminal, selectedPet, openPetPanel } = useUI();
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const drag = useRef<{
    startX: number;
    startY: number;
    origLeft: number;
    origTop: number;
  } | null>(null);
  const didDrag = useRef(false);
  // Source of truth is stored as a fraction of the viewport (0..1), so the
  // button keeps the same relative spot across screen sizes and snaps back to
  // its desktop position when you return from mobile.
  const fraction = useRef<{ fx: number; fy: number }>({ fx: 0, fy: 1 });

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

  // Load saved fraction; default to the bottom-left corner (keeps it clear of
  // the mobile navbar, which sits at the top).
  useEffect(() => {
    let fx: number | undefined;
    let fy: number | undefined;
    try {
      const saved = localStorage.getItem(POS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        fx = parsed.fx;
        fy = parsed.fy;
      }
    } catch {
      // ignore
    }
    if (fx == null || fy == null || fx < 0 || fx > 1 || fy < 0 || fy > 1) {
      // Bottom-left, raised clear of the bottom dock.
      fx = 16 / window.innerWidth;
      fy = (window.innerHeight - SIZE - 96) / window.innerHeight;
    }
    fraction.current = { fx, fy };
    setPos(toPixels(fx, fy));
  }, [toPixels]);

  // Re-derive pixel position from the stored fraction on viewport changes —
  // the fraction itself never changes here, so returning to a previous size
  // restores the same spot.
  useEffect(() => {
    const onResize = () => {
      setPos(toPixels(fraction.current.fx, fraction.current.fy));
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [toPixels]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
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

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
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
      if (!didDrag.current) {
        didDrag.current = true;
        setMenuOpen(false);
      }
      const next = toPixels(
        (d.origLeft + dx) / window.innerWidth,
        (d.origTop + dy) / window.innerHeight,
      );
      fraction.current = {
        fx: next.left / window.innerWidth,
        fy: next.top / window.innerHeight,
      };
      setPos(next);
    },
    [toPixels],
  );

  const onPointerUp = useCallback(() => {
    if (drag.current && didDrag.current) {
      try {
        localStorage.setItem(POS_KEY, JSON.stringify(fraction.current));
      } catch {
        // ignore
      }
    }
    drag.current = null;
  }, []);

  // Click toggles the menu — but only if the last interaction wasn't a drag.
  const onClick = useCallback(() => {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }
    setMenuOpen((open) => {
      playSound(open ? 'close' : 'open');
      return !open;
    });
  }, []);

  if (!pos) return null;

  // Collision-aware placement: shift the ring's center toward the available
  // space so every option stays on-screen even when the button is in a corner.
  const optionHalf = 22; // h-11 w-11 / 2
  const reach = RADIUS + optionHalf;
  const btnCx = pos.left + SIZE / 2;
  const btnCy = pos.top + SIZE / 2;
  const ringCx = Math.max(reach, Math.min(window.innerWidth - reach, btnCx));
  const ringCy = Math.max(reach, Math.min(window.innerHeight - reach, btnCy));
  const offX = ringCx - btnCx;
  const offY = ringCy - btnCy;

  const baseSlots = [
    {
      key: 'resume',
      label: 'Resume',
      icon: <FileText className="h-5 w-5" />,
      href: heroData.resumeLink,
    },
    {
      key: 'sound',
      label: soundOn ? 'Sound on' : 'Sound off',
      icon: soundOn ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5 opacity-60" />
      ),
      action: () => {
        const v = toggleSound();
        setSoundOn(v);
        if (v) playSound('toggle');
      },
    },
    {
      key: 'pet',
      label: 'Pets',
      icon: (
        <PetSprite kind={selectedPet} className="h-5 w-5 text-foreground" />
      ),
      action: () => openPetPanel(),
    },
    {
      key: 'terminal',
      label: 'Terminal',
      icon: <TerminalIcon className="h-5 w-5" />,
      action: () => openTerminal(),
    },
  ];

  // All options, evenly around a full ring (AssistiveTouch feel).
  const options = baseSlots.map((slot, i) => {
    const angle = ((-90 + (i * 360) / baseSlots.length) * Math.PI) / 180;
    return {
      ...slot,
      dx: RADIUS * Math.cos(angle),
      dy: RADIUS * Math.sin(angle),
    };
  });

  return (
    <>
      {/* Backdrop to catch outside taps and close the radial menu */}
      {menuOpen ? (
        <button
          type="button"
          aria-label="Close quick actions"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[80] cursor-default"
        />
      ) : null}

      <div className="fixed z-[90]" style={{ left: pos.left, top: pos.top }}>
        {/* Outer ring — gives the radial "expanding circle" feel */}
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full border border-border"
          style={{
            left: '50%',
            top: '50%',
            width: RADIUS * 2,
            height: RADIUS * 2,
            transform: `translate(-50%, -50%) translate(${offX}px, ${offY}px)`,
            opacity: menuOpen ? 0.35 : 0,
            transition: 'opacity 200ms ease-out',
          }}
        />

        {/* Radial options */}
        {options.map((opt) => {
          const isLink = Boolean(opt.href);
          const isMailto = opt.href?.startsWith('mailto:');
          const close = () => setMenuOpen(false);
          const closeWithSound = () => {
            playSound('click');
            close();
          };
          const className =
            'absolute flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-lg backdrop-blur-md transition-all duration-200 ease-out hover:text-foreground';
          const style = {
            left: '50%',
            top: '50%',
            pointerEvents: menuOpen ? 'auto' : 'none',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen
              ? `translate(-50%, -50%) translate(${opt.dx + offX}px, ${opt.dy + offY}px) scale(1)`
              : 'translate(-50%, -50%) scale(0)',
          } as const;
          return isLink ? (
            <a
              key={opt.key}
              href={opt.href}
              target={isMailto ? undefined : '_blank'}
              rel={isMailto ? undefined : 'noopener noreferrer'}
              aria-label={opt.label}
              title={opt.label}
              onClick={closeWithSound}
              className={className}
              style={style}
            >
              {opt.icon}
            </a>
          ) : (
            <button
              key={opt.key}
              type="button"
              aria-label={opt.label}
              title={opt.label}
              onClick={() => {
                opt.action?.();
                close();
              }}
              className={className}
              style={style}
            >
              {opt.icon}
            </button>
          );
        })}

        {/* Main floating button */}
        <button
          type="button"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onClick={onClick}
          aria-label={menuOpen ? 'Close quick actions' : 'Open quick actions'}
          title={menuOpen ? 'Close' : 'Quick actions'}
          style={{
            touchAction: 'none',
            transform: menuOpen ? `translate(${offX}px, ${offY}px)` : 'none',
          }}
          className="relative flex h-12 w-12 cursor-grab items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-lg backdrop-blur-md transition-[transform,colors] duration-200 ease-out hover:text-foreground active:cursor-grabbing"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </button>
      </div>
    </>
  );
}
