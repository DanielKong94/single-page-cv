'use client';

import { useAnimateOnView, useStaggerOnView } from '@/hooks/useAnimateOnView';
import { Silkscreen } from "next/font/google";
import { skillGroups } from '@/lib/content/skills';

const silkscreen = Silkscreen({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function Skill() {
  const titleRef = useAnimateOnView<HTMLHeadingElement>({
    animationProps: {
      translateY: [20, 0],
      ease: 'outExpo',
      duration: 1000,
    },
  });

  const skillsContainerRef = useStaggerOnView<HTMLDivElement>('.skill-group', {
    staggerDelay: 120,
    duration: 800,
    ease: 'outCubic',
    translateY: [25, 0],
    delay: 100,
  });

  return (
    <section className={`${silkscreen.className} mb-10`}>
      <h2
        className="text-2xl font-semibold text-gray-600 dark:text-white mb-4 hover:text-emerald-400 transition-all duration-300"
        ref={titleRef}
      >
        Skills
      </h2>
      <div className="grid gap-4" ref={skillsContainerRef}>
        {skillGroups.map((group) => (
          <div className="p-3 rounded-lg skill-group" key={group.slug}>
            <h3 className="font-medium text-gray-600 dark:text-white hover:text-emerald-400 transition-all duration-300">
              {group.name}
            </h3>
            <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {group.items.map((item) => (
                <li className="hover:text-emerald-400 transition-all duration-300" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}