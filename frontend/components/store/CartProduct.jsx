import React from 'react';
import { cartProductPrice } from '../AppContext';
import Trash from '../icons/Trash';
import Image from 'next/image';

const CartProduct = ({ product, onRemove }) => {
  if (!product || !product.image) {
    return null; // Return null if product or image is undefined
  }

  // Check if product image is an array
  const imageSrc = Array.isArray(product.image) ? product.image[0] : product.image;

  return (
    <div className="flex gap-4 mb-4 border-b items-center py-2">
      <div className="w-120">
        <Image src={imageSrc} width={240} height={180} alt="" />
      </div>
      <h2>{product.name} ${product.price}</h2>
      {product?.size && (
        <div className="text-sm text-gray-400">Size : <span>{product.size.name}</span></div>
      )}

      <div className="text-lg font-semibold">
        Rs.{cartProductPrice(product)}
      </div>
      {!!onRemove && (
        <div className="ml-2">
          <button className="p-2" onClick={() => onRemove(index)}>
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}

export default CartProduct;
