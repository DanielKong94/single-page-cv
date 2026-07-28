'use client';

import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import RichTextView from '@/components/RichTextView';
import { companies } from '@/lib/content/experience';

export default function Experience() {
  const titleRef = useAnimateOnView<HTMLHeadingElement>({
    animationProps: {
      translateY: [25, 0],
      ease: 'outExpo',
      duration: 1000,
    },
  });

  const block1Ref = useAnimateOnView<HTMLDivElement>({
    animationProps: {
      translateY: [30, 0],
      ease: 'outCubic',
      duration: 900,
    },
    delay: 100,
  });

  const block2Ref = useAnimateOnView<HTMLDivElement>({
    animationProps: {
      translateY: [30, 0],
      ease: 'outCubic',
      duration: 900,
    },
    delay: 200,
  });

  return (
    <section className="mb-10">
      <h2
        className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
        ref={titleRef}
      >
        Experience
      </h2>
      <div className="space-y-6">
        {companies.map((company, ci) => (
          <div
            key={company.slug}
            ref={ci === 0 ? block1Ref : block2Ref}
            className={ci === 0 ? 'space-y-6' : 'mt-8'}
          >
            <div
              className={
                ci === 0
                  ? 'border-l-2 border-blue-500 pl-4'
                  : 'border-l-2 border-gray-300 dark:border-gray-600 pl-4 mb-4'
              }
            >
              {ci === 0 ? (
                <p className="text-xl font-bold text-gray-900 dark:text-white">{company.name}</p>
              ) : (
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{company.name}</h2>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400">{company.location}</p>
            </div>

            {company.roles.map((role, ri) => (
              <div key={role.slug}>
                <div className="flex justify-between items-center mb-2">
                  <h3
                    className={
                      ci === 0 && ri === 0
                        ? 'font-bold text-gray-800 dark:text-white text-md'
                        : 'font-semibold text-gray-800 dark:text-gray-200 text-md'
                    }
                  >
                    {role.title}
                  </h3>
                  <span
                    className={
                      ci === 0 && ri === 0
                        ? 'text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded'
                        : 'text-xs text-gray-500 dark:text-gray-400'
                    }
                  >
                    {role.period}
                  </span>
                </div>
                <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc list-inside">
                  {role.bullets.map((bullet, bi) => (
                    <li key={bi}>
                      <RichTextView value={bullet} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}