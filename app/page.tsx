'use client';

import { useEffect, useRef } from "react";
import { animate } from 'animejs';
import Skill from "@/components/sections/Skill";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import About from "@/components/sections/About";
import Image from "next/image";

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
        duration: 800,
        delay: 300
      });
    }
    
    // Animate title
    if (titleRef.current) {
      animate(titleRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 800,
        delay: 400
      });
    }

    // Animate contact links with shorter delays for quicker appearance
    const contactRefs = [emailRef, phoneRef, githubRef, linkedinRef];
    contactRefs.forEach((ref, index) => {
      if (ref.current) {
        animate(ref.current, {
          opacity: [0, 1],
          translateY: [10, 0],
          easing: 'easeOutExpo',
          duration: 600,
          delay: 500 + (index * 100)
        });
      }
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 py-6 px-4 sm:px-6 lg:px-8 font-mono">
      {/* Code-like background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="text-green-500 text-opacity-20 text-xs whitespace-pre">
          {/* {Array(30).fill(0).map((_, i) => (
            <div key={i} style={{transform: `translateX(${Math.random() * 100}px)`}}>
              {Array(Math.floor(Math.random() * 20) + 5).fill(0).map((_, j) => (
                <span key={j}>{`${Math.random() > 0.5 ? 'const' : 'let'} ${String.fromCharCode(97 + Math.floor(Math.random() * 26))}${String.fromCharCode(97 + Math.floor(Math.random() * 26))} = ${Math.random() > 0.5 ? '()' : '{}'} => { ${Math.random() > 0.7 ? 'return' : '//'} }`}</span>
              ))}
            </div>
          ))} */}
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto backdrop-blur-sm bg-white bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-20 shadow-2xl rounded-2xl overflow-hidden border border-gray-700 relative z-10">
        {/* Terminal-like header bar */}
        <div className="bg-gray-800 py-2 px-4 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500">

            </div>
            <div className="w-3 h-3 rounded-full bg-yellow-500">

            </div>
            <div className="w-3 h-3 rounded-full bg-green-500">
              
            </div>
          </div>
          <div className="text-white text-xs font-mono flex-grow text-center">daniel@portfolio ~ /resume</div>
          <div className="text-gray-400 text-xs">bash</div>
        </div>
        
        <Header />
        
        {/* Content */}
        <div className="relative pt-16 px-6 md:px-10 pb-8">
          <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="relative">
              <span className="text-green-400 absolute -left-5">$</span>
              <h1 ref={nameRef} className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 dark:from-cyan-300 dark:to-emerald-300 ml-2">
                Kong Zhen Jie (Daniel)
              </h1>
              <div className="flex items-center mt-2 ml-2">
                <span className="text-green-400 mr-2">&gt;</span>
                <p ref={titleRef} className="text-xl text-gray-300 dark:text-gray-300 font-mono">
                  Team Leader | Fullstack Developer
                </p>
                <span className="animate-pulse ml-1 inline-block w-2 h-5 bg-green-400"></span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6 md:mt-0">
              <a href="mailto:danielkong.w@gmail.com" 
                className="group flex items-center gap-2 px-4 py-2 rounded-md border border-gray-600 bg-gray-800 bg-opacity-50 text-gray-200 hover:bg-gray-700 hover:border-green-400 transition-all duration-300"
                ref={emailRef}
              >
                <svg className="w-4 h-4 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
                <code>Email</code>
              </a>
              <a href="tel:+60127562266" 
                className="group flex items-center gap-2 px-4 py-2 rounded-md border border-gray-600 bg-gray-800 bg-opacity-50 text-gray-200 hover:bg-gray-700 hover:border-green-400 transition-all duration-300"
                ref={phoneRef}
              >
                <svg className="w-4 h-4 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>
                <code>Phone</code>
              </a>
              <a href="https://github.com/DanielKong94" target="_blank" rel="noopener noreferrer" 
                className="group flex items-center gap-2 px-4 py-2 rounded-md border border-gray-600 bg-gray-800 bg-opacity-50 text-gray-200 hover:bg-gray-700 hover:border-green-400 transition-all duration-300"
                ref={githubRef}
              >
                <svg className="w-4 h-4 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.65-3.67-1.46-3.67-1.46-.5-1.29-1.21-1.64-1.21-1.64-.99-.68.07-.67.07-.67 1.1.08 1.68 1.14 1.68 1.14.98 1.68 2.57 1.19 3.2.91.1-.71.38-1.19.69-1.46-2.42-.27-4.96-1.21-4.96-5.4 0-1.2.42-2.17 1.12-2.93-.11-.28-.49-1.4.11-2.91 0 0 .93-.3 3.05 1.14a10.7 10.7 0 015.63 0c2.12-1.45 3.05-1.14 3.05-1.14.6 1.51.22 2.63.11 2.91.7.76 1.12 1.74 1.12 2.93 0 4.2-2.55 5.13-4.98 5.4.39.34.74 1 .74 2.01v2.98c0 .29.19.63.74.52A11 11 0 0012 1.27"></path></svg>
                <code>GitHub</code>
                </a>
              <a href="https://linkedin.com/in/daniel-kong-1nb827g" target="_blank" rel="noopener noreferrer" 
                className="group flex items-center gap-2 px-4 py-2 rounded-md border border-gray-600 bg-gray-800 bg-opacity-50 text-gray-200 hover:bg-gray-700 hover:border-green-400 transition-all duration-300"
                ref={linkedinRef}
              >
                <svg className="w-4 h-4 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path></svg>
                <code>LinkedIn</code>
              </a>
            </div>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" ref={sectionsRef}>
            <div className="lg:col-span-2 space-y-16">
              {/* Section headers styled like code comments */}
              <div className="relative group/aboutContainer">
                <div className="absolute -left-3 top-0 h-full w-1 bg-green-400 group-hover/aboutContainer:animate-pulse"></div>
                <About sectionsRef={sectionsRef as React.RefObject<HTMLDivElement>} />
              </div>
              
              <div className="relative group/experienceContainer">
                <div className="absolute -left-3 top-0 h-full w-1 bg-green-400 group-hover/experienceContainer:animate-pulse"></div>
                <Experience sectionsRef={sectionsRef as React.RefObject<HTMLDivElement>} />
              </div>
              
              <div className="relative group/projectsContainer">
                <div className="absolute -left-3 top-0 h-full w-1 bg-green-400 group-hover/projectsContainer:animate-pulse"></div>
                <Projects sectionsRef={sectionsRef as React.RefObject<HTMLDivElement>} />
              </div>
            </div>
            
            <div className="space-y-16">
              {/* Terminal window styling for sidebar sections */}
              <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900 bg-opacity-50">
                <div className="bg-gray-800 py-1 px-3 flex items-center">
                  <div className="flex space-x-1 mr-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-300 text-xs">skills.js</div>
                </div>
                <div className="p-4">
                  <Skill sectionsRef={sectionsRef as React.RefObject<HTMLDivElement>} />
                </div>
              </div>
              
              <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900 bg-opacity-50">
                <div className="bg-gray-800 py-1 px-3 flex items-center">
                  <div className="flex space-x-1 mr-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-300 text-xs">education.json</div>
                </div>
                <div className="p-4">
                  <Education sectionsRef={sectionsRef as React.RefObject<HTMLDivElement>} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* Developer technology icons floating in background */}
      <div className="fixed bottom-10 right-10 opacity-20 w-20 h-20 pointer-events-none">
        <Image src="/window.svg" alt="Code" width={80} height={80} />
      </div>
      <div className="fixed top-20 left-10 opacity-20 w-20 h-20 pointer-events-none">
        <Image src="/file.svg" alt="File" width={80} height={80} />
      </div>
      <div className="fixed top-40 right-20 opacity-20 w-20 h-20 pointer-events-none">
        <Image src="/globe.svg" alt="Web" width={80} height={80} />
      </div>
    </div>
  );
}