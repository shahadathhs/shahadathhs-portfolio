/**
 * Regenerate README.md from the portfolio's own data sources
 * (src/constant/*), so the GitHub profile README stays in sync with the site.
 *
 * Run: pnpm readme
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { heroData } from '../src/constant/heroData';
import { skills } from '../src/constant/skillsData';
import { experienceData } from '../src/constant/experienceData';
import { repoCategories } from '../src/constant/projectConfig';
import { socialLinks } from '../src/constant/socialLinks';
import { contactEmail } from '../src/constant/contactInfo';
import { aboutMeBio } from '../src/constant/aboutMe';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const GH = 'shahadathhs';
const PORTFOLIO_URL = 'https://shahadathhs.vercel.app';
const BANNER = `https://github.com/${GH}/${GH}.vercel.app/blob/main/public/github-banner.png`;

/** shields.io badge URL (escapes - and _ so they don't break the URL). */
const shield = (
  text: string,
  color = '0a0a0a',
  opts: { logo?: string; style?: string } = {},
): string => {
  const style = opts.style ?? 'flat-square';
  const label = text
    .replace(/-/g, '--')
    .replace(/_/g, '__')
    .replace(/ /g, '%20');
  let url = `https://img.shields.io/badge/${label}-${color}?style=${style}`;
  if (opts.logo) url += `&logo=${opts.logo}&logoColor=white`;
  return url;
};

const socialMeta: Record<string, { logo?: string; color: string }> = {
  LinkedIn: { logo: 'linkedin', color: '0A66C2' },
  GitHub: { logo: 'github', color: '181717' },
  'Twitter (X)': { logo: 'x', color: '000000' },
  Medium: { logo: 'medium', color: '000000' },
  LeetCode: { logo: 'leetcode', color: 'FFA116' },
};

const socialBadge = (
  s: { name: string; href: string },
  style = 'for-the-badge',
) => {
  const m = socialMeta[s.name] ?? { color: '0a0a0a' };
  return `[![${s.name}](${shield(s.name, m.color, { logo: m.logo, style })})](${s.href})`;
};

const L: string[] = [];
const push = (...s: string[]) => L.push(...s);

/* ----------------------------- Header ----------------------------- */
push('<div align="center">', '');
push(`![Shahadath Banner](${BANNER})`, '');
push(`# ${heroData.name}`, '');
push(`### ${heroData.role} · ${heroData.location}`, '');

const typingLines = heroData.typewriterWords
  .join(';')
  .replace(/ /g, '+')
  .replace(/&/g, '%26');
push(
  `![Typing SVG](https://readme-typing-svg.demolab.com?font=IBM+Plex+Mono&size=14&duration=4000&pause=1000&color=000000&center=true&vCenter=true&width=600&lines=${typingLines})`,
  '',
);
push(
  socialLinks.map((s) => socialBadge(s)).join('\n'),
  '',
  `[![Portfolio](${shield('Portfolio', '000000', { logo: 'vercel', style: 'for-the-badge' })})](${PORTFOLIO_URL})`,
  `[![Resume](${shield('Resume', '2563EB', { logo: 'googledrive', style: 'for-the-badge' })})](${heroData.resumeLink})`,
  '',
  '</div>',
  '',
  '---',
  '',
);

/* ------------------------------ About ----------------------------- */
push('## 🧠 About Me', '');
for (const p of aboutMeBio) push(p, '');
push(
  heroData.quickStats.map((q) => `**${q.value}** · ${q.label}`).join('  •  '),
  '',
  '---',
  '',
);

/* ------------------------------ Skills ---------------------------- */
push('## 🛠️ Skills', '');
for (const s of skills) {
  push(`### ${s.title}`, '');
  push(`_${s.summary}_`, '');
  push(s.description.map((d) => `\`${d}\``).join(' '), '', '');
}
push('---', '');

/* ---------------------------- Experience -------------------------- */
push('## 💼 Experience', '');
for (const e of experienceData) {
  push(`### ${e.designation} · ${e.company}`, '');
  push(`_${e.title} · ${e.location}_`, '');
  for (const r of e.responsibilities) push(`- ${r}`);
  push('');
}
push('---', '');

/* ----------------------------- Projects --------------------------- */
push('## 🚀 Projects', '');
push(
  `Pinned open-source work — [explore all on GitHub](https://github.com/${GH}?tab=repositories).`,
  '',
);
for (const [category, repos] of Object.entries(repoCategories)) {
  push(`### ${category}`, '');
  push(
    repos.map((r) => `[\`${r}\`](https://github.com/${GH}/${r})`).join(' · '),
    '',
  );
}
push('---', '');

/* ------------------------------ Contact --------------------------- */
push('## 📬 Contact', '');
push('<div align="center">', '');
push("**Let's build something scalable together.**", '');
push(
  [
    `[![Email](${shield('Email', 'D14836', { logo: 'gmail', style: 'for-the-badge' })})](mailto:${contactEmail})`,
    ...socialLinks.map((s) => socialBadge(s)),
    `[![Portfolio](${shield('Portfolio', '000000', { logo: 'vercel', style: 'for-the-badge' })})](${PORTFOLIO_URL})`,
  ].join('\n'),
  '',
  '</div>',
  '',
  '---',
  '',
);

/* --------------------------- GitHub stats ------------------------- */
push('## 📊 GitHub Stats', '', '<div align="center">', '');
push(
  `![GitHub Overview](https://github.com/${GH}/github-stats/blob/main/generated/overview.svg#gh-dark-mode-only)`,
  '',
);
push(
  `![Languages Used](https://github.com/${GH}/github-stats/blob/main/generated/languages.svg#gh-dark-mode-only)`,
  '',
);
push('</div>', '');

/* --------------------------- Write file --------------------------- */
const out =
  L.join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';
fs.writeFileSync(path.join(ROOT, 'README.md'), out);
console.info('✓ README.md generated from portfolio data');
