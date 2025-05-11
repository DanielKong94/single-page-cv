import { useEffect, useRef } from "react";
import { animate } from 'animejs';

export default function About(
    { sectionsRef }: { sectionsRef: React.RefObject<HTMLDivElement> }
) {
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutRefTitle = useRef<HTMLHeadingElement>(null);
  const aboutRefContent = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (aboutRefTitle.current) {
      animate(aboutRefTitle.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 600
      });

      if (aboutRefContent.current) {
        animate(aboutRefContent.current, {
          opacity: [0, 1],
          translateY: [20, 0],
          easing: 'easeOutExpo',
          duration: 1000,
          delay: 900
        });
      }
    }
  }, [sectionsRef]);
  

  return (
      <section className="mb-10" ref={aboutRef}>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4" ref={aboutRefTitle}>About Me</h2>
          <p className="text-gray-700 dark:text-gray-300" ref={aboutRefContent}>
          Hi, I&apos;m Daniel, a dedicated fullstack developer from Malaysia with extensive experience in <strong>Laravel, Nuxt.js, and Next.js</strong>. 
          I specialize in building scalable, high-performance web applications and managing seamless deployments using AWS services such as 
          <strong> Lightsail, EC2, S3, RDS and Route 53</strong>. Beyond hands-on development, 
          I have successfully led teams of developers, driving projects from initial concept to production launch while ensuring code quality, 
          operational stability, and continuous improvement. 
          I am passionate about delivering solutions that are not just functional, but also efficient, secure, and future-ready.
          </p>
      </section>
  );
}