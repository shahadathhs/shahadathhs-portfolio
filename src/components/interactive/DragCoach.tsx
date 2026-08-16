'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useDragCoach(hintKey: string, posKey?: string) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(hintKey) === '1') return;
      if (posKey && localStorage.getItem(posKey)) {
        localStorage.setItem(hintKey, '1');
        return;
      }
    } catch {
      return;
    }

    const showAt = window.setTimeout(() => setShow(true), 900);
    return () => window.clearTimeout(showAt);
  }, [hintKey, posKey]);

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      localStorage.setItem(hintKey, '1');
    } catch {
      // ignore
    }
  }, [hintKey]);

  return { show, dismiss };
}

export function useIdleWiggle(doneKey: string, posKey?: string) {
  const [wiggling, setWiggling] = useState(false);
  const stopped = useRef(false);

  const stop = useCallback(() => {
    stopped.current = true;
    setWiggling(false);
    try {
      localStorage.setItem(doneKey, '1');
    } catch {
      // ignore
    }
  }, [doneKey]);

  useEffect(() => {
    try {
      if (localStorage.getItem(doneKey) === '1') {
        stopped.current = true;
        return;
      }
      if (posKey && localStorage.getItem(posKey)) {
        stopped.current = true;
        localStorage.setItem(doneKey, '1');
        return;
      }
    } catch {
      return;
    }

    let count = 0;
    const ids: number[] = [];
    const beat = () => {
      if (stopped.current || count >= 3) return;
      count += 1;
      setWiggling(true);
      ids.push(window.setTimeout(() => setWiggling(false), 700));
      if (count < 3) ids.push(window.setTimeout(beat, 8000));
    };
    ids.push(window.setTimeout(beat, 2800));

    return () => {
      ids.forEach(clearTimeout);
    };
  }, [doneKey, posKey]);

  return { wiggling, stop };
}

export function DragCoach({
  show,
  side = 'right',
}: {
  show: boolean;
  side?: 'top' | 'left' | 'right';
}) {
  if (!show) return null;

  const place =
    side === 'top'
      ? 'bottom-full left-1/2 mb-2 -translate-x-1/2'
      : side === 'left'
        ? 'right-full top-1/2 mr-2 -translate-y-1/2'
        : 'left-full top-1/2 ml-2 -translate-y-1/2';

  return (
    <div
      role="status"
      className={`pointer-events-none absolute z-10 ${place} whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground shadow-lg`}
    >
      Drag me
    </div>
  );
}
