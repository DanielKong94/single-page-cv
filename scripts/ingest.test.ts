import { describe, it, expect } from 'vitest';
import { planIngest } from './ingest';

describe('planIngest', () => {
  it('deletes ids present in the manifest but no longer produced', () => {
    const plan = planIngest(['a', 'b'], ['a', 'b', 'removed']);
    expect(plan.toDelete).toEqual(['removed']);
  });

  it('deletes nothing when content is unchanged', () => {
    expect(planIngest(['a', 'b'], ['a', 'b']).toDelete).toEqual([]);
  });

  it('deletes nothing on a first run with an empty manifest', () => {
    expect(planIngest(['a', 'b'], []).toDelete).toEqual([]);
  });

  it('treats a renamed slug as a delete of the old id', () => {
    const plan = planIngest(
      ['experience:flow-digital:tech-lead'],
      ['experience:flow-digital:team-leader']
    );
    expect(plan.toDelete).toEqual(['experience:flow-digital:team-leader']);
  });
});
