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
      const width1 = window.innerWidth;
      const direction = index % 2 === 0 ? 1 : -1; // Alternate animation direction
      gsap.to(reff.current.children[index], {
        x: direction * (width1 / 2),
        duration: 1, // Add a duration
        ease: "power2.inOut", // Add easing
        scrollTrigger: {
          trigger: reff.current.children[index],
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });
      
    });
  }, [categories]); // Watch for changes in categories array

  // Define an array of background colors
  const colors = ["#ff9999", "#99ff99", "#9999ff", "#ffff99", "#99ffff", "#ff99ff", "#ffcc99", "#ccff99", "#99ccff", "#cc99ff"];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-6xl font-semibold m-8 text-center">Our categories</h1>
      <Image src={Imggg} width={64} height={64} alt='' className='min-h-screen min-w-screen'/>
      <div className="gap-4" ref={reff}>
        {categories.map((product, index) => (
          <div key={product._id} className={`min-h-screen flex items-center productCategory ${index % 2 === 0 ? 'text-right' : 'text-left'}`} style={{ backgroundColor: colors[index % colors.length] }}>
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
