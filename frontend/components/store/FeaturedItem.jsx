import { useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { CartContext } from '../AppContext';
import FeaturedItemTile from './../store/FeaturedItemTile';

const FeaturedItem = (storeItem) => {
  const { image, name, price, description, sizes, category } = storeItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Manage the current index of the image being displayed
  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    if (!showPopUp) {
      setShowPopUp(true);
    } else {
      addToCart(storeItem, selectedSize);
      setShowPopUp(false);
      toast.success('Product added to Cart!');
    }
  }

  function prevSlide() {
    setCurrentImageIndex((prevIndex) => {
      // Ensure index doesn't go below 0
      return prevIndex === 0 ? image.length - 1 : prevIndex - 1;
    });
  }

  function nextSlide() {
    setCurrentImageIndex((prevIndex) => {
      // Ensure index doesn't exceed image length
      return prevIndex === image.length - 1 ? 0 : prevIndex + 1;
    });
  }

  return (
    <>
      {showPopUp && (
        <div onClick={() => setShowPopUp(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div onClick={ev => ev.stopPropagation()} className="flex z-40 flex-col p-4 m-2 space-y-8 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-8 md:m-0 md:p-10 max-w-3xl">
            <div className="relative z-50 hover:scale-105  bg-white rounded-xl text-white duration-1000 hover:bg-animate-pulse shadow-black shadow-lg overflow-hidden" style={{ width: 350 }}>
              {/* Left button as carousel control */}
              <button onClick={prevSlide} className="absolute top-1/2 left-4 z-50 transform -translate-y-1/2 -translate-x-1/2 focus:outline-none border-none" >&#10094;</button>
              {/* Right button as carousel control */}
              <button onClick={nextSlide} className="absolute top-1/2 right-4 z-50 transform -translate-y-1/2 translate-x-1/2 focus:outline-none border-none" >&#10095;</button>
              {/* Image */}
              <img src={image[currentImageIndex]} alt={name + ' image'} className="w-full h-full rounded-xl" />
            </div>
            <div className="flex-col  space-y-4">
              <div className="flex-col mb-4 space-y-3 text-center md:text-left">
                <div className="inline-block px-3 py-1 text-sm text-white bg-black rounded-full">
                  {category}
                </div>
                <div className="max-w-sm text-2xl font-medium">{name}</div>
                <div className="flex flex-col mb-2 space-y-3 text-center md:text-left">
                  <p className="text-5xl font-bold">Rs .{price}/-</p>
                  <p className="text-sm font-light text-gray-200 dark:text-black">{description}</p>
                </div>
                {sizes?.length > 0 && (
                  <div className="text-center md:text-left">
                    <h3 className="text-sm font-semibold text-gray-700">Pick your size</h3>
                    {sizes.map((size, index) => (
                      <label key={index} className="flex items-center gap-2 p-2 border mb-1">
                        <input
                          type="radio"
                          onChange={() => setSelectedSize(size)}
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
                    <div className="px-8 duration-150 rounded-lg group-hover:bg-blue-700">
                      Add to Cart {selectedSize && price + selectedSize.price}
                    </div>
                  </button>
                </div>
                <button onClick={() => setShowPopUp(false)} className="flex items-center justify-center border-2 border-gray-300 rounded-lg shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <FeaturedItemTile onAddToCart={handleAddToCartButtonClick} {...storeItem} />
    </>
  );
};

export default FeaturedItem;
