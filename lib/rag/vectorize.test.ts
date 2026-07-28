import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { queryVectors, upsertVectors, deleteVectorsByIds, createIndex } from './vectorize';

const ok = (result: unknown) =>
  new Response(JSON.stringify({ success: true, result }), { status: 200 });

const BASE = 'https://api.cloudflare.com/client/v4/accounts/acct123/vectorize/v2/indexes';

describe('vectorize client', () => {
  beforeEach(() => {
    vi.stubEnv('CLOUDFLARE_ACCOUNT_ID', 'acct123');
    vi.stubEnv('CLOUDFLARE_API_TOKEN', 'token123');
    vi.stubEnv('VECTORIZE_INDEX_NAME', 'cv-index');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('queries the v2 query endpoint and returns matches', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      ok({ count: 1, matches: [{ id: 'skills:devops', score: 0.9, metadata: { type: 'skills' } }] })
    );
    vi.stubGlobal('fetch', fetchMock);

    const matches = await queryVectors([0.1, 0.2], 5);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${BASE}/cv-index/query`);
    expect(JSON.parse(init.body)).toEqual({
      vector: [0.1, 0.2],
      topK: 5,
      returnMetadata: 'all',
      returnValues: false,
    });
    expect(matches).toEqual([{ id: 'skills:devops', score: 0.9, metadata: { type: 'skills' } }]);
  });

  it('upserts as newline-delimited JSON, not a JSON array', async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok({ mutationId: 'm1' }));
    vi.stubGlobal('fetch', fetchMock);

    await upsertVectors([
      { id: 'a', values: [1], metadata: { type: 'skills' } },
      { id: 'b', values: [2], metadata: { type: 'skills' } },
    ]);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${BASE}/cv-index/upsert`);
    expect(init.headers['Content-Type']).toBe('application/x-ndjson');
    expect(init.body).toBe(
      '{"id":"a","values":[1],"metadata":{"type":"skills"}}\n{"id":"b","values":[2],"metadata":{"type":"skills"}}'
    );
  });

  it('skips the upsert call entirely when given no records', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    await upsertVectors([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('deletes by ids', async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok({ mutationId: 'm2' }));
    vi.stubGlobal('fetch', fetchMock);

    await deleteVectorsByIds(['stale:1']);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${BASE}/cv-index/delete_by_ids`);
    expect(JSON.parse(init.body)).toEqual({ ids: ['stale:1'] });
  });

  it('skips the delete call entirely when given no ids', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    await deleteVectorsByIds([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('creates an index with explicit dimensions and cosine metric', async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok({ name: 'cv-index' }));
    vi.stubGlobal('fetch', fetchMock);

    await createIndex(1024);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(BASE);
    expect(JSON.parse(init.body)).toEqual({
      name: 'cv-index',
      config: { dimensions: 1024, metric: 'cosine' },
    });
  });

  it('throws with the API error message on failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: false, errors: [{ message: 'index missing' }] }), {
          status: 404,
        })
      )
    );
    await expect(queryVectors([0.1], 5)).rejects.toThrow(/index missing/);
  });
});
