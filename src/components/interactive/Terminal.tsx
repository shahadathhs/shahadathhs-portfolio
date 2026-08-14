'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { useUI } from '@/context/ui-context';
import { heroData } from '@/constant/heroData';
import { skills } from '@/constant/skillsData';
import { repoCategories } from '@/constant/projectConfig';
import { experienceData } from '@/constant/experienceData';
import { contactEmail } from '@/constant/contactInfo';
import { socialLinks } from '@/constant/socialLinks';

type Line = { kind: 'in' | 'out'; text: string };

const PROMPT = 'visitor@portfolio:~$';
const BLOG_URL = 'https://medium.com/@shahadathhs';

const HELP = `Available commands:
  help        list commands
  whoami      who I am
  about       short bio
  skills      tech stack
  projects    pinned repos
  experience  work history
  contact     email + socials
  social      social links
  resume      open resume (new tab)
  github      open GitHub (new tab)
  blog        open blog (new tab)
  neofetch    system info
  clear       clear screen
  exit        close terminal

Tip: Tab autocompletes commands, ArrowUp/Down cycles history.`;

const NEOFETCH = `${heroData.name} @ ${heroData.role}
-------------------------------------------
role:        ${heroData.role}
location:    ${heroData.location}
focus:       Microservices & AI backends
stack:       Node.js · NestJS · TypeScript · Python
databases:   PostgreSQL · MongoDB · Redis
os:          PortfolioOS 1.0
shell:       zsh
uptime:     ${new Date().getFullYear() - 2022}+ years`;

export default function Terminal() {
  const { terminalOpen, closeTerminal } = useUI();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number>(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo(
    () => ({
      help: () => HELP,
      whoami: () => `${heroData.name} — ${heroData.role}\n${heroData.tagline}`,
      about: () => heroData.tagline,
      skills: () =>
        skills.map((s) => `${s.title}: ${s.description.join(', ')}`).join('\n'),
      projects: () =>
        Object.entries(repoCategories)
          .map(([cat, repos]) => `${cat}\n  ${repos.join(', ')}`)
          .join('\n\n'),
      experience: () =>
        experienceData
          .map(
            (e) =>
              `${e.title} — ${e.designation} @ ${e.company} (${e.location})`,
          )
          .join('\n\n'),
      contact: () =>
        `Email: ${contactEmail}\n` +
        socialLinks.map((s) => `${s.name}: ${s.href}`).join('\n'),
      social: () => socialLinks.map((s) => `${s.name}: ${s.href}`).join('\n'),
      resume: () => {
        window.open(heroData.resumeLink, '_blank', 'noopener,noreferrer');
        return 'Opening resume...';
      },
      github: () => {
        window.open(heroData.githubLink, '_blank', 'noopener,noreferrer');
        return 'Opening GitHub...';
      },
      blog: () => {
        window.open(BLOG_URL, '_blank', 'noopener,noreferrer');
        return 'Opening blog...';
      },
      neofetch: () => NEOFETCH,
    }),
    [],
  );

  // Fresh session each time the terminal opens.
  useEffect(() => {
    if (!terminalOpen) return;
    setLines([
      {
        kind: 'out',
        text: `PortfolioOS 1.0 — ${heroData.name}\nType 'help' for available commands.`,
      },
    ]);
    setInput('');
    setHistory([]);
    setHistIndex(-1);
  }, [terminalOpen]);

  // Focus + scroll on open / new output.
  useEffect(() => {
    if (terminalOpen) inputRef.current?.focus();
  }, [terminalOpen]);

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, terminalOpen]);

  const run = (raw: string): Line[] => {
    const cmd = raw.trim();
    if (!cmd) return [];
    const [name] = cmd.split(/\s+/);
    if (name === 'clear') {
      setLines([]);
      return [];
    }
    if (name === 'exit') {
      closeTerminal();
      return [];
    }
    const fn = (commands as Record<string, () => string>)[name];
    const out = fn
      ? fn()
      : `command not found: ${name}\nType 'help' for available commands.`;
    return [{ kind: 'out', text: out }];
  };

  const onSubmit = () => {
    const next: Line[] = [{ kind: 'in', text: `${PROMPT} ${input}` }];
    const out = run(input);
    if (input.trim()) setHistory((h) => [...h, input]);
    setHistIndex(-1);
    setLines((l) => [...l, ...next, ...out]);
    setInput('');
  };

  const commandNames = useMemo(
    () => [...Object.keys(commands), 'clear', 'exit'].sort(),
    [commands],
  );

  /** Tab completion: unique match completes; ambiguous completes to the
   *  common prefix, or lists the candidates if the prefix is already exact. */
  const complete = () => {
    const prefix = input.trim().toLowerCase();
    if (!prefix) {
      setLines((l) => [...l, { kind: 'out', text: commandNames.join('  ') }]);
      return;
    }
    const matches = commandNames.filter((c) => c.startsWith(prefix));
    if (matches.length === 0) return;
    if (matches.length === 1) {
      setInput(`${matches[0]} `);
      return;
    }
    let common = matches[0];
    for (const m of matches) {
      while (!m.startsWith(common)) common = common.slice(0, -1);
    }
    if (common.length > prefix.length) {
      setInput(common);
    } else {
      setLines((l) => [...l, { kind: 'out', text: matches.join('  ') }]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  return (
    <div
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/80 p-4"
      onClick={closeTerminal}
    >
      <div
        role="dialog"
        aria-label="Terminal"
        onClick={(e) => e.stopPropagation()}
        className="flex h-[72vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border bg-background shadow-lg"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <TerminalIcon className="h-3.5 w-3.5" />
            shahadathhs@portfolio — zsh
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

        {/* Output */}
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto whitespace-pre-wrap break-words p-4 font-mono text-sm leading-relaxed"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.kind === 'in' ? 'text-foreground' : 'text-muted-foreground'
              }
            >
              {line.text}
            </div>
          ))}
          {/* Active input line */}
          <div className="flex items-center gap-2 text-foreground">
            <span className="text-foreground">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              className="flex-1 bg-transparent font-mono text-sm outline-none"
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
