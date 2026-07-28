import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
  {
    slug: 'frontend',
    name: 'Frontend',
    items: ['Nuxt.js / Vue', 'Next.js / React', 'Tailwind CSS', 'JavaScript / TypeScript'],
  },
  {
    slug: 'backend',
    name: 'Backend',
    items: ['Laravel / PHP', 'Node.js', 'MySQL / PostgreSQL', 'RESTful APIs'],
  },
  {
    slug: 'devops',
    name: 'DevOps',
    items: ['AWS (EC2, S3, Route 53)', 'Nginx / Apache', 'Ubuntu Server', 'Cloudflare'],
  },
];
