import { Fragment } from 'react';
import type { RichText } from '@/lib/content/types';

export default function RichTextView({ value }: { value: RichText }) {
  return (
    <>
      {value.map((segment, i) =>
        segment.strong ? (
          <strong key={i}>{segment.text}</strong>
        ) : (
          <Fragment key={i}>{segment.text}</Fragment>
        )
      )}
    </>
  );
}
