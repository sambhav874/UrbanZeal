'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Carousel from '../../../components/Carousel';

import StoreItem from '../../../components/store/StoreItem';

const Women = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [carousel , setCarousel] = useState([]);

  useEffect(() => {
    fetch('/api/subcategories')
      .then(res => res.json())
      .then(subCategory => {
        setSubCategories(subCategory);
      });

      fetch('/api/store-items')
      .then(res => res.json())
      .then(items => {
        // Filter items with category 'Men'
        const menItems = items.filter(item => item.category === 'Women' ); 
        setItems(menItems.slice(-5));
      });
  
      fetch('/api/carousel')
  .then(res => res.json())
  .then(carouselImages => {
    const womenImages = carouselImages.womenImages.map(womenImage => womenImage.womenImageUrl);
    console.log(womenImages); 
    setCarousel(womenImages);
  })
  .catch(error => console.error('Error fetching men images:', error));



  }, []);

  

  return (
    <div className="container mx-auto mt-8">
      <div className="text-3xl font-bold mb-4">Women</div>
      <Carousel images={carousel} />

      <h1 className="text-3xl font-semibold mb-4">Our categories</h1>
      <div className="grid grid-cols-3 gap-4">
        {subCategories.map(subcategory => (
          <div key={subcategory._id}>
            <Link href={`/products/Women/${subcategory.name}`} >
              <div className="border border-gray-200 rounded-md overflow-hidden shadow-md w-full">
                <img src={subcategory.image} alt={subcategory.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{subcategory.name}</h3>
                  <p className="text-gray-600 mb-2">{subcategory.description}</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">View Products</button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Store Items */}
      <div className="text-3xl font-bold mb-4">Store Items</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map(product => (
          <StoreItem key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Women;
