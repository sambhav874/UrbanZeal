'use client'

import {useState} from 'react'
import EditableImage from './EditableImage';

export default function UserForm({user}){


    const [userName, setUserName] = useState(user?.username || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [city, setCity] = useState(user?.city || "");
  const [pincode, setPincode] = useState(user?.pincode || "");
  const [country, setCountry] = useState(user?.country || "");
  const [image, setImage] = useState(user?.image || '');

return(
    <div className="flex gap-2 items-center">
          <div>
            <div className="p-2 rounded-lg">
              <EditableImage link={image} setLink={setImage} />
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
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
                value={session?.user?.email}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                className="text-black"
                onChange={(ev) => setPhoneNumber(ev.target.value)}
                value={phoneNumber}
                placeholder="Phone Number"
              />
            </label>
            <label>
              Street Address:
              <input
                type="text"
                className="text-black"
                onChange={(ev) => setStreetAddress(ev.target.value)}
                value={streetAddress}
                placeholder="Street Address"
              />
            </label>
            <div className="flex gap-4">
              <label>
                Pincode:
                <input
                  type="text"
                  className="text-black"
                  onChange={(ev) => setPincode(ev.target.value)}
                  value={pincode}
                  placeholder="Pincode"
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  className="text-black"
                  onChange={(ev) => setCity(ev.target.value)}
                  value={city}
                  placeholder="City"
                />
              </label>
            </div>
            <label>
              Country:
              <input
                type="text"
                className="text-black"
                onChange={(ev) => setCountry(ev.target.value)}
                value={country}
                placeholder="Country"
              />
            </label>
            <button
              type="submit"
              className="border-2 hover:bg-white hover:text-slate-900 bg-black text-white"
            >
              Save
            </button>
          </form>
        </div>
      
)
}