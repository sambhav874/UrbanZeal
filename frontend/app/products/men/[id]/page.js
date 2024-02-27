
'use client'
import React, { useEffect, useState } from 'react';
import StoreItem from './../../../../components/store/StoreItem'; // Assuming this is your StoreItem component
import { useParams } from 'next/navigation';

const MenProductPage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);
    const {id} = useParams();
    
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
        const menItems = items.filter(item => item.category === 'Men' && item.subcategory === id);
        setItems(menItems);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Men's Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {items.length > 0 && items.map(item => (
          <StoreItem key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default MenProductPage;
