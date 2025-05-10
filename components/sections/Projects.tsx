import { animate } from "animejs";
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
              autoplay: true
            });
        }
        


        if (projectsRef.current && projectsRefItems.current) {
          animate(projectsRefItems.current, {
            x: ['-130%', 0],
            ease: 'linear',
            alternate: true,
            autoplay: true,
          });
        }

        if (projectsRef.current && projectsRefItems2.current) {
          animate(projectsRefItems2.current, {
            x: ['-230%', 0],
            ease: 'linear',
            alternate: true,
            autoplay: true,
          });
        }
    }, [sectionsRef]);

    return (
        <section className="mb-10" ref={projectsRef}>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4" ref={projectTitleRef}>Projects</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg" ref={projectsRefItems}>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Courier Management System</h3>
                  <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>
                      - Client able to manage their package status.
                    </li>
                    <li>
                      - Link api with external courier api.
                    </li>
                  </ul>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>Built with:</span>
                    <br />
                    Laravel • Inertia.js • Vue.js • MySQL • AWS • Cloudflare
                  </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg" ref={projectsRefItems2}>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">CRM System</h3>
                  <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>
                      - Client able to create multiple workspace to manage different data.
                    </li>
                    <li>
                      - Client able to invite member to join their workspace.
                    </li>
                    <li>
                      - Client able to manage User, Role, Lead, Product, Payment data in each workspace.
                    </li>
                  </ul>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>Built with:</span>
                    <br />
                    Laravel • Inertia.js • Vue.js • MySQL • AWS • Cloudflare
                  </div>
              </div>
            </div>
        </section>
    );
}