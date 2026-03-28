export const repoCategories = {
  'Starter Kits & Boilerplates': [
    'nestjs-prisma-aws-starter',
    'nx-remix-starter',
    'turborepo-starter',
  ],
  'AI & Machine Learning': ['rag', 'voice-to-text'],
  'Tools & Utilities': ['systemix', 'local-mail-stack', 'docker-cheatsheet'],
  'Full-Stack Projects': ['vortex', 'barisathi', 'bike-shop'],
  'API Projects': [
    'knowledge-capsule',
    'ecommerce-inventory-api',
    'book-store',
  ],
  'Learning Resources': [
    'data-structures-and-algorithms-in-javascript',
    'go-course',
    'learning-resources-fastapi',
    'sql-guide',
  ],
} as const;

export const PINNED_REPOS = Object.values(repoCategories).flat();
