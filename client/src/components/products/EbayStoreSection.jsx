import React, { useState } from "react";
import ParticlesBackground from "../common/ParticlesBackground";
import ebayLogo from "../../assets/ebaybw.png";
import { API_BASE_URL } from "../../services/api";

const EbayStoreSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    waitlistType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistType, setWaitlistType] = useState("");

  const handleVisitStore = () => {
    window.open(
      "https://www.ebay.com/str/bitwisdomai",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openWaitlistPopup = (type) => {
    setWaitlistType(type);
    setFormData({ ...formData, waitlistType: type });
    setIsPopupOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/waitlist/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
        mode: "cors",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to join waitlist");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds and close popup
      setTimeout(() => {
        setIsSubmitted(false);
        setIsPopupOpen(false);
        setFormData({ name: "", email: "", waitlistType: "" });
        setWaitlistType("");
      }, 3000);
    } catch (error) {
      console.error("Error joining waitlist:", error);
      setIsSubmitting(false);
      alert(error.message || "Failed to join waitlist. Please try again.");
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsSubmitting(false);
    setIsSubmitted(false);
    setFormData({ name: "", email: "", waitlistType: "" });
    setWaitlistType("");
  };

  return (
    <section
      id="product-waitlist"
      className="relative bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      {/* Particles Background */}
      <ParticlesBackground variant="default" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-block bg-cyan-400 text-black font-semibold text-sm sm:text-base px-6 py-2.5 rounded-md mb-6">
              Hardware Store
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
                Visit Our eBay Business Store
              </span>
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-6">
              Browse our selection of professional-grade hardware, crypto node
              equipment, and enterprise solutions at BitWisdom_Store on eBay. We
              offer carefully curated products to power your crypto
              infrastructure and business operations.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-8">
              From high-performance laptops and servers to specialized crypto
              node hardware, find everything you need to run a successful crypto
              payment processing business.
            </p>
            <button
              onClick={handleVisitStore}
              className="bg-cyan-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded text-sm sm:text-base font-semibold hover:bg-cyan-300 transition inline-flex items-center group"
            >
              Visit BitWisdom_Store on eBay
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>

          {/* Right: eBay Logo */}
          <div className="relative flex items-center justify-center">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/20 rounded-full blur-3xl"></div>

              {/* Logo Container */}
              <div className="relative bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border border-cyan-400/40 rounded-2xl p-8 sm:p-12 backdrop-blur-sm hover:border-cyan-400/70 hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all duration-300">
                <img
                  src={ebayLogo}
                  alt="BitWisdom eBay Store"
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                />

                {/* Store Badge */}
                <div className="absolute -top-4 -right-4 bg-cyan-400 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  Official Store
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 md:mt-16">
          <div className="text-center p-6 border border-cyan-400/30 rounded-xl hover:border-cyan-400/60 transition-all">
            <div className="bg-cyan-400/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-white text-base sm:text-lg font-semibold mb-2">
              Trusted Seller
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Professional-grade equipment from a verified eBay business
            </p>
          </div>

          <div className="text-center p-6 border border-cyan-400/30 rounded-xl hover:border-cyan-400/60 transition-all">
            <div className="bg-cyan-400/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-white text-base sm:text-lg font-semibold mb-2">
              Quality Hardware
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Enterprise-grade components for reliable crypto operations
            </p>
          </div>

          <div className="text-center p-6 border border-cyan-400/30 rounded-xl hover:border-cyan-400/60 transition-all">
            <div className="bg-cyan-400/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-white text-base sm:text-lg font-semibold mb-2">
              Secure Checkout
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Safe and secure payment through eBay's trusted platform
            </p>
          </div>
        </div>

        {/* Waitlist Buttons */}
        <div
          id="waitlist-buttons"
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12 md:mt-16"
        >
          <button
            onClick={() => openWaitlistPopup("Laptop Crypto Node")}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-bold hover:from-cyan-300 hover:to-blue-400 transition shadow-lg hover:shadow-cyan-400/50 inline-flex items-center justify-center group"
          >
            Join Laptop Crypto Node Waitlist
            <svg
              className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>

          <button
            onClick={() => openWaitlistPopup("nodeFÔN")}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-bold hover:from-purple-300 hover:to-blue-400 transition shadow-lg hover:shadow-purple-400/50 inline-flex items-center justify-center group"
          >
            Join nodeFÔN Waitlist
            <svg
              className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Waitlist Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-[#0E0E0E] border border-cyan-400/40 rounded-2xl p-6 sm:p-8 md:p-10 max-w-md w-full shadow-[0_0_50px_rgba(0,240,255,0.3)] animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {isSubmitting ? (
              /* Submitting State */
              <div className="text-center py-12">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  {/* Spinning ring */}
                  <div className="absolute inset-0 border-4 border-cyan-400/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
                  {/* Inner pulse */}
                  <div className="absolute inset-2 bg-cyan-400/20 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
                    Joining {waitlistType} Waitlist...
                  </span>
                </h3>
                <p className="text-gray-400 text-sm">Please wait a moment</p>
              </div>
            ) : isSubmitted ? (
              /* Success State */
              <div className="text-center py-8">
                {/* Success Icon with Animation */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  {/* Outer expanding ring */}
                  <div className="absolute inset-0 bg-cyan-400/30 rounded-full animate-ping"></div>
                  {/* Main circle */}
                  <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full flex items-center justify-center animate-bounceIn">
                    <div className="w-16 h-16 bg-cyan-400/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-cyan-400 animate-checkmark"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 animate-slideUp">
                  <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
                    Welcome to the {waitlistType} Waitlist!
                  </span>
                </h3>
                <p className="text-gray-400 text-sm sm:text-base animate-slideUp">
                  Thank you for joining. We'll notify you when it's available!
                </p>
              </div>
            ) : (
              /* Form State */
              <>
                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
                    Join {waitlistType} Waitlist
                  </span>
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-6">
                  Be the first to know when {waitlistType} becomes available
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/50 border border-cyan-400/40 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/50 border border-cyan-400/40 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
                      placeholder="Enter your email"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-cyan-400 text-black px-6 py-3 rounded-lg text-sm sm:text-base font-bold hover:bg-cyan-300 transition shadow-lg mt-6"
                  >
                    Join Waitlist
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Background Glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] opacity-20">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/10 blur-3xl"></div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes checkmark {
          0% {
            stroke-dasharray: 0, 100;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 100, 100;
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .animate-bounceIn {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-checkmark {
          animation: checkmark 0.6s ease-out 0.2s both;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out 0.3s both;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default EbayStoreSection;
