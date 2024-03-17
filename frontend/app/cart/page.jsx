'use client'

import { CartContext, cartProductPrice } from "../../components/AppContext";
import { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast'
import Image from "next/image";
import AddressInputs from './../../components/layout/AddressInputs'
import Trash from './../../components/icons/Trash'
import { useProfile } from './../../components/UseProfile'
import CartProduct from './../../components/store/CartProduct'

const CartPage = () => {


    useEffect(() => {
        if (typeof window !== 'undefined') {
          if (window.location.href.includes('canceled=1')) {
            toast.error('Payment failed 😔');
          }
        }
      }, []);
    



  const [address, setAddress] = useState({});
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (profileData?.city) {
      const { phoneNumber, streetAddress, city, pincode, country } = profileData; // 
      const addressFromProfile = {  phoneNumber, streetAddress, city, pincode, country };
      setAddress(addressFromProfile);
    }
  }, [profileData]);
  
  
  let subtotal = 0;
  if (cartProducts && cartProducts.length > 0) {
    
    for (const product of cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }
  

  function handleAddressChange(propName, value) {
    setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    
    // address and shopping cart products

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
        
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something went wrong... Please try again later',
    })
  }

  console.log({ cartProducts });
  return (
    <section className="my-8">
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold">Cart</h1>
      </div>

      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && ( // Use optional chaining for safety
            <div>No products in the cart.</div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((products, index) => (
            <CartProduct  onRemove={removeCartProduct} products={products} />
          ))}
          <div className="py-4 text-right pr-16">
            <span className="text-gray-500">Subtotal :</span>
            <span className="text-lg font-semibold">Rs.{subtotal}</span> </div>
          <div className="py-4 text-right pr-16">
            <span className="text-gray-500">Delivery :</span>
            <span className="text-lg font-semibold">Rs.30</span> </div>
        </div>
        <div className="bg-gray-300 p-4 m-4 rounded-lg duration-1000 hover:bg-gray-200"> <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>

            <AddressInputs addressProps={address} setAddressProps={handleAddressChange} />
            <button type="submit"  className="text-slate-700 p-2">
              Pay Rs.{subtotal + 30}/-
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default CartPage;
