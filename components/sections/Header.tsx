'use client'

import { useEffect, useRef } from "react";
import { animate, svg, stagger } from "animejs";
import BannerTextSvg from "@/components/bannerTextSvg";

export default function Header() {  
  return (
      <div className="relative">
        {/* <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 scale-150">
          
        </div> */}
        {/* <div className="absolute bottom-0 transform translate-y-1/2 left-8">
          <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden">
            <Image
              src="/profile.jpg" 
              alt="Profile" 
              width={128} 
              height={128}
              priority
            />
          </div>
        </div> */}
      </div>
  )
}