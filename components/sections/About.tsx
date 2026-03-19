'use client';

import { useAnimateOnView } from '@/hooks/useAnimateOnView';

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
      <p className="text-gray-700 dark:text-gray-300" ref={contentRef}>
        Hi, I&apos;m Daniel, a dedicated fullstack developer from Malaysia with extensive experience in{' '}
        <strong>Laravel, Nuxt.js, and Next.js</strong>.
        I specialize in building scalable, high-performance web applications and managing seamless deployments using AWS services such as{' '}
        <strong>Lightsail, EC2, S3, RDS and Route 53</strong>. Beyond hands-on development,
        I have successfully led teams of developers, driving projects from initial concept to production launch while ensuring code quality,
        operational stability, and continuous improvement.
        I am passionate about delivering solutions that are not just functional, but also efficient, secure, and future-ready.
      </p>
    </section>
  );
}