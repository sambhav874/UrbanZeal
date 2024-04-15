// Import necessary modules
'use client'
import React, { useEffect, useState } from 'react';
import StoreItem from '../../../../components/store/StoreItem';
import { useParams } from 'next/navigation';

// MenProductPage component
const MenProductPage = () => {
  // State variables
  const [subCategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const { id } = useParams();

  // Fetch subcategories and store items data from API
  useEffect(() => {
    // Fetch subcategories
    fetch('/api/subcategories')
      .then(res => res.json())
      .then(subCategory => {
        setSubCategories(subCategory);
      });

    // Fetch store items
    fetch('/api/store-items')
      .then(res => res.json())
      .then(items => {
        // Filter items based on category and subcategory
        const menItems = items.filter(item => item.category === 'Men' && item.subcategory === id);
        setItems(menItems);
        setFilteredItems(menItems);
      });
  }, []);

  // Handle subcategory filter change
  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    if (subcategory === 'All') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => item.subcategory === subcategory);
      setFilteredItems(filtered);
    }
  };

  // Render MenProductPage
  return (
    <div className="container mx-auto mt-8 flex">
      {/* Sidebar for sorting and filtering */}
      <div className="w-1/4 p-4 border-r">
        {/* Subcategory filter */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Filter by Subcategory</h2>
          <ul>
            <li className={selectedSubcategory === 'All' ? 'text-blue-600 font-semibold cursor-pointer' : 'cursor-pointer'} onClick={() => handleSubcategoryChange('All')}>All</li>
            {subCategories.map(subcategory => (
              <li key={subcategory} className={selectedSubcategory === subcategory ? 'text-blue-600 font-semibold cursor-pointer' : 'cursor-pointer'} onClick={() => handleSubcategoryChange(subcategory)}>{subcategory}</li>
            ))}
          </ul>
        </div>
        {/* Sorting options */}
        <div>
          <h2 className="text-xl font-semibold my-4">Sort by</h2>
          <select className="w-full px-4 py-2 border rounded-md">
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      {/* Display items */}
      <div className="w-3/4 p-4">
        <h1 className="text-3xl font-semibold mb-4">Men's Products</h1>
        {/* Display items in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredItems.length > 0 ? (
            // Map through items and display StoreItem component
            filteredItems.map(item => (
              <StoreItem key={item._id} {...item} />
            ))
          ) : (
            // Render a message if no items found
            <p className="text-gray-600">No items found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenProductPage;
