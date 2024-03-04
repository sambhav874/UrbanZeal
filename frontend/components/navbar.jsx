"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { CartContext } from "./AppContext";

const Navbar = () => {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  const {cartProducts} = useContext(CartContext);

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
    <div className="flex pt-10 pb-2 text-white top-0 px-16 z-50 items-center justify-between min-w-full">
      <h1 className="text-2xl md:text-3xl text-left font-bold tracking-wider font-mono type mr-4">
        UrbanZeal
      </h1>
      <button
        className="text-white text-2xl md:hidden"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {isLargeScreen ? (
        <ul className="flex flex-row space-x-6 ml-auto">
          <li>
            <Link
              href="/"
              className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products/men"
              className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4"
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              href="/products/women"
              className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4"
            >
              Women
            </Link>
          </li>
          <li>
            <Link
              href="/products/kids"
              className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4"
            >
              Kids
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4"
            >
              Contact
            </Link>
          </li>

          <li>
            <Link href="/cart" >
              Cart
              <button className="text-white relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.995 5.568A.75.75 0 0 1 14.25 6H5.75a.75.75 0 0 1-.745-.636L4.235 2.27a.75.75 0 0 0-1.485.178l.77 3.09H2.75a.75.75 0 0 0 0 1.5h1.28l2.08 8.318a.75.75 0 0 0 .735.582h6.14a.75.75 0 0 0 .743-.653l1.222-8.317h1.28a.75.75 0 0 0 0-1.5h-1.5zM6.114 5.5h7.772L14.177 13H7.736l-1.106-4.404L6.114 5.5zM10 15a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full p-1">
                  {cartProducts?.length}
                </span>
              </button>
            </Link>
          </li>
          <li>

            <div className="relative">
              <Link href={'/profile'}
                className="text-white hover:text-indigo-500 hover:animate-pulse hover:underline duration-500 font-thin text-md ml-4 rounded-full border-2 p-4 m-2 border-white"
                onClick={toggleDropdown}
              >
                {userName}
              </Link>
              {status === "authenticated" && isDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <li>
                    <button
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => signOut()}
                    >
                      Logout
                    </button>
                  </li>

                  

                </ul>
              )}
            </div>
          </li>
        </ul>
      ) : (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-45 text-white transition-all duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 m-4 text-white"
            onClick={toggleSidebar}
          >
            &times;
          </button>
          <ul className="py-4 mt-8 space-y-8">
            <li>
              <Link
                href="/"
                className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products/Men"
                className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4"
                onClick={handleLinkClick}
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                href="/products/Women"
                className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4"
                onClick={handleLinkClick}
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="/products/Kids"
                className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4"
                onClick={handleLinkClick}
              >
                Kids
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4"
                onClick={handleLinkClick}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link href="/cart" >
                <button
                  className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4"
                  onClick={handleLinkClick}
                >
                  Cart
                  <span className="relative -top-2 -right-2 bg-red-500 text-white text-xs rounded-full p-1">
                    {cartProducts.length}
                  </span>
                </button>
              </Link>
            </li>
            <li>
              <div>
                {status === "authenticated" ? (
                  <button
                    className="bg-primary rounded-full text-white px-8 py-2"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                  
                ) : (
                  <>
                    <Link href="/login">Login</Link>
                    <Link
                      href="/register"
                      className="bg-primary rounded-full text-white px-8 py-2"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </li>
            <li>
            <Link href={'/profile'}
                className="text-white hover:text-indigo-500 hover:animate-pulse hover:underline duration-500 font-thin text-md ml-4 rounded-full border-2 p-4 m-2 border-white"
                onClick={toggleDropdown}
              />
            </li>
            
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
