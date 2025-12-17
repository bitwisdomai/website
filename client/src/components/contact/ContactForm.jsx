import React, { useState } from "react";
import { FaUser, FaEnvelope, FaBuilding, FaPaperPlane } from "react-icons/fa";
import ParticleNetwork from "../about/ParticleNetwork";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../../services/api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('1. Form submit started');
    setIsSubmitting(true);
    console.log('2. isSubmitting set to true');

    try {
      console.log('3. Inside try block');
      console.log('4. Submitting form data:', formData);

      console.log('5. About to call fetch...');
      const response = await fetch(`${API_BASE_URL}/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).catch(fetchError => {
        console.error('6. Fetch error caught:', fetchError);
        throw fetchError;
      });

      console.log('7. Fetch completed, response:', response);
      console.log('8. Response status:', response.status);

      const data = await response.json();
      console.log('9. Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit form");
      }

      console.log('10. Success! Showing toast...');
      toast.success(
        "Thank you for contacting us! We'll get back to you soon.",
        {
          duration: 5000,
          position: "top-center",
        }
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        organization: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("11. Error caught:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      toast.error(error.message || "Failed to submit form. Please try again.", {
        duration: 5000,
        position: "top-center",
      });
    } finally {
      console.log('12. Finally block - setting isSubmitting to false');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-black text-white py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#0E0E0E",
            color: "#fff",
            border: "1px solid rgba(0, 240, 255, 0.3)",
            borderRadius: "0.75rem",
            padding: "16px",
          },
          success: {
            iconTheme: {
              primary: "#00f0ff",
              secondary: "#0E0E0E",
            },
            style: {
              border: "1px solid rgba(0, 240, 255, 0.5)",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#0E0E0E",
            },
            style: {
              border: "1px solid rgba(239, 68, 68, 0.5)",
            },
          },
        }}
      />
      {/* Particle Network Animation */}
      <ParticleNetwork />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-300 mb-3 sm:mb-4 px-2"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Send Us a Message
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg px-2">
            Fill out the form below and we'll get back to you as soon as possible
          </p>
        </div>

        <div className="bg-[#0E0E0E] border border-cyan-400/30 rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,191,255,0.15)]">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-cyan-400/50 text-sm" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Email Address <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-cyan-400/50 text-sm" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Organization Field */}
            <div>
              <label htmlFor="organization" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Organization
              </label>
              <div className="relative">
                <FaBuilding className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-cyan-400/50 text-sm" />
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                  placeholder="Your Company"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Subject <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                placeholder="How can we help you?"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Message <span className="text-cyan-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 resize-none sm:rows-6"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group bg-cyan-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-cyan-300 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,191,255,0.6)] hover:scale-105 active:scale-95 flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <FaPaperPlane className="text-base sm:text-lg group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
