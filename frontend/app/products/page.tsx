// frontend/pages/ProductPage.tsx

import { products } from '../data/products';
import ProductCard from '../../components/productCard';
import Link from 'next/link';

const ProductPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Our Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
