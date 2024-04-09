"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { CartContext } from "./AppContext";
import ShoppingCart from './icons/ShoppingCart';

const Navbar = () => {
  const session = useSession();
  const { cartProducts } = useContext(CartContext);
  const { products } = useContext(CartContext);
  console.log(products); // Access products from context
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false); // New state to control visibility of search results

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

  useEffect(() => {
    // Add event listener for clicks outside the search results container
    const handleClickOutside = (event) => {
      if (showSearchResults && !event.target.closest(".search-results")) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSearchResults]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
    setIsDropdownOpen(false);
    setShowSearchResults(false); // Hide search results when clicking on a link
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    filterProducts(e.target.value);
    setShowSearchResults(true); // Show search results when input changes
  };

  const filterProducts = (query) => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  return (
    <div className="bg-white shadow-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="items-center space-x-4 w-full relative">
        <input
          type="text"
          placeholder="Search products..."
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 w-full"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        {showSearchResults && filteredProducts.length > 0 && (
          <div className="absolute z-40 w-full bg-white border border-gray-300 rounded-md shadow-lg search-results">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-2 border-b border-gray-300">
                <Link href={`/product/${product.id}`}>
                  <p className="text-gray-700 font-medium cursor-pointer transition duration-300 ease-in-out hover:text-indigo-500 hover:bg-gray-100 rounded-md px-2 py-1">
                    {product.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex space-x-6">
        <Link href="/" className="text-gray-700 hover:text-indigo-500 font-medium">
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
              <ul className="absolute top-full right-0 mt-2 w-40 bg-white border-gray-200 rounded-lg shadow-lg z-10">
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
