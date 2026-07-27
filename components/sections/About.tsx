'use client';

import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import RichTextView from '@/components/RichTextView';
import { about } from '@/lib/content/about';

export default function About() {
  const titleRef = useAnimateOnView<HTMLHeadingElement>({
    animationProps: {
      translateY: [25, 0],
      ease: 'outExpo',
      duration: 1000,
    },
  });

  const contentRef = useAnimateOnView<HTMLParagraphElement>({
    animationProps: {
      translateY: [20, 0],
      ease: 'outCubic',
      duration: 900,
    },
    delay: 150,
  });

  return (
    <section className="mb-10">
      <h2
        className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
        ref={titleRef}
      >
        About Me
      </h2>
      {about.map((paragraph, i) => (
        <p className="text-gray-700 dark:text-gray-300" ref={i === 0 ? contentRef : undefined} key={i}>
          <RichTextView value={paragraph} />
        </p>
      ))}
    </section>
  );
}