import React from "react";
import backgroundImg from "../../assets/backgroundhand.jpg";
import rightImg from "../../assets/newphone.png";

const CryptoPaymentsSection = () => {
  return (
    <section
      className="relative text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-[4px]"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
        {/* Left Content */}
        <div className="z-10 space-y-4 sm:space-y-5 md:space-y-6">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "#A5F3FC",
              textShadow: "0px 0px 10px #38BDF8",
            }}
          >
            Accept and Optimize <br /> Crypto Payments
          </h2>

          <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-lg">
            Leverage the leading crypto payment gateway of 2025, trusted and
            ranked by Forbes.
          </p>

          {/* Bullet Points */}
          <ul className="space-y-2 sm:space-y-3 text-gray-200 text-xs sm:text-sm md:text-base">
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-sky-400 text-base sm:text-lg flex-shrink-0">✔</span>
              <span>Support for 300+ cryptocurrencies and 75+ fiat currencies</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-sky-400 text-base sm:text-lg flex-shrink-0">✔</span>
              <span>Lowest market commission: just 0.5%</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-sky-400 text-base sm:text-lg flex-shrink-0">✔</span>
              <span>Handle up to 1,000 transactions simultaneously</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-sky-400 text-base sm:text-lg flex-shrink-0">✔</span>
              <span>Seamless fiat-to-crypto and crypto-to-fiat conversions</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-sky-400 text-base sm:text-lg flex-shrink-0">✔</span>
              <span>Automatic coin conversion at competitive rates</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-sky-400 text-base sm:text-lg flex-shrink-0">✔</span>
              <span>24/7 dedicated support</span>
            </li>
          </ul>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6">
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-md transition shadow-lg text-sm sm:text-base">
              Get Expert Consultation
            </button>
            <button className="border border-sky-400 text-sky-300 hover:bg-sky-400 hover:text-white font-semibold px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-md transition text-sm sm:text-base">
              Create Your Account
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center md:justify-end">
          <img
            src={rightImg}
            alt="Crypto Payment Terminal"
            className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[720px] h-auto drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]"
          />
        </div>
      </div>
    </section>
  );
};

export default CryptoPaymentsSection;
