import React, { useState, useEffect } from "react";
import bitwisdomBanner from "../../assets/newban.mp4";
import BLogo from "../../assets/Logo/Blogo.png";

const Hero = () => {
  const carouselTexts = [
    { text: "Make Profit Running A Crypto Node", highlight: false },
    {
      text: "Or Our nodeFON (Patent-Pending)",
      highlight: false,
    },
    { text: "Or Our Laptop Crypto Node", highlight: false },
    { text: "Onboard Merchants You're Already Serving", highlight: false },
    {
      text: "Reduce Your Merchants' Transaction Processing Fees",
      highlight: false,
    },
    {
      text: "Eliminate Merchant Chargebacks & PCI Compliance",
      highlight: false,
    },
    {
      text: "Enhance Transaction Privacy and Security",
      highlight: false,
    },
    { text: "Become A Bitcoin Treasury Company", highlight: false },
    { text: "Expand World-Wide Adoption Of Bitcoin", highlight: false },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % carouselTexts.length),
      3000
    );
    return () => clearInterval(interval);
  }, [carouselTexts.length]);

  return (
    <div className="relative bg-[#212121] text-white overflow-hidden min-h-screen">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "right center" }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={bitwisdomBanner} type="video/webm" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Mobile bottom overlay */}
      <div className="absolute bottom-0 right-0 w-48 h-32 bg-gradient-to-tl from-black from-40% via-black/90 to-transparent sm:hidden z-10"></div>

      {/* Hero Content */}
      <div className="relative px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 py-10 sm:py-14 md:py-20 lg:py-28 flex items-center min-h-screen z-10">
        {/* Right gradient overlay */}
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-20 md:opacity-30">
          <div className="w-full h-full bg-gradient-to-l from-brand-primary/20 to-transparent"></div>
        </div>

        {/* Left Content */}
        <div className="relative z-10 max-w-full md:max-w-3xl w-full">
          {/* Updated Heading With "Network™" */}
          <h1 className="flex items-center flex-wrap text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-none">
            <img
              src={BLogo}
              alt="B"
              className="h-[1em] w-auto object-contain align-middle"
              style={{ marginRight: "0.12em", transform: "translateY(-0.1em)" }} // spacing and moved up
            />

            <span className="text-white tracking-tight">itWisdom</span>

            <span className="text-[#00EFFF] tracking-tight ml-1">Ai</span>

            <span className="text-white tracking-tight ml-1">Network</span>

            <sup className="text-[10px] sm:text-xs md:text-sm text-[#00EFFF] mt-1 ml-1">
              ™
            </sup>
          </h1>

          {/* Subheading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-5 sm:mb-6 md:mb-8 lg:mb-10 font-semibold text-left">
            <div className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
              Featuring AI Tech -
            </div>
            <div className="bg-gradient-to-b from-white to-[#00f0ff] bg-clip-text text-transparent">
              A Game-changer For
            </div>
            <div className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
              Humanity
            </div>
          </h2>

          {/* Carousel Section */}
          <div className="flex flex-col items-start gap-3 sm:gap-4 md:gap-5 mb-5 sm:mb-6 md:mb-8">
            <div
              className={`inline-block px-4 sm:px-5 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded text-xs sm:text-sm md:text-base lg:text-lg font-semibold transition-all duration-500 shadow-lg text-center ${
                carouselTexts[currentIndex].highlight
                  ? "bg-[#00f0ff] text-black"
                  : "bg-white text-black"
              }`}
            >
              {carouselTexts[currentIndex].text}
            </div>

            {/* Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 flex-wrap">
              {carouselTexts.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-500 ${
                    i === currentIndex
                      ? "bg-[#00f0ff] shadow-[0_0_10px_#00FFFF]"
                      : "bg-white/40"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
            <button className="bg-brand-primary text-black px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded text-xs sm:text-sm md:text-base font-semibold hover:bg-cyan-400 transition w-full sm:w-auto">
              Schedule A Callback
            </button>
          </div>
        </div>

        {/* Right Side Glow */}
        <div className="absolute right-0 sm:right-4 md:right-8 lg:right-16 xl:right-28 top-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] md:w-[350px] lg:w-[450px] xl:w-[500px] h-[200px] sm:h-[300px] md:h-[350px] lg:h-[450px] xl:h-[500px] opacity-20 sm:opacity-30 md:opacity-40 lg:opacity-50">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-primary/30 to-blue-500/20 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
