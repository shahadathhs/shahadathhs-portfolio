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
    description: ['PostgreSQL', 'MongoDB', 'Redis'],
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
    title: 'Architecture',
    description: ['Event-Driven', 'Microservices'],
    icon: Network,
  },
  {
    title: 'DevOps',
    description: ['Docker', 'AWS (EC2, S3)', 'GitHub Actions', 'Linux'],
    icon: Cpu,
  },
  {
    title: 'Servers',
    description: ['Nginx', 'Caddy', 'Reverse Proxy'],
    icon: Globe,
  },
];
