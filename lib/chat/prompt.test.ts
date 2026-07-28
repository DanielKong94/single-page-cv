import { describe, it, expect } from 'vitest';
import { buildSystemPrompt, REFUSAL_LINE, OFF_TOPIC_LINE } from './prompt';
import { toChunks } from '@/lib/content';

describe('buildSystemPrompt', () => {
  const chunks = toChunks().slice(0, 2);
  const prompt = buildSystemPrompt(chunks);

  it('embeds each chunk text inside the context block', () => {
    for (const chunk of chunks) {
      expect(prompt).toContain(chunk.text);
    }
  });

  it('delimits the context so injected instructions are visibly data', () => {
    expect(prompt).toContain('<context>');
    expect(prompt).toContain('</context>');
  });

  it('carries the exact refusal and redirect wording', () => {
    expect(prompt).toContain(REFUSAL_LINE);
    expect(prompt).toContain(OFF_TOPIC_LINE);
    expect(REFUSAL_LINE).toBe(
      "That's not something covered in Daniel's profile — feel free to ask him directly at danielkong.w@gmail.com."
    );
    expect(OFF_TOPIC_LINE).toBe(
      "I'm just here to answer questions about Daniel's background — happy to help with that!"
    );
  });

  it('instructs the model never to speak as Daniel', () => {
    expect(prompt).toMatch(/never claim to BE Daniel/i);
  });

  it('treats context and visitor messages as data, not instructions', () => {
    expect(prompt).toMatch(/data, not instructions/i);
  });

  it('handles an empty context without crashing', () => {
    const empty = buildSystemPrompt([]);
    expect(empty).toContain('<context>');
    expect(empty).toContain(REFUSAL_LINE);
  });

  it('attributes chunks by role so answers can cite a source', () => {
    const experience = toChunks().filter((c) => c.type === 'experience');
    expect(buildSystemPrompt(experience)).toContain('Flow Digital SDN BHD');
  });
});
