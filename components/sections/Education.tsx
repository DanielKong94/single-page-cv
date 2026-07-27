'use client';

import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import { Pixelify_Sans } from "next/font/google";
import { education } from '@/lib/content/education';

const pixelify_sans = Pixelify_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function Education() {
  const titleRef = useAnimateOnView<HTMLHeadingElement>({
    animationProps: {
      translateY: [20, 0],
      ease: 'outExpo',
      duration: 1000,
    },
  });

  const contentRef = useAnimateOnView<HTMLDivElement>({
    animationProps: {
      translateY: [20, 0],
      ease: 'outCubic',
      duration: 900,
    },
    delay: 150,
  });

  return (
    <section className={`${pixelify_sans.className} mb-10`}>
      <h2
        className="text-2xl font-semibold text-gray-600 dark:text-white mb-4 hover:text-amber-400 transition-all duration-300"
        ref={titleRef}
      >
        Education
      </h2>
      <div ref={contentRef}>
        {education.map((entry) => (
          <div key={entry.slug}>
            <h3 className="font-medium text-gray-600 dark:text-white hover:text-amber-400 transition-all duration-300">
              {entry.qualification}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 hover:text-amber-400 transition-all duration-300">
              {entry.institution}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 hover:text-amber-400 transition-all duration-300">
              {entry.period}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}