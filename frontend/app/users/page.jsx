'use client'

import toast from "react-hot-toast";
import { useProfile } from "../../components/UseProfile";
import UserTabs from "../../components/layout/UserTabs";
import { useEffect, useState } from "react";

export default function UsersPage(){

    const [users , setUsers] = useState([]);
    const {loading , data } = useProfile();

    useEffect(()=>{
        renderUsers();
    })
    async function renderUsers() {
        try {
            const response = await fetch('/api/users');
            if (response.ok) {
                const usersData = await response.json();
                setUsers(usersData);
                return 'All users fetched successfully!';
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            throw error;
        }
    }
    
    

    if(loading){
        return <p>Loading user data...</p>;
    }

    if(!data.admin){
        return <p>Not an Admin...</p>;
    }

    return (
        <div className="mt-8 max-w-xl mx-auto">
            <UserTabs isAdmin={true} />
            <h1>Users Page</h1>
        

        <div>
            {users?.length > 0 && users.map(c => (
                <div key={c._id} className="bg-gray-300 p-4 flex rounded-lg gap-2 text-black">

                  <div className="gap-2 p-2 m-2">
                    <span>
                {c.name}
                    </span>
                    <span>
                {c.email}
                    </span>
                  </div>

                </div>
            ))}
        </div>
        </div>
    )
}