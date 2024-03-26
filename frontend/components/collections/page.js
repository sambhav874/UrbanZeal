import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Controller, Scene } from 'scrollmagic';

export default function Collection({ images }) {
  const [imageIndex, setImageIndex] = useState(0);
  const divRef = useRef(null);
  const controller = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      controller.current = new Controller();
    }

    return () => {
      if (controller.current) {
        controller.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && divRef.current) {
      const newScene = new Scene({
        triggerElement: divRef.current,
        duration: '20%',
        triggerHook: 0.9,
        reverse: true, // Revert animation when scrolling back up
        offset: 100, // Offset for trigger position
        onEnter: () => {
          setImageIndex((prevIndex) => {
            if (prevIndex < images.length - 1) {
              return prevIndex + 1;
            } else {
              return 0;
            }
          });
        },
      });

      newScene.addTo(controller.current);

      return () => {
        if (newScene) {
          newScene.destroy();
        }
      };
    }
  }, [images]);

  return (
    <section className="py-12 bg-gray-100 header-container min-h-screen flex justify-center items-center">
      <div className="text-center mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 header-menu">Explore Our Collection</h2>
        <div ref={divRef} >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className={`w-full object-cover absolute top-0 left-0 opacity-0 ${
                index === imageIndex ? 'opacity-100' : ''
              }`}
            />
          ))}
          <Link href="/products" className=" bg-gradient-to-r from-purple-600 to-indigo-600 hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 py-3 px-8 rounded-full text-lg font-bold shadow-md transition duration-300 ease-in-out transform hover:scale-105 absolute bottom-0 right-0 mb-4 mr-4">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
