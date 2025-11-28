import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const BitWisdom = () => {
  const [isUSAExpanded, setIsUSAExpanded] = useState(false);
  const [isGlobalExpanded, setIsGlobalExpanded] = useState(false);

  const points = [
    "Are you motivated to make profit unlocking an unrealized revenue stream? Then let's get started!",
    "Profit has been made mining, staking, trading and holding cryptocurrency, and now profit can be made facilitating transactions.",
    "How did we come up with a way for you to make profit facilitating crypto transactions?",
    "We always wondered why we couldn't use crypto in everyday life, so surely someone had thought of a way.",
    "After months of research, we found no one had created a way to use crypto daily, so we set out to make this a reality!",
    "We wanted transactions to be decentralized, private, secure, fast, simple and at the lowest fees possible.",
    "We realized our goal would be to embrace today's technology with the use of automation and Ai.",
    "We started the cybersecurity from the ground up with a patent-pending Clearnet connection method, which is now implemented on all nodes.",
    "We chose the gold-standard, Bitcoin, but chose the lightning network for speed.",
    "We modeled our entire patent-pending automated system after the Bitcoin blockchain, to make it as decentralized and redundant as possible.",
    "We wanted to create an incentive for businesses to run their own node and onboard merchants.",
    "After 12 patent-pending technologies, we've created inventions we feel honored to share with the world.",
    "Some businesses have spent voluminous capital to implement systems to accept cryptocurrency and yet others are amassing it.",
    "Businesses today are building their own Bitcoin Strategic Reserve, and you can too:",
    "We've created the incentive for your business to run a crypto node; we define as an automated cryptocurrency transactional facilitation server.",
    "Sounds complicated? We've done the heavy lifting on the back-end to provide a simpler experience.",
    "Choose your own hardware, our hardware or cloud-based node. We can advise this based on your needs.",
    "You take care of the modest initial up-front investment and leave the deployment to us.",
    "Onboard the merchants you're already serving who already trust you with our simple onboarding app.",
    "If your merchants download, buy or already have a supported crypto wallet, they can start accepting Bitcoin in as little as 30 minutes.",
    "We've designed our tiered licensing fee structure to allow your business to become cash flow positive quicker, based on merchant transactions.",
    "We've created accounting and reporting systems for your business and your merchant's stores.",
    "Our focus on uptime, high availability, redundancy and disaster recovery provides your business with node self-healing and automated backup.",
    "We allow any of our customers to run their own Ai system server to take full advantage of our node self-healing technology.",
    "Never-before-seen Ai technology allows all crypto nodes worldwide to work in a collaborative, cooperative way for lowest fee settlement.",
    "A win-win for everyone, your merchants save on transaction processing fees and you get a residual.",
    "Our system has no merchant chargebacks or PCI Compliance!",
    "Contact us or schedule a callback today to transform your merchant network!",
    "We strive for fairness for all and have implemented a cost-of-living adjustment for all other countries.",
    "This means that our licensing fees are much lower for many countries.",
    "We're sacrificing licensing fees for a fairer system for all, but we believe in the worldwide adoption of Bitcoin.",
  ];

  return (
    <section className="bg-black text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-32">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-center px-2">
        <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
          Get to know BitWisdom AI Network
        </span>
      </h1>
      <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-10 sm:mb-12 md:mb-16 text-center px-2">
        Explore tailored insights for Qualifying BitWisdom Customers
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 w-full max-w-[1500px] px-2 items-start">
        {/* USA Card */}
        <div className="bg-neutral-900 rounded-md shadow-lg shadow-cyan-900/20 hover:shadow-cyan-400/30 transition transform hover:-translate-y-1 p-6 sm:p-8 md:p-10">
          <h2 className="text-cyan-400 font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
            USA Potential Customers Only
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-4 sm:mb-5">
            Learn about exclusive licensing and opportunities available for
            customers in the United States.
          </p>
          <button
            type="button"
            onClick={() => setIsUSAExpanded(!isUSAExpanded)}
            className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm md:text-base font-semibold hover:underline transition"
          >
            Learn more
            {isUSAExpanded ? (
              <FaChevronUp className="transition-transform" />
            ) : (
              <FaChevronDown className="transition-transform" />
            )}
          </button>

          {/* Expandable Content */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              isUSAExpanded
                ? "max-h-[3000px] opacity-100 mt-6"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-gray-700 pt-6 space-y-4">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex gap-3 text-gray-300 hover:text-white transition-colors"
                  style={{
                    animation: isUSAExpanded
                      ? `fadeInUp 0.5s ease-out ${index * 0.03}s both`
                      : "none",
                  }}
                >
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                    {index + 1}
                  </span>
                  <p className="flex-1 leading-relaxed text-xs sm:text-sm md:text-base">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Card */}
        <div className="bg-neutral-900 rounded-md shadow-lg shadow-cyan-900/20 hover:shadow-cyan-400/30 transition transform hover:-translate-y-1 p-6 sm:p-8 md:p-10">
          <h2 className="text-cyan-400 font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
            Potential Customers in All Other Countries
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-4 sm:mb-5">
            Learn the benefits of joining BitWisdom AI Network as a business in
            any other part of the world.
          </p>
          <button
            type="button"
            onClick={() => setIsGlobalExpanded(!isGlobalExpanded)}
            className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm md:text-base font-semibold hover:underline transition"
          >
            Learn more
            {isGlobalExpanded ? (
              <FaChevronUp className="transition-transform" />
            ) : (
              <FaChevronDown className="transition-transform" />
            )}
          </button>

          {/* Expandable Content */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              isGlobalExpanded
                ? "max-h-[3000px] opacity-100 mt-6"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-gray-700 pt-6 space-y-4">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex gap-3 text-gray-300 hover:text-white transition-colors"
                  style={{
                    animation: isGlobalExpanded
                      ? `fadeInUp 0.5s ease-out ${index * 0.03}s both`
                      : "none",
                  }}
                >
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                    {index + 1}
                  </span>
                  <p className="flex-1 leading-relaxed text-xs sm:text-sm md:text-base">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default BitWisdom;
