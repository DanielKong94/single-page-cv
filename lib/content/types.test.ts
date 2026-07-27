import { describe, it, expect } from 'vitest';
import { plainText } from './types';

describe('plainText', () => {
  it('joins segments into a single string', () => {
    expect(
      plainText([{ text: 'Architected cloud infrastructure', strong: true }, { text: ' on AWS.' }])
    ).toBe('Architected cloud infrastructure on AWS.');
  });

  it('returns empty string for no segments', () => {
    expect(plainText([])).toBe('');
  });
});
