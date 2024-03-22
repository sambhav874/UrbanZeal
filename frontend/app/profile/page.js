'use client'
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from 'react-hot-toast';
import UserTabs from './../../components/layout/UserTabs'
import EditableImage from './../../components/layout/EditableImage'

const Profile = () => {
  const { data: session, status } = useSession();
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [profileFetched , setProfileFetched] = useState(false);
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState('');
  const [isAdmin , setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      setUserName(session.user.name || "");
      setImage(session.user.image || "");
      fetch("/api/profile")
        .then(response => response.json())
        .then(data => {
          setPhoneNumber(data.phoneNumber || "");
          setCity(data.city || "");
          setPincode(data.pincode || "");
          setCountry(data.country || "");
          setStreetAddress(data.streetAddress || "");
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
        .catch(error => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    
    toast('Saving....');

    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/profile', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ name: userName, image, streetAddress, phoneNumber, city, country, pincode }),
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
      loading: 'Saving...',
      success: 'Profile Saved!',
      error: 'Upload Error...',
    });
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <div className="mt-8">
        
      <UserTabs isAdmin={isAdmin}/>
      <div className="max-w-md mx-auto border mt-8 border-gray-300 bg-white p-4 rounded-lg">
        <div className="flex gap-2 items-center">
          <div>
            <div className="p-2 rounded-lg">
              <EditableImage link={image} setLink={setImage} />
            </div>
          </div>
          <form className="flex flex-col" onSubmit={handleProfileInfoUpdate}>
            <label className="flex flex-col">
              <span className="text-gray-800">First and Last Name:</span>
              <input
                type="text"
                className="text-black border border-gray-300 rounded-md p-2 mt-1"
                value={userName}
                onChange={(ev) => setUserName(ev.target.value)}
                placeholder="First and Last Name"
              />
            </label>
            <label className="flex flex-col mt-4">
              <span className="text-gray-800">Email:</span>
              <input
                type="email"
                className="text-black border border-gray-300 rounded-md p-2 mt-1"
                disabled={true}
                value={session?.user?.email}
              />
            </label>
            <label className="flex flex-col mt-4">
              <span className="text-gray-800">Phone Number:</span>
              <input
                type="tel"
                className="text-black border border-gray-300 rounded-md p-2 mt-1"
                onChange={(ev) => setPhoneNumber(ev.target.value)}
                value={phoneNumber}
                placeholder="Phone Number"
              />
            </label>
            <label className="flex flex-col mt-4">
              <span className="text-gray-800">Street Address:</span>
              <input
                type="text"
                className="text-black border border-gray-300 rounded-md p-2 mt-1"
                onChange={(ev) => setStreetAddress(ev.target.value)}
                value={streetAddress}
                placeholder="Street Address"
              />
            </label>
            <div className="flex gap-4 mt-4">
              <label className="flex flex-col">
                <span className="text-gray-800">Pincode:</span>
                <input
                  type="text"
                  className="text-black border border-gray-300 rounded-md p-2 mt-1"
                  onChange={(ev) => setPincode(ev.target.value)}
                  value={pincode}
                  placeholder="Pincode"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-800">City:</span>
                <input
                  type="text"
                  className="text-black border border-gray-300 rounded-md p-2 mt-1"
                  onChange={(ev) => setCity(ev.target.value)}
                  value={city}
                  placeholder="City"
                />
              </label>
            </div>
            <label className="flex flex-col mt-4">
              <span className="text-gray-800">Country:</span>
              <input
                type="text"
                className="text-black border border-gray-300 rounded-md p-2 mt-1"
                onChange={(ev) => setCountry(ev.target.value)}
                value={country}
                placeholder="Country"
              />
            </label>
            <button
              type="submit"
              className="border-2 hover:bg-gray-200 bg-gray-100 text-gray-800 font-medium rounded-md p-2 mt-4"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
