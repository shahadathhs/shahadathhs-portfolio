import { heroData } from '@/constant/heroData';
import { skills } from '@/constant/skillsData';
import { PINNED_REPOS, projectHighlights } from '@/constant/projectConfig';
import { experienceData } from '@/constant/experienceData';
import { contactEmail } from '@/constant/contactInfo';
import { socialLinks } from '@/constant/socialLinks';
import { SECTIONS, type SectionId } from '@/constant/sections';

export const HOME = '/home/visitor';

export type Tone =
  | 'plain'
  | 'muted'
  | 'error'
  | 'ok'
  | 'accent'
  | 'dir'
  | 'cmd';

export type Seg = { text: string; tone?: Tone; href?: string };

export type Line =
  | { kind: 'in'; path: string; cmd: string; who?: string }
  | { kind: 'out'; segs: Seg[] }
  | { kind: 'neofetch' };

export type ShellResult = {
  lines: Line[];
  cwd?: string;
  clear?: boolean;
  exit?: boolean;
  openUrl?: string;
  navigate?: SectionId;
  openPet?: boolean;
};

const DIRS = new Set(['/', '/home', HOME, `${HOME}/projects`]);

const fileBody = (path: string): string | null => {
  switch (path) {
    case `${HOME}/about`:
      return heroData.tagline;
    case `${HOME}/skills`:
      return skills
        .map((s) => `${s.title}: ${s.description.join(', ')}`)
        .join('\n');
    case `${HOME}/experience`:
      return experienceData
        .map(
          (e) =>
            `${e.title}\n${e.designation} @ ${e.company} (${e.location})\n${e.responsibilities.map((r) => `  - ${r}`).join('\n')}`,
        )
        .join('\n\n');
    case `${HOME}/blogs`:
      return 'Latest writing on Medium\nhttps://medium.com/@shahadathhs';
    case `${HOME}/github`:
      return 'Contribution activity, streaks, and language breakdown\n(weekly stats generated daily from public GitHub data)';
    case `${HOME}/contact`:
      return `Email: ${contactEmail}\n${socialLinks.map((s) => `${s.name}: ${s.href}`).join('\n')}`;
    default:
      break;
  }
  const repo = path.match(new RegExp(`^${HOME}/projects/([^/]+)$`));
  if (repo && (PINNED_REPOS as readonly string[]).includes(repo[1])) {
    const name = repo[1];
    const bullets = (projectHighlights[name] ?? [])
      .map((b) => `  - ${b}`)
      .join('\n');
    return `${name}\nhttps://github.com/shahadathhs/${name}\n${bullets}`;
  }
  return null;
};

const isDir = (path: string) => DIRS.has(path);

export const shortPath = (cwd: string) => {
  if (cwd === HOME) return '~';
  if (cwd.startsWith(`${HOME}/`)) return `~${cwd.slice(HOME.length)}`;
  return cwd;
};

export const resolvePath = (cwd: string, target?: string) => {
  if (!target || target === '~') return HOME;
  const raw = target.startsWith('/')
    ? target
    : target.startsWith('~/')
      ? `${HOME}${target.slice(1)}`
      : `${cwd}/${target}`;
  const parts: string[] = [];
  for (const p of raw.split('/')) {
    if (!p || p === '.') continue;
    if (p === '..') parts.pop();
    else parts.push(p);
  }
  return `/${parts.join('/')}`;
};

const listDir = (path: string): { name: string; dir: boolean }[] | null => {
  if (path === '/') return [{ name: 'home', dir: true }];
  if (path === '/home') return [{ name: 'visitor', dir: true }];
  if (path === HOME) {
    return [
      { name: 'about', dir: false },
      { name: 'blogs', dir: false },
      { name: 'contact', dir: false },
      { name: 'experience', dir: false },
      { name: 'github', dir: false },
      { name: 'projects', dir: true },
      { name: 'skills', dir: false },
    ];
  }
  if (path === `${HOME}/projects`) {
    return PINNED_REPOS.map((name) => ({ name, dir: false }));
  }
  return null;
};

