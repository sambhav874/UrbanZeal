// StoreItemsPage.js
'use client';

import { useProfile } from "../../components/UseProfile";
import EditableImage from "../../components/layout/EditableImage";
import UserTabs from "../../components/layout/UserTabs";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function StoreItemsPage() {
  const { loading, data } = useProfile();
  const [itemCategory, setItemCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [image, setImage] = useState('');

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const data = { image, itemName, itemPrice, itemDescription, itemCategory };
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
    console.log(data);
    await toast.promise(savingPromise, {
      loading: "Saving the Item, Please wait ...",
      success: "Item Saved Successfully!",
      error: "Error Saving The Item, Try Again Later"
    });
  }

  if (loading) {
    return "Loading user info.....";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <div className="my-8">
      <UserTabs isAdmin={true} />
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
        <div className="flex items-start gap-4" style={{ gridTemplateColumns: '3fr 7fr' }}>
          <div>
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label>Store items Name</label>
            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)}></input>
            <label>Price</label>
            <input type="text" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)}></input>
            <label>Description</label>
            <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)}></input>
            <label>Category</label>
            <select
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
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
  );
}
