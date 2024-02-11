'use client'

import React from 'react';
import UserTabs from '../../components/layout/UserTabs';

import { UseProfile } from '../../components/UseProfile';
import toast from 'react-hot-toast'
import { useEffect , useState } from 'react';

const CategoriesPage = () => {



    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState([])
    const { loading: profileLoading, data: profileData } = UseProfile();

    useEffect(() => {
        fetchCategories();
    }, [])

    function fetchCategories(){
        fetch("/api/categories").then(res => {
            res.json().then(categories => {
                setCategories(categories);
            })
        });
    }

    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories', {
                body: JSON.stringify({ name: newCategory }), method: 'POST', headers: { 'Content-Type': 'application/json' }
            });
            fetchCategories();
            if (response.ok) {
                resolve();
            }
            else {
                reject();
            }
        })
        toast.promise(creationPromise, {
            success: "Category Created",
            loading: "Creating your new Category",
            error: "Error , Sorry !"
        })

    }


    if (profileLoading) {
        return "Loading user data ....";
    }

    if (!profileData.admin) {
        return "Not an Admin !";
    }

    return (
        <div className='mt-8 max-w-lg mx-auto'>
            <UserTabs isAdmin={true} />
            <form className='mt-8' onSubmit={handleCategorySubmit}>
                <div className='flex gap-2 items-end'>
                    <div className='grow'>
                        <label>
                            New Category name
                        </label>
                        <input type='text' value={newCategory} onChange={ev => setNewCategory(ev.target.value)} />
                    </div>
                    <div className='pb-2'>
                        <button className='hover:bg-white hover:text-black' type='submit'>Create</button>
                    </div>
                </div>

                <div>
                    <h2 className='mt-8 text-md text-gray-500'>Edit Categories :</h2>
                    {categories?.length > 0 && categories.map((c, index) => (
    <button key={index} className='bg-gray-200 rounded-xl p-2 px-4 flex gap-2 cursor-pointer my-2'>
        <span className='text-gray-500'>Edit Category</span>
        <span>{c.name}</span>
    </button>
))}
                </div>

            </form>
        </div>
    );
}

export default CategoriesPage;