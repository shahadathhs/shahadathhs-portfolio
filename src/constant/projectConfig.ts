export const repoCategories = {
  'Starter Kits & Boilerplates': ['nx-remix-starter', 'turborepo-starter'],
  'AI Applications': ['rag', 'voice-to-text'],
  'Backend Systems & APIs': ['knowledge-capsule', 'ecommerce-inventory-api'],
  'Full-Stack Projects': ['barisathi', 'bike-shop'],
  'Dev Tools & Infrastructure': ['systemix', 'local-mail-stack'],
} as const;

export const PINNED_REPOS = Object.values(repoCategories).flat();
