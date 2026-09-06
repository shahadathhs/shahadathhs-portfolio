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
      'Shipped AI features on a large-scale CRM/CMS microservices platform, custom RAG chatbot, tool calling, document retrieval, and workflow automation, backend to deployment.',
      'Built a fully customizable CMS, admins manage themes, layouts, pages, and dynamic content with zero code changes, cutting content-ops turnaround to minutes.',
      'Developed REST APIs on PostgreSQL and MongoDB with dynamic configuration and role-based notifications driving complex business workflows.',
      'Runs on Linux VPS: Nginx, SSL, CI/CD, deployed, monitored, and kept the microservices honest.',
    ],
  },
  {
    title: 'Jul 2025 - Feb 2026',
    company: 'Softvence Agency',
    location: 'Dhaka, Bangladesh · On-site',
    designation: 'Back End Developer',
    responsibilities: [
      'Engineered a platform-level payment engine, subscriptions, promo codes, and rule-based automated payouts moving real money, on time.',
      'Built Uber-style real-time logistics tracking, dynamic multi-party routing that adapts to live weather.',
      'Automated HR and payroll workflows, timezone-aware scheduling, activity streams, and location-aware map services.',
      'Shipped AI automation, candidate evaluation, interview generation, and contextual analytics.',
      'Owned PostgreSQL schemas (Prisma/Drizzle), Redis caching, and AWS EC2 + S3, with monitoring to prove it.',
    ],
  },
  {
    title: 'Aug 2024 - Apr 2025',
    company: 'Monster Studio',
    location: 'Chattogram, Bangladesh · On-site',
    designation: 'Web Developer',
    responsibilities: [
      'Shipped features across a monorepo powering 20+ production websites, responsive, SEO-optimized, and fast.',
      'Built an AI document assistant with retrieval-based, context-aware answers.',
      'Created internal tools, custom CMS and creator utilities wired to external APIs like YouTube.',
      'Led a frontend team through code reviews and task coordination, better reviews, faster delivery.',
      'Hardened reliability with unit and performance tests across projects.',
    ],
  },
];
