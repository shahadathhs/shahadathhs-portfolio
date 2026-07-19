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
      'Contributing to a large-scale CRM and dynamic CMS platform — working across backend, frontend, AI integration, and deployment to deliver secure, reliable, production-ready solutions.',
      'Built a fully customizable CMS that lets administrators manage themes, layouts, pages, sections, and dynamic content without code changes.',
      'Developed REST APIs and backend services using PostgreSQL and MongoDB, selecting the right database based on application requirements.',
      'Designed and implemented dynamic configuration and role-based notification systems to support complex business workflows.',
      'Built AI-powered features — a custom RAG chatbot, tool calling, document retrieval, and intelligent workflow automation.',
      'Developed frontend interfaces for backend modules using React and Next.js, delivering complete end-to-end features.',
      'Deployed and maintained applications on Linux VPS servers, configuring Nginx, domains, SSL certificates, environment variables, and production deployments.',
      'Contributed to a microservices architecture — troubleshooting production issues, optimizing performance, and improving overall system reliability.',
    ],
  },
  {
    title: 'Jul 2025 - Feb 2026',
    company: 'Softvence Agency',
    location: 'Dhaka, Bangladesh · On-site',
    designation: 'Back End Developer',
    responsibilities: [
      'Designed and delivered scalable, modular backend systems across multiple web and mobile platforms — handling high-volume data, real-time features, dynamic workflows, and advanced payment logic.',
      'Built real-time logistics and trip tracking systems (Uber-style) with dynamic route updates, multi-party coordination (drivers, shelters, vets), and weather-aware routing.',
      'Engineered platform-level payment systems supporting subscriptions, promo codes, and automated payouts dynamically calculated from distance, task complexity, and configurable rules.',
      'Developed multi-source, high-volume data platforms, normalizing external datasets alongside user-generated content with background processing and Redis caching.',
      'Built dynamic HR and scheduling workflows, including payroll automation, nested interactions, timezone-aware operations, real-time communication, and social feed–style activity streams.',
      'Implemented location-aware services, real-time updates, advanced search, and map integrations for discovery, logistics, and marketplaces.',
      'Built AI-powered automation, including candidate evaluation, interview question generation, analytics, and contextual insights.',
      'Delivered interactive engagement features such as voting, gamification, subscription management, progress tracking, and messaging.',
      'Designed and optimized PostgreSQL schemas and queries using Prisma and Drizzle ORM for transactional and analytical operations.',
      'Deployed and maintained AWS infrastructure (EC2 & S3) with monitoring, domain configuration, and performance optimization.',
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
      'Worked on a large-scale monorepo powering multiple production websites — contributing across frontend and backend development.',
      'Contributed to the development of 20+ production websites within a large-scale monorepo architecture.',
      'Delivered responsive and SEO-optimized web applications, improving performance and maintainability across multiple projects.',
      'Designed and implemented an AI-powered document assistant that retrieves information from system-managed documents to generate context-aware responses.',
      'Developed internal tools, including a custom CMS and creator utilities, integrating external APIs such as YouTube.',
      'Helped scale and maintain a modular monorepo architecture, enabling faster development across multiple teams.',
      'Led a frontend team through code reviews, collaboration, and task coordination to improve delivery quality.',
      'Strengthened product reliability by contributing unit tests and performance testing initiatives.',
    ],
  },
];
