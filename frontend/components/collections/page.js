'use client'
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from 'next/link'; // Import Link for Next.js navigation

export default function Collection() {
  const comp = useRef(null);
  // Track intro slider visibility

  useLayoutEffect(() => {
    

      let ctx = gsap.context(() => {
        const t1 = gsap.timeline({ repeat: -1 });
        t1.from("#intro-slider", {
          xPercent: "-100",
          duration: 5,
          delay: 0.3,
        })
          .from(["#title-1", "#title-2", "#title-3"], {
            opacity: 0,
            y: "+=75",
            stagger: 0.5,
          })
          .to(["#title-1", "#title-2", "#title-3"], {
            opacity: 0,
            y: "-=75",
            delay: 0.3,
            stagger: 0.5,
          })
          .to("#intro-slider", {
            xPercent: "-100",
            duration: 2,
             // Hide intro slider on animation complete
          })
          .from("#welcome", {
            opacity: 0,
            duration: 2,
            
          });
      }, comp);

      return () => ctx.revert();
    
  }, []);

  return (
    <div className="relative" ref={comp}>
       
        <div
          id="intro-slider"
          className="h-screen px-10 bg-gray-50 absolute top-0 left-0 font-spaceGrotesk z-10 w-full flex flex-col gap-10 tracking-tight"
        >
          
          <h1 className="text-9xl" id="title-1">
            Mens
          </h1>
          <h1 className="text-9xl" id="title-2">
            Women
          </h1>
          <h1 className="text-9xl" id="title-3">
            Kids
          </h1>
        </div>
      
      <div className="h-screen flex bg-gray-950 justify-center place-items-center">
        <Link href="/products">
          <p
            id="welcome"
            className={`text-9xl font-bold text-gray-100 font-spaceGrotesk `}
          >
            Collections.
          </p>
        </Link>
      </div>
    </div>
  );
}
