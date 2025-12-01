import React, { useState } from "react";
import about2Img from "../../assets/about2.jpg";
import ParticleNetwork from "./ParticleNetwork";
import QualifyingForm from "../qualifying/QualifyingForm";

const AboutGoals = () => {
  const [showForm, setShowForm] = useState(false);
  const goals = [
    {
      number: "01",
      title: "Combine Wisdom with Technology",
      description:
        "Lower crypto transaction costs for everyone through innovative solutions and intelligent system design.",
    },
    {
      number: "02",
      title: "Enhance Systems Comprehensively",
      description:
        "Offer systems that enhance speed, security, safety, redundancy, reporting, accounting, and ease of use of cryptocurrency.",
    },
    {
      number: "03",
      title: "Enable Everyday Bitcoin Adoption",
      description:
        "Main focus is to allow Bitcoin/cryptocurrency acceptance in everyday life while enhancing cybersecurity, reliability, simplicity & profit for our customers and their merchants.",
    },
    {
      number: "04",
      title: "Maximize Automation",
      description:
        "Decrease need for manual human interaction with system – in a word: automation.",
    },
  ];

  return (
    <section className="relative bg-black text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-8 md:px-16 lg:px-28 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${about2Img})` }}
      ></div>

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/95"></div>

      {/* Particle Network Animation */}
      <ParticleNetwork />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div
            className="inline-flex items-center bg-cyan-400 text-black px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 rounded font-medium text-[10px] sm:text-xs md:text-sm mb-4 sm:mb-5 md:mb-6"
            style={{ animation: "zoomIn 0.8s ease-out" }}
          >
            Our Mission
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 px-2"
            style={{
              animation: "fadeInUp 1s ease-out 0.2s both"
            }}
          >
            <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
              BitWisdom AI Network Internal Goals
            </span>
          </h2>
          <div
            className="w-20 h-1 bg-cyan-400 mx-auto"
            style={{ animation: "expandWidth 1s ease-out 0.4s both" }}
          ></div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="relative border border-cyan-400/30 rounded-lg p-6 sm:p-8 bg-[#0E0E0E] hover:bg-[#1A1A1A] transition-all duration-500 group hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,191,255,0.2)] hover:-translate-y-2"
              style={{
                animation: `slideInLeft 0.8s ease-out ${index * 0.15}s both`
              }}
            >
              {/* Number Badge */}
              <div className="absolute -top-4 left-6 bg-cyan-400 text-black px-3 sm:px-4 py-1 rounded font-bold text-sm sm:text-base font-mono group-hover:scale-110 transition-transform duration-300">
                {goal.number}
              </div>

              {/* Content */}
              <div className="mt-4">
                <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  {goal.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {goal.description}
                </p>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/20 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-125"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 sm:mt-16 text-center"
          style={{ animation: "fadeInUp 1s ease-out 0.8s both" }}
        >
          <p className="text-gray-400 text-sm sm:text-base mb-6">
            Ready to be part of the future of cryptocurrency transactions?
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-cyan-400 text-black px-6 sm:px-8 py-3 rounded text-sm sm:text-base font-semibold hover:bg-cyan-300 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,191,255,0.5)] hover:scale-110 active:scale-95"
          >
            Join Our Network
          </button>
        </div>
      </div>

      {/* Qualifying Form Modal */}
      {showForm && <QualifyingForm onClose={() => setShowForm(false)} />}

      <style>{`
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 5rem;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default AboutGoals;
