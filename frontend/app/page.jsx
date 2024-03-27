"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Carousel from '../components/Carousel';
import StoreItemTile from '../components/store/StoreItemTile';
import Header from '../components/header/page';
import Featured from './../components/featured/page'
import Collection from './../components/collections/page';
import Gallery from './../components/test/page';
import dynamic from 'next/dynamic'


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
        console.log(images)
      })
      .catch(error => console.error('Error fetching carousel images:', error));

  }, []);

  return (
    <div className="bg-white">
      <Head>
        <title>UrbanZeal | Home</title>
        <meta name="description" content="Welcome to UrbanZeal - Explore our latest collection of clothing." />
      </Head>

      {/* Hero section with Carousel */}
      <Header />
      <div className=" bg-red-300 mx-auto py-12 px-4 text-gray-800">
      
        <Carousel images={carousel} />
      </div>

      <Featured featuredProducts={featuredProducts} />


      <Gallery />
      

      {/* Explore Collections */}
<div className="bg-gray-100 py-12">
  
    
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
  );
};

export default HomePage;
