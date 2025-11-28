import React, { useState } from "react";
import about1Img from "../../assets/about1.jpg";
import ParticleNetwork from "../about/ParticleNetwork";
import QualifyingForm from "./QualifyingForm";

const QualifyingClosing = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <section className="relative bg-[#0E0E0E] text-white py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url(${about1Img})` }}
      ></div>

      {/* Particle Network Animation */}
      <ParticleNetwork />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main Content Card */}
        <div
          className="bg-black/50 border border-cyan-400/40 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 hover:border-cyan-400 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,191,255,0.2)]"
          style={{ animation: "slideInUp 1s ease-out" }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-cyan-300 text-xl sm:text-2xl font-semibold mb-4">
                Win-Win Partnership
              </h3>
            </div>
          </div>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
            As a <span className="text-cyan-400 font-semibold">KYC-vetted</span> membership organization, tech/servicing company, institution, government entity/municipality, nonprofit organization, franchisor, corporate office/store support center, or forward-thinking entrepreneur who is already serving a network of merchants who are their customers, you can{" "}
            <span className="text-cyan-400 font-semibold">share in the success</span> of your merchants and others transacting privately in cryptocurrency, while also keeping their merchant transaction processing fees{" "}
            <span className="text-cyan-400 font-semibold">significantly lower than the competition</span>.
          </p>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
            From the outset, we've designed and implemented a system from the ground up to be a{" "}
            <span className="text-cyan-400 font-bold text-lg sm:text-xl">win-win for everyone</span>.
          </p>

          {/* Decorative accent */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-cyan-400"></div>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className="mt-10 sm:mt-12 text-center"
          style={{ animation: "fadeInUp 1s ease-out 0.5s both" }}
        >
          <button
            onClick={() => setShowForm(true)}
            className="bg-cyan-400 text-black px-8 sm:px-10 py-3 sm:py-4 rounded text-base sm:text-lg font-semibold hover:bg-cyan-300 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,191,255,0.6)] hover:scale-110 active:scale-95"
          >
            Join Our Network Today
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Ready to transform your merchant network?
          </p>
        </div>
      </div>

      {/* Qualifying Form Modal */}
      {showForm && <QualifyingForm onClose={() => setShowForm(false)} />}

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
      `}</style>
    </section>
  );
};

export default QualifyingClosing;
