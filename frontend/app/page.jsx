"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Carousel from '../components/Carousel';
import StoreItem from '../components/store/StoreItem';


const HomePage = () => {
  const [carousel, setCarousel] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Fetch featured products
    fetch('/api/store-items')
      .then(res => res.json())
      .then(storeItems => {
        setFeaturedProducts(storeItems.slice(0, 6)); // Show first 6 items
      })
      .catch(error => console.error('Error fetching store items:', error));

    // Fetch carousel images
    fetch('/api/carousel')
      .then(res => res.json())
      .then(carouselImages => {
        const images = carouselImages.images.map(image => image.imageUrl);
        setCarousel(images);
      })
      .catch(error => console.error('Error fetching carousel images:', error));

    // Fetch testimonials
    
  }, []);

  return (
    <div className="bg-white">
      <Head>
        <title>UrbanZeal | Home</title>
        <meta name="description" content="Welcome to UrbanZeal - Explore our latest collection of clothing." />
      </Head>

      {/* Hero section with Carousel */}
      <div className="container mx-auto py-12 px-4 text-gray-800">
        <h1 className="text-4xl font-bold mb-6">Welcome to UrbanZeal</h1>
        <p className="text-lg mb-8">Discover the latest trends in fashion.</p>

        <Carousel images={carousel} />
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts?.map(product => <StoreItem key={product._id} {...product} />)}
        </div>
      </div>

      {/* Explore Collections */}
<div className="bg-gray-100 py-12">
  <div className="container mx-auto px-4">
    <h2 className="text-2xl font-bold mb-6">Explore Collections</h2>
    {/* Add links to different clothing collections */}
    <div className="flex flex-wrap justify-center gap-6">
      <Link href="/products">
        <button className="text-lg font-medium text-gray-800 hover:text-gray-900 focus:outline-none">
          Men's Collection
        </button>
      </Link>
      <Link href="/products">
        <button className="text-lg font-medium text-gray-800 hover:text-gray-900 focus:outline-none">
          Women's Collection
        </button>
      </Link>
      <Link href="/products">
        <button className="text-lg font-medium text-gray-800 hover:text-gray-900 focus:outline-none">
          Kids' Collection
        </button>
      </Link>
    </div>
  </div>
</div>

      {/* Testimonials */}
      

      {/* Call-to-action button */}
      <div className="container mx-auto px-4 py-12 text-center">
        <Link href="/products" className='text-white bg-blue-500 hover:bg-blue-600 py-3 px-8 rounded-md font-bold inline-block'>
          
            Explore More
          
        </Link>
      </div>

      {/* Footer */}
      {/* Use Footer component */}
    </div>
  );
};

export default HomePage;
