import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toChunks } from '../lib/content/index';
import { embed } from '../lib/rag/embed';
import { upsertVectors, deleteVectorsByIds, createIndex } from '../lib/rag/vectorize';
import type { VectorRecord } from '../lib/rag/vectorize';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST_PATH = path.join(HERE, 'ingest-manifest.json');

/**
 * Decide which vectors to remove.
 *
 * Vectorize v2 exposes no endpoint to list the ids in an index, so the index
 * cannot be enumerated and diffed. The manifest is the only record of what a
 * previous run wrote.
 */
export function planIngest(currentIds: string[], manifestIds: string[]): { toDelete: string[] } {
  const current = new Set(currentIds);
  return { toDelete: manifestIds.filter((id) => !current.has(id)) };
}

function readManifest(): string[] {
  try {
    return (JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as { ids: string[] }).ids;
  } catch {
    return [];
  }
}

async function main() {
  const chunks = toChunks();
  console.log(`Chunks to ingest: ${chunks.length}`);

  // Probe the embedding model for its output dimension. Cloudflare does not
  // publish it for bge-m3, and an index is created with a fixed dimension that
  // cannot be changed afterwards.
  const [probe] = await embed(['dimension probe']);
  const dimensions = probe.length;
  console.log(`Embedding dimensions: ${dimensions}`);

  if (process.argv.includes('--create-index')) {
    await createIndex(dimensions);
    console.log(`Created index with ${dimensions} dimensions.`);
  }

  const vectors = await embed(chunks.map((c) => c.text));

  if (vectors.some((v) => v.length !== dimensions)) {
    throw new Error(
      `Inconsistent embedding dimensions. Expected ${dimensions}. The model may have changed — ` +
        `the index must be recreated rather than upserted into.`
    );
  }

  const records: VectorRecord[] = chunks.map((chunk, i) => ({
    id: chunk.id,
    values: vectors[i],
    metadata: { ...chunk.metadata },
  }));

  await upsertVectors(records);
  console.log(`Upserted ${records.length} vectors.`);

  const { toDelete } = planIngest(
    chunks.map((c) => c.id),
    readManifest()
  );

  if (toDelete.length > 0) {
    await deleteVectorsByIds(toDelete);
    console.log(`Deleted ${toDelete.length} orphaned vectors: ${toDelete.join(', ')}`);
  }

  writeFileSync(MANIFEST_PATH, `${JSON.stringify({ ids: chunks.map((c) => c.id) }, null, 2)}\n`);
  console.log('Manifest updated. Commit scripts/ingest-manifest.json.');
}

// Only run when invoked directly, so importing planIngest in tests is safe.
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
