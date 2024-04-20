'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import StoreItem from '../../../../components/store/StoreItem'; // Assuming this is your StoreItem component

const MenProductPage = () => {
  const [items, setItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const { id } = useParams();
  const [banner , setBanner] = useState('');
  console.log(id)

  useEffect(() => {
    fetch('/api/store-items')
      .then(res => res.json())
      .then(items => {
        const menItems = items.filter(item => item.category === 'Men' && item.subcategory === id);
        setItems(menItems);
        
        setSortedItems(menItems); // Initialize sorted items with the original items

        // Fetch subcategory details (if available)
        
        fetch(`/api/subcategories`) // Fetch all subcategories
  .then(res => res.json())
  .then(subcategories => {
    
      const menSubcategory = subcategories.filter(subcategory => subcategory.parentCategory === "Men" && subcategory.name === id);
      console.log(menSubcategory);
      
        const head = menSubcategory[0].image;
        
        setBanner(head);
      
    }
  )
  .catch(error => console.error('Error fetching subcategories:', error));

        }
      );
  }, []);

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
    <div className="max-w-4xl  m-8">
      {/* Banner or Hero Image */}
      <div className="relative my-8">
        <img
          className="w-full h-64 object-cover rounded-lg shadow-md banner-image" 
          src={banner} 
          alt="Men's Subcategory"
        />
         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 ">
    <h1 className="text-4xl font-bold text-white opacity-100">Men's {id} Collection</h1>
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
      <div className="flex flex-wrap justify-center gap-4">
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

export default MenProductPage;
