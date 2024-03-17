'use client'
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../components/AppContext';
import { useParams } from 'next/navigation';
import AddressInputs from '../../../components/layout/AddressInputs';

const OrderPage = () => {

    const {id} = useParams();
    const [order , setOrder] = useState();
    const {clearCart} = useContext(CartContext);
    useEffect(() => {
        if (typeof window.console !== 'undefinded'){
            if(window.location.href.includes('clear-cart=1')){
                clearCart()
            }
        }

        if(id){
            fetch('/api/orders?_id='+id).then(res => res.json().then(orderData => {
                setOrder(orderData);
                console.log(orderData)
            }))
        }
    } , [id])


    return(
        <section className='max-w-2xl mx-auto text-center my-8'>
            <h2 className='font-bold text-3xl text-white '>Your Order</h2>
            <div className='my-4'>
                <p>
                Thanks for your order.
            </p>
            <p>
                Our delivery partner will call you after reaching your doorstep.
            </p>
            </div>

            {order && (
                <div className='grid grid-cols-2 gap-16'>
                    <div>left - products</div>
                    <div className='bg-gray-100 p-4 rounded-lg'>
                    <div>Address Info
                        <AddressInputs addressProps={...order} />
                    </div>
                </div>
                </div>
                
            )}
            
        </section>
    );
}

export default OrderPage;