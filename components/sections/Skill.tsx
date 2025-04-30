import { useEffect, useRef } from "react";
import { animate } from 'animejs';

export default function Skill(
    { sectionsRef }: { sectionsRef: React.RefObject<HTMLDivElement> }
) {
  const skillsRef = useRef<HTMLDivElement>(null);
  const backendSkillsRef = useRef<HTMLDivElement>(null);
  const devOpsSkillsRef = useRef<HTMLDivElement>(null);
  const skillsRefTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if(skillsRefTitle.current) {
      animate(skillsRefTitle.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 1200
      });
    }
    if (skillsRef.current) {
      animate(skillsRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 1300
      });
    }
    
    if (backendSkillsRef.current) {
      animate(backendSkillsRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 1600
      });
    }

    if (devOpsSkillsRef.current) {
      animate(devOpsSkillsRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 1900
      });
    }
  }, [sectionsRef]);

  return (
    <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4" ref={skillsRefTitle}>Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg" ref={skillsRef}>
            <h3 className="font-medium text-gray-800 dark:text-white">Frontend</h3>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            <li>Vue.js / Inertia.js</li>
            <li>Next.js / React</li>
            <li>Tailwind CSS</li>
            <li>JavaScript / TypeScript</li>
            </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg" ref={backendSkillsRef}>
            <h3 className="font-medium text-gray-800 dark:text-white">Backend</h3>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            <li>Laravel / PHP</li>
            <li>Node.js</li>
            <li>MySQL / PostgreSQL</li>
            <li>RESTful APIs</li>
            </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg" ref={devOpsSkillsRef}>
            <h3 className="font-medium text-gray-800 dark:text-white">DevOps</h3>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            <li>AWS (EC2, S3, Route 53)</li>
            <li>Nginx / Apache</li>
            <li>Ubuntu Server</li>
            <li>Cloudflare</li>
            </ul>
        </div>
        </div>
    </section>
  );
}