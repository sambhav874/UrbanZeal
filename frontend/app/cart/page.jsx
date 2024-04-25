'use client'
import React, { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import AddressInputs from './../../components/layout/AddressInputs';
import Trash from './../../components/icons/Trash';
import { useProfile } from './../../components/UseProfile';
import CartProduct from './../../components/store/CartProduct';
import { CartContext, cartProductPrice } from "../../components/AppContext";
import './style.css'

const CartPage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.href.includes('canceled=1')) {
      toast.error('Payment failed 😔');
    }
  }, []);

  const [address, setAddress] = useState({});
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (profileData?.city) {
      const { phoneNumber, streetAddress, city, pincode, country } = profileData;
      setAddress({ phoneNumber, streetAddress, city, pincode, country });
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

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ address, cartProducts }),
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

  // Define the custom font style
  const customFontStyle = {
    fontFamily: 'Bai Jamjuree, sans-serif' // Use the imported font name here
  };

  return (
    <section className="my-8">
      <div style={customFontStyle} className="text-center">
        
        <h1  className=" text-4xl font-bold tracking-wide text-black ">Cart</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-md overflow-y-auto max-h-screen p-4">
          {cartProducts?.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              Your cart is empty.
            </div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
            <CartProduct key={index} product={product} onRemove={removeCartProduct} />
          ))}
        </div>

        {/* Fixed Summary and Checkout Section */}
        <div className="sticky top-0 h-full bg-white rounded-lg shadow-md p-4 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">Subtotal :</span>
            <span className="text-lg font-semibold text-gray-800">Rs.{subtotal}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Delivery :</span>
            <span className="text-lg font-semibold text-gray-800">Rs30</span>
          </div>
          <hr className="my-4 border-gray-200" />
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs addressProps={address} setAddressProps={handleAddressChange} />
            <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Pay Rs. {subtotal + 30}/-
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
