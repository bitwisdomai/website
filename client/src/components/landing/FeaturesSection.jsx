import React from "react";
import brainImg from "../../assets/brain.png";

const FeatureCard = ({ number, title, description }) => (
  <div className="relative flex flex-col border border-[#00BFFF] rounded-lg px-6 py-8 bg-[#1A1A1A] min-h-[220px]">
    {/* Number Badge */}
    <div className="absolute -top-6 left-6 bg-[#0D0D0D] px-4 py-1 border border-[#00BFFF] rounded text-[#00BFFF] font-mono text-base shadow-md">
      {number}
    </div>
    <div className="flex flex-col justify-center h-full mt-2">
      <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      number: "01",
      title: "Deploy Anywhere",
      description:
        "We will help you launch a crypto node in the cloud, or your own locally-hosted hardware by using Bluvision's patent-pending massively secure connection procedures.",
    },
    {
      number: "02",
      title: "Integrate Seamlessly",
      description:
        "When your merchant integrates a simple onboarding process, they choose from a range of POS, pool, and/or connect their ecommerce platform to start accepting crypto payments in as little as a 30 minute signup process.",
    },
    {
      number: "03",
      title: "Receive Instantly",
      description:
        "Initial .3:1 second consumer/merchant settlement is followed by instantaneous transactional speeds prior to your business. Then final settlement occurs at lowest network fees using Bluvision's patented protocol to stream directly to your merchants' connected wallet.",
    },
  ];

  return (
    <section className="relative bg-[#0D0D0D] pt-16 pb-20 px-4 sm:px-6 lg:px-12 min-h-[420px] overflow-visible">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex items-center bg-[#00BFFF] text-black px-6 py-2 rounded font-medium text-sm shadow">
            Qualifying Bluvision AI Network Customers
          </div>
        </div>

        {/* The row of Cards */}
        <div className="flex flex-row gap-8 justify-between items-start">
          {features.map((feature) => (
            <FeatureCard
              key={feature.number}
              number={feature.number}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      {/* Brain Image - larger, pulled a little left */}
      <div
        className="absolute"
        style={{
          top: "28px",
          right: "60px", // reduce to move left (from 8px to 60px, adjust as you prefer)
          width: "120px", // larger size
          height: "120px",
          zIndex: 20,
        }}
      >
        <img
          src={brainImg}
          alt="AI Brain"
          className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
