import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const customFontStyle = {
    fontFamily: 'Poppins, sans-serif' // Use the imported font name here
  };
  return (
    <footer className="bg-white mt-8 shadow-lg p-4">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h2 style={customFontStyle} className="text-2xl font-light mb-4 text-black">Quick Links</h2>
            <ul>
              <li><Link href="/about" className="text-gray-700 text-lg font-extralight hover:text-indigo-500">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-700 text-lg font-extralight hover:text-indigo-500">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h2 style={customFontStyle} className="text-2xl font-light mb-4 text-black">Categories</h2>
            <ul>
              <li><Link href="/products/Men" className="text-gray-700 font-extralight text-lg hover:text-indigo-500">Men</Link></li>
              <li><Link href="/products/Women" className="text-gray-700 text-lg font-extralight hover:text-indigo-500">Women</Link></li>
              <li><Link href="/products/Kids" className="text-gray-700 text-lg font-extralight hover:text-indigo-500">Kids</Link></li>
            </ul>
          </div>
          <div>
            <h2 style={customFontStyle} className="text-2xl font-light mb-4  text-black">Follow Us</h2>
            <ul className="flex flex-col space-x-4">
              <li><a href="https://twitter.com" className="text-black text-lg font-extralight hover:text-indigo-500">Twitter</a></li>
              <li><a href="https://instagram.com" className="text-gray-700 text-lg font-extralight hover:text-indigo-500">Instagram</a></li>
              <li><a href="https://linkedin.com" className="text-gray-700 text-lg font-extralight hover:text-indigo-500">LinkedIn</a></li>
              <li><a href="https://github.com" className="text-gray-700 text-lg font-extralight hover:text-indigo-500">GitHub</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-gray-700">&copy; {new Date().getFullYear()} UrbanZeal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
