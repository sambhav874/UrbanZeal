'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Carousel from '../../../components/Carousel';
import StoreItem from '../../../components/store/StoreItem';
import '../style.css'; // Import your stylesheet

const Men = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/subcategories')
      .then(res => res.json())
      .then(subCategory => {
        const subCatArray = subCategory.filter(subcat => subcat.parentCategory === 'Men');
        setSubCategories(subCatArray);
      });

    fetch('/api/store-items')
      .then(res => res.json())
      .then(items => {
        // Filter items with category 'Men'
        const menItems = items.filter(item => item.category === 'Men');
        setItems(menItems.slice(-5)); // Assuming you want the latest 5 items
      });

    fetch('/api/carousel')
      .then(res => res.json())
      .then(carouselImages => {
        const menImages = carouselImages.menImages.map(menImage => menImage.menImageUrl);
        setCarousel(menImages);
      })
      .catch(error => console.error('Error fetching men images:', error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 text-center"> {/* Use 'use client' here if needed */}
      <div className="text-4xl font-bold mb-8 store">Men</div>
      <Carousel images={carousel} />

      <h2 className="text-3xl font-semibold store my-12">Our categories</h2>
      <div className="grid grid-cols-3 gap-8">
        {subCategories.map(subcategory => (
          <div key={subcategory._id}>
            <Link href={`/products/Men/${subcategory.name}`}>
              <div className="border border-gray-200 rounded-md overflow-hidden shadow-md p-4">
                <img src={subcategory.image} alt={subcategory.name} className="w-full h-60 object-cover" />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">{subcategory.name}</h3>
                  <p className="text-gray-700 mb-2">{subcategory.description}</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600">View Products</button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-3xl font-bold font-serif mt-12 mb-6 store">Store Items</div>
      <div className="flex flex-row overflow-scroll m-2">
        {items.map(product => (
          <div className="p-4 store">
            <StoreItem key={product._id} {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Men;