
'use client'
import React, { useEffect, useState } from 'react';
import StoreItem from '../../../../components/store/StoreItem'; // Assuming this is your StoreItem component
import { useParams } from 'next/navigation';

const WomenProductPage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const { id } = useParams();
  const [banner, setBanner] = useState('');

  useEffect(() => {
    fetch('/api/subcategories')
      .then(res => res.json())
      .then(subCategory => {
        setSubCategories(subCategory);
      });

    fetch('/api/store-items')
      .then(res => res.json())
      .then(items => {
        // Filter items with category 'Women'
        const womenItems = items.filter(item => item.category === 'Women' && item.subcategory === id);
        setItems(womenItems);
        setSortedItems(womenItems); // Initialize sorted items with the original items
      });

    // Fetch subcategory details (if available)
    fetch(`/api/subcategories`)
      .then(res => res.json())
      .then(subcategories => {
        const womenSubcategory = subcategories.filter(subcategory => subcategory.parentCategory === "Women" && subcategory.name === id);
        const head = womenSubcategory[0].image;
        setBanner(head);
      })
      .catch(error => console.error('Error fetching subcategories:', error));
  }, [id]);

  const handleSortChange = (sortBy) => {
    let sorted;
    if (sortBy === 'price') {
      sorted = [...items].sort((a, b) => a.price - b.price); // Sort by price
    } else if (sortBy === 'name') {
      sorted = [...items].sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
    }
    setSortedItems(sorted);
  };

  return (
    <div className="max-w-4xl mx-auto m-8">
      <div className="relative my-8">
        {/* Banner or Hero Image */}
        <img
          className="w-full h-64 object-cover rounded-lg shadow-md banner-image"
          src={banner}
          alt="Women's Subcategory"
        />
        {/* Overlay with text */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <h1 className="text-4xl font-bold text-white opacity-100">Women's {id} Collection</h1>
        </div>
      </div>

      {/* Sorting options */}
      <div className="flex justify-between items-center my-4">
        <h2 className="text-xl font-semibold my-3">Sort by</h2>
        <select
          className="text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Display items */}
      <div className="flex flex-wrap justify-center  gap-4">
        {sortedItems.length > 0 ? (
          sortedItems.map(item => (
            <StoreItem key={item._id} {...item} />
          ))
        ) : (
          <p className="text-gray-600 text-center">No items found</p>
        )}
      </div>
    </div>
  );
};

export default WomenProductPage;
