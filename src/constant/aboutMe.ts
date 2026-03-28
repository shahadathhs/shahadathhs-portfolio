import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  Cpu,
  Database,
  Layers,
  Network,
  PanelsTopLeft,
  Rocket,
  Server,
  Zap,
} from 'lucide-react';

export type AboutHighlightCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type AboutBand = {
  paragraph: string;
  cards: AboutHighlightCard[];
};

/** Each paragraph is paired only with cards that reflect that beat—no orphan paragraphs. */
export const aboutBands: AboutBand[] = [
  {
    paragraph:
      'I build scalable, production-minded backends with Node.js and NestJS, plus Python and FastAPI when the problem fits. TypeScript ties it together—clear contracts, safer refactors, and services that stay maintainable as they grow.',
    cards: [
      {
        title: 'Node.js & NestJS',
        description:
          'Services, modules, and APIs on Node—structured with NestJS where the domain calls for it.',
        icon: Rocket,
      },
      {
        title: 'Python & FastAPI',
        description:
          'Fast APIs, tooling, and automation in Python when speed of iteration or ecosystem wins.',
        icon: Code2,
      },
    ],
  },
  {
    paragraph:
      'I design and live with the data layer—PostgreSQL, MongoDB, Redis—and ship REST APIs that stay predictable under load. Real-time channels, background queues, and AI-assisted workflows sit on that foundation when the product needs them.',
    cards: [
      {
        title: 'Databases & persistence',
        description:
          'PostgreSQL, MongoDB, Redis—schemas, migrations, and access patterns that match the workload.',
        icon: Database,
      },
      {
        title: 'Real-time, jobs & AI',
        description:
          'Socket.IO-style realtime, BullMQ-style processing, and pragmatic AI hooks where they earn their keep.',
        icon: Zap,
      },
    ],
  },
  {
    paragraph:
      'Large systems often mean microservices: bounded contexts, clear service boundaries, and integrations that do not turn into spaghetti. I am used to multi-repo or modular monolith setups and shipping features without losing operational clarity.',
    cards: [
      {
        title: 'Microservices & modules',
        description:
          'Splitting and evolving services so teams can move without breaking the whole platform.',
        icon: Layers,
      },
      {
        title: 'APIs & integrations',
        description:
          'REST, events, and third-party integrations with contracts that stay honest in production.',
        icon: Network,
      },
    ],
  },
  {
    paragraph:
      'I have shipped frontend work in the past and still read UI code comfortably—useful for API shape, pagination, and edge cases. My focus now is backend and operations; I use that breadth to stay aligned with product and design, not to own the UI layer.',
    cards: [
      {
        title: 'Product-aligned backend',
        description:
          'APIs and contracts that match how interfaces actually load data, fail, and recover.',
        icon: PanelsTopLeft,
      },
    ],
  },
  {
    paragraph:
      'I take features to production: Docker images, CI/CD (including GitHub Actions), and AWS where it belongs. On the host—PM2 for Node, Nginx or Caddy in front, Linux as the default—I care that deploys are repeatable and easy to reason about when something breaks.',
    cards: [
      {
        title: 'CI/CD & cloud',
        description:
          'Pipelines, containers, and AWS (EC2, S3) so releases are boring in the best way.',
        icon: Cpu,
      },
      {
        title: 'Runtime & edge',
        description:
          'PM2, Nginx, Caddy, and Linux—processes, TLS, and reverse proxy behavior you can debug.',
        icon: Server,
      },
    ],
  },
];

/** Flat list of paragraphs (e.g. meta, tests). Order matches `aboutBands`. */
export const aboutMeBio = aboutBands.map((b) => b.paragraph);
