/** One run of text, optionally emphasised. */
export interface Segment {
  text: string;
  strong?: boolean;
}

/** A paragraph or bullet made of emphasised and plain runs. */
export type RichText = Segment[];

/** Flatten RichText to the plain string used for embedding and prompt context. */
export function plainText(rt: RichText): string {
  return rt.map((s) => s.text).join('');
}

export interface Role {
  /** URL-safe, stable. Part of the chunk id — changing it orphans a vector. */
  slug: string;
  title: string;
  period: string;
  bullets: RichText[];
}

export interface Company {
  slug: string;
  name: string;
  location: string;
  roles: Role[];
}

export interface Project {
  slug: string;
  name: string;
  focus: string;
  bullets: RichText[];
  stack: string[];
}

export interface SkillGroup {
  slug: string;
  name: string;
  items: string[];
}

export interface EducationEntry {
  slug: string;
  qualification: string;
  institution: string;
  period: string;
}

export type ChunkType = 'about' | 'experience' | 'project' | 'skills' | 'education';

export interface ChunkMetadata {
  type: ChunkType;
  company?: string;
  role?: string;
  title?: string;
  period?: string;
  location?: string;
}

/** One semantic unit of the CV: the atom of retrieval. */
export interface Chunk {
  /** Stable identity slug, e.g. `experience:flow-digital:team-leader`. Never a content hash. */
  id: string;
  type: ChunkType;
  /** Plain text sent to the embedding model and into the prompt context. */
  text: string;
  metadata: ChunkMetadata;
}
