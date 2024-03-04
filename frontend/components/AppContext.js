'use client'
import {SessionProvider} from 'next-auth/react'
import { createContext } from 'react'
import { useState , useEffect } from 'react';

export const CartContext = createContext({});

export function AppProvider({children}){

    const [cartProducts , setCartProducts] = useState([]);
    const [item , setItem] = useState([]);

    const ls = typeof window !== 'undefined' ? window.localStorage : null ;

    function saveCartProductsToLocalStorage(cartProducts){
        if(ls){
            ls.setItem('cart' , JSON.stringify(cartProducts));
        }
    }

    useEffect(() => {
        if(ls && ls.getItem('cart')){
            setCartProducts( JSON.parse(ls.getItem('cart')));
        }
    } , [])

    function addToCart(product , size=null , extras=[]){
        setCartProducts(prevProducts => {
            const cartProduct =  {...product , size , extras}
            const newProducts = [...prevProducts , cartProduct]
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
        })
    }

    return(
        <SessionProvider>
            <CartContext.Provider value={{cartProducts , setCartProducts , addToCart}}>
            {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}