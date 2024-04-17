// Import necessary modules
'use client'
// Import necessary modules
import React, { useEffect, useState } from 'react';
import StoreItem from '../../../../components/store/StoreItem'; // Assuming this is your StoreItem component
import { useParams } from 'next/navigation';

// MenProductPage component
const MenProductPage = () => {
  // State variables
  const [items, setItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const { id } = useParams();

  // Fetch store items data from API
  useEffect(() => {
    // Fetch store items
    fetch('/api/store-items')
      .then(res => res.json())
      .then(items => {
        // Filter items based on category and subcategory
        const menItems = items.filter(item => item.category === 'Men' && item.subcategory === id);
        setItems(menItems);
        setSortedItems(menItems); // Initialize sorted items with the original items
      });
  }, []);

  // Handle sorting option change
  const handleSortChange = (sortBy) => {
    let sorted;
    if (sortBy === 'price') {
      sorted = [...items].sort((a, b) => a.price - b.price); // Sort by price
    } else if (sortBy === 'name') {
      sorted = [...items].sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
    }
    setSortedItems(sorted);
  };

  // Render MenProductPage
  return (
    <div className="container mx-auto mt-8">
      {/* Sorting options */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Sort by</h2>
        <select className="w-full px-4 py-2 border rounded-md" onChange={(e) => handleSortChange(e.target.value)}>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>
      {/* Display items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedItems.length > 0 ? (
          // Map through sorted items and display StoreItem component
          sortedItems.map(item => (
            <StoreItem key={item._id} {...item} />
          ))
        ) : (
          // Render a message if no items found
          <p className="text-gray-600">No items found</p>
        )}
      </div>
    </div>
  );
};

export default MenProductPage;
