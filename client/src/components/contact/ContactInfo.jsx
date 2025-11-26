import React from "react";
import { FaEnvelope, FaGlobe, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import ProtectedEmail from "../common/ProtectedEmail";

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      isEmail: true,
      emailUser: "info",
      emailDomain: "bitwisdom.ai",
      subContent: "We'll respond within 24 hours",
    },
    {
      icon: FaGlobe,
      title: "Visit Our Website",
      content: "www.bitwisdom.ai",
      subContent: "Learn more about our network",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Our Location",
      content: "Global Network",
      subContent: "Serving worldwide",
    },
    {
      icon: FaClock,
      title: "Support Hours",
      content: "24/7 Available",
      subContent: "We're always here to help",
    },
  ];

  return (
    <section className="relative bg-[#0E0E0E] text-white py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2">
            <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
              Other Ways to Reach Us
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Connect with us through any of these channels
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {contactDetails.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <div
                key={index}
                className="group bg-black/50 border border-cyan-400/30 rounded-xl p-4 sm:p-5 md:p-6 text-center hover:border-cyan-400 transition-all duration-500 hover:shadow-[0_0_25px_rgba(0,191,255,0.2)] hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-cyan-400/20 rounded-full flex items-center justify-center group-hover:bg-cyan-400/30 transition-all duration-300">
                    <Icon className="text-cyan-400 text-xl sm:text-2xl" />
                  </div>
                </div>
                <h3 className="text-white text-base sm:text-lg font-semibold mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                  {detail.title}
                </h3>
                <div className="text-cyan-400 font-medium mb-1 text-sm sm:text-base">
                  {detail.isEmail ? (
                    <ProtectedEmail user={detail.emailUser} domain={detail.emailDomain} />
                  ) : (
                    <p>{detail.content}</p>
                  )}
                </div>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {detail.subContent}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
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

export default ContactInfo;
