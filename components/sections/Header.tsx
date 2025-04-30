'use client'

import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, svg, stagger } from "animejs";
import BannerTextSvg from "@/components/bannerTextSvg";

export default function Header() {
  const nameRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (nameRef.current) {
      animate(svg.createDrawable(nameRef.current), {
        draw: ['0 0', '0 1', '1 1'],
        easing: 'easeInOutSine',
        duration: 5000,
        delay: stagger(100),
        loop: true
      });
    }
  })
  
  return (
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 p-8">
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 scale-150">
          <BannerTextSvg ref={nameRef} />
        </div>
        <div className="absolute bottom-0 transform translate-y-1/2 left-8">
          <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden">
            {/* <Image
              src="/profile.jpg" 
              alt="Profile" 
              width={128} 
              height={128}
              priority
            /> */}
          </div>
        </div>
      </div>
  )
}