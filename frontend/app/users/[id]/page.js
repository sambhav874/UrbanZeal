'use client'

import { useEffect, useState } from "react";
import { useProfile } from "../../../components/UseProfile";
import UserForm from "../../../components/layout/UserForm";
import UserTabs from "../../../components/layout/UserTabs";
import { useParams } from "next/navigation";
import toast from 'react-hot-toast';

export default function EditUserPage(){

    const [user , setUser] = useState(null);
    const {id} = useParams();
    const {loading , data } = useProfile();
    

    useEffect(() => {
        fetch('/api/profile?_id='+id).then(res => {
          res.json().then(user => {
            setUser(user);
          });
        })
      }, []);

      async function handleSaveButtonClick(ev, data) {
        ev.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
          const res = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data,_id:id}),
            
          });
          console.log(res)
          if (res.ok)
            resolve();
          else
            reject();
        });
    
        await toast.promise(promise, {
          loading: 'Saving user...',
          success: 'User saved',
          error: 'An error has occurred while saving the user',
        });
      }

    if(loading){
        return  <div>Loading...</div>;
    }

    if(!data.admin){
        return 'Not an admin';
    }

    return(
        <div className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick}/>
            </div>
        </div>
    )
}