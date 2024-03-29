import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white mt-8 shadow-lg p-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-bold mb-4 text-black">Quick Links</h2>
            <ul>
              <li><Link href="/about" className="text-gray-700 hover:text-indigo-500">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-700 hover:text-indigo-500">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 text-black">Categories</h2>
            <ul>
              <li><Link href="/products/men" className="text-gray-700 hover:text-indigo-500">Men</Link></li>
              <li><Link href="/products/women" className="text-gray-700 hover:text-indigo-500">Women</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 text-black">Follow Us</h2>
            {/* Add social media icons or links */}
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
