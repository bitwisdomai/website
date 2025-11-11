import React from 'react'
import logo from "../../assets/Logo/BitWisdom_Secondary_Logomark_Registered.png";
import { FaFacebook, FaLinkedin, FaYoutube, FaTelegram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="px-28 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-12 mb-12">
            {/* Logo and Description */}
            <div className="col-span-1">
              <img src={logo} alt="BitWisdom Logo" className="h-12 mb-4" />
              <p className="text-gray-400 text-sm mb-6">
                To lead the future of cypto infrastructure with secure AI empowered crypto node services
              </p>
              <div className="flex gap-4">
                <FaFacebook className="text-brand-primary cursor-pointer hover:text-white transition" />
                <FaLinkedin className="text-brand-primary cursor-pointer hover:text-white transition" />
                <FaYoutube className="text-brand-primary cursor-pointer hover:text-white transition" />
                <FaTelegram className="text-brand-primary cursor-pointer hover:text-white transition" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">Our Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">Contact Us</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">Investor Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">KYC / AML Statement</a></li>
              </ul>
            </div>

            {/* Unique Solutions */}
            <div>
              <h3 className="font-bold mb-4">Unique Solutions</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">Hosting Crypto Currency</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">Crypto Payments</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">Our Software</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">Merchant System</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">Node Selt-hosting</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary transition">AI Driven Intelligence</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex justify-between items-center text-sm text-gray-400">
            <p>© 2025 Bitwisdom AI Network ™. All rights reserved</p>
            <p>
              Design & Development by{' '}
              <a href="#" className="text-brand-primary hover:text-cyan-400 transition">
                Tapvera
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
