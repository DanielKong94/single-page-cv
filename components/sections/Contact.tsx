import { animate, onScroll } from "animejs";
import { useEffect, useRef } from "react";

export default function Contact(
    { sectionsRef }: { sectionsRef: React.RefObject<HTMLDivElement> }
) {
    const contactRef = useRef<HTMLDivElement>(null);
    const contactRefTitle = useRef<HTMLHeadingElement>(null);
    const contactRefItems = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contactRefTitle.current && contactRef.current) {
            animate(contactRefTitle.current, {
                opacity: [0, 1],
                duration: 1000,
                ease: 'linear',
                autoplay: onScroll({
                    container: sectionsRef.current,
                    target: contactRef.current,
                    axis: 'y',
                    enter: 'bottom-=50% top',
                    leave: 'top bottom',
                    sync: 'play reverse',
                    
                })
            });
        }
    }, [sectionsRef]);

    return (
        <section ref={contactRef}>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4" ref={contactRefTitle}>Contact Me</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                Interested in working together? Feel free to reach out to me at your-email@example.com or use the form below.
            </p>
            <div className="grid grid-cols-1 gap-6" ref={contactRefItems}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                    type="text" 
                    placeholder="Name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input 
                    type="email" 
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>
                <input 
                    type="text" 
                    placeholder="Subject"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <textarea 
                    placeholder="Message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button 
                    type="submit"
                    className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Send Message
                </button>
            </div>
        </section>
    );
}