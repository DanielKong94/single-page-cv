import { describe, it, expect } from 'vitest';
import { toChunks } from './index';
import { companies } from './experience';
import { projects } from './projects';
import { skillGroups } from './skills';
import { education } from './education';

describe('toChunks', () => {
  const chunks = toChunks();

  it('produces globally unique ids', () => {
    const ids = chunks.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every chunk non-empty text', () => {
    for (const chunk of chunks) {
      expect(chunk.text.trim().length).toBeGreaterThan(0);
    }
  });

  it('emits one chunk per role, not per company', () => {
    const roleCount = companies.reduce((n, c) => n + c.roles.length, 0);
    expect(chunks.filter((c) => c.type === 'experience')).toHaveLength(roleCount);
  });

  it('emits one chunk per project, skill group and education entry', () => {
    expect(chunks.filter((c) => c.type === 'project')).toHaveLength(projects.length);
    expect(chunks.filter((c) => c.type === 'skills')).toHaveLength(skillGroups.length);
    expect(chunks.filter((c) => c.type === 'education')).toHaveLength(education.length);
  });

  it('uses identity slugs for ids', () => {
    const ids = chunks.map((c) => c.id);
    expect(ids).toContain('experience:flow-digital:team-leader');
    expect(ids).toContain('project:courier-management-system');
    expect(ids).toContain('skills:devops');
  });

  it('carries the company, role and period needed to attribute an answer', () => {
    const lead = chunks.find((c) => c.id === 'experience:flow-digital:team-leader');
    expect(lead!.metadata).toMatchObject({
      type: 'experience',
      company: 'Flow Digital SDN BHD',
      role: 'Team Leader / Senior Tech Lead',
      period: '2025 - Present',
    });
  });

  it('inlines company and period into the experience chunk text', () => {
    const lead = chunks.find((c) => c.id === 'experience:flow-digital:team-leader');
    expect(lead!.text).toContain('Flow Digital SDN BHD');
    expect(lead!.text).toContain('2025 - Present');
    expect(lead!.text).toContain('Orchestrated development lifecycles');
  });

  it('includes the stack in project chunk text so it is retrievable', () => {
    const courier = chunks.find((c) => c.id === 'project:courier-management-system');
    expect(courier!.text).toContain('Inertia.js');
  });

  // Full-text equality, not substring spot-checks. `text` is the exact string sent
  // to the embedding model and pasted into the prompt — a silently altered join,
  // dropped bullet, or changed separator changes what the assistant tells people,
  // and every `toContain` assertion above would still pass.
  it('assembles experience chunk text exactly', () => {
    const lead = chunks.find((c) => c.id === 'experience:flow-digital:team-leader');
    expect(lead!.text).toBe(
      'Role: Team Leader / Senior Tech Lead at Flow Digital SDN BHD (Selangor, Malaysia), 2025 - Present.\n' +
        '- Orchestrated development lifecycles for high-traffic web applications using Laravel, Vue.js, and Next.js, ensuring 100% project delivery alignment with business goals.\n' +
        '- Steered technical architecture and resource allocation, mentoring junior developers and establishing code quality standards across the stack.\n' +
        '- Architected cloud infrastructure on AWS (EC2, S3, Route 53) and Cloudflare, implementing robust CI/CD pipelines to streamline deployment workflows.\n' +
        '- Spearheaded system security and performance audits, achieving significant improvements in API response times and infrastructure resilience.'
    );
  });

  it('assembles skills chunk text exactly', () => {
    const devops = chunks.find((c) => c.id === 'skills:devops');
    expect(devops!.text).toBe(
      'DevOps skills: AWS (EC2, S3, Route 53), Nginx / Apache, Ubuntu Server, Cloudflare.'
    );
  });

  it('assembles education chunk text exactly', () => {
    const edu = chunks.find((c) => c.id === 'education:diploma-in-computer-science');
    expect(edu!.text).toBe(
      'Education: Diploma in Computer Science at Southern College, Johor, Malaysia, 2014 - 2017.'
    );
  });

  it('assembles project chunk text exactly', () => {
    const crm = chunks.find((c) => c.id === 'project:saas-crm-system');
    expect(crm!.text).toBe(
      'Project: SaaS CRM System. Focus: Multi-tenancy, scalable architecture, and data isolation.\n' +
        '- Designed and deployed a scalable multi-tenant architecture featuring automated environment provisioning and subscription lifecycle management.\n' +
        '- Engineered a centralized Lead-to-Cash pipeline, automating the conversion of prospects into revenue via integrated quotation and invoicing modules.\n' +
        '- Developed a secure PDF generation and distribution engine to automate the delivery of financial records directly to end-customers via email.\n' +
        '- Implemented an integrated Task Management module, providing clients with a unified interface to track project milestones and daily operations alongside customer data.\n' +
        '- Implemented strict data isolation strategies and optimized persistence layers to ensure security and performance across diverse client environments.\n' +
        'Built with: Laravel, Inertia.js, Vue.js, MySQL, AWS, Cloudflare.'
    );
  });

  it('assembles about chunk text exactly', () => {
    const about = chunks.find((c) => c.id === 'about:0');
    expect(about!.text).toBe(
      "About Daniel Kong: Hi, I'm Daniel, a dedicated fullstack developer from Malaysia with extensive experience in Laravel, Nuxt.js, and Next.js. I specialize in building scalable, high-performance web applications and managing seamless deployments using AWS services such as Lightsail, EC2, S3, RDS and Route 53. Beyond hands-on development, I have successfully led teams of developers, driving projects from initial concept to production launch while ensuring code quality, operational stability, and continuous improvement. I am passionate about delivering solutions that are not just functional, but also efficient, secure, and future-ready."
    );
  });

  it('covers every chunk type with a full-text assertion above', () => {
    // Guard: if a new ChunkType is added, this fails until a full-text test exists for it.
    expect(new Set(chunks.map((c) => c.type))).toEqual(
      new Set(['about', 'experience', 'project', 'skills', 'education'])
    );
  });
});
