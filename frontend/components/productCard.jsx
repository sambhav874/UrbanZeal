// frontend/components/ProductCard.tsx

import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-md p-4 shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-500">{product.description}</p>
      <p className="text-lg font-semibold mt-2">${product.price}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
