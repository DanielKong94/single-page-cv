import { useEffect, useRef } from "react";
import { animate } from 'animejs';
import { Silkscreen } from "next/font/google";

const silkscreen = Silkscreen({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

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
    <section className={`${silkscreen.className} mb-10`}>
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-white mb-4 hover:text-emerald-400 transition-all duration-300" 
          ref={skillsRefTitle}>
            Skills
        </h2>
        <div className="grid gap-4">
        <div className="p-3 rounded-lg" ref={skillsRef}>
            <h3 className="font-medium text-gray-600 dark:text-white hover:text-emerald-400 transition-all duration-300">Frontend</h3>
            <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="hover:text-emerald-400 transition-all duration-300">Nuxt.js / Vue</li>
            <li className="hover:text-emerald-400 transition-all duration-300">Next.js / React</li>
            <li className="hover:text-emerald-400 transition-all duration-300">Tailwind CSS</li>
            <li className="hover:text-emerald-400 transition-all duration-300">JavaScript / TypeScript</li>
            </ul>
        </div>
        <div className="p-3 rounded-lg" ref={backendSkillsRef}>
            <h3 className="font-medium text-gray-600 dark:text-white hover:text-emerald-400 transition-all duration-300">Backend</h3>
            <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="hover:text-emerald-400 transition-all duration-300">Laravel / PHP</li>
            <li className="hover:text-emerald-400 transition-all duration-300">Node.js</li>
            <li className="hover:text-emerald-400 transition-all duration-300">MySQL / PostgreSQL</li>
            <li className="hover:text-emerald-400 transition-all duration-300">RESTful APIs</li>
            </ul>
        </div>
        <div className="p-3 rounded-lg" ref={devOpsSkillsRef}>
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