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
      <Link href={'/store-items/new'} >Create new Store Item</Link>
    </div>
  );
}
