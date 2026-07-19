import {
  Code2,
  Server,
  Database,
  Layers,
  Cloud,
  Zap,
  BrainCircuit,
} from 'lucide-react';

export const skills = [
  {
    title: 'Languages',
    description: ['TypeScript', 'JavaScript (ES6+)', 'Python'],
    icon: Code2,
  },
  {
    title: 'Backend',
    description: ['Node.js', 'NestJS', 'FastAPI', 'Express.js'],
    icon: Server,
  },
  {
    title: 'Databases',
    description: ['PostgreSQL', 'MongoDB', 'Redis'],
    icon: Database,
  },
  {
    title: 'ORM / ODM',
    description: ['Prisma', 'Mongoose', 'Drizzle'],
    icon: Layers,
  },
  {
    title: 'Cloud & DevOps',
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
    description: ['Socket.IO', 'WebRTC', 'BullMQ'],
    icon: Zap,
  },
  {
    title: 'AI & LLM',
    description: ['OpenAI API', 'Ollama', 'RAG', 'Vector Search'],
    icon: BrainCircuit,
  },
];
