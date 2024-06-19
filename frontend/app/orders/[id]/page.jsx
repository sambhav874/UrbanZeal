'use client'
import React, { useContext, useEffect, useState } from 'react';
import { CartContext, cartProductPrice } from '../../../components/AppContext';
import { useParams } from 'next/navigation';
import AddressInputs from '../../../components/layout/AddressInputs';
import CartProduct from '../../../components/store/CartProduct';

const OrderPage = () => {

    const { id } = useParams();
    const [order, setOrder] = useState();
    const { clearCart } = useContext(CartContext);
    useEffect(() => {
        if (typeof window.console !== 'undefinded') {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart()
            }
        }

        if (id) {
            fetch('/api/orders?_id=' + id).then(res => res.json().then(orderData => {
                setOrder(orderData);
                console.log(orderData)
            }))
        }
    }, [id])


    let subtotal = 0 ;
    if(order?.cartProducts){
        for (const product of order?.cartProducts){
            subtotal += cartProductPrice(product);
        }
    }

    return (
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
                    <div>{order.cartProducts.map(product => (
                        <CartProduct products={product} key={product._id} />
                        
                    ))}
                    
                    <div className='text-right py-2 '>
                    <span className='font-bold inline-block '>Subtotal : Rs. {subtotal}</span><br/>
                        <span className='font-bold inline-block '>Delivery : Rs. 30</span><br/>
                        <span className='font-bold inline-block '>Total : Rs. {subtotal + 30}</span><br/>
                         
                         
                         </div>
                    </div>
                    <div className='bg-gray-100 p-4 rounded-lg'>
                        <div>Address Info
                            <AddressInputs disabled={true} {...order} />
                        </div>
                    </div>
                </div>

            )}

        </section>
    );
}

export default OrderPage;