'use client'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger'; // Import ScrollTrigger from GSAP
import Link from 'next/link';
import Image from 'next/image';
import Imggg from './pixlr-image-generator-5c45d566-5f93-49a0-86dd-b656df768032.png';

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const reff = useRef(null); // Ref for the category container

  useEffect(() => {
    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(category => {
        setCategories(category);
      });

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    // GSAP animation for productCategory div
    categories.forEach((product, index) => {
      const startPosition = index % 2 === 0 ? -100 : 100; // Start position off-screen (left/right)

      const animation = gsap.fromTo(reff.current.children[index], {
        x: startPosition, // Start with div collapsed off-screen
        width: 0 // Start with width collapsed
      }, {
        x: 0, // Animate to the center of the screen
        width: '100%', // Expand the width to fill the screen
        duration: 1, // Add a duration
        ease: "power2.inOut", // Add easing
        scrollTrigger: {
          trigger: reff.current.children[index],
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });

      // Clean up animation when component unmounts
      return () => animation.kill();
    });
  }, [categories]); // Watch for changes in categories array

  // Define an array of background colors
  const colors = ["#ff9999", "#99ff99", "#9999ff", "#ffff99", "#99ffff", "#ff99ff", "#ffcc99", "#ccff99", "#99ccff", "#cc99ff"];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-6xl font-semibold m-8 text-center">Our categories</h1>
      <Image src={Imggg} alt='' className='min-h-screen w-[200vh]'/>
      <div className="gap-4" ref={reff}>
        {categories.map((product, index) => (
          <div key={product._id} className={`flex items-center min-h-screen w-screen productCategory ${index % 2 === 0 ? 'text-center justify-start' : 'text-center justify-end'}`} style={{ backgroundColor: colors[index % colors.length] }}>
            <div>
              <Link href={`/products/${product.name}`}>
                <p className="text-3xl font-bold mb-2 mx-4">{product.name}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
