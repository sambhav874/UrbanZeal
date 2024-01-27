"use client"

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/navbar';


const HomePage = () => {
  // Array of slide content
  const slides = ["Slide 1", "Slide 2", "Slide 3"];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div>
      <Head>
        <title>UrbanZeal | Home</title>
        <meta name="description" content="Welcome to UrbanZeal - Explore our latest collection of clothing." />
      </Head>
      
      <div className="container mx-auto py-12 px-4 text-white">
        <h1 className="text-4xl font-bold mb-6">Welcome to UrbanZeal</h1>
        <p className="text-lg mb-6">Explore our latest collection of clothing.</p>

        {/* Carousel */}
        <div className="mb-10 relative overflow-hidden">
          <div className="carousel-inner" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className="carousel-item">{slide}</div>
            ))}
          </div>
          <button className="carousel-control prev" onClick={prevSlide}>&#10094;</button>
          <button className="carousel-control next" onClick={nextSlide}>&#10095;</button>
        </div>

        {/* Featured Products */}
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-3 gap-6">
          {/* Replace the following divs with your featured product components */}
          <div className="bg-gray-700 p-5 rounded-md shadow-md">Featured Product 1</div>
          <div className="bg-gray-700 p-5 rounded-md shadow-md">Featured Product 2</div>
          <div className="bg-gray-700 p-5 rounded-md shadow-md">Featured Product 3</div>
        </div>

        {/* Call-to-action button */}
        <Link href="/products" className="block text-center bg-blue-500 text-white px-6 py-3 rounded-md mt-8 hover:bg-blue-600">
           View All Products
        </Link>
      </div>

      {/* Footer */}
      <footer className="footer bg-gray-900 py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h2 className="text-lg font-bold mb-4">Quick Links</h2>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-4">Categories</h2>
              <ul>
                <li><Link href="/products/men">Men</Link></li>
                <li><Link href="/products/women">Women</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-4">Follow Us</h2>
              {/* Add social media icons or links */}
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} UrbanZeal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
