import React, { useState, useEffect } from "react";

const ProfitCalculator = () => {
  const [monthlyTransactions, setMonthlyTransactions] = useState(50000);
  const [profitPercentage, setProfitPercentage] = useState(1.25);
  const [profitShare, setProfitShare] = useState(50);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const [annualProfit, setAnnualProfit] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);

  const calculateUSAFee = (totalAmount) => {
    // Calculate the tier based on $16,000 increments
    // Tier 1: $0-$16,000 = $100
    // Tier 2: $16,001-$32,000 = $200
    // Tier 3: $32,001-$48,000 = $300
    // ... up to Tier 10 and beyond: $160,000+ = $1,000 (capped)
    const tier = Math.ceil(totalAmount / 16000);
    const fee = Math.min(tier * 100, 1000);

    return fee;
  };

  const calculateUSAProfit = (totalAmount, percentage) => {
    // Calculate gross profit based on configurable percentage
    const grossProfit = totalAmount * (percentage / 100);

    // Calculate the tiered fee
    const fee = calculateUSAFee(totalAmount);

    // Net profit is gross profit minus the fee
    const netProfit = grossProfit - fee;

    // Return 0 if net profit is negative (shouldn't happen with proper amounts)
    return netProfit > 0 ? netProfit : 0;
  };

  const calculateProfit = () => {
    // Convert empty strings to 0 for calculations
    const transactions = Number(monthlyTransactions) || 0;
    const percentage = Number(profitPercentage) || 0;
    const share = Number(profitShare) || 0;

    // Calculate total net profit after fees
    const totalNetProfit = calculateUSAProfit(transactions, percentage);

    // Split profit based on profit share percentage
    const nodeOwnerProfit = totalNetProfit * (share / 100);
    const merchantSavings = totalNetProfit * ((100 - share) / 100);

    setMonthlyProfit(nodeOwnerProfit);
    setAnnualProfit(nodeOwnerProfit * 12);
    setMonthlySavings(merchantSavings);
  };

  useEffect(() => {
    calculateProfit();
  }, [monthlyTransactions, profitPercentage, profitShare]);

  const resetToDefaults = () => {
    setMonthlyTransactions(50000);
    setProfitPercentage(1.25);
    setProfitShare(50);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-4 pb-10"
      style={{
        background: "radial-gradient(circle at top, #0c1220 0%, #000814 80%)",
        color: "#E0E7FF",
      }}
    >
      {/* Heading Section */}
      <div className="text-center mb-10">
        <h1
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: "#A5F3FC",
            textShadow: "0px 0px 12px #38BDF8",
          }}
        >
          Total Profit Estimator – Running A Crypto Node On The Bitwisdom AI
          Network
        </h1>
        <p className="text-sky-200 text-sm md:text-base">
          There will be one input and two outputs of monthly and annual profit.
        </p>
      </div>

      {/* Calculator Box */}
      <div className="bg-white/95 text-gray-800 border border-gray-300 rounded-lg shadow-lg max-w-4xl w-full p-8">
        <div className="grid md:grid-cols-[1fr_300px] gap-8 items-start">
          {/* Left Section */}
          <div>
            <div className="mb-6">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Combined Monthly Transactions (USD)
              </label>
              <input
                type="number"
                value={monthlyTransactions}
                onChange={(e) => {
                  const value = e.target.value;
                  setMonthlyTransactions(value === "" ? "" : Number(value));
                }}
                onFocus={(e) => e.target.select()}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Profit Percentage (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={profitPercentage}
                onChange={(e) => {
                  const value = e.target.value;
                  setProfitPercentage(value === "" ? "" : Number(value));
                }}
                onFocus={(e) => e.target.select()}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <p className="text-gray-500 text-xs mt-1">
                The percentage of the total transaction amount used to calculate gross profit (default 1.25%).
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Merchant Residual Profit Share to Node Owner (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={profitShare}
                onChange={(e) => {
                  const value = e.target.value;
                  setProfitShare(value === "" ? "" : Number(value));
                }}
                onFocus={(e) => e.target.select()}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <p className="text-gray-500 text-xs mt-1">
                What percent of the savings/residual profit flows to the
                business running the node (default 50%).
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={calculateProfit}
                className="bg-sky-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-sky-600 transition"
              >
                Calculate Estimated Profit
              </button>
              <button
                onClick={resetToDefaults}
                className="border border-gray-400 text-gray-700 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Reset to Defaults
              </button>
            </div>

            <p className="text-gray-500 text-xs leading-relaxed mt-6">
              *Does not account for initial equipment costs, subscription
              services, electricity, etc. All other countries will have a
              cost-of-living comparison to USA calculation adjustment to make
              the system fair and affordable for everyone. For qualifying
              Bitwisdom AI Network customers considered as high-transactional
              volume merchants/institutions, the total profit will be even more
              favorable.
            </p>
          </div>

          {/* Right Section */}
          <div className="bg-sky-50 rounded-md p-6 border border-sky-100 shadow-inner">
            <div className="mb-6">
              <p className="text-gray-700 text-sm font-medium mb-1">
                Estimated Monthly Profit to Node Owner
              </p>
              <p className="text-sky-600 text-4xl font-bold">
                ${monthlyProfit.toFixed(0)}
              </p>
            </div>

            <div className="border-t border-gray-300 my-5"></div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 text-sm font-medium mb-1">
                  Estimated Annual Profit
                </p>
                <p className="text-sky-600 text-xl font-bold">
                  ${annualProfit.toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium mb-1">
                  Monthly Savings (All Merchants)
                </p>
                <p className="text-sky-600 text-xl font-bold">
                  ${monthlySavings.toFixed(0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;
