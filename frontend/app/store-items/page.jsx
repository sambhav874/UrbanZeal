'use client'

import { useProfile } from "../../components/UseProfile";
import UserTabs from "../../components/layout/UserTabs";
import React, { useEffect, useState } from "react";
import Link from 'next/link';


export default function StoreItemsPage() {

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
      <Link className="block w-full text-gray-700 font-semibold border border-gray-300 rounded-xl px-6 py-2" href={'/store-items/new'}>Create new Store Item
      <Right />
      </Link></div>
    </div>
  );
}
