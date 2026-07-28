'use client';

import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import RichTextView from '@/components/RichTextView';
import { projects } from '@/lib/content/projects';

export default function Projects() {
  const titleRef = useAnimateOnView<HTMLHeadingElement>({
    animationProps: {
      translateY: [25, 0],
      ease: 'outExpo',
      duration: 1000,
    },
  });

  const card1Ref = useAnimateOnView<HTMLDivElement>({
    animationProps: {
      translateY: [35, 0],
      scale: [0.97, 1],
      ease: 'outCubic',
      duration: 900,
    },
    delay: 100,
  });

  const card2Ref = useAnimateOnView<HTMLDivElement>({
    animationProps: {
      translateY: [35, 0],
      scale: [0.97, 1],
      ease: 'outCubic',
      duration: 900,
    },
    delay: 250,
  });

  const card3Ref = useAnimateOnView<HTMLDivElement>({
    animationProps: {
      translateY: [35, 0],
      scale: [0.97, 1],
      ease: 'outCubic',
      duration: 900,
    },
    delay: 400,
  });

  return (
    <section className="mb-10">
      <h2
        className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
        ref={titleRef}
      >
        Projects
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, i) => (
          <div
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
            ref={[card1Ref, card2Ref, card3Ref][i]}
            key={project.slug}
          >
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">{project.name}</h3>
            <p className="text-sm">Focus on: {project.focus}</p>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-600 dark:text-gray-300">
              {project.bullets.map((bullet, j) => (
                <li key={j}>
                  <RichTextView value={bullet} />
                </li>
              ))}
            </ul>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              <span>Built with:</span>
              <br />
              {project.stack.join(' • ')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}