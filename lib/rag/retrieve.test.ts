import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { retrieve, TOP_K } from './retrieve';
import { toChunks } from '@/lib/content';

vi.mock('./embed', () => ({ embed: vi.fn() }));
vi.mock('./vectorize', () => ({ queryVectors: vi.fn() }));

import { embed } from './embed';
import { queryVectors } from './vectorize';

describe('retrieve', () => {
  beforeEach(() => {
    vi.mocked(embed).mockReset();
    vi.mocked(queryVectors).mockReset();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => vi.restoreAllMocks());

  it('embeds the question and queries with TOP_K', async () => {
    vi.mocked(embed).mockResolvedValue([[0.1, 0.2]]);
    vi.mocked(queryVectors).mockResolvedValue([
      { id: 'skills:devops', score: 0.9, metadata: {} },
    ]);

    const chunks = await retrieve('does he know cloudflare?');

    expect(embed).toHaveBeenCalledWith(['does he know cloudflare?']);
    expect(queryVectors).toHaveBeenCalledWith([0.1, 0.2], TOP_K);
    expect(chunks.map((c) => c.id)).toEqual(['skills:devops']);
  });

  it('preserves match ranking order', async () => {
    vi.mocked(embed).mockResolvedValue([[0.1]]);
    vi.mocked(queryVectors).mockResolvedValue([
      { id: 'project:saas-crm-system', score: 0.9, metadata: {} },
      { id: 'skills:backend', score: 0.7, metadata: {} },
    ]);

    const chunks = await retrieve('crm');
    expect(chunks.map((c) => c.id)).toEqual(['project:saas-crm-system', 'skills:backend']);
  });

  it('drops match ids that no longer exist locally', async () => {
    vi.mocked(embed).mockResolvedValue([[0.1]]);
    vi.mocked(queryVectors).mockResolvedValue([
      { id: 'project:deleted-long-ago', score: 0.99, metadata: {} },
      { id: 'skills:frontend', score: 0.5, metadata: {} },
    ]);

    const chunks = await retrieve('anything');
    expect(chunks.map((c) => c.id)).toEqual(['skills:frontend']);
  });

  it('falls back to every chunk when embedding fails', async () => {
    vi.mocked(embed).mockRejectedValue(new Error('workers ai down'));
    const chunks = await retrieve('anything');
    expect(chunks).toHaveLength(toChunks().length);
  });

  it('falls back to every chunk when the vector query fails', async () => {
    vi.mocked(embed).mockResolvedValue([[0.1]]);
    vi.mocked(queryVectors).mockRejectedValue(new Error('vectorize down'));
    const chunks = await retrieve('anything');
    expect(chunks).toHaveLength(toChunks().length);
  });

  it('returns an empty array when retrieval succeeds with no matches', async () => {
    vi.mocked(embed).mockResolvedValue([[0.1]]);
    vi.mocked(queryVectors).mockResolvedValue([]);
    expect(await retrieve('unrelated')).toEqual([]);
  });
});
