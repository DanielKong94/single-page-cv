import { useRef, useEffect } from "react";
import { animate } from "animejs";
import { Pixelify_Sans } from "next/font/google";

const pixelify_sans = Pixelify_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

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
                autoplay: true
            });
        }

        if (educationRefItems.current && educationRef.current) {
            animate(educationRefItems.current, {
                opacity: [0, 1],
                duration: 1000,
                ease: 'easeOutExpo',
                autoplay: true
            });
        }


    }, [sectionsRef]);

    return (
        <section className={`${pixelify_sans.className} mb-10`} ref={educationRef}>
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-white mb-4 hover:text-amber-400 transition-all duration-300" ref={educationRefTitle}>Education</h2>
            <div ref={educationRefItems}>
                <h3 className="font-medium text-gray-600 dark:text-white hover:text-amber-400 transition-all duration-300">Diploma in Computer Science</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 hover:text-amber-400 transition-all duration-300">Southern College, Johor, Malaysia</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 hover:text-amber-400 transition-all duration-300">2014- 2017</p>
            </div>
        </section>
    );
}