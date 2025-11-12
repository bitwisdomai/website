import React, { useState, useEffect } from "react";
import bannerVideo from "../../assets/newherovideo.mp4";

const Hero = () => {
  const carouselTexts = [
    "Run Your Own Crypto Node",
    "Empower Your AI with Blockchain Technology",
    "Build Smart Financial Systems",
    "Automate Your Business Operations",
    "Revolutionize Global Crypto Commerce",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselTexts.length]);

  return (
    <div className="relative bg-[#212121] text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bannerVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Hero Content */}
      <div className="relative px-4 sm:px-8 md:px-16 lg:px-28 py-12 sm:py-16 md:py-24 lg:py-32 flex items-center min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[750px] z-10">
        {/* Background Gradient Overlay */}
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-20 md:opacity-30">
          <div className="w-full h-full bg-gradient-to-l from-brand-primary/20 to-transparent"></div>
        </div>

        {/* Left Content */}
        <div className="relative z-10 max-w-full md:max-w-2xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
            "Bitwisdom AI Network TM"
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 md:mb-10 italic">
            Featuring AI Technology - <br />A Game Changer for Humanity
          </p>

          {/* Carousel Text + Dots */}
          <div className="flex flex-col items-start gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
            {/* Dynamic Text */}
            <div className="inline-block bg-white text-black px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded text-xs sm:text-sm md:text-base font-semibold transition-all duration-500">
              {carouselTexts[currentIndex]}
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2 sm:gap-3">
              {carouselTexts.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-500 ${
                    i === currentIndex
                      ? "bg-brand-primary shadow-[0_0_10px_#00FFFF]"
                      : "bg-white/40"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
            <button className="bg-brand-primary text-black px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded text-sm sm:text-base font-semibold hover:bg-cyan-400 transition">
              Schedule A Callback
            </button>
            <button className="border border-brand-primary text-white px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded text-sm sm:text-base font-semibold hover:bg-brand-primary/10 transition">
              Help Fund Developing Country Businesses
            </button>
          </div>
        </div>

        {/* Right Side Glow */}
        <div className="absolute right-4 sm:right-8 md:right-16 lg:right-28 top-1/2 -translate-y-1/2 w-[250px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] opacity-30 sm:opacity-40 md:opacity-50">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-primary/30 to-blue-500/20 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
