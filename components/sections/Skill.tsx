'use client';

import { useAnimateOnView, useStaggerOnView } from '@/hooks/useAnimateOnView';
import { Silkscreen } from "next/font/google";

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
        <div className="p-3 rounded-lg skill-group">
          <h3 className="font-medium text-gray-600 dark:text-white hover:text-emerald-400 transition-all duration-300">Frontend</h3>
          <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="hover:text-emerald-400 transition-all duration-300">Nuxt.js / Vue</li>
            <li className="hover:text-emerald-400 transition-all duration-300">Next.js / React</li>
            <li className="hover:text-emerald-400 transition-all duration-300">Tailwind CSS</li>
            <li className="hover:text-emerald-400 transition-all duration-300">JavaScript / TypeScript</li>
          </ul>
        </div>
        <div className="p-3 rounded-lg skill-group">
          <h3 className="font-medium text-gray-600 dark:text-white hover:text-emerald-400 transition-all duration-300">Backend</h3>
          <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="hover:text-emerald-400 transition-all duration-300">Laravel / PHP</li>
            <li className="hover:text-emerald-400 transition-all duration-300">Node.js</li>
            <li className="hover:text-emerald-400 transition-all duration-300">MySQL / PostgreSQL</li>
            <li className="hover:text-emerald-400 transition-all duration-300">RESTful APIs</li>
          </ul>
        </div>
        <div className="p-3 rounded-lg skill-group">
          <h3 className="font-medium text-gray-600 dark:text-white hover:text-emerald-400 transition-all duration-300">DevOps</h3>
          <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="hover:text-emerald-400 transition-all duration-300">AWS (EC2, S3, Route 53)</li>
            <li className="hover:text-emerald-400 transition-all duration-300">Nginx / Apache</li>
            <li className="hover:text-emerald-400 transition-all duration-300">Ubuntu Server</li>
            <li className="hover:text-emerald-400 transition-all duration-300">Cloudflare</li>
          </ul>
        </div>
      </div>
    </section>
  );
}