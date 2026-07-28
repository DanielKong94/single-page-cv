/**
 * Multilingual embedding model. Chosen over bge-large-en-v1.5 because visitors
 * may ask in Chinese or Malay.
 *
 * Cloudflare does not publish this model's output dimension, so it is probed at
 * ingest time rather than hardcoded — see scripts/ingest.ts.
 */
export const EMBEDDING_MODEL = '@cf/baai/bge-m3';

interface WorkersAiResponse {
  success: boolean;
  errors?: Array<{ message: string }>;
  result?: { data?: number[][] };
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

/** Embed texts via Cloudflare Workers AI. Returns one vector per input, in order. */
export async function embed(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];

  const accountId = requireEnv('CLOUDFLARE_ACCOUNT_ID');
  const token = requireEnv('CLOUDFLARE_API_TOKEN');

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${EMBEDDING_MODEL}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: texts }),
    }
  );

  const payload = (await response.json()) as WorkersAiResponse;

  if (!response.ok || !payload.success || !payload.result?.data) {
    const detail = payload.errors?.map((e) => e.message).join('; ') ?? response.statusText;
    throw new Error(`Workers AI embedding failed (${response.status}): ${detail}`);
  }

  return payload.result.data;
}
