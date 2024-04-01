"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { Elastic, Sine, Circ, Power2 } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";

import "./style.css"; // Import your CSS file for styling the boxes

export default function Test() {
  const containerRef = useRef(null);
  const container1Ref = useRef(null);
  const greenRef = useRef(null);
  const purpleRef = useRef(null);
  const blueRef = useRef(null);
  const [imagez , setImagez] = useState([]);

  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });


  useEffect(() => {
    const t1 = gsap.timeline({ repeat: -1 });
    t1.add("start");
    t1.from(
      ".square1",
      3,
      {
        fill: ["white", "red", "#e23e0c"],
        opacity: [0.2, 0.8, 0.5, 0.3],
        ease: Elastic.easeIn,
      },
      0.001
    );
    t1.to(
      ".square1",
      3,
      {
        y: [700, -700, 1000, -1000],
        opacity: [200, -200, 700, -700],
        rotation: function (i) {
          return i * 20;
        },
        opacity: 0,
        fill: "#f2bf30",
        ease: Circ.easeInOut,
      },
      0.001,
      "start+=1.25"
    );
  }, []);

  useEffect(() => {
    // Get the container dimensions after it's rendered
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerDimensions({ width, height });
      console.log(width + "x" + height);
    }
  }, []);

  useEffect(() => {
    gsap.to(
      ".bar",
      {
        stagger: 0.1,
        rotation: 90,
        backgroundColor: "red",
        ease: Sine.easeInOut,
      },
      0.1
    );
  }, []);

  useEffect(() => {
    gsap.to(
      ".square",
      2,
      { y: 100, stagger: 0.1, backgroundColor: "red", ease: Elastic.easeInOut },
      0.05
    );
    gsap.to(
      ".square",
      2,
      {
        y: 100,
        stagger: 0.1,
        rotation: 200,
        delay: 1,
        scale: 1.5,
        backgroundColor: "#72b165",
        ease: Elastic.easeInOut,
      },
      0.025
    );
  }, []);

  useEffect(() => {
    gsap.to(".square2", 2, { perspective: 200, transformStyle: "preserve-3d" });
    gsap.to(
      ".square2",
      2.5,
      { y: 180, z: -150, rotationX: 230, opacity: 0.3, ease: Power2.easeInOut },
      "+=0.2"
    );
  }, []);

  useEffect(() => {
    let tl = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });

    tl.to(".green", { rotation: 360 });
    tl.to(".purple", { rotation: 360 });
    tl.to(".orange", { rotation: 360 });
  }, []);

  useEffect(() => {

    const height1 = window.innerHeight;
  const width1 = window.innerWidth;
  console.log(width1);
    // Ensure animations run after component mounts (prevents potential errors)
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".vvvv", {
      x: width1 / 3,
      scrollTrigger: {
        trigger: "h1",
        start: "top bottom",
        end: "center center",
        scrub: true,
      },
    });
    gsap.to(".vvvv", {
      x: 0,
      scrollTrigger: {
        trigger: "h1",
        start: "center center",
        end: "center center",
        scrub: true,
      },
    });
  }, []);

  // Fetch carousel images
  useEffect(() => {
    fetch("/api/carousel")
      .then((res) => res.json())
      .then((carouselImages) => {
        const images = carouselImages.images.map((image) => image.imageUrl);
        setImagez(images);
        console.log(images);
      })
      .catch((error) =>
        console.error("Error fetching carousel images:", error)
      );
  }, []);

  console.log(imagez);

  useEffect(() => {
    // Ensure animations run after component mounts (prevents potential errors)

    gsap.to(greenRef.current, {
      rotation: 360,
      y: 100,
      duration: 1,
      ease: Elastic.easeIn,
    });
    gsap.to(blueRef.current, {
      rotateZ: 90,
      y: -100,
      ease: Elastic.easeInOut,
      duration: 1,
    });
    gsap.fromTo(
      purpleRef.current,
      { x: -200 },
      {
        rotation: 360,
        opacity: 0.7,
        scaleX: containerDimensions.width,
        scaleY: containerDimensions.height,
        x: 100,
        duration: 5,
      }
    );
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let wheel = document.querySelector(".wheel");
    let images = gsap.utils.toArray(".wheel-card");
    function setup() {
      let radius = wheel.offsetWidth / 2;
      let center = wheel.offsetWidth / 2;
      let total = imagez.length;
      let slice = (2 * Math.PI) / total;
  
      images.forEach((item, i) => {
        let angle = i * slice;
        let x = center * radius * Math.sin(angle);
        let y = center * radius * Math.cos(angle);
  
        gsap.to(item, {
          rotation: angle + "-rad",
          xPercent: -50,
          yPercent: -50,
          x: x,
          y: y,
        });
      });
    }
  
    gsap.to(".wheel", {
      rotate: () => -360,
      ease: "none",
      duration: imagez.length,
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 1,
        snap: 1 / imagez.length,
        
      },
    });
    setup();

  }, []);
  

  return (
    <>
      <div ref={containerRef} className="container">
        
        {/* Wrap divs in a container for better styling */}
        <div ref={blueRef} className="box blue"></div>
        <div ref={greenRef} className="box green"></div>
        <div ref={purpleRef} className="box purple"></div>
      </div>

      <div ref={container1Ref} className="contain ">
        
        {/* Wrap divs in a container for better styling */}
        <div className="box bar blue"></div>
        <div className="box bar green"></div>
        <div className="box bar purple"></div>
      </div>
      {/* Wrap divs in a container for better styling */}
      <div className="flex flex-row items-center justify-center min-h-screen">
        <div className="square "></div>
        <div className="square "></div>
        <div className="square "></div>
        <div className="square "></div>
        <div className="square "></div>
        <div className="square "></div>
        <div className="square "></div>
        <div className="square "></div>
        <div className="square "></div>
      </div>

      <div className="min-h-screen flex m-10">
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
        <div className="square1 "></div>
      </div>

      <div className="min-h-screen flex m-10">
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
        <div className="square2 "></div>
      </div>

      <div className="min-h-screen flex m-10">
        <div className="square3 green bg-green-800"></div>
        <div className="square3 purple bg-purple-800"></div>
        <div className="square3 orange bg-orange-800"></div>
      </div>

      <div className="min-h-screen flex m-10">
        <h1 className="vvvv text-5xl font-bold font-mono">Sambhav Jain</h1>
      </div>

      

      <section className="slider-section bg-slate-500">
        <div className="wheel">
        {imagez.map((img , index) => (
            <div className="wheel-card" key={index}> 
            <img src={img} key={index} alt={`Image ${index + 1}`}  width={400} height={600} /></div>
        ))}
        </div>
      </section>
    </>
  );
}
