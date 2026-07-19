export interface TimelineEntry {
  title: string;
  company: string;
  location: string;
  designation: string;
  responsibilities: string[];
}

export const experienceData: TimelineEntry[] = [
  {
    title: 'Feb 2026 - Present',
    company: 'Digital Pylot',
    location: 'Dhaka, Bangladesh · On-site',
    designation: 'Back End Developer',
    responsibilities: [
      'Contributing to a large-scale CRM and dynamic CMS platform on a microservices architecture — working across backend, AI integration, and deployment.',
      'Built a fully customizable CMS that lets admins manage themes, layouts, pages, sections, and dynamic content without code changes.',
      'Developed REST APIs using PostgreSQL and MongoDB with dynamic configuration and role-based notifications for complex business workflows.',
      'Built AI-powered features — a custom RAG chatbot, tool calling, document retrieval, and intelligent workflow automation.',
      'Deployed and maintained services on Linux VPS (Nginx, SSL, CI/CD) and contributed to microservices reliability and performance.',
    ],
  },
  {
    title: 'Jul 2025 - Feb 2026',
    company: 'Softvence Agency',
    location: 'Dhaka, Bangladesh · On-site',
    designation: 'Back End Developer',
    responsibilities: [
      'Designed and delivered scalable, modular backend systems across multiple web and mobile platforms — real-time features, payment logic, dynamic workflows, and AI automation.',
      'Built real-time logistics and trip tracking (Uber-style) with dynamic routing, multi-party coordination, and weather-aware routing.',
      'Engineered a platform-level payment engine — subscriptions, promo codes, and rule-based automated payouts.',
      'Built dynamic HR/scheduling workflows (payroll automation, timezone-aware ops, activity streams) and location-aware services with map integrations.',
      'Implemented AI-powered automation — candidate evaluation, interview generation, analytics, and contextual insights.',
      'Owned PostgreSQL schemas (Prisma/Drizzle), Redis caching, and AWS EC2 + S3 infrastructure with monitoring and optimization.',
    ],
  },
  // {
  //   title: 'May 2025 - Jun 2025',
  //   company: 'Career Break',
  //   location: 'Chattogram, Bangladesh',
  //   designation: 'Backend Engineering Transition',
  //   responsibilities: [
  //     'Focused on backend architecture using Node.js and NestJS.',
  //     'Strengthened knowledge of relational database design and querying with PostgreSQL.',
  //     'Built experimental backend services to practice authentication flows, API design, and scalable application structure.',
  //     'Explored modern backend tooling, including Prisma ORM, OAuth-based authentication, and real-time communication patterns.',
  //   ],
  // },
  {
    title: 'Aug 2024 - Apr 2025',
    company: 'Monster Studio',
    location: 'Chattogram, Bangladesh · On-site',
    designation: 'Web Developer',
    responsibilities: [
      'Contributed to a large-scale monorepo powering 20+ production websites — responsive, SEO-optimized, and performant.',
      'Designed and implemented an AI-powered document assistant with retrieval-based, context-aware responses.',
      'Built internal tools — a custom CMS and creator utilities — integrating external APIs like YouTube.',
      'Led a frontend team through code reviews, collaboration, and task coordination to improve delivery quality.',
      'Strengthened product reliability by contributing unit tests and performance testing initiatives across projects.',
    ],
  },
];
