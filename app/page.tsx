'use client';

import { useEffect, useRef } from "react";
import { animate } from 'animejs';
import Skill from "@/components/sections/Skill";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import About from "@/components/sections/About";

export default function Home() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const phoneRef = useRef<HTMLAnchorElement>(null);
  const githubRef = useRef<HTMLAnchorElement>(null);
  const linkedinRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Animate name
    if (nameRef.current) {
      animate(nameRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 300
      });
    }
    
    // Animate title
    if (titleRef.current) {
      animate(titleRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 500
      });
    }

    if (emailRef.current) {
      animate(emailRef.current, {
        opacity: [0, 1],
        translateY: [10, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 700
      });
    }

    if (phoneRef.current) {
      animate(phoneRef.current, {
        opacity: [0, 1],
        translateY: [10, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 900
      });
    }

    if (githubRef.current) {
      animate(githubRef.current, {
        opacity: [0, 1],
        translateY: [10, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 1000
      });
    }

    if (linkedinRef.current) {
      animate(linkedinRef.current, {
        opacity: [0, 1],
        translateY: [10, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 1100
      });
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden max-w-[900px]">
        <Header />
        
        {/* Content */}
        <div className="pt-20 px-8 pb-8">
          <header className="mb-10">
            <h1 ref={nameRef} className="text-3xl font-bold text-gray-900 dark:text-white">
              Kong Zhen Jie (Daniel)
            </h1>
            <p ref={titleRef} className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Team Leader | Fullstack Developer
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="mailto:danielkong.w@gmail.com" 
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:translate-y-[-2px] transition-all duration-300"
                ref={emailRef}
              >
                danielkong.w@gmail.com
              </a>
              <a href="tel:+60127562266" 
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:translate-y-[-2px] transition-all duration-300"
                ref={phoneRef}
              >
                +6012-7562266
              </a>
              <a href="https://github.com/DanielKong94" target="_blank" rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:translate-y-[-2px] transition-all duration-300"
                ref={githubRef}
              >
                GitHub
              </a>
              <a href="https://linkedin.com/in/daniel-kong-1nb827g" target="_blank" rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:translate-y-[-2px] transition-all duration-300"
                ref={linkedinRef}
              >
                LinkedIn
              </a>
            </div>
          </header>
          
          <div>
            <About sectionsRef={sectionsRef as React.RefObject<HTMLDivElement>} />
            
            <Skill sectionsRef={sectionsRef as React.RefObject<HTMLDivElement>} />
            
            <Experience sectionsRef={sectionsRef as React.RefObject<HTMLDivElement>} />
            
            <Projects sectionsRef={sectionsRef as React.RefObject<HTMLDivElement>} />
            
            <Education sectionsRef={sectionsRef as React.RefObject<HTMLDivElement>} />
            
            {/* <Contact sectionsRef={sectionsRef as React.RefObject<HTMLDivElement>} /> */}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}