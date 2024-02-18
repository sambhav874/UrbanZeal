'use client'

import { useProfile } from "../../components/UseProfile";
import UserTabs from "../../components/layout/UserTabs";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Right from './../../components/icons/Right'
import DeleteButton from "../../components/DeleteButton";
import Image from 'next/image';


export default function StoreItemsPage() {

  const [storeItems, setStoreItems] = useState([]);


  useEffect(() => {
    fetch('/api/store-items').then(res => {
      res.json().then(storeItems => {
        setStoreItems(storeItems);
      })
    })
  }, [])
  const { loading, data } = useProfile();

  if (loading) {
    return "Loading user info.....";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <div className="my-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="my-8">
        <Link className="flex w-full text-gray-700 justify-center gap-2 font-semibold border border-gray-300 rounded-xl px-6 py-2" href={'/store-items/new'}>Create new Store Item
          <Right style={{ width: "12px", height: "12px" }} />
        </Link></div>

      <div className="grid grid-cols-3 gap-2">
        {storeItems?.length > 0 && storeItems.map(c => (
          <Link href={'store-items/edit/'+c._id} className="bg-gray-200 flex-col rounded-xl p-4 flex gap-1 mb-1 items-center  text-black">
            <div className="relative"> <Image src={c.image} className="rounded-md" alt={''} width={200} height={200}  /></div>
             
              {c.name}
            
        </Link> 
        ))}
      </ div>
    </div>
  );
}
