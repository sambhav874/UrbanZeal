"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import "./style.css";

export default function Test1() {
  const [imagez, setImagez] = useState([]);

  useEffect(() => {
    fetch("/api/carousel")
      .then((res) => res.json())
      .then((carouselImages) => {
        setImagez(carouselImages.images);
        console.log(carouselImages.images);
      })
      .catch((error) => console.error("Error fetching carousel images:", error));
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

        gsap.set(item, {
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
    window.addEventListener("resize", setup);
  }, [imagez]);

  return (
    <div className="body">
      <div className="header">
        <h1>Good Humans</h1>
      </div>
      <section className="slider-section">
        <div className="wheel">
          {imagez.map((img, index) => (
            <div className="wheel-card" key={index}>
              <img src={img.imageUrl} key={index} alt={`Image ${index + 1}`} className="bg-black" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
