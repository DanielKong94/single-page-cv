const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/** Verify a Turnstile token server-side. Any failure denies — this gate fails closed. */
export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!token) return false;

  try {
    const body = new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY ?? '',
      response: token,
      remoteip: ip,
    });

    const response = await fetch(SITEVERIFY_URL, { method: 'POST', body });
    const payload = (await response.json()) as { success: boolean };
    return payload.success === true;
  } catch (error) {
    console.error('[turnstile] verification failed:', error);
    return false;
  }
}
