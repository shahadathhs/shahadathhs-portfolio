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
      'Contributing to the backend of a large-scale, configurable microservices system.',
      'Focused on building scalable services, managing complex workflows, and integrating AI and communication features.',
      'Ensuring robust, secure, and efficient operations across multiple modules while collaborating with cross-functional teams.',
    ],
  },
  {
    title: 'Jul 2025 - Feb 2026',
    company: 'Softvence Agency',
    location: 'Dhaka, Bangladesh · On-site',
    designation: 'Back End Developer',
    responsibilities: [
      'Built real-time logistics and trip tracking systems (Uber-style) with dynamic route updates, multi-party coordination, and weather-aware routing.',
      'Engineered platform-level payment systems, supporting subscriptions, promo codes, and automated payouts.',
      'Developed multi-source, high-volume data platforms, normalizing external datasets with user-generated content.',
      'Built dynamic HR and scheduling workflows, including payroll automation, timezone-aware operations, and real-time communication.',
      'Implemented location-aware services, real-time updates, advanced search, and map integrations.',
      'Built AI-powered automation, including candidate evaluation, interview question generation, and analytics.',
      'Delivered interactive engagement features such as voting, gamification, and messaging.',
      'Designed and optimized PostgreSQL schemas and queries using Prisma/Drizzle ORM.',
      'Deployed and maintained AWS infrastructure (EC2 & S3) with monitoring and performance optimization.',
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
      'Contributed to the development of 20+ production websites within a large-scale monorepo architecture.',
      'Delivered responsive and SEO-optimized web applications, improving performance and maintainability.',
      'Designed and implemented an AI-powered document assistant for context-aware responses.',
      'Developed internal tools, including a custom CMS and creator utilities, integrating external APIs like YouTube.',
      'Helped scale and maintain a modular monorepo architecture, enabling faster development.',
      'Led a frontend team through code reviews, collaboration, and task coordination.',
      'Strengthened product reliability by contributing unit tests and performance testing initiatives.',
    ],
  },
];
