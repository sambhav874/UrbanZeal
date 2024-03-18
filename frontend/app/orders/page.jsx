'use client'
import React, { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import {useProfile} from './../../components/UseProfile'
import {dbDateTime} from './../../libs/dbDateTime'
import Link from "next/link";

const AllOrdersPage = () => {

    const {loading , data : profile} = useProfile();

    const [orders, setOrders] = useState([]);
    useEffect(() => {

        fetch('/api/orders').then(res => { res.json().then(data => { 
            console.log(data);
            setOrders(data.reverse()) ;
        }) })

    }, [])

    return (
        <section className="my-8 mx-auto max-w-[80%]" >
            <UserTabs isAdmin={profile.admin} />
            <div className="text-center mt-8">
                <div className="text-3xl font-bold">Orders</div>
            </div>
            <div className=" m-4">
                {orders.length > 0 && orders.map(order =>(
                    <div
                    key={order._id}
                    className="bg-slate-600 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
                    <div className="grow flex flex-col md:flex-row items-center gap-6">
                      <div>
                        <div className={
                          (order.paid ? 'bg-green-500' : 'bg-red-400')
                          + ' p-2 rounded-md text-white w-24 text-center'
                        }>
                          {order.paid ? 'Paid' : 'Not paid'}
                        </div>
                      </div>
                      <div className="grow">
                        <div className="flex gap-2 items-center justify-center ">
                          <div className="grow">{order.userEmail}</div>
                          <div className="text-gray-500 text-sm mt-3">{dbDateTime(order.createdAt)}</div>
                        </div>
                        <div className="text-gray-500 text-xs">
                          {order.cartProducts?.map(p => p.name).join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                      <Link href={"/orders/"+order._id} className="button">
                        Show order
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
        </section>
    )
}

export default AllOrdersPage;