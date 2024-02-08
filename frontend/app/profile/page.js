"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import InfoBox from './../../components/layout/InfoBox'
import SuccessBox from './../../components/layout/SuccessBox'
import toast from 'react-hot-toast'; // Import Image component from 'next/image'

const profile = () => {
  const { data: session, status } = useSession();
  const [userName, setUserName] = useState("");
  const [image , setImage] = useState('');
  
  
  

  useEffect(() => {
    if(status === 'authenticated'){
        setUserName(session.user.name);
        setImage(session.user.image);
    }
  },[session,status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    
    toast('Saving....');

    

    const savingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch('/api/profile', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ name: userName , image}),
        });
        if (response.ok)
          resolve()
        else
          reject();
      });
  
      
    await toast.promise(savingPromise , {
        loading: 'Saving...',
        success: 'Profile Saved ...!',
        error: 'Upload Error ...'
    });
    
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;
  
    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);
  
      // Show a loading toast while uploading
      const loadingToastId = toast.promise(
        new Promise((resolve, reject) => {
          // Upload the file
          fetch('/api/upload', {
            method: 'POST',
            body: data,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
              }
              return response.json();
            })
            .then((responseData) => {
              // Access the actual image URL from the response
              const imageURL = responseData.url || responseData.path || responseData.imageUrl || responseData.link; // Adjust based on your API response structure
              if (!imageURL) {
                throw new Error('Missing image URL in response');
              }
              resolve(imageURL);
            })
            .catch((error) => {
              reject(error);
            });
        }),
        {
          loading: 'Uploading...',
          success: 'Profile image uploaded!',
          error: 'Upload failed. Please try again.',
        }
      );
  
      try {
        const imageURL = await loadingToastId;
        setImage(imageURL);
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Upload failed. Please try again.');
      }
    }
  }
  if (status === "loading") {
    return "loading....";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const userImage = session?.user?.image; // Use optional chaining to avoid errors if session or user is undefined

  return (
    <div className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto border border-black">
        
        
        <div className="flex gap-2 items-center">
          <div>
            {/* Use the Image component for image rendering */}
            <div className="p-2 rounded-lg">
                {image && (
                    <Image
                src={`${image}`}
                className="w-full h-full rounded-lg mb-2"
                width={250}
                height={250}
                alt="User Avatar"
              />
                )}
              
              <label>
                <input type="file" className="hidden" onChange={handleFileChange}></input>
                <span className='block rounded-lg p-2 text-center border-gray-300 cursor-pointer border' type="button">Change Avatar</span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text" className="text-black"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
              placeholder="First and Last Name"
            ></input>
            <input
              type="email"
              className="text-black"
              disabled={true}
              value={session?.user?.email} // Use optional chaining to avoid errors if session or user is undefined
            ></input>
            <button
              type="submit"
              className="border-2 hover:bg-white hover:text-slate-900 bg-black text-white"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default profile;