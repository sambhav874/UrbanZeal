// carouselMen.jsx (or whatever filename you prefer)
import React, { useState, useEffect } from 'react';

const CarouselMen = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slides every 5 seconds

    return () => clearInterval(timer); // Cleanup the timer
  }, [currentSlide]);

  return (
    <div className="relative w-full">
      {/* Carousel wrapper */}
      <div className="relative h-96 overflow-hidden rounded-lg">
        {images.map((slide, index) => (
          <div key={index} className={`carousel-item ${index === currentSlide ? 'block' : 'hidden'}`}>
            <img src={slide} className="absolute inset-0 w-full h-full object-cover" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      {/* Slider controls */}
      <button className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 focus:outline-none" onClick={prevSlide}>&#10094;</button>
      <button className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 focus:outline-none" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default CarouselMen;
