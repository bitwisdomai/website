import React from 'react'
import logo from "../../assets/Logo/BitWisdom_Secondary_Logomark_Registered.png";
import { FaFacebook, FaLinkedin, FaYoutube, FaTelegram, FaSearch } from 'react-icons/fa'

const Banner = () => {
  return (
    <div className="bg-black text-white flex justify-between items-center px-28 py-3 border-b border-gray-800">
      {/* Social Icons */}
      <div className="flex gap-6 text-brand-primary">
        <FaFacebook className="cursor-pointer hover:text-white transition text-sm" />
        <FaLinkedin className="cursor-pointer hover:text-white transition text-sm" />
        <FaYoutube className="cursor-pointer hover:text-white transition text-sm" />
        <FaTelegram className="cursor-pointer hover:text-white transition text-sm" />
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
          <option value="en" className="bg-black">English</option>
          <option value="es" className="bg-black">Español</option>
        </select>
      </div>
    </div>
  );
}

export default Banner