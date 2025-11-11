import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const GetToKnow = () => {
  return (
    <div className="bg-black text-white py-20 px-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-16">
          Get to know Bitwisdom AI Network
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* USA Registered Customers Card */}
          <div className="bg-gradient-to-br from-red-900/30 to-red-950/30 border border-red-800 rounded-lg p-8 hover:border-red-600 transition">
            <h3 className="text-2xl font-bold mb-4 text-red-400">
              USA Registered Customers Only
            </h3>
            <p className="text-gray-300 mb-6">
              Learn about exclusive business and opportunities available for USA registered customers and how you can get started with our platform.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition font-semibold">
              Learn more <FaArrowRight />
            </a>
          </div>

          {/* Potential Customers Card */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-800 rounded-lg p-8 hover:border-blue-600 transition">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              Potential Customers In 50 Other Countries
            </h3>
            <p className="text-gray-300 mb-6">
              Discover new international businesses you can join and expand your operations to serve our global network.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition font-semibold">
              Learn more <FaArrowRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetToKnow
