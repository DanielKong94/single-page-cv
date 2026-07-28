import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/security/turnstile', () => ({ verifyTurnstile: vi.fn() }));
vi.mock('@/lib/security/ratelimit', () => ({ checkRateLimit: vi.fn() }));
vi.mock('@/lib/rag/retrieve', () => ({ retrieve: vi.fn() }));
vi.mock('@/lib/chat/provider', () => ({ chatModel: 'mock-model', MAX_OUTPUT_TOKENS: 400 }));
vi.mock('ai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('ai')>();
  return {
    ...actual,
    streamText: vi.fn(() => ({
      toUIMessageStreamResponse: () => new Response('stream', { status: 200 }),
    })),
  };
});

import { POST } from './route';
import { verifyTurnstile } from '@/lib/security/turnstile';
import { checkRateLimit } from '@/lib/security/ratelimit';
import { retrieve } from '@/lib/rag/retrieve';
import { streamText } from 'ai';
import { toChunks } from '@/lib/content';

function request(body: unknown): Request {
  return new Request('http://localhost/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '1.2.3.4' },
    body: JSON.stringify(body),
  });
}

const validBody = {
  turnstileToken: 'tok',
  messages: [{ id: '1', role: 'user', parts: [{ type: 'text', text: 'What AWS experience?' }] }],
};

describe('POST /api/chat', () => {
  beforeEach(() => {
    // Every gate-ordering test below asserts a mock was NOT called. Without
    // clearing all of them, call counts accumulate across tests and those
    // assertions measure the previous test's calls.
    vi.clearAllMocks();
    vi.mocked(verifyTurnstile).mockResolvedValue(true);
    vi.mocked(checkRateLimit).mockResolvedValue({ allowed: true });
    vi.mocked(retrieve).mockResolvedValue(toChunks().slice(0, 2));
  });

  it('streams an answer on the happy path', async () => {
    const response = await POST(request(validBody));
    expect(response.status).toBe(200);
    expect(streamText).toHaveBeenCalled();
  });

  it('rejects a failed Turnstile token before spending anything', async () => {
    vi.mocked(verifyTurnstile).mockResolvedValue(false);
    const response = await POST(request(validBody));
    expect(response.status).toBe(403);
    expect(checkRateLimit).not.toHaveBeenCalled();
    expect(retrieve).not.toHaveBeenCalled();
    expect(streamText).not.toHaveBeenCalled();
  });

  it('returns 429 and does not call the model when rate limited', async () => {
    vi.mocked(checkRateLimit).mockResolvedValue({ allowed: false, reason: 'global' });
    const response = await POST(request(validBody));
    expect(response.status).toBe(429);
    expect(retrieve).not.toHaveBeenCalled();
    expect(streamText).not.toHaveBeenCalled();
  });

  it('retrieves against the latest user message', async () => {
    await POST(request(validBody));
    expect(retrieve).toHaveBeenCalledWith('What AWS experience?');
  });

  it('passes the retrieved context into the system prompt', async () => {
    await POST(request(validBody));
    const args = vi.mocked(streamText).mock.calls[0][0];
    expect(args.system).toContain('<context>');
    expect(args.system).toContain(toChunks()[0].text);
    expect(args.model).toBe('mock-model');
  });

  it('caps output tokens', async () => {
    await POST(request(validBody));
    expect(vi.mocked(streamText).mock.calls[0][0].maxOutputTokens).toBe(400);
  });

  it('rejects an over-long message', async () => {
    const response = await POST(
      request({
        turnstileToken: 'tok',
        messages: [{ id: '1', role: 'user', parts: [{ type: 'text', text: 'x'.repeat(501) }] }],
      })
    );
    expect(response.status).toBe(400);
    expect(streamText).not.toHaveBeenCalled();
  });

  it('rejects a body with no messages', async () => {
    const response = await POST(request({ turnstileToken: 'tok', messages: [] }));
    expect(response.status).toBe(400);
  });
});
