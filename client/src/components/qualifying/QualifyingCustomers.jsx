import React, { useEffect, useRef, useState } from "react";
import { FaBuilding, FaUsers, FaUniversity, FaChartLine, FaLightbulb, FaLandmark, FaHandsHelping, FaStore, FaBriefcase } from "react-icons/fa";

const QualifyingCustomers = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const itemRefs = useRef([]);

  const customers = [
    {
      number: "01",
      title: "Tech Companies / Servicing Companies",
      description: "With a book of business of merchants they are already serving in some capacity",
      icon: FaBuilding,
    },
    {
      number: "02",
      title: "Membership Organizations",
      description: "With merchants as members of their organization",
      icon: FaUsers,
    },
    {
      number: "03",
      title: "Institutions",
      description: "That can benefit from offering an alternative payment method",
      icon: FaUniversity,
    },
    {
      number: "04",
      title: "High-Transactional-Volume Merchants",
      description: "Running their own crypto node without paying residuals on every transaction",
      icon: FaChartLine,
    },
    {
      number: "05",
      title: "Forward Thinking Entrepreneur",
      description: "Already serving a large network of merchants or proprietors",
      icon: FaLightbulb,
    },
    {
      number: "06",
      title: "Government Entities / Municipalities",
      description: "Offering alternative payment methods for services, fees, and taxes",
      icon: FaLandmark,
    },
    {
      number: "07",
      title: "Nonprofit Organizations",
      description: "Alternative payment for crowd-funding, giving and donations",
      icon: FaHandsHelping,
    },
    {
      number: "08",
      title: "Franchisors",
      description: "Onboard Your Franchisees To Accept Crypto Through Your Node",
      icon: FaStore,
    },
    {
      number: "09",
      title: "Corporate Offices/Store Support Centers",
      description: "Run A Node To Enable Crypto Acceptance At All Of Your Stores",
      icon: FaBriefcase,
    },
  ];

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => [...new Set([...prev, index])]);
            }
          });
        },
        { threshold: 0.2 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="relative bg-black text-white py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Who </span>
            <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">Qualifies?</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Discover if your organization is eligible to join our network
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/0 via-cyan-400/50 to-cyan-400/0"></div>

          {customers.map((customer, index) => {
            const Icon = customer.icon;
            const isLeft = index % 2 === 0;
            const isVisible = visibleItems.includes(index);

            return (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`relative mb-12 lg:mb-16 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0">
                  {/* Card */}
                  <div className={`w-full lg:w-5/12 ${isLeft ? '' : 'lg:ml-auto'}`}>
                    <div className="group relative bg-gradient-to-br from-gray-900/80 to-black border border-cyan-400/30 rounded-xl p-6 sm:p-8 hover:border-cyan-400 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,191,255,0.2)]">
                      {/* Icon and Number */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-14 h-14 bg-cyan-400/20 rounded-lg group-hover:bg-cyan-400/30 transition-all duration-300">
                          <Icon className="text-cyan-400 text-2xl" />
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full text-black font-bold text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                          {customer.number}
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-white text-xl sm:text-2xl font-semibold mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                        {customer.title}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {customer.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node - Desktop only */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
                    <div className="relative flex items-center justify-center">
                      <div className={`absolute w-8 h-8 bg-cyan-400/30 rounded-full transition-all duration-700 ${
                        isVisible ? 'animate-ping' : 'opacity-0'
                      }`}></div>
                      <div className={`relative w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 transition-all duration-700 ${
                        isVisible ? 'scale-100' : 'scale-0'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QualifyingCustomers;
