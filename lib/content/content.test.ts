import { describe, it, expect } from 'vitest';
import { plainText } from './types';
import { about } from './about';
import { education } from './education';
import { skillGroups } from './skills';

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
