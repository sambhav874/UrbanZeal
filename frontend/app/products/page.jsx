'use client'
import { products } from '../data/products';
import ProductCard from '../../components/productCard';
import Link from 'next/link';
import StoreItem from '../../components/store/StoreItem';
import { useEffect, useState } from 'react';

const ProductPage = () => {

  const [categories , setCategories] = useState([]);
  const [items , setItems] = useState([]);

  useEffect(() => {


    fetch('/api/categories').then(res => res.json().then(category => {
      setCategories(category);
    }))

    fetch('/api/store-item').then(res => res.json().then(item => {
      setItems(item);
    }))


  } , [])
  

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Our categories</h1>
      <div className="grid grid-cols-3 gap-4">
        {categories.map(product => (
          
          <div key={product._id}  > 
          <Link href={`/products/${product.name}`}>
              <p className="text-xl font-semibold mb-2">{product.name}</p>
            </Link>
              </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
