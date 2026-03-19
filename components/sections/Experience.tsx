'use client';

import { useAnimateOnView } from '@/hooks/useAnimateOnView';

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
        <div ref={block1Ref} className="space-y-6">
          <div className="border-l-2 border-blue-500 pl-4">
            <p className="text-xl font-bold text-gray-900 dark:text-white">Flow Digital SDN BHD</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Selangor, Malaysia</p>
          </div>

          {/* Team Leader Role */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800 dark:text-white text-md">Team Leader / Senior Tech Lead</h3>
              <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">2025 - Present</span>
            </div>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc list-inside">
              <li><strong>Orchestrated development lifecycles</strong> for high-traffic web applications using Laravel, Vue.js, and Next.js, ensuring 100% project delivery alignment with business goals.</li>
              <li><strong>Steered technical architecture</strong> and resource allocation, mentoring junior developers and establishing code quality standards across the stack.</li>
              <li><strong>Architected cloud infrastructure</strong> on AWS (EC2, S3, Route 53) and Cloudflare, implementing robust CI/CD pipelines to streamline deployment workflows.</li>
              <li><strong>Spearheaded system security</strong> and performance audits, achieving significant improvements in API response times and infrastructure resilience.</li>
            </ul>
          </div>

          {/* Senior Developer Role */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Senior Fullstack Developer</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">2022 - 2024</span>
            </div>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc list-inside">
              <li><strong>Engineered scalable full-stack solutions</strong> with a focus on modularity and reusability across Laravel and Next.js environments.</li>
              <li><strong>Provisioned and managed cloud-native environments</strong> on AWS, focusing on high availability and cost-effective scaling for growing SaaS products.</li>
              <li><strong>Integrated complex third-party ecosystems</strong> including payment gateways, logistics APIs, and specialized e-commerce webhooks (Shopify).</li>
            </ul>
          </div>
        </div>

        <div ref={block2Ref} className="mt-8">
          <div className="border-l-2 border-gray-300 dark:border-gray-600 pl-4 mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Excel Technology</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Selangor, Malaysia</p>
          </div>

          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-md">Full Stack Developer (Freelance)</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">2018 - 2022</span>
          </div>
          <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc list-inside">
            <li><strong>Developed custom-tailored web solutions</strong> using PHP/Laravel and JavaScript for various SMEs, focusing on responsive UI/UX and client satisfaction.</li>
            <li><strong>Collaborated with cross-functional design teams</strong> to transform complex wireframes into high-performance, accessible digital experiences.</li>
            <li><strong>Optimized legacy codebases</strong> for modern standards, improving page load speeds and backend logic efficiency.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}