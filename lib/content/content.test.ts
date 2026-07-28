import { describe, it, expect } from 'vitest';
import { plainText } from './types';
import { about } from './about';
import { education } from './education';
import { skillGroups } from './skills';
import { companies } from './experience';
import { projects } from './projects';

describe('about', () => {
  it('has at least one paragraph mentioning Malaysia', () => {
    expect(about.length).toBeGreaterThan(0);
    expect(plainText(about[0])).toContain('Malaysia');
  });

  it('preserves the emphasised technology list', () => {
    const full = about.map(plainText).join(' ');
    expect(full).toContain('Laravel, Nuxt.js, and Next.js');
  });

  it('contains the complete first paragraph with exact text', () => {
    const expectedText = "Hi, I'm Daniel, a dedicated fullstack developer from Malaysia with extensive experience in Laravel, Nuxt.js, and Next.js. I specialize in building scalable, high-performance web applications and managing seamless deployments using AWS services such as Lightsail, EC2, S3, RDS and Route 53. Beyond hands-on development, I have successfully led teams of developers, driving projects from initial concept to production launch while ensuring code quality, operational stability, and continuous improvement. I am passionate about delivering solutions that are not just functional, but also efficient, secure, and future-ready.";
    expect(plainText(about[0])).toBe(expectedText);
  });

  it('preserves both strong segments in about', () => {
    expect(about[0][1]).toEqual({ text: 'Laravel, Nuxt.js, and Next.js', strong: true });
    expect(about[0][3]).toEqual({ text: 'Lightsail, EC2, S3, RDS and Route 53', strong: true });
  });
});

describe('education', () => {
  it('contains the Diploma in Computer Science entry', () => {
    const diploma = education.find((e) => e.slug === 'diploma-in-computer-science');
    expect(diploma).toBeDefined();
    expect(diploma!.institution).toBe('Southern College, Johor, Malaysia');
  });

  it('has the complete education entry with all fields', () => {
    expect(education[0]).toEqual({
      slug: 'diploma-in-computer-science',
      qualification: 'Diploma in Computer Science',
      institution: 'Southern College, Johor, Malaysia',
      period: '2014 - 2017',
    });
  });
});

