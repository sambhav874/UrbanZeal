import {useProfile} from './../../../components/UseProfile'

import EditableImage from "./../../../components/layout/EditableImage";
import UserTabs from "./../../../components/layout/UserTabs";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


export default function newStoreItemPage(){

  const [itemCategory, setItemCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [image, setImage] = useState('');

  async function handleFormSubmit(ev) {
    
    ev.preventDefault();

    
    if (!itemName || !itemPrice || !itemDescription || !itemCategory || !image) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Convert price to a valid number before sending to API
    const priceAsNumber = parseFloat(itemPrice);
    if (isNaN(priceAsNumber)) {
      toast.error('Invalid price format. Please enter a valid number.');
      return;
    }

    const data = {
      image,
      name: itemName,
      description: itemDescription,
      price: priceAsNumber, // Use priceAsNumber
      category: itemCategory,
    };

    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/store-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving the Item, Please wait ...",
      success: "Item Saved Successfully!",
      error: "Error Saving The Item, Try Again Later"
    });

    // Clear form fields after successful submission
    setItemName('');
    setItemDescription('');
    setItemPrice('');
    setItemCategory('');
    setImage('');
  }


    const {loading , data } = useProfile();

    if(loading){
        return "Loading menu item data ...";
    }

    if(!data.admin){
        return "Not an Admin ...."
    }


    return(
        <div className="my-8">
      <UserTabs isAdmin={true} />
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
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
    </div>
    )

}