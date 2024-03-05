import React, { useContext, useState } from "react"
import { CartContext } from "../AppContext";
import { toast } from "react-hot-toast";

const StoreItem = (storeItem) => {

    const {image , name , price , description , sizes} = storeItem ;
    const [showPopUp , setShowPopUp] = useState(false);

    const {addToCart} = useContext(CartContext);

    function handleAddToCartButtonClick(){
        if(sizes.length === 0 ){
            addToCart(storeItem);
            toast.success('Product added to Cart !')
        }
        else{
            setShowPopUp(true);
        }
    }

    return(
        <>
        {showPopUp && (
            <div className="inset-0 fixed bg-black/80 flex items-center justify-center">
                <div className="bg-white text-black p-4 rounded-lg">Pop Up</div>
            </div>
        )}

    <div className="bg-gray-200 p-4 rounded-lg items-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
        <div className="text-center">
            <img src={image} className="max-h-auto max-h-24 block mx-auto" alt="clothes" />
        </div>
        <h3 className="font-semibold text-xl my-3">{name}</h3>
        <p className="text-gray-500 text-sm line-clamp-3">
            {description}
        </p>
        <button onClick={handleAddToCartButtonClick} className="mt-4 text-white bg-black rounded-full px-8 py-2">Add to card Rs.{price}</button>
    </div>
</>
)
}

export default StoreItem;