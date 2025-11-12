import React from "react";
import rightImg from "../../assets/bitback.jpg";

const CryptoNodeSection = () => {
  return (
    <section
      className="relative bg-black text-white min-h-screen flex items-center justify-end px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-12 sm:py-16 md:py-20 overflow-hidden"
      style={{
        backgroundImage: `url(${rightImg})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Slightly lighter overlay for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-l from-black via-black/70 to-black/40"></div>

      {/* Content aligned to the right */}
      <div className="relative z-10 w-full md:w-2/3 lg:w-1/2 xl:w-5/12 text-right">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-300 mb-4 sm:mb-6 font-orbitron leading-snug">
          Why run a crypto node <br /> in the BitWisdom AI Network?
        </h1>

        <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
          Tap into a fast-growing worldwide market, reduce merchant processing
          fees, and unlock a new revenue stream.
        </p>

        <ul className="space-y-4 sm:space-y-6 text-gray-200">
          <li>
            <span className="text-cyan-400 font-semibold text-sm sm:text-base">
              💠 Over 1 Billion Crypto Holders (2025 Forecast)
            </span>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              The number of global crypto users has exploded — rising from
              250M to 1B in just a few years. Ignoring this customer base
              means leaving money on the table.
            </p>
          </li>

          <li>
            <span className="text-cyan-400 font-semibold text-sm sm:text-base">
              💠 $4.5 Billion in Crypto Payments (Q1 2025 Alone)
            </span>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Businesses around the world are already embracing crypto. Don't
              get left behind — stay ahead of your competition.
            </p>
          </li>

          <li>
            <span className="text-cyan-400 font-semibold text-sm sm:text-base">
              💠 40% of Gen Z & Millennials Plan to Use Crypto for Payments in
              2025
            </span>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              A massive shift in consumer behavior is underway. 1 in 10 say
              they'll use crypto regularly for purchases.
            </p>
          </li>

          <li>
            <span className="text-cyan-400 font-semibold text-sm sm:text-base">
              💠 Save Your Merchants More with Every Transaction
            </span>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Crypto transaction fees are 50–90% lower than traditional
              payment processors — a win-win for everyone with more profit
              straight to your merchant's bottom line.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CryptoNodeSection;
