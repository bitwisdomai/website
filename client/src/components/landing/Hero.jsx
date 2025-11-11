import React from 'react'

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-950 via-gray-900 to-black text-white">
      {/* Navigation Bar */}
      <div className="flex justify-between items-center px-28 py-4 border-b border-gray-800">
        <div className="flex gap-8 text-sm">
          <a href="#home" className="hover:text-brand-primary transition cursor-pointer">Home</a>
          <a href="#about" className="hover:text-brand-primary transition cursor-pointer">About</a>
          <a href="#products" className="hover:text-brand-primary transition cursor-pointer">Our Products</a>
          <a href="#qualify" className="hover:text-brand-primary transition cursor-pointer">Qualify For Customers</a>
          <a href="#contact" className="hover:text-brand-primary transition cursor-pointer">Contact Us</a>
        </div>
        <div className="flex gap-4">
          <button className="border border-gray-600 px-5 py-2 rounded text-sm hover:bg-gray-800 transition">
            Product Details
          </button>
          <button className="bg-brand-primary text-black px-5 py-2 rounded text-sm font-semibold hover:bg-cyan-400 transition">
            Get Started
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative px-28 py-20 flex items-center min-h-[600px]">
        {/* Background Image Overlay */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30">
          <div className="w-full h-full bg-gradient-to-l from-brand-primary/20 to-transparent"></div>
        </div>

        {/* Left Content */}
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            "Bitwisdom AI Network™
          </h1>
          <p className="text-3xl mb-6 italic">
            Featuring AI Technology - <br />
            A Game Changer for Humanity
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 mb-8">
            <button className="bg-brand-primary text-black px-6 py-3 rounded font-semibold hover:bg-cyan-400 transition">
              Pay Your Own Crypto Node
            </button>
            <button className="border border-brand-primary text-brand-primary px-6 py-3 rounded font-semibold hover:bg-brand-primary/10 transition">
              Evaluate A Business
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-16 space-y-4">
            <div className="inline-block bg-brand-primary text-black px-4 py-2 rounded text-sm font-semibold mb-4">
              Run Your Operating Crypto Businesses
            </div>

            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-brand-primary">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Placeholder for Image */}
        <div className="absolute right-28 top-1/2 -translate-y-1/2 w-96 h-96 opacity-50">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-primary/30 to-blue-500/20 blur-3xl"></div>
        </div>
      </div>
    </div>
  )
}

export default Hero