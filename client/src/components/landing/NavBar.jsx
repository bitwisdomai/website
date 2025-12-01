import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import QualifyingForm from "../qualifying/QualifyingForm";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showQualifyingForm, setShowQualifyingForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  // Handler for Product Waitlist button
  const handleProductWaitlist = () => {
    setIsMenuOpen(false); // Close mobile menu if open

    if (location.pathname === "/products") {
      // If already on products page, just scroll to the waitlist buttons section
      const section = document.getElementById("waitlist-buttons");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      // Navigate to products page with hash
      navigate("/products#waitlist-buttons");
    }
  };

  // Handler for Join Our Network button
  const handleJoinNetwork = () => {
    setIsMenuOpen(false); // Close mobile menu if open
    setShowQualifyingForm(true); // Open qualifying form
  };

  return (
    <nav className="relative bg-[#0E0E0E] text-white border-b border-gray-800 overflow-visible">
      <div className="flex w-full items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4">
        {/* Centered Nav Links with Equal Spacing */}
        <div className="hidden lg:flex items-center justify-center gap-20 text-[15px] font-medium tracking-tight flex-1">
          <Link
            to="/"
            className={`${
              isActive("/") ? "text-cyan-400" : "hover:text-cyan-400"
            } transition`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`${
              isActive("/about") ? "text-cyan-400" : "hover:text-cyan-400"
            } transition`}
          >
            About
          </Link>
          <Link
            to="/blog"
            className={`${
              isActive("/blog") ? "text-cyan-400" : "hover:text-cyan-400"
            } transition`}
          >
            Blog
          </Link>

          <Link
            to="/products"
            className={`${
              isActive("/products") ? "text-cyan-400" : "hover:text-cyan-400"
            } transition`}
          >
            Our Products
          </Link>

          <Link
            to="/qualifying"
            className={`${
              isActive("/qualifying") ? "text-cyan-400" : "hover:text-cyan-400"
            } transition whitespace-nowrap`}
          >
            Qualifying BW Customers
          </Link>
          <Link
            to="/contact"
            className={`${
              isActive("/contact") ? "text-cyan-400" : "hover:text-cyan-400"
            } transition`}
          >
            Contact Us
          </Link>

          {/* Grouped Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleProductWaitlist}
              className="border border-cyan-400 text-white px-5 py-2 rounded text-sm font-medium hover:bg-[#1A1A1A] transition"
            >
              Product Waitlist
            </button>
            <button
              onClick={handleJoinNetwork}
              className="bg-cyan-400 text-black px-5 py-2 rounded text-sm font-semibold hover:bg-cyan-300 transition"
            >
              Join Our Network
            </button>
          </div>
        </div>

        {/* Mobile Menu Button - aligned to the right */}
        <div className="lg:hidden flex items-center gap-3 ml-auto">
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
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={`block ${
              isActive("/") ? "text-cyan-400" : "hover:text-cyan-400"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className={`block ${
              isActive("/about") ? "text-cyan-400" : "hover:text-cyan-400"
            }`}
          >
            About
          </Link>
          <Link
            to="/blog"
            onClick={() => setIsMenuOpen(false)}
            className={`block ${
              isActive("/blog") ? "text-cyan-400" : "hover:text-cyan-400"
            }`}
          >
            Blog
          </Link>
          <Link
            to="/products"
            onClick={() => setIsMenuOpen(false)}
            className={`block ${
              isActive("/products") ? "text-cyan-400" : "hover:text-cyan-400"
            }`}
          >
            Our Products
          </Link>
          <Link
            to="/qualifying"
            onClick={() => setIsMenuOpen(false)}
            className={`block ${
              isActive("/qualifying") ? "text-cyan-400" : "hover:text-cyan-400"
            }`}
          >
            Qualifying BW Customers
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className={`block ${
              isActive("/contact") ? "text-cyan-400" : "hover:text-cyan-400"
            }`}
          >
            Contact Us
          </Link>

          <div className="pt-4 border-t border-gray-700">
            <button
              onClick={handleProductWaitlist}
              className="w-full border border-cyan-400 text-white px-5 py-2 rounded text-sm hover:bg-[#1A1A1A] transition mb-3"
            >
              Product Waitlist
            </button>
            <button
              onClick={handleJoinNetwork}
              className="w-full bg-cyan-400 text-black px-5 py-2 rounded text-sm font-semibold hover:bg-cyan-300 transition"
            >
              Join Our Network
            </button>
          </div>
        </div>
      )}

      {/* Qualifying Form Modal */}
      {showQualifyingForm && (
        <QualifyingForm onClose={() => setShowQualifyingForm(false)} />
      )}
    </nav>
  );
};

export default Navbar;
