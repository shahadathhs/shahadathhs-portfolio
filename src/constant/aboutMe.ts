import type { LucideIcon } from 'lucide-react';
import { BrainCircuit, Cloud, Network, Workflow } from 'lucide-react';

export type AboutHighlightCard = {
  /** systemd-style unit name shown in the card header */
  service: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Compact about paragraphs, shown stacked under the header. */
export const aboutParagraphs: string[] = [
  'I’m a backend engineer who builds distributed systems and AI-powered services. Coming from full-stack work, I design APIs around what the frontend actually needs: pagination, loading states, and error handling you can build on.',
  'If it has an endpoint, I wrote it, documented it, and probably got paged for it once.',
  'I deploy what I build: Docker on AWS, CI/CD pipelines, Linux boxes behind Nginx or Caddy. I optimize for boring, observable systems that are easy to debug at 2am. Production is the deliverable.',
];

/** One card per theme, styled as running services. */
export const aboutCards: AboutHighlightCard[] = [
  {
    service: 'ownership.service',
    title: 'End-to-end ownership',
    description:
      'Schema to production, deployment and runtime included. One thread of ownership, no handoff gaps.',
    icon: Workflow,
  },
  {
    service: 'arch.service',
    title: 'Microservices & contracts',
    description:
      'Clear boundaries, strong contracts, async patterns that decouple services and absorb load. Boring architecture on purpose.',
    icon: Network,
  },
  {
    service: 'ai.service',
    title: 'AI in production',
    description:
      'RAG pipelines, tool calling, and vector search serving real users, not demos. Plus real-time tracking at product scale.',
    icon: BrainCircuit,
  },
  {
    service: 'ops.service',
    title: 'CI/CD & operations',
    description:
      'Pipelines and AWS deploys that are smooth and reversible, with monitoring that catches issues before users do.',
    icon: Cloud,
  },
];

export const aboutMeBio = aboutParagraphs;

/** One-line intro under the "About Me" title. */
export const aboutMeSubtitle =
  'the human behind the shell. Takes systems from schema to production and keeps them there.';
