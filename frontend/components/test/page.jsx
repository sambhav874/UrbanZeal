'use client'
import React, { useState, useEffect , useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useOnScreen from "./hooks/useOnScreen";
import cn from "classnames";
import "./style.scss"; // Assuming style.scss defines styles

function GalleryItem({ imageUrl, updateActiveImage, index }) {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref, 0.5);

  useEffect(() => {
    if (onScreen) {
      updateActiveImage(index);
    }
  }, [onScreen, index]);

  return (
    <div
      className={cn("gallery-item-wrapper", { "is-reveal": onScreen })}
      ref={ref}
    >
      <div></div>
      <div className={"gallery-item"} > 
        <div className="gallery-item-info">
          <div className="gallery-info-title">Collection</div>
        </div>
        <div
          className="gallery-item-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </div>
      <div></div>
    </div>
  );
}

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(1);
  const ref = useRef(null);

  useEffect(() => {
    // Ensure GSAP plugins are registered
    gsap.registerPlugin(ScrollTrigger);

    // Fetch carousel images
    fetch('/api/carousel')
      .then(res => res.json())
      .then(carouselImages => {
        const fetchedImages = carouselImages.images.map(image => ({
          imageUrl: image.imageUrl,
        }));
        setImages(fetchedImages);
      })
      .catch(error => console.error('Error fetching carousel images:', error));
  }, []);

  useEffect(() => {
    if (ref.current) {
      const sections = gsap.utils.toArray(".gallery-item-wrapper");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          start: "top top",
          trigger: ref.current,
          scroller: "#main-container",
          pin: true,
          scrub: 0.5,
          snap: 1 / (sections.length - 1),
          end: () => `+=${ref.current.offsetWidth}`,
        },
      });

      ScrollTrigger.refresh();
    }
  }, [images]); // Ensure the effect runs when images change

  const handleUpdateActiveImage = (index) => {
    setActiveImage(index + 1);
  };

  return (
    <section data-scroll-section className="section-wrapper gallery-wrap">
      <div className="gallery" ref={ref}>
        <div className="gallery-counter">
          <span>{activeImage}</span>
          <span className="divider" />
          <span>{images.length}</span>
        </div>
        {images.map((image, index) => (
          <GalleryItem
            key={image.imageUrl}
            index={index}
            {...image}
            updateActiveImage={handleUpdateActiveImage}
          />
        ))}
      </div>
    </section>
  );
}