export const dirEntries = (cwd: string) =>
  (listDir(cwd) ?? []).map((e) => (e.dir ? `${e.name}/` : e.name));

const out = (text: string, tone: Tone = 'muted'): Line[] => [
  { kind: 'out', segs: [{ text, tone }] },
];

const err = (text: string): Line[] => out(text, 'error');

const linkify = (text: string, tone: Tone = 'muted'): Seg[] => {
  const segs: Seg[] = [];
  const re = /(https?:\/\/[^\s]+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) segs.push({ text: text.slice(last, m.index), tone });
    segs.push({ text: m[1], tone: 'accent', href: m[1] });
    last = m.index + m[1].length;
  }
  if (last < text.length) segs.push({ text: text.slice(last), tone });
  return segs.length ? segs : [{ text, tone }];
};

const loadAvg = () => (0.04 + Math.random() * 0.22).toFixed(2);
const pct = (n: number) => `${n}%`;

export function sshMotdLines(lastLogin: string): Line[] {
  const now = new Date().toUTCString().replace('GMT', 'UTC');
  return [
    {
      kind: 'out',
      segs: [
        {
          text: `Welcome to SajibOS 1.0 (GNU/Linux 6.8.0-sajib x86_64)\n`,
          tone: 'plain',
        },
      ],
    },
    {
      kind: 'out',
      segs: [
        {
          text: ` * Documentation:  https://github.com/shahadathhs
 * Support:         https://www.linkedin.com/in/shahadathhs/
 * Portfolio:       https://shahadathhs.vercel.app`,
          tone: 'accent',
        },
      ],
    },
    {
      kind: 'out',
      segs: [
        {
          text: `\n  System information as of ${now}\n`,
          tone: 'muted',
        },
      ],
    },
    {
      kind: 'out',
      segs: [
        {
          text: `  System load:  ${loadAvg().padEnd(18)} Processes:           128
  Usage of /:   ${'24% of 64GB'.padEnd(18)} Users logged in:     1
  Memory usage: ${pct(38).padEnd(18)} IPv4 address:        10.4.0.21
  Swap usage:   ${pct(0)}`,
          tone: 'muted',
        },
      ],
    },
    {
      kind: 'out',
      segs: [
        {
          text: `\n * ${heroData.role} · ${heroData.location}
 * ${heroData.availability}\n`,
          tone: 'ok',
        },
      ],
    },
    { kind: 'neofetch' },
    {
      kind: 'out',
      segs: [
        {
          text: `\nType 'help' to see available commands.\n`,
          tone: 'accent',
        },
      ],
    },
    {
      kind: 'out',
      segs: [
        {
          text: lastLogin,
          tone: 'muted',
        },
      ],
    },
  ];
}

export const HELP_LINES: Line[] = [
  {
    kind: 'out',
    segs: [{ text: 'Available commands:', tone: 'ok' }],
  },
  {
    kind: 'out',
    segs: [
      {
        text: `  help          list commands
  neofetch      system fetch
  ls            list directory
  cd            change directory
  pwd           print working directory
  cat           read a file
  open          jump to a section
  whoami        who I am
  about         short bio
  skills        tech stack
  projects      pinned repos
  experience    work history
  contact       email + socials
  social        social links
  resume        open resume
  github        open GitHub
  linkedin      open LinkedIn
  blog          open Medium
  pet           companion settings
  echo          print text
  date          current date
  uname         OS name
  cowsay        a cow, obviously
  matrix        follow the white rabbit
  sudo          nice try
  clear         clear screen
  exit          close terminal`,
        tone: 'muted',
      },
    ],
  },
  {
    kind: 'out',
    segs: [
      {
        text: '\nTip: Tab completes commands and paths. ArrowUp/Down cycles history.',
        tone: 'accent',
      },
    ],
  },
];

export const NEOFETCH_ART = `      .--.
     |o_o |
     |:_/ |
    //   \\ \\
   (|     | )
  /'\\_   _/\`\\
  \\___)=(___/`;

