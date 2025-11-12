import React from "react";
import antiquatedImg from "../../assets/Group-112.png";
import phoneImg from "../../assets/phone.png";
import logoImg from "../../assets/wocommerce.png";
import newImg from "../../assets/shopify.png";
import logImg from "../../assets/drupal.png";

// import bitcoinCoins from "../../assets/bitcoin-coins.png"; // Optional: or include in same image as phone

const PaymentTransition = () => {
  return (
    <section
      className="relative py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 flex items-center justify-center text-white"
      style={{
        backgroundColor: "#111827",
        backgroundImage:
          "radial-gradient(circle at top, #1a1a2e 0%, #0c0c18 90%)",
      }}
    >
      <div className="max-w-6xl mx-auto w-full text-center">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "#A5F3FC",
              textShadow: "0 0 8px #38BDF8",
            }}
          >
            From Antiquated
          </h2>

          {/* Arrow */}
          <svg
            width="60"
            height="30"
            viewBox="0 0 80 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-sky-400 w-12 h-6 sm:w-16 sm:h-8 md:w-20 md:h-10 transform rotate-90 sm:rotate-0"
          >
            <path
              d="M5 20H75M75 20L60 5M75 20L60 35"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "#A5F3FC",
              textShadow: "0 0 8px #38BDF8",
            }}
          >
            To Innovative
          </h2>
        </div>

        {/* Images Row */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Left Image */}
          <div className="flex justify-center items-start">
            <img
              src={antiquatedImg}
              alt="Old payment terminal"
              className="w-full max-w-[140px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[380px] h-auto drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
            />
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center justify-start text-center">
            {/* Phone Image */}
            <div className="relative flex items-center justify-center mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              <img
                src={phoneImg}
                alt="Bitwisdom phone"
                className="w-full max-w-[120px] sm:max-w-[160px] md:max-w-[220px] lg:max-w-[250px] h-auto drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]"
              />
            </div>

            {/* E-commerce Platforms */}
            <p
              className="text-sky-200 text-[9px] sm:text-xs md:text-sm lg:text-base mb-2 sm:mb-3 md:mb-4 px-2 sm:px-4"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Also Supports Leading E-Commerce Platforms
            </p>

            {/* Platform Logos */}
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-3 mb-1 sm:mb-2 md:mb-3 px-2 sm:px-4">
              <img
                src={newImg} // ✅ use imported image here
                alt="Shopify"
                className="h-3 sm:h-4 md:h-6 lg:h-8 bg-white p-0.5 sm:p-1 rounded"
              />
              <img
                src={logoImg} // ✅ use imported image here
                alt="WooCommerce Logo"
                className="h-3 sm:h-4 md:h-6 lg:h-8 bg-white p-0.5 sm:p-1 rounded"
              />
              <img
                src={newImg} // ✅ use imported image here
                alt="Shopify"
                className="h-3 sm:h-4 md:h-6 lg:h-8 bg-white p-0.5 sm:p-1 rounded"
              />
              <img
                src={logImg} // ✅ use imported image here
                alt="Drupal"
                className="h-3 sm:h-4 md:h-6 lg:h-8 bg-white p-0.5 sm:p-1 rounded"
              />
              <img
                src={logImg} // ✅ use imported image here
                alt="Drupal"
                className="h-3 sm:h-4 md:h-6 lg:h-8 bg-white p-0.5 sm:p-1 rounded"
              />
            </div>

            <p className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs px-2 sm:px-4">
              *Our POS system is the core — eCommerce integrations are available
              as add-ons.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentTransition;
