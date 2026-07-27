import type { Company } from './types';

export const companies: Company[] = [
  {
    slug: 'flow-digital',
    name: 'Flow Digital SDN BHD',
    location: 'Selangor, Malaysia',
    roles: [
      {
        slug: 'team-leader',
        title: 'Team Leader / Senior Tech Lead',
        period: '2025 - Present',
        bullets: [
          [
            { text: 'Orchestrated development lifecycles', strong: true },
            { text: ' for high-traffic web applications using Laravel, Vue.js, and Next.js, ensuring 100% project delivery alignment with business goals.' },
          ],
          [
            { text: 'Steered technical architecture', strong: true },
            { text: ' and resource allocation, mentoring junior developers and establishing code quality standards across the stack.' },
          ],
          [
            { text: 'Architected cloud infrastructure', strong: true },
            { text: ' on AWS (EC2, S3, Route 53) and Cloudflare, implementing robust CI/CD pipelines to streamline deployment workflows.' },
          ],
          [
            { text: 'Spearheaded system security', strong: true },
            { text: ' and performance audits, achieving significant improvements in API response times and infrastructure resilience.' },
          ],
        ],
      },
      {
        slug: 'senior-fullstack-developer',
        title: 'Senior Fullstack Developer',
        period: '2022 - 2024',
        bullets: [
          [
            { text: 'Engineered scalable full-stack solutions', strong: true },
            { text: ' with a focus on modularity and reusability across Laravel and Next.js environments.' },
          ],
          [
            { text: 'Provisioned and managed cloud-native environments', strong: true },
            { text: ' on AWS, focusing on high availability and cost-effective scaling for growing SaaS products.' },
          ],
          [
            { text: 'Integrated complex third-party ecosystems', strong: true },
            { text: ' including payment gateways, logistics APIs, and specialized e-commerce webhooks (Shopify).' },
          ],
        ],
      },
    ],
  },
  {
    slug: 'excel-technology',
    name: 'Excel Technology',
    location: 'Selangor, Malaysia',
    roles: [
      {
        slug: 'full-stack-developer-freelance',
        title: 'Full Stack Developer (Freelance)',
        period: '2018 - 2022',
        bullets: [
          [
            { text: 'Developed custom-tailored web solutions', strong: true },
            { text: ' using PHP/Laravel and JavaScript for various SMEs, focusing on responsive UI/UX and client satisfaction.' },
          ],
          [
            { text: 'Collaborated with cross-functional design teams', strong: true },
            { text: ' to transform complex wireframes into high-performance, accessible digital experiences.' },
          ],
          [
            { text: 'Optimized legacy codebases', strong: true },
            { text: ' for modern standards, improving page load speeds and backend logic efficiency.' },
          ],
        ],
      },
    ],
  },
];
