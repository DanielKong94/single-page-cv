import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { embed, EMBEDDING_MODEL } from './embed';

const ok = (data: number[][]) =>
  new Response(JSON.stringify({ success: true, result: { data } }), { status: 200 });

describe('embed', () => {
  beforeEach(() => {
    vi.stubEnv('CLOUDFLARE_ACCOUNT_ID', 'acct123');
    vi.stubEnv('CLOUDFLARE_API_TOKEN', 'token123');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('calls the Workers AI run endpoint with a bearer token', async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok([[0.1, 0.2]]));
    vi.stubGlobal('fetch', fetchMock);

    await embed(['hello']);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      `https://api.cloudflare.com/client/v4/accounts/acct123/ai/run/${EMBEDDING_MODEL}`
    );
    expect(init.method).toBe('POST');
    expect(init.headers.Authorization).toBe('Bearer token123');
    expect(JSON.parse(init.body)).toEqual({ text: ['hello'] });
  });

  it('returns one vector per input text', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(ok([[0.1], [0.2]])));
    const vectors = await embed(['a', 'b']);
    expect(vectors).toEqual([[0.1], [0.2]]);
  });

  it('returns an empty array without calling the API for empty input', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    expect(await embed([])).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('throws when the API reports failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: false, errors: [{ message: 'nope' }] }), {
          status: 400,
        })
      )
    );
    await expect(embed(['x'])).rejects.toThrow(/nope/);
  });

  it('throws when required env vars are missing', async () => {
    vi.stubEnv('CLOUDFLARE_ACCOUNT_ID', '');
    vi.stubGlobal('fetch', vi.fn());
    await expect(embed(['x'])).rejects.toThrow(/CLOUDFLARE_ACCOUNT_ID/);
  });
});
