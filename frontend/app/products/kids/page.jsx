'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CarouselKids from '../../../components/carouselKids';
import { kidsCarouselImages } from '../../data/kidsCarousel';
import { freshArrivalsMen } from '../../data/menProducts';
import StoreItem from '../../../components/store/StoreItem';

const Kids = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/subcategories')
      .then(res => res.json())
      .then(subCategory => {
        
        const  subCatArray = subCategory.filter(subcat =>  subcat.parentCategory === 'Kids');
        setSubCategories(subCatArray);
      });

      fetch('/api/store-items')
      .then(res => res.json())
      .then(items => {
        // Filter items with category 'Men'
        const kidsItems = items.filter(item => item.category === 'Kids' ); 
        setItems(kidsItems.slice(-5));
      });
  

  }, []);

  

  return (
    <div className="container mx-auto mt-8">
      <div className="text-3xl font-bold mb-4">Kids</div>
      <CarouselKids images={kidsCarouselImages} />

      <h1 className="text-3xl font-semibold mb-4">Our categories</h1>
      <div className="grid grid-cols-3 gap-4">
        {subCategories.map(subcategory => (
          <div key={subcategory._id}>
            <Link href={`/products/Kids/${subcategory.name}`} >
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

export default Kids;
