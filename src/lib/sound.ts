// Lightweight synthesized sound effects via the Web Audio API.
// Enabled by default; the toggle persists in localStorage.

let ctx: AudioContext | null = null;
let enabled = true;

const KEY = 'sound-enabled';

if (typeof window !== 'undefined') {
  try {
    enabled = localStorage.getItem(KEY) !== '0';
  } catch {
    // ignore
  }
}

export function isSoundEnabled(): boolean {
  return enabled;
}

export function setSoundEnabled(v: boolean): void {
  enabled = v;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(KEY, v ? '1' : '0');
    } catch {
      // ignore
    }
  }
}

export function toggleSound(): boolean {
  setSoundEnabled(!enabled);
  return enabled;
}

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

type ToneOpts = {
  freq: number;
  dur: number;
  type?: OscillatorType;
  gain?: number;
  slideTo?: number;
  delay?: number;
};

function tone({
  freq,
  dur,
  type = 'sine',
  gain = 0.05,
  slideTo,
  delay = 0,
}: ToneOpts): void {
  const c = getCtx();
  if (!c || !enabled) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

export type SoundName =
  | 'click'
  | 'toggle'
  | 'lock'
  | 'unlock'
  | 'open'
  | 'close'
  | 'pet';

export function playSound(name: SoundName): void {
  switch (name) {
    case 'click':
      tone({
        freq: 520,
        dur: 0.08,
        type: 'triangle',
        gain: 0.05,
        slideTo: 360,
      });
      break;
    case 'toggle':
      tone({ freq: 660, dur: 0.09, type: 'square', gain: 0.04, slideTo: 880 });
      break;
    case 'lock':
      tone({ freq: 240, dur: 0.2, type: 'sawtooth', gain: 0.05, slideTo: 110 });
      break;
    case 'unlock':
      tone({ freq: 440, dur: 0.18, type: 'sine', gain: 0.05, slideTo: 880 });
      break;
    case 'open':
      tone({ freq: 600, dur: 0.1, type: 'triangle', gain: 0.04, slideTo: 920 });
      break;
    case 'close':
      tone({ freq: 600, dur: 0.1, type: 'triangle', gain: 0.04, slideTo: 360 });
      break;
    case 'pet':
      tone({ freq: 988, dur: 0.09, type: 'sine', gain: 0.12, slideTo: 1318 });
      break;
  }
}
