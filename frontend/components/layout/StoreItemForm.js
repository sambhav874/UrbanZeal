import { useState , useEffect } from "react";
import EditableImage from "./../../components/layout/";

export default function StoreItemForm({onSubmit , storeItem}){


    const [itemCategory, setItemCategory] = useState(storeItem?.itemCategory || '');
  const [itemName, setItemName] = useState(storeItem?.itemName || '');
  const [itemDescription, setItemDescription] = useState(storeItem?.itemDescription || '');
  const [itemPrice, setItemPrice] = useState(storeItem?.itemPrice || '');
  const [image, setImage] = useState(storeItem?.image || '');

    return (


    <form onSubmit={ev => onSubmit(ev , {image,
        name: itemName,
        description: itemDescription,
        price: priceAsNumber, // Use priceAsNumber
        category: itemCategory,})} className="mt-8 max-w-md  mx-auto">
        <div className="flex items-start gap-4" style={{ gridTemplateColumns: '3fr 7fr' }}>
          <div>
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label>Store items Name</label>
            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required></input>
            <label>Price</label>
            <input type="text" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required></input>
            <label>Description</label>
            <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} required></input>
            <label>Category</label>
            <select
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div>
            <button className="mb-2" type="submit">Create</button>
          </div>
        </div>
      </form>

    )
}