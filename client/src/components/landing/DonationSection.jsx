import React from "react";

const DonationSection = () => {
  return (
    <div className="bg-black text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-center">
          <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
            Help Fund Developing Country Businesses
          </span>
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 text-gray-300 text-center">
          While many consider startup costs of domain name purchase, equipment,
          service subscriptions and funding of lightning channels relatively
          modest, they can be financially insurmountable for those in developing
          countries. For this reason, we welcome generosity from Bitcoiners
          wanting to expand worldwide adoption of Bitcoin. This separately-kept
          crowdfunding campaign goes directly to developing country businesses'
          initial setup costs. Simply click the Donate with Bitcoin button below
          and enter any amount:
        </p>

        {/* Donate Button */}
        <div className="flex justify-center">
          <form
            method="POST"
            action="https://bitpaidhere.com/api/v1/invoices"
            className="w-full sm:w-auto"
          >
            <input
              type="hidden"
              name="storeId"
              value="BbsuwtWGn2i5cTvzeiQdkTgmS7se4DDrFnyrPfrhUqUm"
            />
            <input type="hidden" name="currency" value="USD" />
            <button
              type="submit"
              className="bg-white px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded flex items-center justify-center hover:bg-gray-100 transition w-full sm:w-auto mx-auto"
            >
              <img
                src="https://bitpaidhere.com/Storage/76202d64-3d28-4690-8c9a-af3cf28a263d"
                alt="Pay with BTCPay Server"
                style={{
                  width: "180px",
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationSection;
