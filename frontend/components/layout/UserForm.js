"use client";

import { useState } from "react";
import EditableImage from "./EditableImage";
import { useProfile } from "../UseProfile";
import AddressInputs from "./AddressInputs";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const [city, setCity] = useState(user?.city || "");
  const [pincode, setPincode] = useState(user?.pincode || "");
  const [country, setCountry] = useState(user?.country || "");
  const [image, setImage] = useState(user?.image || "");
  const { data: loggedInUserData } = useProfile();


  function handleAddressChange(propName , value){
    if(propName === 'city')  setCity(value);
    if(propName === 'phoneNumber')  setPhoneNumber(value);
    if(propName === 'pincode')  setPincode(value);
    if(propName === 'country')  setCountry(value);
    if(propName === 'streetAddress')  setStreetAddress(value);
  }

  return (
    <div className="flex gap-2 items-center">
      <div>
        <div className="p-2 rounded-lg">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            phoneNumber,
            streetAddress,
            city,
            admin,
            image,
            pincode,
            country,
          })
        }
      >
        <label>
          First and Last Name:
          <input
            type="text"
            className="text-black"
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
            placeholder="First and Last Name"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            className="text-black"
            disabled={true}
            value={user?.email}
          />
        </label>
        <AddressInputs addressProps={{phoneNumber , pincode , streetAddress , city , country }} setAddressProps={{handleAddressChange}}/>

        {loggedInUserData.admin && (
          <div className="flex p-2 rounded-lg border-2 my-4 border-white ">
            <div className="flex items-center text-center">
              <label htmlFor="adminCB" className="gap-2 mx-2 flex  items-center">
                Admin
              </label>
              <input
                id="adminCB"
                type="checkbox"
                checked={admin} value={'1'}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="border-2 hover:bg-white hover:text-slate-900 bg-black text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
}
