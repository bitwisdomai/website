import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo/BitWisdom_Secondary_Logomark_Registered.png";
import fb_icon from "../../assets/Social/facebook.png";
import insta_icon from "../../assets/Social/instagram.png";
import X_icon from "../../assets/Social/twitter.png";
import pinterest_icon from "../../assets/Social/pin.png";
import { FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="bg-black text-white px-6 md:px-16 lg:px-24 xl:px-32 py-3 border-b border-gray-800 relative">
      <div className="flex justify-between items-center">
        {/* Social Icons */}
        <div className="flex gap-2 sm:gap-4 md:gap-6 text-brand-primary">
          <img src={fb_icon} alt="Facebook" className="cursor-pointer h-5 sm:h-6 md:h-8" loading="lazy" />
          <img src={insta_icon} alt="Instagram" className="cursor-pointer h-5 sm:h-6 md:h-8" loading="lazy" />
          <img src={X_icon} alt="X" className="cursor-pointer h-5 sm:h-6 md:h-8" loading="lazy" />
          <img
            src={pinterest_icon}
            alt="Pintrest"
            className="cursor-pointer h-5 sm:h-6 md:h-8"
            loading="lazy"
          />
        </div>

        {/* Logo - Centered on all screens */}
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <img src={logo} alt="BitWisdom Logo" className="h-8 sm:h-10 md:h-12 cursor-pointer hover:opacity-80 transition" loading="eager" />
        </Link>

        {/* Right Section */}
        <div className="flex gap-2 sm:gap-4 items-center text-xs sm:text-sm">
          <FaSearch className="cursor-pointer hover:text-brand-primary transition" />
          <div className="text-gray-500 hidden sm:block">|</div>
          <select className="bg-transparent border-none text-white cursor-pointer hover:text-brand-primary transition outline-none hidden sm:block">
            <option value="en" className="bg-black">
              English
            </option>
            <option value="es" className="bg-black">
              Español
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Banner;
