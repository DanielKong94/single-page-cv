import { animate, onScroll } from "animejs";
import { useEffect, useRef } from "react";

export default function Experience({ sectionsRef }: { sectionsRef: React.RefObject<HTMLDivElement> }) {
    const experienceRef = useRef<HTMLDivElement>(null);
    const experienceRefTitle = useRef<HTMLDivElement>(null);
    const experienceRefItems_1 = useRef<HTMLDivElement>(null);
    const experienceRefItems_2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (experienceRefTitle.current && experienceRef.current) {
            animate(experienceRefTitle.current, {
                opacity: [0, 1],
                duration: 1000,
                ease: 'linear',
                autoplay: onScroll({
                    container: sectionsRef.current,
                    target: experienceRef.current,
                    axis: 'y',
                    enter: 'bottom-=50% top',
                    leave: 'top bottom',
                    sync: 'play reverse',
                    
                })
            })
        }

        if (experienceRef.current && experienceRefItems_1.current && experienceRefItems_2.current) {
            animate(experienceRefItems_1.current, {
                x: ['-110%', 0],
                duration: 1000,
                ease: 'linear',
                alternate: true,
                autoplay: onScroll({
                    container: sectionsRef.current,
                    target: experienceRef.current,
                    axis: 'y',
                    enter: 'bottom-=50% top',
                    leave: 'top bottom',
                    sync: 'play reverse',
                    
                })
            });

            animate(experienceRefItems_2.current, {
                x: ['110%', 0],
                duration: 1000,
                ease: 'linear',
                alternate: true,
                autoplay: onScroll({
                    container: sectionsRef.current,
                    target: experienceRef.current,
                    axis: 'y',
                    enter: 'bottom-=50% top',
                    leave: 'top bottom',
                    sync: 'play reverse',
                    
                })
            });
        }
    }, [sectionsRef]);

    return (
        <section className="mb-10" ref={experienceRef}>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4" ref={experienceRefTitle}>Experience</h2>
            <div className="space-y-6">
            <div ref={experienceRefItems_1}>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Flow Digital SDN BHD, Selangor, Malaysia</p>
                <div className="flex justify-between mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">Team Leader</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2025 - Present</span>
                </div>
                <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside mb-1">
                    <li>Lead a team of developers in building and maintaining web applications using Laravel, Vue.js, and Next.js</li>
                    <li>Managed project timelines and resources</li>
                    <li>Implemented infrastructure using AWS services (EC2, S3, Route 53)</li>
                    <li>Optimized application performance and security</li>
                </ul>
                <div className="flex justify-between mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">Senior Fullstack Developer</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2022 - 2024</span>
                </div>
                <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
                    <li>Developed and maintained web applications using Laravel, Vue.js, and Next.js</li>
                    <li>Implemented infrastructure using AWS services (EC2, S3, Route 53)</li>
                    <li>Optimized application performance and security</li>
                </ul>
            </div>
            <div ref={experienceRefItems_2}>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Excel Technology, Selangor, Malaysia</h2>
                <div className="flex justify-between mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">Full Stack Developer (Freelance)</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2018 - 2022</span>
                </div>
                <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
                    <li>Built responsive websites using PHP, Laravel, and JavaScript</li>
                    <li>Collaborated with designers to implement UI/UX improvements</li>
                    <li>Integrated third-party services and APIs</li>
                </ul>
            </div>
            </div>
        </section>
    );
}