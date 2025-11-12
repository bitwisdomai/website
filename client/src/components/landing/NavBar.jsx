import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative bg-[#0E0E0E] text-white border-b border-gray-800">
      <div className="flex justify-between items-center px-6 md:px-16 lg:px-24 xl:px-32 py-4">
        {/* Left Section - Nav Links */}
        <div className="hidden lg:flex items-center space-x-10 text-[15px] font-medium tracking-tight">
          <a
            href="#home"
            className="text-cyan-400 hover:text-cyan-300 transition"
          >
            Home
          </a>
          <a href="#about" className="hover:text-cyan-400 transition">
            About
          </a>

          <div className="relative group">
            <button className="hover:text-cyan-400 transition flex items-center gap-1">
              Our Products
              <span className="text-xs">▾</span>
            </button>
            {/* Dropdown Menu (optional) */}
            <div className="absolute hidden group-hover:block bg-[#1A1A1A] border border-gray-700 rounded shadow-lg mt-2 min-w-[180px]">
              <a
                href="#product1"
                className="block px-4 py-2 text-sm hover:bg-gray-800 hover:text-cyan-400"
              >
                Product 1
              </a>
              <a
                href="#product2"
                className="block px-4 py-2 text-sm hover:bg-gray-800 hover:text-cyan-400"
              >
                Product 2
              </a>
            </div>
          </div>

          <a
            href="#qualify"
            className="hover:text-cyan-400 transition whitespace-nowrap"
          >
            Qualifying BW Customers
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition">
            Contact Us
          </a>
        </div>

        {/* Right Section - Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="border border-cyan-400 text-white px-5 py-2 rounded text-sm font-medium hover:bg-[#1A1A1A] transition">
            Product Waitlist
          </button>
          <button className="bg-cyan-400 text-black px-5 py-2 rounded text-sm font-semibold hover:bg-cyan-300 transition">
            Join Our Network
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl text-white"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#1A1A1A] border-t border-gray-800 px-6 py-5 space-y-4">
          <a
            href="#home"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-cyan-400"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-cyan-400"
          >
            About
          </a>
          <a
            href="#products"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-cyan-400"
          >
            Our Products
          </a>
          <a
            href="#qualify"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-cyan-400"
          >
            Qualifying BW Customers
          </a>
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-cyan-400"
          >
            Contact Us
          </a>

          <div className="pt-4 border-t border-gray-700">
            <button className="w-full border border-cyan-400 text-white px-5 py-2 rounded text-sm hover:bg-[#1A1A1A] transition mb-3">
              Product Waitlist
            </button>
            <button className="w-full bg-cyan-400 text-black px-5 py-2 rounded text-sm font-semibold hover:bg-cyan-300 transition">
              Join Our Network
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
