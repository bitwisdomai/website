import React from "react";
import logo from "../../assets/Logo/BitWisdom_Secondary_Logomark_Registered.png";
import phoneImg from "../../assets/footerback.jpg";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaPinterestP,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${phoneImg})`,
        }}
      ></div>

      {/* Black gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/95"></div>

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-12 md:py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <img
              src={logo}
              alt="BitWisdom Logo"
              className="h-14 md:h-16 mb-4 object-contain"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              BitWisdom AI Network has built and continues to build the future
              of crypto payments with patent-pending automated compliance and
              reporting tools.
            </p>

            <div className="flex items-center gap-4 text-gray-400 text-lg">
              <FaFacebookF className="cursor-pointer hover:text-cyan-400 transition" />
              <FaInstagram className="cursor-pointer hover:text-cyan-400 transition" />
              <FaXTwitter className="cursor-pointer hover:text-cyan-400 transition" />
              <FaPinterestP className="cursor-pointer hover:text-cyan-400 transition" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cyan-400 font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Qualifying BW Customers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-cyan-400 font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  AML/KYC Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  License Agreement
                </a>
              </li>
            </ul>
          </div>

          {/* Unique Solutions */}
          <div>
            <h3 className="text-cyan-400 font-semibold text-lg mb-4">
              Unique Solutions
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition font-semibold"
                >
                  Mobile Phone Crypto Node
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Laptop Crypto Node
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Our Software
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Decentralized AI
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Clearnet Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Node Self-Healing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Automated Backup
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Mobile App for Sales
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-3 sm:mb-0">
            ©2025{" "}
            <span className="text-cyan-400 font-semibold">
              BitWisdom AI Network TM
            </span>
          </p>
          <p>
            Design & Development By{" "}
            <a
              href="#"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              Tapvera
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
