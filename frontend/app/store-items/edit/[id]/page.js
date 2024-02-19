'use client'

import {useProfile} from './../../../../components/UseProfile'
import Link from 'next/link'
import EditableImage from "./../../../../components/layout/EditableImage";
import UserTabs from "./../../../../components/layout/UserTabs";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Left from './../../../../components/icons/Left'
import { redirect, useParams } from 'next/navigation';
import Trash from './../../../../components/icons/Trash'
import Plus from './../../../../components/icons/Plus'




export default function EditStoreItemPage(){


  const {id} = useParams();
    const [itemCategory, setItemCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [image, setImage] = useState('');
  const [redirectTo , setRedirect] = useState(false);
  const [sizes , setSizes] = useState('');

function addSize(){
  
  setSizes(oldSizes => {
    return [...oldSizes , {name : '' , price : 0}]
  })

}

function editSize(ev , index , prop){

  const newValue = ev.target.value;
  setSizes(prevSizes => {
    const newSizes = [...prevSizes]
    newSizes[index][prop] = newValue ;
    return newSizes;
  })


}

  function removeSize(indexToRemove){
    setSizes(prev => prev.filter(( v , index) => index !== indexToRemove))
  }

  useEffect(() => {
    fetch('/api/store-items').then(res => {
      res.json().then(items => {
        const item = items.find(i => i._id === id);
        setImage(item.image);
        setItemName(item.itemName);
        setItemCategory(item.itemCategory);
        setItemDescription(item.itemDescription);
        setItemPrice(item.itemPrice);
      })
    })
  } , [])


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
      _id : id
    };

    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/store-items', {
          method: 'PUT',
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

    setRedirect(true);
  }

  if(redirectTo){
    return redirect('/store-items')
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

      <div className="my-8  max-w-md mx-auto">
      <Link className="flex w-full text-gray-700 justify-center gap-2 font-semibold border border-gray-300 rounded-xl px-6 py-2" href={'/store-items/'}><Left style={{ width: "12px", height: "12px" }}/>Show all the store items
      
      </Link></div>

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
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>

            <div className='bg-gray-200 p-2 rounded-md mb-2' >
              <label>Sizes</label>
              {sizes?.length > 0 && sizes.map((size , index) => (
                <div className='flex gap-2 items-end'>
                  <div>
                    <label>Size Name</label>
                  <input onChange={ev => editSize(ev , index , 'name')} type='text' placeholder='Size Name' value={size.name}></input></div>
                  <div>
                  <label>Extra Price</label>
                  <input onChange={ev => editSize(ev , index , 'price')} type='text' placeholder='Price' value={size.price}></input>
                  </div>
                  <div>
                  
                  <button type='button' onClick={() => removeSize(index)} className='bg-white mb-2 px-2'> <Trash /></button>
                  </div>
                </div>
              ))}
              <button onClick={addSize} className='bg-black items-center'>
                <Plus className='w-4 h-4'/><span>Add item Size</span></button>
            </div>

          </div>
          <div>
            <button className="mb-2" type="submit">Create</button>
          </div>
        </div>
      </form>
    </div>
    )

}