export const neofetchStats = (): { key: string; value: string }[] => [
  { key: 'OS', value: 'SajibOS 1.0' },
  { key: 'Host', value: 'shahadathhs.vercel.app' },
  { key: 'Kernel', value: 'Next.js' },
  { key: 'Shell', value: 'zsh' },
  { key: 'Role', value: heroData.role },
  { key: 'Location', value: heroData.location },
  { key: 'Focus', value: 'Microservices & AI backends' },
  { key: 'Stack', value: 'Node.js · NestJS · TypeScript · Python' },
  { key: 'Uptime', value: `${heroData.quickStats[0]?.value ?? '2+'} years` },
  { key: 'GitHub', value: heroData.githubLink },
];

const cowsay = (msg: string) => {
  const text = msg || 'moo';
  const width = Math.min(42, Math.max(text.length, 4));
  const top = ` ${'_'.repeat(width + 2)}`;
  const bot = ` ${'-'.repeat(width + 2)}`;
  const wrapped: string[] = [];
  let rest = text;
  while (rest.length > width) {
    wrapped.push(rest.slice(0, width));
    rest = rest.slice(width);
  }
  wrapped.push(rest.padEnd(width));
  const body = wrapped.map((l) => `| ${l} |`).join('\n');
  return `${top}\n${body}\n${bot}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
};

const matrixBurst = () => {
  const glyphs = '01アイウエオカキクケコ01░▒';
  const rows = Array.from({ length: 7 }, () =>
    Array.from(
      { length: 48 },
      () => glyphs[Math.floor(Math.random() * glyphs.length)],
    ).join(''),
  );
  return `${rows.join('\n')}\n\nWake up, visitor...`;
};

export const COMMANDS = [
  'help',
  'neofetch',
  'ls',
  'cd',
  'pwd',
  'cat',
  'open',
  'whoami',
  'about',
  'skills',
  'projects',
  'experience',
  'contact',
  'social',
  'resume',
  'github',
  'linkedin',
  'blog',
  'pet',
  'echo',
  'date',
  'uname',
  'cowsay',
  'matrix',
  'sudo',
  'clear',
  'exit',
] as const;

export function runCommand(raw: string, cwd: string): ShellResult {
  const trimmed = raw.trim();
  if (!trimmed) return { lines: [] };
  const [name, ...args] = trimmed.split(/\s+/);
  const arg = args.join(' ');

  if (name === 'clear') return { lines: [], clear: true };
  if (name === 'exit') return { lines: [], exit: true };

  if (name === 'help') return { lines: HELP_LINES };
  if (name === 'neofetch') return { lines: [{ kind: 'neofetch' }] };
  if (name === 'pwd') return { lines: out(cwd, 'plain') };
  if (name === 'whoami') {
    return {
      lines: out(`${heroData.name} | ${heroData.role}\n${heroData.tagline}`),
    };
  }
  if (name === 'about') return { lines: out(heroData.tagline) };
  if (name === 'skills') {
    return {
      lines: out(
        skills.map((s) => `${s.title}: ${s.description.join(', ')}`).join('\n'),
      ),
    };
  }
  if (name === 'projects') {
    return {
      lines: [
        {
          kind: 'out',
          segs: PINNED_REPOS.flatMap((repo, i) => [
            ...(i ? [{ text: '\n', tone: 'muted' as const }] : []),
            {
              text: `https://github.com/shahadathhs/${repo}`,
              tone: 'accent' as const,
              href: `https://github.com/shahadathhs/${repo}`,
            },
          ]),
        },
      ],
    };
  }
  if (name === 'experience') {
    return {
      lines: out(
        experienceData
          .map(
            (e) =>
              `${e.title} | ${e.designation} @ ${e.company} (${e.location})`,
          )
          .join('\n\n'),
      ),
    };
  }
  if (name === 'contact' || name === 'social') {
    const text =
      name === 'contact'
        ? `Email: ${contactEmail}\n${socialLinks.map((s) => `${s.name}: ${s.href}`).join('\n')}`
        : socialLinks.map((s) => `${s.name}: ${s.href}`).join('\n');
    return { lines: [{ kind: 'out', segs: linkify(text) }] };
  }
  if (name === 'echo') return { lines: out(arg || '', 'plain') };
  if (name === 'date') return { lines: out(new Date().toString(), 'plain') };
  if (name === 'uname') return { lines: out('SajibOS 1.0', 'plain') };
  if (name === 'cowsay') return { lines: out(cowsay(arg), 'ok') };
  if (name === 'matrix') return { lines: out(matrixBurst(), 'ok') };
  if (name === 'sudo') {
    return {
      lines: err(
        'visitor is not in the sudoers file. This incident will be reported.',
      ),
    };
  }
  if (name === 'resume') {
    return {
      lines: out('Opening resume...', 'ok'),
      openUrl: heroData.resumeLink,
    };
  }
  if (name === 'github') {
    return {
      lines: out('Opening GitHub...', 'ok'),
      openUrl: heroData.githubLink,
    };
  }
  if (name === 'linkedin') {
    const href = socialLinks.find((s) => s.name === 'LinkedIn')?.href;
    return { lines: out('Opening LinkedIn...', 'ok'), openUrl: href };
  }
  if (name === 'blog') {
    return {
      lines: out('Opening blog...', 'ok'),
      openUrl: 'https://medium.com/@shahadathhs',
    };
  }
  if (name === 'pet') {
    return { lines: out('Opening companion settings...', 'ok'), openPet: true };
  }

  if (name === 'ls') {
    const target = resolvePath(cwd, args[0]);
    const entries = listDir(target);
    if (!entries) {
      return { lines: err(`ls: ${args[0] ?? target}: No such directory`) };
    }
    return {
      lines: [
        {
          kind: 'out',
          segs: entries.flatMap((e, i) => [
            ...(i ? [{ text: '  ' }] : []),
            {
              text: e.dir ? `${e.name}/` : e.name,
              tone: e.dir ? ('dir' as const) : ('plain' as const),
            },
          ]),
        },
      ],
    };
  }

  if (name === 'cd') {
    const next = resolvePath(cwd, args[0]);
    if (!isDir(next)) {
      return { lines: err(`cd: ${args[0] ?? next}: No such directory`) };
    }
    return { lines: [], cwd: next };
  }

  if (name === 'cat') {
    if (!args[0]) return { lines: err('cat: missing operand') };
    const path = resolvePath(cwd, args[0]);
    if (isDir(path)) return { lines: err(`cat: ${args[0]}: Is a directory`) };
    const body = fileBody(path);
    if (body == null) return { lines: err(`cat: ${args[0]}: No such file`) };
    return { lines: [{ kind: 'out', segs: linkify(body) }] };
  }

  if (name === 'open') {
    if (!args[0]) {
      return {
        lines: err(
          'usage: open <about|skills|experience|projects|blogs|contact|home>',
        ),
      };
    }
    const key = args[0].toLowerCase();
    const alias: Record<string, SectionId> = {
      home: 'hero',
      hero: 'hero',
      writing: 'blogs',
      blog: 'blogs',
    };
    // 'github' navigates to the GitHub activity section, not the profile URL.
    if (key === 'github') {
      return { lines: out('Opening github...', 'ok'), navigate: 'github' };
    }
    const id =
      alias[key] ??
      (SECTIONS.some((s) => s.id === key) ? (key as SectionId) : null);
    if (id) {
      return { lines: out(`Opening ${id}...`, 'ok'), navigate: id };
    }
    if ((PINNED_REPOS as readonly string[]).includes(args[0])) {
      return {
        lines: out(`Opening ${args[0]} on GitHub...`, 'ok'),
        openUrl: `https://github.com/shahadathhs/${args[0]}`,
      };
    }
    return { lines: err(`open: unknown target '${args[0]}'`) };
  }

  return {
    lines: err(
      `command not found: ${name}\nType 'help' for available commands.`,
    ),
  };
}