describe('skillGroups', () => {
  it('has Frontend, Backend and DevOps groups', () => {
    expect(skillGroups.map((g) => g.slug)).toEqual(['frontend', 'backend', 'devops']);
  });

  it('lists Cloudflare under DevOps', () => {
    const devops = skillGroups.find((g) => g.slug === 'devops');
    expect(devops!.items).toContain('Cloudflare');
  });

  it('gives every group a non-empty item list', () => {
    for (const group of skillGroups) {
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it('has the complete Frontend skill items', () => {
    const frontend = skillGroups.find((g) => g.slug === 'frontend');
    expect(frontend!.items).toEqual(['Nuxt.js / Vue', 'Next.js / React', 'Tailwind CSS', 'JavaScript / TypeScript']);
  });

  it('has the complete Backend skill items', () => {
    const backend = skillGroups.find((g) => g.slug === 'backend');
    expect(backend!.items).toEqual(['Laravel / PHP', 'Node.js', 'MySQL / PostgreSQL', 'RESTful APIs']);
  });

  it('has the complete DevOps skill items', () => {
    const devops = skillGroups.find((g) => g.slug === 'devops');
    expect(devops!.items).toEqual(['AWS (EC2, S3, Route 53)', 'Nginx / Apache', 'Ubuntu Server', 'Cloudflare']);
  });
});

describe('companies', () => {
  it('has Flow Digital with two roles and Excel Technology with one', () => {
    const flow = companies.find((c) => c.slug === 'flow-digital');
    const excel = companies.find((c) => c.slug === 'excel-technology');
    expect(flow!.roles).toHaveLength(2);
    expect(excel!.roles).toHaveLength(1);
  });

  it('preserves Team Leader role title, period, and full bullet text', () => {
    const flow = companies.find((c) => c.slug === 'flow-digital');
    const lead = flow!.roles.find((r) => r.slug === 'team-leader');
    expect(lead!.title).toBe('Team Leader / Senior Tech Lead');
    expect(lead!.period).toBe('2025 - Present');
    const fullText = lead!.bullets.map(plainText).join(' ');
    expect(fullText).toBe(
      'Orchestrated development lifecycles for high-traffic web applications using Laravel, Vue.js, and Next.js, ensuring 100% project delivery alignment with business goals. Steered technical architecture and resource allocation, mentoring junior developers and establishing code quality standards across the stack. Architected cloud infrastructure on AWS (EC2, S3, Route 53) and Cloudflare, implementing robust CI/CD pipelines to streamline deployment workflows. Spearheaded system security and performance audits, achieving significant improvements in API response times and infrastructure resilience.'
    );
  });

  it('preserves Senior Fullstack Developer role title, period, and full bullet text', () => {
    const flow = companies.find((c) => c.slug === 'flow-digital');
    const senior = flow!.roles.find((r) => r.slug === 'senior-fullstack-developer');
    expect(senior!.title).toBe('Senior Fullstack Developer');
    expect(senior!.period).toBe('2022 - 2024');
    const fullText = senior!.bullets.map(plainText).join(' ');
    expect(fullText).toBe(
      'Engineered scalable full-stack solutions with a focus on modularity and reusability across Laravel and Next.js environments. Provisioned and managed cloud-native environments on AWS, focusing on high availability and cost-effective scaling for growing SaaS products. Integrated complex third-party ecosystems including payment gateways, logistics APIs, and specialized e-commerce webhooks (Shopify).'
    );
  });

  it('preserves Freelance Developer role title, period, and full bullet text', () => {
    const excel = companies.find((c) => c.slug === 'excel-technology');
    const freelance = excel!.roles.find((r) => r.slug === 'full-stack-developer-freelance');
    expect(freelance!.title).toBe('Full Stack Developer (Freelance)');
    expect(freelance!.period).toBe('2018 - 2022');
    const fullText = freelance!.bullets.map(plainText).join(' ');
    expect(fullText).toBe(
      'Developed custom-tailored web solutions using PHP/Laravel and JavaScript for various SMEs, focusing on responsive UI/UX and client satisfaction. Collaborated with cross-functional design teams to transform complex wireframes into high-performance, accessible digital experiences. Optimized legacy codebases for modern standards, improving page load speeds and backend logic efficiency.'
    );
  });

  it('preserves the emphasised lead-in of each bullet', () => {
    const flow = companies.find((c) => c.slug === 'flow-digital');
    const lead = flow!.roles.find((r) => r.slug === 'team-leader');
    expect(lead!.bullets[0][0]).toEqual({
      text: 'Orchestrated development lifecycles',
      strong: true,
    });
  });

  it('gives every role a unique slug within its company', () => {
    for (const company of companies) {
      const slugs = company.roles.map((r) => r.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it('contains no unescaped HTML entities in role content', () => {
    for (const company of companies) {
      for (const role of company.roles) {
        const fullText = role.bullets.map(plainText).join(' ');
        expect(fullText).not.toContain('&amp;');
        expect(fullText).not.toContain('&apos;');
      }
    }
  });
});

describe('projects', () => {
  it('has three projects with unique slugs', () => {
    expect(projects).toHaveLength(3);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(3);
  });

  it('preserves Courier Management System with correct metadata and bullet text', () => {
    const courier = projects.find((p) => p.slug === 'courier-management-system');
    expect(courier!.name).toBe('Courier Management System');
    expect(courier!.focus).toBe('Cross-border logistics, real-time data synchronization, and shipment visibility.');
    expect(courier!.stack).toEqual([
      'Laravel', 'Inertia.js', 'Vue.js', 'MySQL', 'AWS', 'Cloudflare',
    ]);
    const fullText = courier!.bullets.map(plainText).join(' ');
    expect(fullText).toBe(
      'Developed a cross-border logistics platform specializing in China-to-Malaysia freight forwarding and parcel consolidation. Engineered a robust cross-border data pipeline utilizing secure API protocols to synchronize real-time parcel manifests with overseas WMS providers. Designed a user-centric consolidation module allowing clients to manage virtual inventory, select specific parcels for packing, and initiate international shipping. Architected a milestone tracking engine that aggregates multi-carrier data into a unified API, providing end-to-end visibility for international shipments. Optimized the Pick & Pack workflow by digitizing the communication between the client\'s front-end selection and the warehouse fulfillment team.'
    );
  });

  it('preserves Flories E-commerce System with correct metadata and bullet text', () => {
    const flories = projects.find((p) => p.slug === 'flories-ecommerce-system');
    expect(flories!.name).toBe('Flories E-commerce System');
    expect(flories!.focus).toBe('Integration (Shopify), resource optimization, and event-driven automation.');
    expect(flories!.stack).toEqual(['Laravel', 'MySQL', 'AWS', 'Cloudflare']);
    const fullText = flories!.bullets.map(plainText).join(' ');
    expect(fullText).toBe(
      'Architected a high-concurrency fulfillment middleware that bridges Shopify storefronts with localized workshop and logistics workflows. Engineered a real-time synchronization engine to pull orders and inventory data from Shopify via Webhooks/REST API, ensuring 100% data consistency. Designed a dynamic dispatching algorithm to optimize resource allocation between floral production (artisans) and last-mile delivery (drivers). Developed an event-driven notification architecture to trigger automated, customer-facing delivery alerts, significantly reducing manual support overhead. Built a unified order management interface supporting both synchronized e-commerce data and manual entry for offline/B2B sales.'
    );
  });

  it('preserves SaaS CRM System with correct metadata and bullet text', () => {
    const saas = projects.find((p) => p.slug === 'saas-crm-system');
    expect(saas!.name).toBe('SaaS CRM System');
    expect(saas!.focus).toBe('Multi-tenancy, scalable architecture, and data isolation.');
    expect(saas!.stack).toEqual(['Laravel', 'Inertia.js', 'Vue.js', 'MySQL', 'AWS', 'Cloudflare']);
    const fullText = saas!.bullets.map(plainText).join(' ');
    expect(fullText).toBe(
      'Designed and deployed a scalable multi-tenant architecture featuring automated environment provisioning and subscription lifecycle management. Engineered a centralized Lead-to-Cash pipeline, automating the conversion of prospects into revenue via integrated quotation and invoicing modules. Developed a secure PDF generation and distribution engine to automate the delivery of financial records directly to end-customers via email. Implemented an integrated Task Management module, providing clients with a unified interface to track project milestones and daily operations alongside customer data. Implemented strict data isolation strategies and optimized persistence layers to ensure security and performance across diverse client environments.'
    );
  });

  it('unescapes HTML entities into plain characters', () => {
    const courier = projects.find((p) => p.slug === 'courier-management-system');
    const text = courier!.bullets.map(plainText).join(' ');
    expect(text).toContain('Pick & Pack');
    expect(text).toContain('client\'s');
    expect(text).not.toContain('&amp;');
    expect(text).not.toContain('&apos;');
  });

  it('contains no unescaped HTML entities in project content', () => {
    for (const project of projects) {
      const fullText = project.bullets.map(plainText).join(' ');
      expect(fullText).not.toContain('&amp;');
      expect(fullText).not.toContain('&apos;');
    }
  });
});
