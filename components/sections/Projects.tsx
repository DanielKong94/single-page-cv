import { animate, onScroll } from "animejs";
import { useRef, useEffect } from "react";

export default function Projects(
  { sectionsRef }: { sectionsRef: React.RefObject<HTMLDivElement> }
) {
    const projectsRef = useRef<HTMLDivElement>(null);
    const projectTitleRef = useRef<HTMLHeadingElement>(null);
    const projectsRefItems = useRef<HTMLDivElement>(null);
    const projectsRefItems2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (projectTitleRef.current && projectsRef.current) {
            animate(projectTitleRef.current, {
              opacity: [0, 1],
              duration: 1000,
              ease: 'linear',
              autoplay: onScroll({
                  container: sectionsRef.current,
                  target: projectsRef.current,
                  axis: 'y',
                  enter: 'bottom-=50% top',
                  leave: 'top bottom',
                  sync: 'play reverse',
                  
              })
            });
        }
        


        if (projectsRef.current && projectsRefItems.current) {
          animate(projectsRefItems.current, {
            x: ['-130%', 0],
            ease: 'linear',
            alternate: true,
            autoplay: onScroll({
              container: sectionsRef.current,
              target: projectsRef.current,
              axis: 'y',
              enter: 'bottom-=30% top',
              leave: 'top bottom',
              sync: 'play reverse',
              
            }),
          });
        }

        if (projectsRef.current && projectsRefItems2.current) {
          animate(projectsRefItems2.current, {
            x: ['-230%', 0],
            ease: 'linear',
            alternate: true,
            autoplay: onScroll({
              container: sectionsRef.current,
              target: projectsRef.current,
              axis: 'y',
              enter: 'bottom-=30% top',
              leave: 'top bottom',
              sync: 'play reverse',
              
            }),
          });
        }
    }, [sectionsRef]);

    return (
        <section className="mb-10" ref={projectsRef}>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4" ref={projectTitleRef}>Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg" ref={projectsRefItems}>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">E-Commerce Platform</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    A complete e-commerce solution built with Laravel and Vue.js
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Laravel • Vue.js • MySQL • AWS
                  </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg" ref={projectsRefItems2}>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Content Management System</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    A custom CMS with advanced features for content creators
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Laravel • Inertia.js • PostgreSQL • Cloudflare
                  </div>
              </div>
            </div>
        </section>
    );
}