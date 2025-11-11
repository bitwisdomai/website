import React, { useState } from 'react'

const ProfitEstimator = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000)
  const [monthlyCost, setMonthlyCost] = useState(10000)

  const estimatedProfit = monthlyRevenue - monthlyCost
  const annualProfit = estimatedProfit * 12

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-4">
          Total Profit Estimator - Running A Crypto Node On The Bitwisdom AI Network
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Here is what you can expect to start earning with your operating businesses
        </p>

        {/* Calculator Card */}
        <div className="bg-white text-gray-900 rounded-lg p-8 shadow-2xl">
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Left Side - Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Combined Monthly Transaction Value
                </label>
                <input
                  type="number"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Estimated Average Profit Share (% Owner)
                </label>
                <input
                  type="text"
                  value="80"
                  readOnly
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Blockchain Average Cost Per Month
                </label>
                <input
                  type="number"
                  value={monthlyCost}
                  onChange={(e) => setMonthlyCost(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-brand-primary"
                />
              </div>

              <button className="w-full bg-brand-primary text-black py-3 rounded font-semibold hover:bg-cyan-400 transition">
                Calculate Estimated Profit
              </button>

              <p className="text-xs text-gray-600 leading-relaxed">
                * Estimated profit is calculated based on the combined monthly transaction value minus blockchain costs.
                Actual profits may vary depending on market conditions and operational expenses.
              </p>
            </div>

            {/* Right Side - Results */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Estimated Monthly Profit In Node Owner
                </label>
                <div className="text-3xl font-bold text-brand-secondary">
                  ${estimatedProfit.toLocaleString()}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Estimated Annual Profit
                </label>
                <div className="text-3xl font-bold text-green-600">
                  ${annualProfit.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <button className="w-full border border-gray-300 text-gray-700 py-3 rounded font-semibold hover:bg-gray-100 transition">
            Reset To Defaults
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfitEstimator
