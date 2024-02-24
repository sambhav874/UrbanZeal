'use client'

import toast from "react-hot-toast";
import { useProfile } from "../../components/UseProfile";
import UserTabs from "../../components/layout/UserTabs";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {

    const [users, setUsers] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
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



    if (loading) {
        return <p>Loading user data...</p>;
    }

    if (!data.admin) {
        return <p>Not an Admin...</p>;
    }

    return (
        <div className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <h1>Users Page</h1>


            <div className="mt-8">
                {users?.length > 0 && users.map(c => (
                    <div className="bg-gray-300 p-2 m-2 flex rounded-lg gap-2 text-black items-center" key={c._id} >

                        
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                                <div className="text-gray-700">
                                    {!!c.name && (<span>
                                {c.name || 'No Name'}
                            </span>)}
                            {!c.name && (<span className="italic ">
                                No Name
                            </span>)}
                                </div>
                                
                                <span className="text-gray-600">
                                    {c.email}
                                </span>
                            </div>
                            <div className="justify-end">
                                <Link href={'/users/'+users._id}>Edit</Link>
                                
                            </div>

                        </div>

                ))}
            </div>
        </div>
    )
}