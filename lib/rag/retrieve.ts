import { toChunks } from '@/lib/content';
import type { Chunk } from '@/lib/content';
import { embed } from './embed';
import { queryVectors } from './vectorize';

export const TOP_K = 5;

/**
 * Find the chunks most relevant to a question.
 *
 * On any retrieval failure this returns *every* chunk. The whole profile is
 * roughly 2k tokens, so full-context stuffing is a viable answer path — the
 * assistant keeps working even with Cloudflare completely unreachable.
 *
 * A successful search with no matches returns an empty array, which is not the
 * same thing: the prompt's refusal rule should fire rather than the model being
 * handed the entire CV.
 */
export async function retrieve(question: string): Promise<Chunk[]> {
  const chunks = toChunks();
  const byId = new Map(chunks.map((c) => [c.id, c]));

  try {
    const [vector] = await embed([question]);
    const matches = await queryVectors(vector, TOP_K);

    // Map ids back to local chunks. A vector whose chunk no longer exists is
    // skipped rather than trusted — stale text must never reach the prompt.
    return matches
      .map((m) => byId.get(m.id))
      .filter((c): c is Chunk => c !== undefined);
  } catch (error) {
    console.warn('[rag] retrieval failed, falling back to full context:', error);
    return chunks;
  }
}
