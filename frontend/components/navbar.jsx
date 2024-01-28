"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLargeScreen(window.innerWidth >= 768);

      const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 768);
        setIsSidebarOpen(false);
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

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex pt-10 pb-2 text-white top-0 px-16 z-50 items-center justify-between min-w-full">
      <h1 className="text-2xl md:text-3xl text-left font-bold  tracking-wider font-mono type mr-4">UrbanZeal</h1>
      <button className="text-white text-2xl md:hidden" onClick={toggleSidebar}>
        ☰
      </button>

      {isLargeScreen ? (
        <ul className="flex flex-row space-x-6  ml-auto">
          <li>
            <Link href="/" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products/men" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4">
              Men
            </Link>
          </li>
          <li>
            <Link href="/products/women" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4">
              Women
            </Link>
          </li>
          <li>
            <Link href="/products/kids" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4">
              Kids
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/login" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4">
              Register
            </Link>
          </li>
        </ul>
      ) : (
        <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-45 text-white transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <button className="absolute top-4 right-4 m-4 text-white" onClick={toggleSidebar}>
            &times;
          </button>
          <ul className="py-4 mt-8 space-y-8">
            <li>
              <Link href="/" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/products/men" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4" onClick={handleLinkClick}>
                Men
              </Link>
            </li>
            <li>
              <Link href="/products/women" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4" onClick={handleLinkClick}>
                Women
              </Link>
            </li>
            <li>
              <Link href="/products/kids" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4" onClick={handleLinkClick}>
                Kids
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4" onClick={handleLinkClick}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4" onClick={handleLinkClick}>
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="text-white hover:text-indigo-500 hover:animate-ping font-bold text-2xl ml-4" onClick={handleLinkClick}>
                Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
