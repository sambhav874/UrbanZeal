"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CarouselMen from '../../../components/carouselMen';
import { menCarouselImages } from '../../data/menCarousel';
import { clothingCategories } from '../../data/menCategories';
import { freshArrivalsMen } from '../../data/menProducts';
import StoreItem from '../../../components/store/StoreItem';

const Men = () => {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    fetch('/api/subcategories')
      .then(res => res.json())
      .then(subCategory => {
        setSubCategories(subCategory);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Our categories</h1>
      <div className="grid grid-cols-3 gap-4">
        {subCategories.map(subcategory => (
          <div key={subcategory._id}>
            <Link href={`/products/Men/${subcategory._id}`}>
              <p className="text-xl font-semibold mb-2">{subcategory.name}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="mx-[5%] px-2 py-8">
        {/* Clothing Categories */}
        <div className="text-3xl font-bold mb-4">Mens</div>
        <CarouselMen images={menCarouselImages} /> {/* Use CarouselMen component */}
        <h2 className="text-xl font-bold mb-4">Clothing Categories</h2>
        <div className="mb-8 overflow-x-auto scrolling-wrapper">
          <div className="flex flex-nowrap">
            {clothingCategories.map(category => (
              <div key={category.id} className="flex-none border border-gray-200 rounded-md overflow-hidden shadow-md w-1/3 mr-4">
                <img src={category.image} width={32} height={32} alt={category.name} className="w-32 h-64 " />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-2">{category.description}</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">View Products</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fresh Arrivals */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Fresh Arrivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {freshArrivalsMen.map(product => (
              <div key={product.id} className="border border-gray-200 rounded-md overflow-hidden shadow-md w-full">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-lg font-semibold">${product.price}</p>
                  <Link className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600" href={`/products/${product.id}`}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Men;
