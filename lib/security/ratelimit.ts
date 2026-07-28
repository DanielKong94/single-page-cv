import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

export interface RateLimitResult {
  allowed: boolean;
  reason?: 'ip' | 'global';
}

const DAY_SECONDS = 86_400;

// Read at call time, not module load. Module-level env reads are captured before
// a test can stub them, and on Vercel they freeze the values at cold start —
// meaning a limit change would need a redeploy rather than an env var edit.
function perIpLimit(): number {
  return Number(process.env.CHAT_RATE_LIMIT_PER_IP ?? 10);
}

function globalDailyLimit(): number {
  return Number(process.env.CHAT_RATE_LIMIT_GLOBAL_DAILY ?? 500);
}

function redis(): Redis {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

function globalKey(): string {
  return `chat:global:${new Date().toISOString().slice(0, 10)}`;
}

/**
 * Two limits, global checked first.
 *
 * The per-IP window stops casual abuse; the global daily cap is what actually
 * bounds spend, because a rotating proxy defeats per-IP limiting entirely.
 *
 * Fails closed: if Redis is unreachable we cannot know the spend so far, and an
 * open failure mode would turn an outage into an uncapped billing endpoint.
 */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  try {
    const client = redis();

    const used = await client.incr(globalKey());
    if (used === 1) await client.expire(globalKey(), DAY_SECONDS);
    if (used > globalDailyLimit()) return { allowed: false, reason: 'global' };

    const limiter = new Ratelimit({
      redis: client,
      limiter: Ratelimit.slidingWindow(perIpLimit(), '1 h'),
      prefix: 'chat:ip',
    });

    const { success } = await limiter.limit(ip);
    return success ? { allowed: true } : { allowed: false, reason: 'ip' };
  } catch (error) {
    console.error('[ratelimit] check failed, denying request:', error);
    return { allowed: false, reason: 'global' };
  }
}
