'use client'
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Elastic } from 'gsap';
import './style.css'; // Import your CSS file for styling the boxes

export default function Test() {
  const greenRef = useRef(null);
  const purpleRef = useRef(null);
  const blueRef = useRef(null);

  useEffect(() => {
    // Ensure animations run after component mounts (prevents potential errors)
    
    gsap.to(greenRef.current, { rotation: 360, y: 100, duration: 1 , ease: Elastic.easeIn});
    gsap.to(blueRef.current ,{rotateZ: 90, y: -100, ease: Elastic.easeInOut  , duration: 1})
    gsap.fromTo(purpleRef.current, {x: -100},{rotation: 360, x: 100, duration: 1});
  }, []);

  return (
    
    <div className="container"> {/* Wrap divs in a container for better styling */}
      <div ref={purpleRef} className="box purple"></div>
      <div ref={purpleRef} className="box purple"></div>
      <div ref={purpleRef} className="box purple"></div>
    </div>
  );
}
