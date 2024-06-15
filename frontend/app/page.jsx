"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Carousel from '../components/Carousel';
import StoreItemTile from '../components/store/StoreItemTile';
import Header from '../components/header/page';
import Featured from './../components/featured/page'
import Collection from './../components/collections/page';




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
    <div className="bg-white overflow-hidden">
      <Head>
        <title>UrbanZeal | Home</title>
        <meta name="description" content="Welcome to UrbanZeal - Explore our latest collection of clothing." />
      </Head>

      {/* Hero section with Carousel */}
      <Header />
      <div className=" bg-black  mx-auto py-20 px-8 text-gray-800">
      
        <Carousel images={carousel} />
      </div>

      <Featured featuredProducts={featuredProducts} />


<Collection />

    </div>
  );
};

export default HomePage;
