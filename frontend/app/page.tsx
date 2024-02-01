"use client"
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Carousel from '../components/Carousel';
import {carouselImages} from '../app/data/carouselPhotos'

 // Import Footer component

const HomePage = () => {
  
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
        <Carousel images={carouselImages} />
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

      {/* Footer */}
       {/* Use Footer component */}
    </div>
  );
};

export default HomePage;
