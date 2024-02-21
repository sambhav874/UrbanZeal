'use client'

import { useProfile } from './../../../components/UseProfile';
import Link from 'next/link';
import EditableImage from './../../../components/layout/EditableImage';
import UserTabs from './../../../components/layout/UserTabs';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Left from './../../../components/icons/Left';
import { redirect } from 'next/navigation';
import StoreItemSizeProp from '../../../components/layout/StoreItemSizeProp';

export default function newStoreItemPage() {
  const [itemCategory, setItemCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [image, setImage] = useState('');
  const [sizes, setSizes] = useState([]);

  const [redirectTo, setRedirect] = useState(false);
  const { loading, data } = useProfile();
  const [categories, setCategories] = useState([]); // New state for categories

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const categoriesData = await response.json();
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async function handleFormSubmit(ev) {
    ev.preventDefault();

    // Check if all required fields are filled
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
      price: priceAsNumber,
      category: itemCategory,
      sizes: sizes,
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
      loading: 'Saving the Item, Please wait ...',
      success: 'Item Saved Successfully!',
      error: 'Error Saving The Item, Try Again Later',
    });

    // Clear form fields after successful submission
    setItemName('');
    setItemDescription('');
    setItemPrice('');
    setItemCategory('');
    setImage('');
    setSizes('');

    setRedirect(true);
  }

  if (redirectTo) {
    return redirect('/store-items');
  }

  if (loading) {
    return 'Loading menu item data ...';
  }

  if (!data.admin) {
    return 'Not an Admin ....';
  }

  return (
    <div className="my-8">
      <UserTabs isAdmin={true} />

      <div className="my-8  max-w-md mx-auto">
        <Link
          className="flex w-full text-gray-700 justify-center gap-2 font-semibold border border-gray-300 rounded-xl px-6 py-2"
          href={'/store-items/'}
        >
          <Left style={{ width: '12px', height: '12px' }} /> Show all the store items
        </Link>
      </div>

      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md  mx-auto">
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
              {categories.map(category => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <StoreItemSizeProp addLabel={'Add item Size'} name={'Sizes'} props={sizes} setProps={setSizes} />
          </div>
          <div>
            <button className="mb-2" type="submit">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
}
