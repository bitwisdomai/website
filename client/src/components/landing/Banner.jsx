import React from 'react'
import logo from "../../assets/Logo/BitWisdom_Secondary_Logomark_Registered.png";
import fb_icon from "../../assets/Social/facebook.png";
import insta_icon from "../../assets/Social/instagram.png";
import X_icon from "../../assets/Social/twitter.png";
import pinterest_icon from "../../assets/Social/pinterest.png";
import { FaSearch } from 'react-icons/fa'

const Banner = () => {
  return (
    <div className="bg-black text-white flex justify-between items-center px-28 py-3 border-b border-gray-800">
      {/* Social Icons */}
      <div className="flex gap-6 text-brand-primary">
        <img src={fb_icon} alt="Facebook" className="cursor-pointer h-8" />
        <img src={insta_icon} alt="Instagram" className="cursor-pointer h-8" />
        <img src={X_icon} alt="X" className="cursor-pointer h-8" />
        <img src={pinterest_icon} alt="Pintrest" className="cursor-pointer h-8" />
      </div>

      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="BitWisdom Logo" className="h-12" />
      </div>

      {/* Right Section */}
      <div className="flex gap-4 items-center text-sm">
        <FaSearch className="cursor-pointer hover:text-brand-primary transition" />
        <div className="text-gray-500">|</div>
        <select className="bg-transparent border-none text-white cursor-pointer hover:text-brand-primary transition outline-none">
          <option value="en" className="bg-black">
            English
          </option>
          <option value="es" className="bg-black">
            Español
          </option>
        </select>
      </div>
    </div>
  );
}

export default Banner