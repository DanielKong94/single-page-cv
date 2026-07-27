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

  it('keeps the current Team Leader title and period', () => {
    const flow = companies.find((c) => c.slug === 'flow-digital');
    const lead = flow!.roles.find((r) => r.slug === 'team-leader');
    expect(lead!.title).toBe('Team Leader / Senior Tech Lead');
    expect(lead!.period).toBe('2025 - Present');
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
});

describe('projects', () => {
  it('has three projects with unique slugs', () => {
    expect(projects).toHaveLength(3);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(3);
  });

  it('records the stack for the courier system', () => {
    const courier = projects.find((p) => p.slug === 'courier-management-system');
    expect(courier!.stack).toEqual([
      'Laravel', 'Inertia.js', 'Vue.js', 'MySQL', 'AWS', 'Cloudflare',
    ]);
  });

  it('unescapes HTML entities into plain characters', () => {
    const courier = projects.find((p) => p.slug === 'courier-management-system');
    const text = courier!.bullets.map(plainText).join(' ');
    expect(text).toContain('Pick & Pack');
    expect(text).not.toContain('&amp;');
  });
});
