import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { verifyTurnstile } from './turnstile';

describe('verifyTurnstile', () => {
  beforeEach(() => vi.stubEnv('TURNSTILE_SECRET_KEY', 'secret123'));
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('posts the token and remote IP to siteverify', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await verifyTurnstile('tok', '1.2.3.4');

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    const body = init.body as URLSearchParams;
    expect(body.get('secret')).toBe('secret123');
    expect(body.get('response')).toBe('tok');
    expect(body.get('remoteip')).toBe('1.2.3.4');
  });

  it('returns true when Cloudflare reports success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }))
    );
    expect(await verifyTurnstile('tok', '1.2.3.4')).toBe(true);
  });

  it('returns false when Cloudflare reports failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false }), { status: 200 }))
    );
    expect(await verifyTurnstile('tok', '1.2.3.4')).toBe(false);
  });

  it('returns false for an empty token without calling the API', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    expect(await verifyTurnstile('', '1.2.3.4')).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns false when the request throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(await verifyTurnstile('tok', '1.2.3.4')).toBe(false);
  });
});
