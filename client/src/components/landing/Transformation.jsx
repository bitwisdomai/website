import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const Transformation = () => {
  return (
    <div className="bg-black text-white py-20 px-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-8 mb-16">
          <h2 className="text-4xl font-bold">From Antiquated</h2>
          <FaArrowRight className="text-brand-primary text-3xl" />
          <h2 className="text-4xl font-bold">To Innovative</h2>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left Side - Old Method */}
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
              {/* Placeholder for credit card machine image */}
              <div className="text-6xl">💳</div>
            </div>
            <p className="text-center text-gray-400">
              Traditional payment terminals with high fees and limited accessibility
            </p>
          </div>

          {/* Right Side - New Method */}
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-lg flex items-center justify-center mb-6 border-2 border-brand-primary">
              {/* Placeholder for crypto payment image */}
              <div className="text-6xl">₿</div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3">
                New Blueprint by Launching E-Commerce Businesses
              </h3>
              <div className="flex justify-center gap-3 flex-wrap">
                <span className="bg-gray-800 px-4 py-2 rounded text-sm">Shopify</span>
                <span className="bg-gray-800 px-4 py-2 rounded text-sm">WooCommerce</span>
                <span className="bg-gray-800 px-4 py-2 rounded text-sm">Magento</span>
                <span className="bg-gray-800 px-4 py-2 rounded text-sm">BigCommerce</span>
                <span className="bg-gray-800 px-4 py-2 rounded text-sm">PrestaShop</span>
              </div>
              <p className="text-gray-400 mt-4">
                *Use the platform that best fits your business or explore this innovative marketplace!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transformation
