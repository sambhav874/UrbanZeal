import React from 'react';
import { cartProductPrice } from '../AppContext';
import Trash from '../icons/Trash';
import Image from 'next/image'; // Import Image from 'next/image'

const CartProduct = ({ products, onRemove }) => {
    return (
        <div className="flex gap-4 mb-4 border-b items-center py-2">
            <div className="w-120">
                <Image src={products.image} width={240} height={180} alt="" />
            </div>
            <h2>{products.name} ${products.price}</h2>
            {products?.size && (
                <div className="text-sm text-gray-400">Size : <span>{products.size.name}</span></div>
            )}

            <div className="text-lg font-semibold">
                Rs.{cartProductPrice(products)}
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
