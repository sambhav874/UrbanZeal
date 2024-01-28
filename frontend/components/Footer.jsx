// Footer.js
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer bg-gray-900 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Categories</h2>
            <ul>
              <li><Link href="/products/men">Men</Link></li>
              <li><Link href="/products/women">Women</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Follow Us</h2>
            {/* Add social media icons or links */}
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; {new Date().getFullYear()} UrbanZeal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
