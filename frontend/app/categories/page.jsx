'use client'

import React from 'react';
import UserTabs from '../../components/layout/UserTabs';
import {useState} from 'react'

const CategoriesPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    useState(() => {
        fetch('/api/profile').then(response=>{response.json().then((data) => { setIsAdmin(data.admin); });})
        },[])

        if(!isAdmin){
            return "Not an Admin";
        }
    return (
        <div className='mt-8 max-w-lg mx-auto'>
            <UserTabs isAdmin={true} />
        </div>
    );
}

export default CategoriesPage;