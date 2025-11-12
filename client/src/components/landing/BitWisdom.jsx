import React from "react";

const BitWisdom = () => {
  return (
    <section className="bg-black text-white flex flex-col items-center justify-center px-6 pt-10 pb-24">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-2 text-center font-orbitron">
        Get to know BitWisdom AI Network
      </h1>
      <p className="text-gray-400 text-sm md:text-base mb-12 text-center">
        Explore tailored insights for potential customers in your region.
      </p>

      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl w-full">
        {/* USA Card */}
        <div className="bg-neutral-900 rounded-md shadow-lg shadow-cyan-900/20 hover:shadow-cyan-400/30 transition transform hover:-translate-y-1 p-6 md:w-1/2">
          <h2 className="text-cyan-400 font-semibold text-lg mb-3">
            USA Potential Customers Only
          </h2>
          <p className="text-gray-300 text-sm mb-4">
            Learn about exclusive licensing and opportunities available for
            customers in the United States.
          </p>
          <a
            href="#"
            className="text-cyan-400 font-semibold hover:underline transition"
          >
            Learn more +
          </a>
        </div>

        {/* Global Card */}
        <div className="bg-neutral-900 rounded-md shadow-lg shadow-cyan-900/20 hover:shadow-cyan-400/30 transition transform hover:-translate-y-1 p-6 md:w-1/2">
          <h2 className="text-cyan-400 font-semibold text-lg mb-3">
            Potential Customers in All Other Countries
          </h2>
          <p className="text-gray-300 text-sm mb-4">
            Discover how international businesses can join and license BitWisdom
            AI Network globally.
          </p>
          <a
            href="#"
            className="text-cyan-400 font-semibold hover:underline transition"
          >
            Learn more +
          </a>
        </div>
      </div>
    </section>
  );
};

export default BitWisdom;
