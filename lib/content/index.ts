import { plainText } from './types';
import type { Chunk } from './types';
import { about } from './about';
import { education } from './education';
import { skillGroups } from './skills';
import { companies } from './experience';
import { projects } from './projects';

export * from './types';
export { about } from './about';
export { education } from './education';
export { skillGroups } from './skills';
export { companies } from './experience';
export { projects } from './projects';

/**
 * Flatten CV content into semantic chunks — one per role, project, skill group,
 * education entry and about paragraph.
 *
 * Ids are stable identity slugs. Changing a slug orphans the old vector in
 * Vectorize; scripts/ingest.ts detects that via its manifest and deletes it.
 */
export function toChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  about.forEach((paragraph, i) => {
    chunks.push({
      id: `about:${i}`,
      type: 'about',
      text: `About Daniel Kong: ${plainText(paragraph)}`,
      metadata: { type: 'about' },
    });
  });

  for (const company of companies) {
    for (const role of company.roles) {
      const bullets = role.bullets.map((b) => `- ${plainText(b)}`).join('\n');
      chunks.push({
        id: `experience:${company.slug}:${role.slug}`,
        type: 'experience',
        text: `Role: ${role.title} at ${company.name} (${company.location}), ${role.period}.\n${bullets}`,
        metadata: {
          type: 'experience',
          company: company.name,
          role: role.title,
          period: role.period,
          location: company.location,
        },
      });
    }
  }

  for (const project of projects) {
    const bullets = project.bullets.map((b) => `- ${plainText(b)}`).join('\n');
    chunks.push({
      id: `project:${project.slug}`,
      type: 'project',
      text: `Project: ${project.name}. Focus: ${project.focus}\n${bullets}\nBuilt with: ${project.stack.join(', ')}.`,
      metadata: { type: 'project', title: project.name },
    });
  }

  for (const group of skillGroups) {
    chunks.push({
      id: `skills:${group.slug}`,
      type: 'skills',
      text: `${group.name} skills: ${group.items.join(', ')}.`,
      metadata: { type: 'skills', title: group.name },
    });
  }

  for (const entry of education) {
    chunks.push({
      id: `education:${entry.slug}`,
      type: 'education',
      text: `Education: ${entry.qualification} at ${entry.institution}, ${entry.period}.`,
      metadata: { type: 'education', title: entry.qualification, period: entry.period },
    });
  }

  return chunks;
}
