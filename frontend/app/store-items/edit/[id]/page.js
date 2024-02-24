"use client";

import { useProfile } from "./../../../../components/UseProfile";
import Link from "next/link";
import EditableImage from "./../../../../components/layout/EditableImage";
import UserTabs from "./../../../../components/layout/UserTabs";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Left from "./../../../../components/icons/Left";
import { redirect, useParams } from "next/navigation";
import StoreItemSizeProp from "./../../../../components/layout/StoreItemSizeProp";


export default function newStoreItemPage() {
  const [itemCategory, setItemCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [image, setImage] = useState("");
  const [sizes, setSizes] = useState([]);
  const [itemsubCategory, setItemsubCategory] = useState("");
  const [redirectTo, setRedirect] = useState(false);
  const { loading, data } = useProfile();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [itemData, setItemData] = useState(null);
  const { id } = useParams();

  console.log(id);

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    fetch("/api/store-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setItemData(item);
        setImage(item.image);
        setItemName(item.itemName);
        setItemCategory(item.itemCategory);
        setItemDescription(item.itemDescription);
        setItemPrice(item.itemPrice);
        setItemsubCategory(item.itemsubCategory);
        setSizes(item.sizes ? item.sizes : []);
      });
    });

    fetchCategories();
    fetchSubcategories();
  }, [id]);

  // Fetch categories from API
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

  // Fetch subcategories from API
  async function fetchSubcategories() {
    try {
      const response = await fetch("/api/subcategories");
      if (response.ok) {
        const subcategoriesData = await response.json();
        setSubcategories(subcategoriesData);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }

  // Handle form submission
  // ... (previous imports and code)

  // Handle form submission
  async function handleFormSubmit(ev) {
    ev.preventDefault();

    // Validate required fields
    if (
      !itemName ||
      !itemPrice ||
      !itemDescription ||
      !itemCategory ||
      !itemsubCategory ||
      !image ||
      sizes.length === 0
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Validate price format
    const priceAsNumber = parseFloat(itemPrice);
    if (isNaN(priceAsNumber)) {
      toast.error("Invalid price format. Please enter a valid number.");
      return;
    }

    const data = {
      image,
      name: itemName,
      description: itemDescription,
      price: priceAsNumber, // Use priceAsNumber
      category: itemCategory,
      subcategory: itemsubCategory,
      sizes: sizes,
      _id: id,
    };

    // Send data to API using the PUT method
    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`/api/store-items/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
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

    // Display toast messages based on API response
    await toast.promise(savingPromise, {
      loading: "Updating the Item, Please wait ...",
      success: "Item Updated Successfully!",
      error: "Error Updating The Item, Try Again Later",
    });

    // Clear form fields after successful submission
    setItemName("");
    setItemDescription("");
    setItemPrice("");
    setItemCategory("");
    setItemsubCategory("");
    setImage("");
    setSizes([]);
    setRedirect(true);
  }

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/store-items?_id="+id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if(res.ok){
        resolve();
      }
      else{
        reject();
      }
    });
    await toast.promise(promise , {
      loading : "Deleting Your Item",
      success : "Item Deleted Succesfully!",
      error : "Failed To Delete The Item!"
    })
    setRedirect(true);
  }
  // ... (rest of the code remains unchanged)

  // Redirect to store items page if needed
  if (redirectTo) {
    return redirect("/store-items");
  }

  // Display loading message while fetching user profile
  if (loading) {
    return "Loading user profile ...";
  }

  // Display error message if user is not an admin
  if (!data.admin) {
    return "You are not authorized to view this page.";
  }

  return (
    <div className="my-8">
      <UserTabs isAdmin={true} />

      <div className="my-8  max-w-md mx-auto">
        <Link
          className="flex w-full text-gray-700 justify-center gap-2 font-semibold border border-gray-300 rounded-xl px-6 py-2"
          href={"/store-items/"}
        >
          <Left style={{ width: "12px", height: "12px" }} /> Show all the store
          items
        </Link>
      </div>

      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md  mx-auto">
        <div
          className="flex items-start gap-4"
          style={{ gridTemplateColumns: "3fr 7fr" }}
        >
          <div>
            <EditableImage link={itemData.image} setLink={setImage} />
          </div>
          <div className="grow">
            <label>Store items Name</label>
            <input
              type="text"
              value={itemName ? itemName : itemData.name}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
            <label>Price</label>
            <input
              type="text"
              value={itemPrice ? itemPrice : itemData.price}
              onChange={(e) => setItemPrice(e.target.value)}
              required
            />
            <label>Description</label>
            <input
              type="text"
              value={itemDescription ? itemDescription : itemData.description}
              onChange={(e) => setItemDescription(e.target.value)}
              required
            />
            <label>Category</label>
            <select
              value={itemCategory ? itemCategory : itemData.category}
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
            <label>Subcategory</label>
            <select
              value={itemsubCategory ? itemsubCategory : itemData.subcategory}
              onChange={(e) => setItemsubCategory(e.target.value)}
              required
            >
              <option value="">Select subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory.name}>
                  {subcategory.name}
                </option>
              ))}
            </select>
            <StoreItemSizeProp
              addLabel={"Add item Size"}
              name={"Sizes"}
              props={sizes}
              setProps={setSizes}
            />
          </div>
          <div>
            <button className="mb-2" type="submit">
              Edit
            </button>
          </div>
        </div>
      </form>
      <div className="max-w-md mx-auto mt-4">
        <div className="max-w-xs pl-4 ml-auto">
          <button onClick={handleDeleteClick}>Delete this store item.</button>
        </div>
      </div>
    </div>
  );
}
