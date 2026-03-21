import {
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Network,
  Rocket,
  Zap,
} from 'lucide-react';

export const skills = [
  {
    title: 'Languages',
    description: ['JavaScript', 'TypeScript', 'Python'],
    icon: Code2,
  },
  {
    title: 'Frameworks',
    description: ['Node.js', 'NestJS', 'FastAPI', 'Express'],
    icon: Rocket,
  },
  {
    title: 'Databases',
    description: ['PostgreSQL', 'MongoDB', 'Redis', 'Qdrant'],
    icon: Database,
  },
  {
    title: 'ORMs & ODMs',
    description: ['Prisma', 'Drizzle', 'Mongoose'],
    icon: Layers,
  },
  {
    title: 'Realtime',
    description: ['Socket.IO', 'WebRTC', 'BullMQ'],
    icon: Zap,
  },
  {
    title: 'API Architecture',
    description: ['Event-Driven', 'Microservices', 'RESTful API'],
    icon: Network,
  },
  {
    title: 'DevOps',
    description: ['Docker', 'Linux', 'CI/CD', 'AWS (EC2, S3)'],
    icon: Cpu,
  },
  {
    title: 'Web Servers',
    description: ['Nginx', 'Caddy', 'Reverse Proxy'],
    icon: Globe,
  },
];
