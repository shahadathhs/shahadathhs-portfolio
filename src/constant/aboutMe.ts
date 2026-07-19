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

export const aboutBands: AboutBand[] = [
  {
    paragraph:
      'I build scalable, production-ready backends using Node.js and NestJS, along with Python and FastAPI when it fits the problem. TypeScript keeps everything predictable, maintainable, and safe as systems grow.',
    cards: [
      {
        title: 'Node.js & NestJS',
        description:
          'Structured backend systems with modular architecture and clean service boundaries.',
        icon: Rocket,
      },
      {
        title: 'Python & FastAPI',
        description:
          'High-speed APIs, tooling, and automation using Python’s ecosystem.',
        icon: Code2,
      },
    ],
  },
  {
    paragraph:
      'I design data layers with PostgreSQL, MongoDB, and Redis, and build APIs that stay reliable under real-world load. I also integrate real-time systems, background jobs, and AI-powered features when they add real product value.',
    cards: [
      {
        title: 'Databases',
        description:
          'PostgreSQL, MongoDB, Redis — optimized schemas and efficient access patterns.',
        icon: Database,
      },
      {
        title: 'Realtime, jobs & AI',
        description:
          'WebSockets, queues, and AI integrations — RAG pipelines, tool calling, and vector search — built for actual use cases, not hype.',
        icon: Zap,
      },
    ],
  },
  {
    paragraph:
      'For larger systems, I design microservices with clear boundaries and maintainable communication patterns. Whether it’s modular monoliths or distributed systems, I focus on keeping complexity under control.',
    cards: [
      {
        title: 'Microservices',
        description:
          'Service boundaries that scale without turning into chaos.',
        icon: Layers,
      },
      {
        title: 'APIs & integrations',
        description:
          'Reliable REST APIs and third-party integrations with strong contracts.',
        icon: Network,
      },
    ],
  },
  {
    paragraph:
      'I understand frontend concerns from past experience, which helps me design better APIs around real UI needs like pagination, loading states, and error handling. My focus is backend, but I build with the full product in mind.',
    cards: [
      {
        title: 'Product alignment',
        description:
          'Backend systems designed around real user-facing behavior.',
        icon: PanelsTopLeft,
      },
      {
        title: 'Collaboration',
        description:
          'Clear communication, clean code, and systems that teams can work on confidently.',
        icon: Network,
      },
    ],
  },
  {
    paragraph:
      'I ship systems to production using Docker, CI/CD pipelines, and cloud infrastructure. From deployment to runtime, I focus on stability, observability, and systems that are easy to debug when things go wrong.',
    cards: [
      {
        title: 'CI/CD & cloud',
        description:
          'Automated pipelines and cloud deployments that keep releases smooth.',
        icon: Cpu,
      },
      {
        title: 'Runtime & edge',
        description:
          'Linux, reverse proxies, and process managers configured for reliability.',
        icon: Server,
      },
    ],
  },
];

export const aboutMeBio = aboutBands.map((b) => b.paragraph);
