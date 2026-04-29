export const repoCategories = {
  'Starter Kits & Boilerplates': [
    'nestjs-prisma-aws-starter',
    'nx-remix-starter',
    'turborepo-starter',
  ],
  'AI Applications': ['rag', 'voice-to-text', 'ecoroute'],
  'Backend Systems & APIs': [
    'knowledge-capsule',
    'ecommerce-inventory-api',
    'book-store',
  ],
  'Full-Stack Projects': ['vortex', 'barisathi', 'bike-shop'],
  'Dev Tools & Infrastructure': [
    'systemix',
    'local-mail-stack',
    'docker-cheatsheet',
  ],
} as const;

export const PINNED_REPOS = Object.values(repoCategories).flat();
