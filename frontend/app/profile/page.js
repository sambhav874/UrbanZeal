"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image"; // Import Image component from 'next/image'

const Home = () => {
  const { data: session, status } = useSession();
  const [userName, setUserName] = useState(session?.user?.name || "");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false); 

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName }),
    });
    setIsSaving(false);
    if(response.ok){
        setSaved(true);
    }
  }

  async function handleFileChange(ev){
    const files = ev.target.files;
    
    if(files?.length === 1){
        const data = new FormData();
        data.set('file' , files[0]);
        await fetch('/api/upload' , {
            method: "POST",
            body: data,
        });
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
        {saved && (<h2 className="text-center bg-green-100 p-4 rounded-lg border text-black border-green-400">
        Profile Saved !
        </h2>)}

        {isSaving && (<h2 className="text-center bg-blue-100 p-4 rounded-lg border text-black border-blue-400">
        Saving ....
        </h2>)}
        
        <div className="flex gap-2 items-center">
          <div>
            {/* Use the Image component for image rendering */}
            <div className="p-2 rounded-lg">
              <Image
                src={userImage}
                className="w-full h-full rounded-lg mb-2"
                width={250}
                height={250}
                alt="User Avatar"
              />
              <label>
                <input type="file" className="hidden" onChange={handleFileChange}></input>
                <span className='block rounded-lg p-2 text-center border-gray-300 cursor-pointer border' type="button">Change Avatar</span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
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

export default Home;
