import React, { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import { toast } from "react-hot-toast";
import StoreItemTile from "./../store/StoreItemTile";
import Image from "next/image";

const StoreItem = (storeItem) => {
  const { image, name, price, description, sizes } = storeItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [showPopUp, setShowPopUp] = useState(false);
  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0;
    if (hasOptions && !showPopUp) {
      setShowPopUp(true);
      return;
    }
      
    addToCart(storeItem, selectedSize);
    setShowPopUp(false);
    toast.success("Product added to Cart !");
  }

  return (
    <>
      {showPopUp && (
        <div onClick={() => setShowPopUp(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div onClick={ev => ev.stopPropagation()} className="flex flex-col p-6 m-3 space-y-10 bg-slate-500 rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16">
            <div className="p-2 mx-1 mt-1 pb-4 space-x-10 items-center flex rounded-xl bg-slate-800">
              <Image
                src={image}
                alt={name + " image"}
                height={200}
                width={350}
                className="mx-auto hover:scale-105 mb-4 w-96 flex bg-white rounded-xl text-white hover:bg-violet-700 duration-1000 hover:bg-animate-pulse shadow-black shadow-2xl"
              />
            </div>
            <div className="flex-col flex space-y-4">
              <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
                <div className="inline-block px-3 py-1 text-sm text-white bg-black rounded-full">
                  Free Shipping
                </div>
                <div className="max-w-sm text-2xl font-medium">{name}</div>
                <div className="flex flex-col mb-2 space-y-3 text-center md:text-left">
                  <p className="text-5xl font-bold">Rs .{price}/-</p>
                  <p className="text-sm font-light text-gray-200 dark:text-black">
                    This offer is available till 7 June or as long as the stock
                    lasts.
                  </p>
                </div>
                <div className="overflow-y-scroll">
                  <p className="text-center text-gray-300 text-md mb-2">{description}</p>
                </div>
                {sizes?.length > 0 && (
                  <div className="text-center md:text-left">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Pick your size
                    </h3>
                    {sizes.map((size, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-2 p-2 border mb-1"
                      >
                        <input 
                          type="radio" 
                          onChange={() => setSelectedSize(size)} // Handle onChange event
                          checked={selectedSize?.name === size.name} 
                          name="size" 
                          className="form-radio" 
                        />
                        <span>{size.name} ${price + size.price}</span>
                      </label>
                    ))}
                  </div>
                )}
                <div className="group">
                  <button onClick={handleAddToCartButtonClick} className="w-full transition-all duration-150 bg-blue-700 text-white border-b-8 border-b-blue-700 rounded-lg group-hover:border-t-8 group-hover:border-b-0 group-hover:bg-blue-700 group-hover:border-t-blue-700 group-hover:shadow-lg">
                    <div className="px-8  duration-150  rounded-lg group-hover:bg-blue-700">
                      Add to Cart {selectedSize && price + selectedSize.price}
                    </div>
                  </button>
                </div>
                <button
                  onClick={() => setShowPopUp(false)}
                  className="flex items-center justify-center border-2 border-gray-300 rounded-lg shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <StoreItemTile onAddToCart={handleAddToCartButtonClick} {...storeItem} />
    </>
  );
};

export default StoreItem;
