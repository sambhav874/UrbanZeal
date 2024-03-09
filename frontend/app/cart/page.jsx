'use client'
import { CartContext } from "../../components/AppContext";
import { useContext } from "react";
import Image from "next/image";

const CartPage = () => {
    const { cartProducts } = useContext(CartContext);
  
    return (
      <section className="my-8">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold">Cart</h1>
        </div>
  
        <div className="grid grid-cols-4 gap-4">
          <div className="">
            {cartProducts.length === 0 ? (
              <div>No products in the cart.</div>
            ) : (
              cartProducts.map((products) => (
                <div key={products.id} className="flex gap-4 mb-4 border-b items-center py-4">
                    <div className="w-120">
                        <Image src={products.image} width={240} height={180} alt="" />
                        </div>  {/* Add unique key for each product */}
                        <h2>{products.name}</h2>
                        {products?.size && (
                            <div className="text-sm text-gray-400">Size : <span>{products.size.name}</span></div>
                        )}
                  
                </div>
              ))
            )}
          </div>
          <div>Right </div>
        </div>
      </section>
    );
  };
  
  export default CartPage;
  