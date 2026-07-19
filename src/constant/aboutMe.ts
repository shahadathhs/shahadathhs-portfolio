import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Boxes,
  BrainCircuit,
  Cloud,
  Code2,
  Network,
  Radio,
  Workflow,
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
      'I’m a backend engineer who builds scalable, distributed systems and AI-powered services. My work spans the full lifecycle — data modeling, API contracts, business logic, deployment, and runtime — not just one layer of the stack. Coming from full-stack work, I design APIs around real UI needs: pagination, loading states, and error handling that the frontend can actually build on.',
    cards: [
      {
        title: 'End-to-end ownership',
        description:
          'I design, build, and ship backend systems from schema to production — including the deployment and runtime around them.',
        icon: Workflow,
      },
      {
        title: 'Backend-first',
        description:
          'Node.js/NestJS for real-time and modular services, Python/FastAPI for AI and async workloads — chosen per problem.',
        icon: Code2,
      },
    ],
  },
  {
    paragraph:
      'For systems that need to grow, I design microservices with clear boundaries and APIs with strong contracts. Whether it’s a modular monolith or a distributed system, my focus is keeping complexity under control as products and teams scale — not adding services for the sake of it.',
    cards: [
      {
        title: 'Microservices architecture',
        description:
          'Service boundaries that scale without turning into chaos — clear modules, contracts, and ownership.',
        icon: Network,
      },
      {
        title: 'Event-driven design',
        description:
          'Async workflows, queues, and pub/sub patterns that decouple services and absorb load gracefully.',
        icon: Boxes,
      },
    ],
  },
  {
    paragraph:
      'I build features that need live behavior or intelligence — real-time logistics, RAG chatbots, tool calling, document retrieval. The goal is AI and real-time that solve real product problems, not bolted-on hype. I’ve shipped Uber-style tracking, payment engines, and AI automation that real users depend on.',
    cards: [
      {
        title: 'AI in production',
        description:
          'RAG pipelines, tool calling, and vector search shipped to real users — not demos. Backed by document retrieval and workflow automation.',
        icon: BrainCircuit,
      },
      {
        title: 'Real-time systems',
        description:
          'Live tracking, signaling, and background jobs at product scale — multi-party coordination and dynamic routing included.',
        icon: Radio,
      },
    ],
  },
  {
    paragraph:
      'I deploy what I build — Docker on AWS, CI/CD pipelines, Linux VPS behind Nginx or Caddy. I optimize for stability, observability, and systems that are easy to debug at 2am, not just impressive in a demo. Production is the deliverable.',
    cards: [
      {
        title: 'CI/CD & cloud',
        description:
          'Automated pipelines and AWS deployments (EC2, S3) that keep releases smooth, reversible, and boring in the best way.',
        icon: Cloud,
      },
      {
        title: 'Runtime & observability',
        description:
          'Linux, reverse proxies, and process managers configured for reliability — with monitoring that catches issues early.',
        icon: Activity,
      },
    ],
  },
];

export const aboutMeBio = aboutBands.map((b) => b.paragraph);
