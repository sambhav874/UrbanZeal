import React from "react"

const StoreItem = ({
    image , name , price , description , sizes
}) => {
    return(
    <div className="bg-gray-200 p-4 rounded-lg items-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
        <div className="text-center">
            <img src={image} className="max-h-auto max-h-24 block mx-auto" alt="clothes" />
        </div>
        <h3 className="font-semibold text-xl my-3">{name}</h3>
        <p className="text-gray-500 text-sm line-clamp-3">
            {description}
        </p>
        <button className="mt-4 text-white bg-black rounded-full px-8 py-2">Add to card Rs.{price}</button>
    </div>

)
}

export default StoreItem;