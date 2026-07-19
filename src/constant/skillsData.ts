import {
  Code2,
  Server,
  Database,
  Layers,
  Cloud,
  Zap,
  BrainCircuit,
} from 'lucide-react';

export type Skill = {
  title: string;
  summary: string;
  description: string[];
  icon: typeof Code2;
};

export const skills: Skill[] = [
  {
    title: 'Languages',
    summary:
      'TypeScript-first for type-safe backends; Python for AI, automation, and FastAPI services.',
    description: ['TypeScript', 'JavaScript (ES6+)', 'Python'],
    icon: Code2,
  },
  {
    title: 'Backend',
    summary:
      'Node.js/NestJS for real-time and modular services; FastAPI for ML and async workloads.',
    description: ['Node.js', 'NestJS', 'FastAPI', 'Express.js'],
    icon: Server,
  },
  {
    title: 'Databases',
    summary:
      'Polyglot persistence — relational, document, and in-memory stores chosen per workload.',
    description: ['PostgreSQL', 'MongoDB', 'Redis'],
    icon: Database,
  },
  {
    title: 'ORM / ODM',
    summary:
      'Typed data layers with Prisma and Drizzle; Mongoose for document models.',
    description: ['Prisma', 'Mongoose', 'Drizzle'],
    icon: Layers,
  },
  {
    title: 'Cloud & DevOps',
    summary:
      'Containerized deployments on AWS, automated through CI/CD and reverse-proxied on Linux.',
    description: [
      'Docker',
      'AWS (EC2, S3)',
      'Nginx',
      'Caddy',
      'GitHub Actions',
    ],
    icon: Cloud,
  },
  {
    title: 'Messaging & Real-time',
    summary:
      'Live updates, signaling, and queue-driven background processing for product-scale features.',
    description: ['Socket.IO', 'WebRTC', 'BullMQ'],
    icon: Zap,
  },
  {
    title: 'AI & LLM',
    summary:
      'Production AI features — RAG pipelines, tool calling, and vector search over self-hosted or OpenAI models.',
    description: ['OpenAI API', 'Ollama', 'RAG', 'Vector Search'],
    icon: BrainCircuit,
  },
];
