'use client'
import React, { useState, useEffect } from 'react';
import UserTabs from './../../components/layout/UserTabs';
import toast from 'react-hot-toast';
import DeleteButton from './../../components/DeleteButton';
import { useProfile } from './../../components/UseProfile';

export default function SubcategoriesPage() {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [itemCategory, setItemCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedSubcategory, setEditedSubcategory] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const categoriesData = await response.json();
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  function fetchSubcategories() {
    fetch('/api/subcategories').then(res => {
      res.json().then(subcategories => {
        setSubcategories(subcategories);
      });
    });
  }

  async function handleSubcategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: subcategoryName , parentCategory: itemCategory };
      
      if (editedSubcategory) {
        data._id = editedSubcategory._id;
      }
      const response = await fetch('/api/subcategories', {
        method: editedSubcategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubcategoryName('');
      setItemCategory('');
      fetchSubcategories();
      setEditedSubcategory(null);
      if (response.ok)
        resolve();
      else
        reject();
    });
    await toast.promise(creationPromise, {
      loading: editedSubcategory
        ? 'Updating SubCategory...'
        : 'Creating your new SubCategory...',
      success: editedSubcategory ? 'SubCategory updated' : 'SubCategory created',
      error: 'Error, sorry...',
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/subcategories?_id=' + _id, {
        method: 'DELETE',
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });

    fetchSubcategories();
  }

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleSubcategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedSubcategory ? 'Update subcategory' : 'New subcategory name'}
              {editedSubcategory && (
                <>: <b>{editedSubcategory.name}</b></>
              )}
            </label>
            <input type="text"
              value={subcategoryName}
              onChange={ev => setSubcategoryName(ev.target.value)}
            />

            <label>Category</label>
            <select
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedSubcategory ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedSubcategory(null);
                setSubcategoryName('');
                setItemCategory('');
              }}>
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing subcategories</h2>
        {subcategories?.length > 0 && subcategories.map(c => (
          <div
            key={c._id}
            className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
            <div className="grow">
              {c.name}
            </div>
            <div className="flex gap-1">
              <button type="button"
                onClick={() => {
                  setEditedSubcategory(c);
                  setSubcategoryName(c.name);
                  setItemCategory(c.itemCategory);
                }}
              >
                Edit
              </button>
              <DeleteButton
                label="Delete"
                onDelete={() => handleDeleteClick(c._id)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
