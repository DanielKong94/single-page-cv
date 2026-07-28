import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const limitMock = vi.fn();
const incrMock = vi.fn();
const expireMock = vi.fn();

vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: Object.assign(
    class {
      limit = limitMock;
    },
    { slidingWindow: vi.fn(() => 'window') }
  ),
}));

vi.mock('@upstash/redis', () => ({
  Redis: class {
    incr = incrMock;
    expire = expireMock;
  },
}));

import { checkRateLimit } from './ratelimit';

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://redis.example');
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'token');
    vi.stubEnv('CHAT_RATE_LIMIT_GLOBAL_DAILY', '500');
    limitMock.mockReset();
    incrMock.mockReset();
    expireMock.mockReset();
  });

  afterEach(() => vi.unstubAllEnvs());

  it('allows a request under both limits', async () => {
    incrMock.mockResolvedValue(10);
    limitMock.mockResolvedValue({ success: true });
    expect(await checkRateLimit('1.2.3.4')).toEqual({ allowed: true });
  });

  it('blocks on the global cap before consulting the per-IP limit', async () => {
    incrMock.mockResolvedValue(501);
    expect(await checkRateLimit('1.2.3.4')).toEqual({ allowed: false, reason: 'global' });
    expect(limitMock).not.toHaveBeenCalled();
  });

  it('blocks on the per-IP limit', async () => {
    incrMock.mockResolvedValue(10);
    limitMock.mockResolvedValue({ success: false });
    expect(await checkRateLimit('1.2.3.4')).toEqual({ allowed: false, reason: 'ip' });
  });

  it('sets a TTL when the global counter is first created', async () => {
    incrMock.mockResolvedValue(1);
    limitMock.mockResolvedValue({ success: true });
    await checkRateLimit('1.2.3.4');
    expect(expireMock).toHaveBeenCalled();
  });

  it('fails closed when Redis is unreachable', async () => {
    incrMock.mockRejectedValue(new Error('redis down'));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(await checkRateLimit('1.2.3.4')).toEqual({ allowed: false, reason: 'global' });
  });
});
