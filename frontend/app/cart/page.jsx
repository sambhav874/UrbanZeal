'use client'
import { CartContext, cartProductPrice } from "../../components/AppContext";
import { useContext } from "react";
import Image from "next/image";
import Trash from './../../components/icons/Trash'

const CartPage = () => {
    const { cartProducts , removeCartProduct } = useContext(CartContext);
    let total = 0 ;
    for (const product of cartProducts){
        total += cartProductPrice(product);
    }
  
    return (
      <section className="my-8">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold">Cart</h1>
        </div>
  
        <div className="mt-8 grid gap-8 grid-cols-2">
          <div>
            {cartProducts.length === 0 ? (
              <div>No products in the cart.</div>
            ) : (
              cartProducts.map((products , index) => (
                <div  className="flex gap-4 mb-4 border-b items-center py-2">
                    <div className="w-120">
                        <Image src={products.image} width={240} height={180} alt="" />
                        </div>  {/* Add unique key for each product */}
                        <h2>{products.name} ${products.price}</h2>
                        {products?.size && (
                            <div className="text-sm text-gray-400">Size : <span>{products.size.name}</span></div>
                        )}

<div className="text-lg font-semibold">
                    Rs.{cartProductPrice(products)}
                     </div>

                     <div className="ml-2">
                    <button className="p-2" onClick={() =>removeCartProduct(index)}>
                            <Trash />
                    </button>
                     </div>
                  
                </div>

                
              ))
            )}
            <div className="py-4 text-right pr-16">
                <span className="text-gray-500">Subtotal :</span>
            <span className="text-lg font-semibold">Rs.{total}</span> </div>
          </div>
          <div className="bg-gray-300 p-4 m-4 rounded-lg duration-1000 hover:bg-gray-200"> <h2>Checkout</h2> 
        <form>

            <button type="submit" className="text-slate-700 p-2">
                Pay Rs.{total}/-
            </button>
        </form>
          
          </div>
        </div>
      </section>
    );
  };
  
  export default CartPage;
  