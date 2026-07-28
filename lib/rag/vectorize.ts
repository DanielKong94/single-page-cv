export interface VectorMatch {
  id: string;
  score: number;
  metadata: Record<string, unknown>;
}

export interface VectorRecord {
  id: string;
  values: number[];
  metadata: Record<string, unknown>;
}

interface VectorizeResponse<T> {
  success: boolean;
  errors?: Array<{ message: string }>;
  result?: T;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function indexesUrl(): string {
  const accountId = requireEnv('CLOUDFLARE_ACCOUNT_ID');
  return `https://api.cloudflare.com/client/v4/accounts/${accountId}/vectorize/v2/indexes`;
}

async function call<T>(url: string, init: RequestInit): Promise<T> {
  const token = requireEnv('CLOUDFLARE_API_TOKEN');
  const response = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
  });

  const payload = (await response.json()) as VectorizeResponse<T>;

  if (!response.ok || !payload.success) {
    const detail = payload.errors?.map((e) => e.message).join('; ') ?? response.statusText;
    throw new Error(`Vectorize request failed (${response.status}): ${detail}`);
  }

  return payload.result as T;
}

/** Nearest-neighbour search. Returns matches ordered by descending score. */
export async function queryVectors(vector: number[], topK: number): Promise<VectorMatch[]> {
  const index = requireEnv('VECTORIZE_INDEX_NAME');
  const result = await call<{ count: number; matches: VectorMatch[] }>(
    `${indexesUrl()}/${index}/query`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vector, topK, returnMetadata: 'all', returnValues: false }),
    }
  );
  return result.matches ?? [];
}

/**
 * Insert or overwrite vectors.
 *
 * The endpoint takes newline-delimited JSON, one record per line — not a JSON
 * array. Sending an array is accepted by fetch and rejected by Cloudflare.
 */
export async function upsertVectors(records: VectorRecord[]): Promise<void> {
  if (records.length === 0) return;
  const index = requireEnv('VECTORIZE_INDEX_NAME');
  await call(`${indexesUrl()}/${index}/upsert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-ndjson' },
    body: records.map((r) => JSON.stringify(r)).join('\n'),
  });
}

export async function deleteVectorsByIds(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const index = requireEnv('VECTORIZE_INDEX_NAME');
  await call(`${indexesUrl()}/${index}/delete_by_ids`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });
}

/** Create the index. Dimensions are probed from the embedding model, never assumed. */
export async function createIndex(dimensions: number): Promise<void> {
  const index = requireEnv('VECTORIZE_INDEX_NAME');
  await call(indexesUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: index, config: { dimensions, metric: 'cosine' } }),
  });
}
