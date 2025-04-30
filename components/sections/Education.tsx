import { useRef, useEffect } from "react";
import { animate, onScroll } from "animejs";

export default function Education(
    { sectionsRef }: { sectionsRef: React.RefObject<HTMLDivElement> }
) {
    const educationRef = useRef<HTMLDivElement>(null);
    const educationRefTitle = useRef<HTMLHeadingElement>(null);
    const educationRefItems = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (educationRefTitle.current && educationRef.current) {
            animate(educationRefTitle.current, {
                opacity: [0, 1],
                duration: 1000,
                ease: 'easeOutExpo',
                autoplay: onScroll({
                    container: sectionsRef.current,
                    target: educationRef.current,
                    axis: 'y',
                    enter: 'bottom-=30% top',
                    leave: 'top bottom',
                    sync: 'play reverse',
                    
                })
            });
        }

        if (educationRefItems.current && educationRef.current) {
            animate(educationRefItems.current, {
                opacity: [0, 1],
                duration: 1000,
                ease: 'easeOutExpo',
                autoplay: onScroll({
                    container: sectionsRef.current,
                    target: educationRef.current,
                    axis: 'y',
                    enter: 'bottom-=30% top',
                    leave: 'top bottom',
                    sync: 'play reverse',
                    
                })
            });
        }


    }, [sectionsRef]);

    return (
        <section className="mb-10" ref={educationRef}>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4" ref={educationRefTitle}>Education</h2>
            <div ref={educationRefItems}>
                <div className="flex justify-between mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">Diploma in Computer Science</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2014- 2017</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Southern College, Johor, Malaysia</p>
            </div>
        </section>
    );
}