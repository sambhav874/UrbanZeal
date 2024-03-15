'use client'
import {SessionProvider} from 'next-auth/react'
import { createContext } from 'react'
import { useState , useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const CartContext = createContext({});


export function cartProductPrice(cartProduct) {
        let price = cartProduct.price;
        if (cartProduct.size) {
          price += cartProduct.size.price;
        }
        
        return price;
      }

export function AppProvider({children}){

    const [cartProducts , setCartProducts] = useState([]);
   
    const ls = typeof window !== 'undefined' ? window.localStorage : null ;

    function saveCartProductsToLocalStorage(cartProducts){
        if(ls){
            ls.setItem('cart' , JSON.stringify(cartProducts));
        }
    }

    
    function clearCart(){
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
    }

    function removeCartProduct(indexToRemove){
        setCartProducts(prevCartProduct => {
            const newCartProducts = prevCartProduct.filter((v , index) => index != indexToRemove);
            saveCartProductsToLocalStorage(newCartProducts);
            
            return newCartProducts;
        });toast.success('Product Removed !');
    }

    useEffect(() => {
        if(ls && ls.getItem('cart')){
            setCartProducts( JSON.parse(ls.getItem('cart')));
        }
    } , [])

    function addToCart(product, size=null, ) {
        setCartProducts(prevProducts => {
          const cartProduct = {...product, size};
          const newProducts = [...prevProducts, cartProduct];
          saveCartProductsToLocalStorage(newProducts);
          console.log(cartProducts)
          return newProducts;
        });
      }

    return(
        <SessionProvider>
            <CartContext.Provider value={{cartProducts , setCartProducts , addToCart , removeCartProduct , clearCart}}>
                
            {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}
