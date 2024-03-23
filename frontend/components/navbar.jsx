"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { CartContext } from "./AppContext";
import ShoppingCart from './icons/ShoppingCart';


const Navbar = () => {
  const session = useSession();
  const { cartProducts } = useContext(CartContext);
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLargeScreen(window.innerWidth >= 768);

      const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 768);
        setIsSidebarOpen(false);
        setIsDropdownOpen(false);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white shadow-lg p-4 flex justify-end items-center gap-4">
      
      
      <div className="hidden md:flex space-x-6 ">
        <Link href="/" className="text-gray-700  hover:text-indigo-500 font-medium">
          Home
        </Link>
        <Link href="/products/Men" className="text-gray-700 hover:text-indigo-500 font-medium">
          Men
        </Link>
        <Link href="/products/Women" className="text-gray-700 hover:text-indigo-500 font-medium">
          Women
        </Link>
        <Link href="/products/Kids" className="text-gray-700 hover:text-indigo-500 font-medium">
          Kids
        </Link>
        <Link href="/contact" className="text-gray-700 hover:text-indigo-500 font-medium">
          Contact
        </Link>
        <Link href="/cart" className="relative text-gray-700 hover:text-indigo-500 font-medium">
          <ShoppingCart />
          {cartProducts.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full p-1">
              {cartProducts.length}
            </span>
          )}
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {status === "authenticated" ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-indigo-500 font-medium"
            >
              {userName}
            </button>
            {isDropdownOpen && (
              <ul className="absolute top-full right-0 mt-2 w-40 bg-whiteborder-gray-200 rounded-lg shadow-lg z-10">
                <li>
                  <button
                    onClick={() => signOut()}
                    className="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <Link
                    href={'/profile'}
                    className="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => signIn()}
              className="text-gray-700 hover:text-indigo-500 font-medium"
            >
              Login
            </button>
            <Link href="/register" className="text-gray-700 hover:text-indigo-500 font-medium">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Sidebar Button */}
      <button
        className="md:hidden text-gray-700 hover:text-indigo-500 font-medium"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex flex-col items-center justify-center">
          <div className="bg-white p-4 rounded-lg space-y-4">
            <button
              onClick={toggleSidebar}
              className="absolute top-0 right-0 m-4 text-gray-700 hover:text-indigo-500 font-medium"
            >
              &times;
            </button>
            <Link
              href="/"
              className="text-gray-700 hover:text-indigo-500 font-medium"
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              href="/products/Men"
              className="text-gray-700 hover:text-indigo-500 font-medium"
              onClick={handleLinkClick}
            >
              Men
            </Link>
            <Link
              href="/products/Women"
              className="text-gray-700 hover:text-indigo-500 font-medium"
              onClick={handleLinkClick}
            >
              Women
            </Link>
            <Link
              href="/products/Kids"
              className="text-gray-700 hover:text-indigo-500 font-medium"
              onClick={handleLinkClick}
            >
              Kids
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-indigo-500 font-medium"
              onClick={handleLinkClick}
            >
              Contact
            </Link>
            <Link
              href="/cart"
              className="text-gray-700 hover:text-indigo-500 font-medium"
              onClick={handleLinkClick}
            >
              Cart
              {cartProducts.length > 0 && (
                <span className="relative -top-2 -right-2 bg-red-500 text-white text-xs rounded-full p-1">
                  {cartProducts.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
