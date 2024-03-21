'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger from GSAP

const FrontendPage = () => {
    const elementRef = useRef(null);
    const textContainerRef = useRef(null); // New ref for text container
    let progress = 0;

    useEffect(() => {
        gsap.from(textContainerRef.current.children, { // Use children to target all letters
            duration: 1,
            opacity: 0,
            y: 100,
            x: 100,
            stagger: 0.2,
            ease: "power4.out",
        });
        
        gsap.from(elementRef.current, {
            opacity: 0,
            y: 100,
            duration: 1,
            
            ease: 'power3.out',
        });
    }, []);

    useEffect(() => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // GSAP animation
        const anim = gsap.to(elementRef.current, {
            opacity: 100,
            color:'white',
            paused: false // Paused by default
        });
        
        const ST = ScrollTrigger.create({
            trigger: "body",
            start: 0,
            end: "bottom bottom",
            animation: anim,
            pin: elementRef.current, // Pinning the content div
            scrub: true
        });
        
        // The relevant part to keeping the progress
        ScrollTrigger.addEventListener("refreshInit", () => progress = ST.progress);
        ScrollTrigger.addEventListener("refresh", () => ST.scroll(progress * ScrollTrigger.maxScroll(window)));
    }, []);

    return (
        <>
            <div className="content" ref={elementRef}>
                <h1>GreenSock Starter Template</h1>
                <p>This loads <strong>ALL</strong> <a href="https://greensock.com">GSAP</a> files including a trial version of every <a href="https://codepen.io/GreenSock/full/OPqpRJ/">bonus plugin</a> (usable on codepen.io only). Hit the "fork" button in the bottom right and experiment to your heart's content. Enjoy!</p>
            </div>

            <div className="text-container" ref={textContainerRef}>
                <div className="letter">e</div>
                <div className="letter">H</div>
                <div className="letter">l</div>
                <div className="letter">l</div>
                <div className="letter">o</div>
            </div>
        </>
    );
};

export default FrontendPage;
