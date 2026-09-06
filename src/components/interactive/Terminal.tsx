'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { useUI } from '@/context/ui-context';
import { SECTIONS } from '@/constant/sections';
import { PINNED_REPOS } from '@/constant/projectConfig';
import {
  COMMANDS,
  HOME,
  NEOFETCH_ART,
  dirEntries,
  neofetchStats,
  runCommand,
  shortPath,
  sshMotdLines,
  type Line,
  type Seg,
  type Tone,
} from '@/lib/portfolio-shell';

const TONE: Record<Tone, string> = {
  plain: 'text-foreground',
  muted: 'text-muted-foreground',
  error: 'text-red-400',
  ok: 'text-emerald-400',
  accent: 'text-cyan-400',
  dir: 'font-semibold text-blue-400',
  cmd: 'text-amber-300',
};

function Segs({ segs }: { segs: Seg[] }) {
  return (
    <>
      {segs.map((seg, i) =>
        seg.href ? (
          <a
            key={i}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${TONE[seg.tone ?? 'accent']} underline decoration-cyan-400/40 underline-offset-2 hover:decoration-cyan-400`}
          >
            {seg.text}
          </a>
        ) : (
          <span key={i} className={TONE[seg.tone ?? 'muted']}>
            {seg.text}
          </span>
        ),
      )}
    </>
  );
}

function Prompt({
  path,
  who = 'visitor@portfolio',
}: {
  path: string;
  who?: string;
}) {
  return (
    <span className="shrink-0">
      <span className="text-emerald-400">{who}</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-blue-400">{path}</span>
      <span className="text-foreground">$</span>
    </span>
  );
}

export default function Terminal() {
  const { terminalOpen, closeTerminal, navigate, openPetPanel } = useUI();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [bootLock, setBootLock] = useState(false);
  const [cwd, setCwd] = useState(HOME);
  const [win, setWin] = useState<'normal' | 'min' | 'max'>('normal');
  const [who, setWho] = useState('visitor@portfolio');
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cwdRef = useRef(HOME);

  const path = shortPath(cwd);
  const commandNames = useMemo(() => [...COMMANDS].sort(), []);

  useEffect(() => {
    cwdRef.current = cwd;
  }, [cwd]);

  useEffect(() => {
    if (!terminalOpen) return;

    let cancelled = false;
    const ids: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        ids.push(window.setTimeout(resolve, ms));
      });

    setBootLock(true);
    setWin('normal');
    setWho('guest@localhost');
    setCwd(HOME);
    cwdRef.current = HOME;
    setLines([]);
    setInput('');
    setHistory([]);
    setHistIndex(-1);

    const cmd = 'ssh visitor@portfolio';

    (async () => {
      await wait(280);
      if (cancelled) return;
      for (let i = 0; i < cmd.length; i++) {
        await wait(38);
        if (cancelled) return;
        setInput(cmd.slice(0, i + 1));
      }
      await wait(400);
      if (cancelled) return;

      let lastLogin = 'Last login: never, welcome aboard.';
      try {
        const prev = localStorage.getItem('terminal-last-login');
        if (prev) lastLogin = `Last login: ${prev}`;
        localStorage.setItem(
          'terminal-last-login',
          new Date().toUTCString().replace('GMT', 'UTC'),
        );
      } catch {
        // ignore
      }

      setLines([
        { kind: 'in', path: '~', cmd, who: 'guest@localhost' },
        {
          kind: 'out',
          segs: [
            {
              text: "visitor@portfolio's password: ********\n",
              tone: 'muted',
            },
          ],
        },
        ...sshMotdLines(lastLogin),
      ]);
      setInput('');
      setWho('visitor@portfolio');
      setBootLock(false);
      inputRef.current?.focus();
    })();

    return () => {
      cancelled = true;
      ids.forEach(clearTimeout);
      setBootLock(false);
    };
  }, [terminalOpen]);

  useEffect(() => {
    if (terminalOpen && win !== 'min') inputRef.current?.focus();
  }, [terminalOpen, win]);

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, terminalOpen, win]);

  const applyResult = (raw: string, echo: boolean) => {
    const prevPath = shortPath(cwdRef.current);
    const result = runCommand(raw, cwdRef.current);
    if (result.exit) {
      closeTerminal();
      return;
    }
    if (result.clear) {
      setLines([]);
      return;
    }
    if (result.cwd) {
      setCwd(result.cwd);
      cwdRef.current = result.cwd;
    }
    if (result.openUrl) {
      window.open(result.openUrl, '_blank', 'noopener,noreferrer');
    }
    if (result.navigate) navigate(result.navigate);
    if (result.openPet) {
      closeTerminal();
      openPetPanel();
    }
    const next: Line[] = echo
      ? [{ kind: 'in', path: prevPath, cmd: raw }, ...result.lines]
      : result.lines;
    setLines((l) => [...l, ...next]);
  };

  const onSubmit = () => {
    const raw = input;
    if (raw.trim()) setHistory((h) => [...h, raw]);
    setHistIndex(-1);
    setInput('');
    applyResult(raw, true);
  };

  const complete = () => {
    const endsSpace = /\s$/.test(input);
    const parts = input.trim().split(/\s+/).filter(Boolean);
    const cmd = parts[0] ?? '';
    const prefix = endsSpace ? '' : (parts[parts.length - 1] ?? '');

    const applyMatch = (
      candidates: string[],
      tokenPrefix: string,
      lead: string,
    ) => {
      const matches = candidates.filter((c) => c.startsWith(tokenPrefix));
      if (matches.length === 0) return;
      if (matches.length === 1) {
        setInput(`${lead}${matches[0]}${matches[0].endsWith('/') ? '' : ' '}`);
        return;
      }
      let common = matches[0];
      for (const m of matches) {
        while (!m.startsWith(common)) common = common.slice(0, -1);
      }
      if (common.length > tokenPrefix.length) setInput(`${lead}${common}`);
      else {
        setLines((l) => [
          ...l,
          {
            kind: 'out',
            segs: [{ text: matches.join('  '), tone: 'accent' }],
          },
        ]);
      }
    };

    if (parts.length <= 1 && !endsSpace) {
      applyMatch(commandNames, prefix.toLowerCase(), '');
      return;
    }

    const lead = `${cmd} `;
    if (cmd === 'cd' || cmd === 'ls' || cmd === 'cat') {
      applyMatch(
        [...dirEntries(cwd), '../', '~'],
        prefix,
        parts.length > 2 ? `${cmd} ${parts.slice(1, -1).join(' ')} ` : lead,
      );
      return;
    }
    if (cmd === 'open') {
      applyMatch([...SECTIONS.map((s) => s.id), ...PINNED_REPOS], prefix, lead);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (bootLock) {
      e.preventDefault();
      if (e.key === 'Escape') closeTerminal();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      complete();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx =
        histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndex === -1) return;
      const idx = histIndex + 1;
      if (idx >= history.length) {
        setHistIndex(-1);
        setInput('');
      } else {
        setHistIndex(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'Escape') {
      closeTerminal();
    }
  };

  if (!terminalOpen) return null;

  const frame =
    win === 'min'
      ? 'w-full max-w-md'
      : win === 'max'
        ? 'h-[88vh] w-full max-w-5xl'
        : 'h-[72vh] w-full max-w-2xl';

  const stats = neofetchStats();

  return (
    <div
      className={`fixed inset-0 z-[10001] flex p-4 ${
        win === 'min'
          ? 'items-end justify-center'
          : 'items-center justify-center'
      } bg-black/80`}
      onClick={closeTerminal}
    >
      <div
        role="dialog"
        aria-label="Terminal"
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col overflow-hidden rounded-lg border bg-background shadow-lg ${frame}`}
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <button
            type="button"
            aria-label="Close"
            title="Close"
            onClick={closeTerminal}
            className="h-3 w-3 cursor-pointer rounded-full bg-red-500/90 hover:bg-red-400"
          />
          <button
            type="button"
            aria-label={win === 'min' ? 'Restore' : 'Minimize'}
            title={win === 'min' ? 'Restore' : 'Minimize'}
            onClick={() => setWin((w) => (w === 'min' ? 'normal' : 'min'))}
            className="h-3 w-3 cursor-pointer rounded-full bg-yellow-500/90 hover:bg-yellow-400"
          />
          <button
            type="button"
            aria-label={win === 'max' ? 'Restore' : 'Maximize'}
            title={win === 'max' ? 'Restore' : 'Maximize'}
            onClick={() =>
              setWin((w) =>
                w === 'max' ? 'normal' : w === 'min' ? 'normal' : 'max',
              )
            }
            className="h-3 w-3 cursor-pointer rounded-full bg-green-500/90 hover:bg-green-400"
          />
          <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <TerminalIcon className="h-3.5 w-3.5" />
            {who}:{path}, ssh
          </span>
          <button
            type="button"
            onClick={closeTerminal}
            aria-label="Close terminal"
            className="ml-auto cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {win !== 'min' ? (
          <div
            ref={bodyRef}
            className="flex-1 overflow-y-auto whitespace-pre-wrap break-words p-4 font-mono text-sm leading-relaxed"
          >
            {lines.map((line, i) => {
              if (line.kind === 'in') {
                return (
                  <div key={i} className="flex flex-wrap items-baseline gap-2">
                    <Prompt path={line.path} who={line.who} />
                    <span className="text-foreground">{line.cmd}</span>
                  </div>
                );
              }
              if (line.kind === 'neofetch') {
                return (
                  <div
                    key={i}
                    className="my-2 flex flex-col gap-4 sm:flex-row sm:items-start"
                  >
                    <pre className="shrink-0 text-cyan-400">{NEOFETCH_ART}</pre>
                    <div className="min-w-0">
                      <div className="font-semibold text-emerald-400">
                        sajib@portfolio
                      </div>
                      <div className="mb-2 text-muted-foreground">
                        ----------------
                      </div>
                      {stats.map((row) => (
                        <div key={row.key} className="flex flex-wrap gap-2">
                          <span className="text-cyan-400">{row.key}:</span>
                          {row.value.startsWith('http') ? (
                            <a
                              href={row.value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground underline decoration-cyan-400/40 hover:decoration-cyan-400"
                            >
                              {row.value.replace(/^https?:\/\//, '')}
                            </a>
                          ) : (
                            <span className="text-foreground">{row.value}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <div key={i}>
                  <Segs segs={line.segs} />
                </div>
              );
            })}
            <div className="flex items-center gap-2">
              <Prompt path={path} who={who} />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  if (bootLock) return;
                  setInput(e.target.value);
                }}
                onKeyDown={onKeyDown}
                readOnly={bootLock}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                className="flex-1 bg-transparent font-mono text-sm text-foreground outline-none"
                aria-label="Terminal input"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
