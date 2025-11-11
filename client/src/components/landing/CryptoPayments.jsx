import React from 'react'
import { FaCheck } from 'react-icons/fa'

const CryptoPayments = () => {
  const features = [
    'Leverage the leading crypto payment gateways of 2025, created and curated by Bitwisdom',
    'Access the most profitable cryptocurrency marketplace',
    'Lowest market commission and FEES',
    'Flexible Payment for crypto and crypto for your commerce',
    'Receive FIAT crypto payments on compatible wallets',
    'Offer support customers on compatible wallets'
  ]

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Accept and Optimize <br />
              Crypto Payments
            </h2>
            <p className="text-gray-400 mb-8">
              Leverage the leading crypto payment gateways of 2025, created and curated by Bitwisdom
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <FaCheck className="text-brand-primary" />
                  </div>
                  <p className="text-gray-300">{feature}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button className="bg-brand-primary text-black px-6 py-3 rounded font-semibold hover:bg-cyan-400 transition">
                Get Started Now
              </button>
              <button className="border border-gray-600 px-6 py-3 rounded hover:bg-gray-800 transition">
                Create Your Account
              </button>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="relative">
            {/* Placeholder for payment terminal/crypto card image */}
            <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 border-2 border-brand-primary/30">
              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-brand-secondary">BW</div>
                  <div className="text-xs text-gray-600">BLOCKCHAIN WALLET</div>
                </div>
                <div className="mb-4">
                  <div className="text-xs text-gray-600 mb-1">Wallet Address</div>
                  <div className="font-mono text-xs text-gray-800">0x742d...9a8f</div>
                </div>
                <div className="border-t pt-4">
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <div key={num} className="bg-gray-100 p-3 rounded text-center font-semibold text-gray-700">
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Crypto coins */}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center text-4xl">
                ₿
              </div>
              <div className="absolute -right-4 bottom-20 w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-2xl">
                Ξ
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CryptoPayments
