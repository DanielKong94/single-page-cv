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
});

describe('education', () => {
  it('contains the Diploma in Computer Science entry', () => {
    const diploma = education.find((e) => e.slug === 'diploma-in-computer-science');
    expect(diploma).toBeDefined();
    expect(diploma!.institution).toBe('Southern College, Johor, Malaysia');
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
